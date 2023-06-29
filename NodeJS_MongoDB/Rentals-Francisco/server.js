/*
++++++++++++++++++++++++++++++++
Name: Francisco Castillo
Course: WEB'322'
Section: NAA

Notes: 
Init Project    : npm init -y  
Install express : npm install express --save 
Install nodemon : npm install -g nodemon  
Install handleBars : npm install handlebars
Usage:
nodemon -> nodemon [your node app]
express -> const express = require('express');
         ->	const app = express();
handleBars ->  const exphbs = require("express-handlebars");
                                        app.engine(".hbs", exphbs.engine({
                                        extname: ".hbs",
                                        helpers: {
                                            json: (context) => { return JSON.stringify(context) }
                                        }
                                        }));
++++++++++++++++++++++++++++++++
*/

//CREATE NEW CSS


const express = require ( 'express');
const app = express ();

const HTTP_PORT = process.env.PORT || 8080 ;
const path = require('path');

//HANDLEBARS
const exphbs = require("express-handlebars");
const { Console } = require('console');

app.engine(".hbs", exphbs.engine({
 extname: ".hbs",
 helpers: {
     json: (context) => { return JSON.stringify(context) }
 }
}));
app.set("view engine", ".hbs");

// extract data sent by <form> element in the client
app.use( express.urlencoded( { extended: true } ) );
// define a static resources folder
app.use(express.static("assets"));
//List of minimum 6 items
const productsList = [ 
    {id:"XErH", name: "Radio 90s", minRental: 2, available: true, quantity: 5, imageURL:"/images/im1.jpg"},
    {id:"0Pnd", name: "PS Controller", minRental: 1, available: true, quantity: 15, imageURL:"/images/play_station_control.jpg"},
    {id:"Szaf", name: "Camera reflex old", minRental: 3, available: false, quantity: 45, imageURL:"/images/reflex.jpg"},
    {id:"ASDH", name: "Dron", minRental: 20, available: true, quantity: 5, imageURL:"/images/dron.jpg"},
    {id:"IUYd", name: "Smart Watch", minRental: 11, available: false, quantity: 15, imageURL:"/images/smart_watch.jpg"},
    {id:"fsdw", name: "Xbox Controller", minRental: 38, available: true, quantity: 45, imageURL:"/images/control_game.jpg"},
    {id:"bnrt", name: "Smart Phone", minRental: 22, available: true, quantity: 5, imageURL:"/images/phone.jpg"},
    {id:"lkjh", name: "Robot", minRental: 13, available: true, quantity: 15, imageURL:"/images/robot.jpg"},
    {id:"sWsD", name: "CPU", minRental: 31, available: true, quantity: 45, imageURL:"/images/CPU.jpg"}
]

//------------------------------------------------------

app.get("/", (req, res) => {

    const homepageItems = getRandomItems(3);
    
    res.render('home', {
        items: homepageItems,
        layout: false
    });  
})

app.get("/catalogue", (req, res) => {

    res.render(
        "catalogue", 
        {layout: false,
        items: productsList            
        })
})

app.get("/error", (req, res) => {
   //console.log(productsList)
    res.render(
        "errorPage", 
        {
            items: productsList,
            layout: false
        })
})
app.get("/errorMin", (req, res) => {
    res.render(
        "errorMin", 
        {
            items: productsList,
            layout: false
        })
})

app.get("/search", (req, res) => {

    const query = req.query.query;
    //console.log(`QUERY:::   ${JSON.stringify(query)} \n _______________________`);

    const items = searchItems(query, 'name');
    //console.log(items);
    //console.log(items.length);

    if(items.length != 0){
        res.render(
            'catalogue', 
            {
            items: items,
            layout: false
            }
        );  
    }
    else{
        res.redirect('/error');  
    }
})

app.get("/filter", (req, res) => {
    const optionSelect = req.query.choose
    //console.log(optionSelect)

    const items = searchItems(optionSelect, 'available');
    // const items = filter (optionSelect)
    //console.log(items)

    if(items.length != 0){
        res.render(
            'catalogue', 
            {
            items: items,
            layout: false
            }
        );  
    }
    else{
        res.render(
            "errorPage", 
            {
                noItems: true,
                layout: false
            }) 
    }

})

app.post("/return-All", (req,res) => {

    for (let index = 0; index < productsList.length; index++) {

        productsList[index].available = true;

        //let returnAll = productsList[index].available;
        //console.log(returnAll);
         
    }
        res.redirect('/catalogue');
})
app.post("/rent/:itemID", (req,res) => {
    // Get the id of the product you want to rent

    // console.log("DEBUG /remove: req.params")
    // console.log( req.params.itemID )
    // console.log("DEBUG /remove: req.body")
    // console.log(req.body)

    const idFromURL = req.params.itemID;
    let error = true;
    let index = -1;
    console.log()

    for (let i = 0; i < productsList.length; i++) {
        //console.log(`${idFromURL}  ===  ${productsList[index].id}  ??`)
        if(idFromURL === productsList[i].id){
            //productsList.splice(index,1);
            if(req.body.numberDays >= productsList[i].minRental){
                error = false;
                index = i;
            }
        }       
    }

    if(!error){
        productsList[index].available = false;
            res.redirect('/catalogue');
    }
    else{
        res.redirect('/errorMin')
    }
})

//------------------------------------------------------

// Search function
const searchItems = (keyword, property) => {
   let results;

   if(property === 'name'){
       results = productsList.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
       //console.log(results)
   }
   else if( property === 'available'){
        const search = (keyword === 'true') ? true : false;
        //console.log(`boolean === ${search} and type ${typeof(search)}`);
    
        results = productsList.filter(item => item.available === search);
   }
   
    return results;
  }
  
  // Helper function to get a certain number of random items from the items list
const getRandomItems = (count) => {
    const randomItems = [];

    do {
        const randomIndex = Math.floor(Math.random() * productsList.length);
        const condition = productsList[randomIndex].available;

        if (condition === true) {
            randomItems.push(productsList[randomIndex]);
            //console.log(condition); 
        } 
    }while(randomItems.length != count)

    //console.log(randomItems.length);

    return randomItems;

  }

//----------------------------------------------
const onHttpStart = () => {
    console.log(`Server started and is running on por ${HTTP_PORT}`);
    console.log("Press CTRL+C to exit");
}
app.listen(HTTP_PORT, onHttpStart);