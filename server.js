const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const routes = require('./Router/router');
// parse application/json
app.use(bodyParser.json());
const Datastore = require("nedb");
const databse = new Datastore("databse.db");
databse.loadDatabase();
app.use(express.static("public"));

// app.listen(8000, () => console.log("Server is running up !"));
app.listen(process.env.PORT || 8000, (req, res) => {});

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// register new user
app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (!err) {
      const newUser = {
        first_name: req.body.first_Name,
        last_name: req.body.last_Name,
        password: hash,
        email: req.body.user_Email,
        message: req.body.message,
        newuser: req.body.newUser,
      };
      databse.insert(newUser, (err, data) => {
        if (data) {
          res.send({
            status: 200,
            message: "User has been successfully registerd",
            data: newUser
          });
        } else {
          res.send({
            status: 500,
            message: "Internal server error",
          });
        }
      });
    }
  });
});

//login user
app.post('/login', (req,res) => {
  //fining email in data bsae
  databse.find({email: req.body.email}, (err, data) =>{
   if(data){
      //now match password 
    bcrypt.compare(req.body.password, data[0].password, function(err, result) {
      if(result) {
        // Passwords match
        res.send({
          "status" : "success",
          email : req.body.email,
          password: data[0].password
        })
       } else {
        // Passwords don't match
        res.send({
         "status" : "failed",
         message:"password incorrect !"
       })
       } 
    });
   }
   else {
     res.send('wrong')
   }
});
})

