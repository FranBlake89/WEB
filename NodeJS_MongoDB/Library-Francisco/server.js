const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.static("assets"))

const exphbs = require("express-handlebars");
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    helpers: {
        json: (context) => { return JSON.stringify(context) }
    }
   }));
app.set("view engine", ".hbs")

// setup sessions
const session = require('express-session')
app.use(session({
   secret: "the quick brown fox jumped over the lazy dog 1234567890",  // random string, used for configuring the session
   resave: false,
   saveUninitialized: true
}))


/// --------------
// DATABASE : Connecting to database and setting up your schemas/models (tables)
/// --------------

 const mongoose = require('mongoose');
 mongoose.connect("-------Mongo DB--------------");
 const Schema = mongoose.Schema

const booksSchema = new Schema ({id:Number,title:String,author:String,description:String, image:String, borrowBy:{type: String, default: ""} } )
const Books = mongoose.model("books_collection", booksSchema)

const userSchema = new Schema ({username:String, cardNumber:String, userType:String, books:[booksSchema]})
const User = mongoose.model("user_collection", userSchema)


// ----------------
// endpoints
// ----------------
app.get("/", async(req, res) => {
    console.log(`[DEBUG] GET ---> / `)
        //console.log(req.session)
    try {
        const bookList = await Books.find().lean()
        //console.log(bookList)
        const isUser = req.session.hasLoggedInUser === true
        if(bookList.length === 0){
            res.send("[ERROR] There are no BOOKS")
        }
        console.log("____________________________________________")
        console.log(`[DEBUG] GET ---> / : LoggedInUser ${isUser}}`)
        console.log(req.session)
        console.log("____________________________________________")
    
        res.render("index", {layout:false, books: bookList, user:isUser, isBorrowed:false})
        

    } catch (error) {
        console.log(`[ERROR]: / endpoint :: ${error}` )
    }
})

app.get("/auth", (req, res) => {
    console.log(`[DEBUG] GET request received from /AUTH endpoint`)
    const isLogged = req.session.hasLoggedInUser === undefined ? false : true

    res.render("auth-page", {layout:false, isLogged:isLogged})
})

 app.post("/login", async(req, res) => {
    console.log(`[DEBUG] POST request received at /LOGIN endpoint`)
    console.log(req.body)

    const cardNumberFromUI = req.body.cardNumber
    
    console.log(`LOGIN card number: ${cardNumberFromUI}`)

    try {
        const userFromDB = await User.findOne({cardNumber:cardNumberFromUI}).lean()

        if(userFromDB === null){
            res.send("LOGIN ERROR: This user does not exist!, return to the login page and try again")
            return
        }

        if(userFromDB.cardNumber === cardNumberFromUI ){
            req.session.hasLoggedInUser = true
            req.session.cardNumber = cardNumberFromUI

            res.redirect(`/profile`);     
        }       
    } catch (error) {
        console.log(`[ERROR] POST request /LOGIN: ${error}`)
    }
 })
app.get("/profile", async (req, res) => {
    // optional
    console.log(`[DEBUG] Session variable at /profile`)
    console.log(req.session)
    console.log(`CardNumber: ${req.session.cardNumber}`);
    const cardNumber = req.session.cardNumber
    console.log(`---------------------\n CardNumber: ${cardNumber}\n---------------------\n`);
    if (req.session.hasLoggedInUser === undefined) {
        res.render("error-page", {layout:false})
        return
    }
    else {
            try {
                const booksList = await Books.find({borrowBy:cardNumber}).lean()
                const areBooks = booksList.length > 0 ? true : false

                console.log(`[/PROFILE]  booksList:: ${booksList}`)
                console.log(`[/PROFILE]  areBooks:: ${areBooks}`)
                res.render("profile", {
                    layout:false, books:booksList, hasbooks:areBooks
                })
                    
                return
            } catch(err) {
                console.log(err)
            }
        }
    }
)

app.get("/borrow/:id", async(req, res) => { 

    const userID = req.session.cardNumber;
    const bookID = req.params.id;
    console.log(`[DEBUG] /borrow endpoint: bookID->  ${bookID}`);
    const  ObjectId  = require('mongodb').ObjectId;

    try {
        const result = await Books.updateOne(
            { "_id": new ObjectId(bookID) }, 
            { $set: { "borrowBy": userID } }
        ).lean();

        console.log(`[DEBUG] /borrow endpoint: result->  ${result}`)

    } catch (error) {
        console.log(`[ERROR] /borrow endpoint: ${error}`)
    }

    res.redirect("/")

})

app.get("/return/:id", async(req, res) => {
    const bookID = req.params.id;
    console.log(`[DEBUG] /return endpoint: bookID->  ${bookID}`);
    const  ObjectId  = require('mongodb').ObjectId;
    try {
        const result = await Books.updateOne(
            { "_id": new ObjectId(bookID) }, 
            { $set: { "borrowBy": "" } }
        ).lean();

        console.log(`[DEBUG] /return endpoint: result->  ${result}`)

    } catch (error) {
        console.log(`[ERROR] /return endpoint: ${error}`)
    }

    res.redirect("/profile")
})

app.post("/logout", (req, res) => {
    console.log(`[DEBUG] LOGOUT requested...`)
    req.session.destroy()
 
 
    console.log(`Session destroyed...`)
    console.log(req.session)
   
    res.render("auth-page", {layout:false})
 
 })


// ----------------
const onHttpStart = () => {
  console.log(`Express web server running on port: ${HTTP_PORT}`)
  console.log(`Press CTRL+C to exit`)
}
app.listen(HTTP_PORT, onHttpStart)
