// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// Routes
app.get('/all', function(req, res){
    console.log("get called with: " + projectData);
    console.log(projectData);   
    res.send(projectData);
});

app.post('/send', function(req, res){
    let newData = req.body;
    let newEntry = {
        date: newData.date,
        temp: newData.temp,
        res: newData.res
    }
    console.log(newEntry);
    
    projectData = newEntry;
    console.log(projectData);
})


