var express = require("express");
var basic = require("basic-auth");
var counter = require('./counter');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(process.env.PORT||3000,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Server running on port '+process.env.PORT);
    }
});


app.get('/',function(req,res){
   res.send('Hello'); 
});
var auth = function (req, res, next) {
  function unauthorized(res) {
    return res.sendStatus(401);
  };

  var user = basic(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };
    console.log(user);
  if (user.name === process.env.USERNAME && user.pass === process.env.PASSWORD) {
      req.user=user;
    return next();
  } else {
    return unauthorized(res);
  }
};

app.get('/me',auth,function(req,res){
    var delay= req.query.delay;
    var increment = parseInt(req.query.increment,10);
    console.log(delay,increment);
    var currentCounterValue =counter.getCounterSync();
    var current = counter.setCounterSync(req.user.name,increment,parseInt(currentCounterValue,10));
    
    console.log('counter: '+current);
    setTimeout(function(){
        res.send(JSON.stringify({
        'delay' :delay,
        'currentCounterValue':current,
        'username':req.user.name
    }));
    },delay*1000);
    
});