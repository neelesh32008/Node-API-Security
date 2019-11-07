const express = require("express");
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
const logger = require('morgan');
const user = require('./routes/user.route');
const jwt = require('jsonwebtoken');
var multer = require('multer');




const app = express();

mongoose.connect("mongodb://localhost:27017/authDB",{ useNewUrlParser: true ,useUnifiedTopology: true } );
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/User', user);
app.set('secretKey', 'nodeRestApi');
app.use(logger('dev'));

app.use('/auth',validateUser, user)

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        console.log()
        next();
      }
    });
    
  }
  // express doesn't consider not found 404 as an error so we need to handle 404 explicitly
  // handle 404 error
  app.use(function(req, res, next) {
   let err = new Error('Not Found');
      err.status = 404;
      next(err);
  });
 // handle errors
  app.use(function(err, req, res, next) {
   console.log(err);
   
    if(err.status === 404)
     res.status(404).json({message: "Not found"});
    else 
      res.status(500).json({message: "Something looks wrong :( !!!"});
  });

  app.listen(3001,function(){
    console.log("server started on port 3001.");
  });