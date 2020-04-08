const express = require("express");
const bodyParser = require('body-parser')
const app = express();

// parse application/json
app.use(bodyParser.json())
const Datastore = require("nedb");
const databse = new Datastore("databse.db");
databse.loadDatabase();
app.use(express.static('public'))

// app.listen(8000, () => console.log("Server is running up !"));
app.listen(process.env.PORT || 8000, (req, res)=> {
 
});

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post("/register", (req, res) => {
  databse.insert(req.body, (err, data) => {
    console.log(data)
    if(data){
      res.send({
        status: 200,
        message: "User has been successfully registerd"
      })
    }
    else {
      res.send({
        status: 500,
        message: "Internal server error"
      })
    }
  });
});
