const express = require('express');
const app = express();

const HTTP_PORT =process.env.PORT || 8080;
// use a static resources folder
app.use(express.static('assets'))

// configure express to receive form field data
app.use(express.urlencoded({ extended: true }))

//HANDLEBARS
const exphbs = require("express-handlebars");

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    helpers:{
        json: (context) => {return JSON.stringify(context)}
    }
}));

app.set("view engine", ".hbs");
app.use (express.urlencoded( { extend: true }))

app.use(express.static("assets"));
//-----------------------------------------------
//MONGO
//-----------------------------------------------

const mongoose = require('mongoose');

mongoose.connect('------MONGO DB-------', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(`Error connecting to MongoDB: ${err.message}`));


const Schema = mongoose.Schema

const videoSchema = new Schema({
    videoID:String,
    titleVideo: String,
    chanel: String,
    likes: Number,
    uploadDate: String,
    image: String
})

const Video = mongoose.model("video_data", videoSchema)

const commentSchema = new Schema({
    videoID: String,
    comment: String,
    userName: String
})
console.log(Video);
const Comment = mongoose.model("comment_data", commentSchema)

//--------------------------
// ENDPOINTS  :
//==========================

app.get("/", async (req, res) => {
    console.log(`[DEBUG] GET request received at / endpoint`)
    console.log(req.session)
    console.log(`------------------------------------------`)
    
    try{
        const videosList = await Video.find().lean()
        console.log(videosList.titleVideo);
        console.log(videosList.length);

        res.render(
            "index",{
            layout: false,
            videos: videosList
        })
    }catch( err ) { console.log(`[ERROR] at / endpoint : ${err.message}`)}

})
app.get("/auth", async(req, res) => {
    try{
        const videosList = await Video.find().lean()
        res.render("auth-page", {layout:false, videos: videosList})

    }catch( err ) { 
        console.log(err)}
})

app.post("/details/:videoID", async (req, res) => { 
        const idFromUI = req.params.videoID
        
        console.log(`[DEBUG] Details: ${idFromUI}`)
    
        try{
            const idFromDB = await Video.findOne({videoID: idFromUI}).lean()
    
            //console.log(`[DEBUG] idFromDB: ${idFromDB}`)
    
            if(idFromDB === null){
                res.send(`VIDEO NOT FOUND`)
                return
            }
            else if (idFromDB.videoID === idFromUI){
                const commentsFromDB = await Comment.find({videoID: idFromUI}).lean()
                let noComment = true
                
                console.log(`[DEBUG] commentsFromDB: ${commentsFromDB}`)
    
                if(commentsFromDB === null){
                    res.render("details-page", { layout: false, video: idFromDB, noComment: noComment });
                    return
                }
                else{
                    noComment = false
                    res.render("details-page", { layout: false, video: idFromDB, noComment: noComment,comments: commentsFromDB });
                    return
                }
            }
        }catch (err) {
            console.log(err)
        }    
    
    })

app.post("/like/:videoID", async (req, res) => { 
    const idFromUI = req.params.videoID
    try{
        let idFromDB = await Video.findOne({videoID: idFromUI})
        
        if(idFromDB === null){
            res.send(`VIDEO NOT FOUND`)
            return
        }
        else if (idFromDB.videoID === idFromUI){
            idFromDB.likes = idFromDB.likes + 1
            idFromDB.save()
            idFromDB = await Video.findOne({videoID: idFromUI}).lean()

            const commentsFromDB = await Comment.find({videoID: idFromUI}).lean()
            let noComment = true
     
            console.log(`[DEBUG] commentsFromDB: ${commentsFromDB}`)

            if(commentsFromDB === null){
                res.render("details-page", { layout: false, video: idFromDB, noComment: noComment });
                return
            }
            else{
                noComment = false
                res.render("details-page", { layout: false, video: idFromDB, noComment: noComment,comments: commentsFromDB });
                return
            }
        }

    }catch (err) {
        console.log(err)
    }    
})

app.get("/search", async (req, res) => {
    const query = req.query.query
    console.log(`[DEBUG] Search: ${query}`)

    try{
        const videoList = await Video.find ({titleVideo: {$regex: query, $options: "i"}}).lean()
        
        if (videoList.length === 0) {
            //TODO SEND ERROR MESSAGE AS <P>
            const errorMsg = `No videos found! with the title: ${query}`
            res.render("index", { layout: false, videos: videoList, errorMsg: errorMsg })
           return
       }
       // there are videos
       console.log(`[DEBUG] videoList found: ${videoList}`)
       res.render("index", { layout: false, videos: videoList })
       return
    }
    catch(e){
        console.log(`[DEBUG] Find endpoint! ${e}`)
    }
})

app.post("/add-comment/:itemID", async (req, res) => { 

    const idFromUI = req.params.itemID
    const username = req.body.username
    const comment = req.body.comment

    const addComment = new Comment({videoID:idFromUI, comment:comment, userName:username})

    try{
        await addComment.save()
        idFromDB = await Video.findOne({videoID: idFromUI}).lean()
        if(idFromDB === null){
            res.send(`VIDEO NOT FOUND`)
            return
        }
        else if (idFromDB.videoID === idFromUI){
            const commentsFromDB = await Comment.find({videoID: idFromUI}).lean()
            let noComment = true
     
            console.log(`[DEBUG] commentsFromDB: ${commentsFromDB}`)

            if(commentsFromDB === null){
                res.render("details-page", { layout: false, video: idFromDB, noComment: noComment });
                return
            }
            else{
                noComment = false
                res.render("details-page", { layout: false, video: idFromDB, noComment: noComment,comments: commentsFromDB });
                return
            }
        }

    }catch (err) {
        console.log(err)
    }    

})

app.post("/delete/:itemID", async (req, res) => { 

    const idFromUI = req.params.itemID
    try{
        const videoToDelete = await Video.findOne({videoID: idFromUI})
        if (videoToDelete === null) {
               
                res.send("ERROR: Cannot delete because no matching found")
                return
        }        
        const commentToDelete = await Comment.findOne({videoID: idFromUI})
        if (videoToDelete === null) {
             
                res.send("ERROR: Cannot delete because no matching found")
                return
        }   
        await Video.deleteOne(videoToDelete)
        await Comment.deleteMany(commentToDelete)
        const videosList = await Video.find().lean()
        res.render("auth-page", {layout:false, videos: videosList})

    }catch (err) {
        console.log(err)
    }    
})
  
//----------------------------------------------



const onHttpStart = () => {
    console.log(`Server started and is running on por ${HTTP_PORT}`);
    console.log("Press CTRL+C to exit");
}
app.listen(HTTP_PORT, onHttpStart);