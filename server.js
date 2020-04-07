const express = require("express");
const bodyParser = require('body-parser')
const app = express();

// parse application/json
app.use(bodyParser.json())
const Datastore = require("nedb");
const databse = new Datastore("databse.db");
databse.loadDatabase();

// app.listen(8000, () => console.log("Server is running up !"));
app.listen(process.env.PORT || 3000, ()=> {

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

app.post('/register', (req,res) => {
  databse.insert(req.body, (err,data) => {
    if(!err){
      res.status(200);
      res.send({
        message:"Thank you for creating account !"
      })
    }
    else {
      res.status(500);
      res.send({
        message:"Server error !"
      })
    }
  })
})
