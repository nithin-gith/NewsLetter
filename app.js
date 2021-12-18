
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https');
const res = require('express/lib/response');
const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/", function(req, res) {
  //res.send("Server is up and running at port 3000");
  res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res) {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.eMail;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
        
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/f784acc963";
  const options = {
    method: "POST",
    auth: "Nithin Siriguppa:f5e1b56498278d372bd8aa01f7c0ea8c-us20"
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
          res.sendFile(__dirname+"/failure.html");
        }
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});
app.post("/failure",function(){
  res.redirect("/");
})

app.listen(3000, function(req, res) {
  console.log("Listening to port 3000");
});

// API Key : f5e1b56498278d372bd8aa01f7c0ea8c-us20
// List Id : f784acc963