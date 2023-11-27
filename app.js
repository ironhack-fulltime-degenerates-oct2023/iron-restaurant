// First, we have to require Express so we can use it in our app.
const express = require('express');
const logger = require("morgan");

// Create an express server instance named `app`
// `app` is the Express server that will be handling requests and responses
const app = express();

// Setup the request logger to run on each request 
app.use(logger("dev"));

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json()); 



//
// Custom middleware
//

app.use((req, res, next) => {
    console.log("custom middleware one");
    next();
});

app.use((req, res, next) => {
    console.log("custom middleware two");
    next();
});



// 
// Routes
// 

// app.get(path, fn)



app.get("/", (req, res, next) => {
    // res.send("<h1>home page</h1>")
    // res.json();
    res.sendFile(__dirname + '/views/homepage.html');
});


app.get("/about", (req, res, next) => {
    res.sendFile(__dirname + '/views/about.html');
});


app.get("/pizzas", (req, res, next) => {

    const pizzasArr = [
        {
            title: 'Pizza Margarita',
            price: 12,
            imageFile: 'pizza-margarita.jpg',
        },
        {
            title: "Veggie Pizza",
            price: 15,
            imageFile: "pizza-veggie.jpg"
        },
        {
            title: "Seafood Pizza",
            imageFile: "pizza-seafood.jpg"
        }
    ];


    res.json(pizzasArr);
})


// Start the server...
app.listen(3001, () => console.log("My first app listening on port 3001! "));

