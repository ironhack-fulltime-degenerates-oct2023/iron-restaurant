// First, we have to require Express so we can use it in our app.
const express = require('express');
const logger = require("morgan");
const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model");


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
// Connect to DB
// 

mongoose
    .connect("mongodb://127.0.0.1:27017/iron-restaurant")
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err));



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


// POST /pizzas (create new pizza)
app.post("/pizzas", (req, res, next) => {

    const {title, price, isVeggie, ingredients, dough} = req.body;
    
    const newPizza = {
        title,
        price,
        isVeggie,
        ingredients,
        dough
    };

    Pizza.create(newPizza)
        .then( (pizzaFromDB) => {
            console.log(pizzaFromDB)
            res.status(201).send("Good news, your pizza was created!");
        })
        .catch( (error) => {
            console.log("Error creating a pizza in the DB...", error);
            res.send("Error creating a pizza in the DB...");
        });

});


// GET /pizzas (get list of pizzas)
app.get("/pizzas", (req, res, next) => {

    Pizza.find()
        .then( (pizzasArr) => {
            res.send(pizzasArr);
        })
        .catch( (error) => {
            console.log("Error getting list of pizzas from DB...", error);
            res.send("Error getting list of pizzas from DB...");
        });

})


// GET /pizzas/:pizzaId (get details of one pizza)
app.get("/pizzas/:pizzaId", (req, res, next) => {

    const {pizzaId} = req.params;
    
    Pizza.findById(pizzaId)
        .then((pizzaFromDB) => {
            res.send(pizzaFromDB);
        })
        .catch((error) => {
            console.log("Error getting pizza details from DB...", error);
            res.send("Error getting pizza details from DB...");
        });

});


// PUT /pizzas/:pizzaId (update one pizza)
app.put("/pizzas/:pizzaId", (req, res, next) => {

    const {pizzaId} = req.params;

    const {title, price, isVeggie, ingredients, dough} = req.body;
    
    const newDetails = {
        title,
        price,
        isVeggie,
        ingredients,
        dough
    };

    Pizza.findByIdAndUpdate(pizzaId, newDetails,  { new: true })
        .then(() => {
            res.send("Good news, your pizza was updated!");
        })
        .catch((error) => {
            console.log("Error updating a pizza in the DB...", error);
            res.send("Error updating a pizza in the DB...");
        });
    
});


// DELETE /pizzas/:pizzaId (update one pizza)
app.delete("/pizzas/:pizzaId", (req, res, next) => {
    const {pizzaId} = req.params;

    Pizza.findByIdAndDelete(pizzaId)
        .then(() => {
            res.send("Good news, your pizza was deleted!");
        })
        .catch((error) => {
            console.log("Error deleting a pizza in the DB...", error);
            res.send("Error deleting a pizza in the DB...");
        });

});


// GET /search
app.get("/search", (req, res, next) => {

    const {maxPrice} = req.query;
    
    res.send(`Search Page: searching with max price of.... ${maxPrice}`);
})






// Start the server...
app.listen(3001, () => console.log("My first app listening on port 3001! "));

