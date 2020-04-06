const express = require("express");
const app = express();
const Datastore = require("nedb");
const databse = new Datastore("databse.db");
databse.loadDatabase();
//app.listen(3000, () => console.log("Server is running up !"));
app.listen(process.env.PORT || 3000, listen);
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('col-draw app listening at http://' + host + ':' + port);
}

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


app.get("/", (req, res) => {
  
  res.send("hello world");
  
});
//get all colors
app.get("/colors/all", (req, res) => {
  databse.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

//create colros with filter
app.get("/colors/:name", (req, res) => {
  const data = req.params;
  databse.find({ color: data.name }, (err, data) => {
    res.send(data);
  });
});

//add color route
app.get("/colors/add/:color/:score?", (req, res) => {
  const data = req.params;
  if (!data.score) {
    res.send({
      message: "score is missing !",
    });
  } else {
    databse.insert(data, (err, data) => {
      if (!err) {
        res.send({
          message: "Thanks for add new color",
          color: data.color,
          score: data.score,
        });
        res.end();
      }
    });
  }
});
