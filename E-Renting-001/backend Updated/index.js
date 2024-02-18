const 
express = require('express'),
mongoose = require('mongoose'),
app = express(),
cors = require('cors'),

// use express router 
router = require("./routes/index");

    mongoose.connect("mongodb://0.0.0.0:27017/Renting-system",{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
    });
 //mongoose.set("useCreateIndex", true); // not longer neccesary
// Assign the database to the db variable.
const db = mongoose.connection;

// Log a message when the application connects to the database.
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});   
    
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hi')
})

// This code tells your Express.js application to use the router object as 
// a system for middleware and routing.
app.use("/", router);



// set uyp the aplication to listen on port 3000
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });
  