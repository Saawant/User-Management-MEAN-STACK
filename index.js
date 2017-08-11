var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var app = express()
var url = 'mongodb://localhost:27017/' + process.argv[2];
var table = process.argv[3]
app.use(bodyParser.json());


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
  app.listen(process.argv[4], function () {
    console.log('App listening on port ' + process.argv[4] + "!")
  })
});


app.post('/signup', function (request, response) {
  if(!request.body.username  || !request.body.name  || !request.body.password  || !request.body.email  ||  !request.body.dob  || request.body.username == '' || request.body.name == '' || request.body.password == '' || request.body.email == '' || reques.body.dob == ''){
    response.send('All fields are mandatory')
    return;
  }
  hash = bcrypt.hashSync(request.body.password, 10);
  MongoClient.connect(url, function(err, db) {
    db.collection(table).insertOne({
      'username' : request.body.username,
      'name'     : request.body.name,
      'password' : hash,
      'email'    : request.body.email,
      'dob'      : reques.body.dob
    }, function(err, result) {
      assert.equal(err, null);
      response.send('Signup successful')
      db.close()
    });
  })
})

app.post('/login', function (request, response) {
  console.log(request.body);
  if(!request.body.username  || !request.body.password  || request.body.username == '' || request.body.password == ''){
    response.send('All fields are mandatory')
    return;
  }
  MongoClient.connect(url, function(err, db) {
    db.collection(table).findOne({ "username": request.body.username },function(err, user) {
      assert.equal(err, null);
      console.log(user);
      if(user == null){
        response.send('Username not found.')
      }
      else{
        if(bcrypt.compareSync(request.body.password, user.password)) {
         // Passwords match
         response.send('Login successful')
        } else {
         // Passwords don't match
         response.send('Wrong Password.')
        }
      }
    });
  })
})




app.get('/users/:userName',function(request,response){
  MongoClient.connect(url, function(err, db) {
    db.collection(table).findOne({ "username": request.params.userName },function(err, user) {
      if(user == null){
        response.send('User not found.')
      }
      else {
        response.send(JSON.stringify({
          'username': user.username,
          'email'   : user.email,
          'name'    : user.name,
          'dob'     : user.dob
        }));
      }
    })
  })
})


app.post('/updateInfo', function (request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection(table).updateOne(
      { 'username' : request.body.username },
      {
        $set: {
          'name'     : request.body.name,
          'email'    : request.body.email,
          'dob'      : request.body.dob,
        },
        $currentDate: { "lastModified": true }
      }, function(err, result) {
      assert.equal(err, null);
      response.send('Profile updated successfully')
      db.close()
    });
  })
})
