const express = require('express'),
      router = express.Router();
const bodyParser = require('body-parser')
const path=require('path')
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
let mongoDB = 'mongodb://127.0.0.1/names';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;
var SomeModel = require(path.join(__dirname,'..','/db/','user_model.js'))

router.post('/',urlencodedParser, (req, res)=>{

  var htmlpath = path.join(__dirname,'..','/staticfiles/','deletesuccessful.html')
  console.log("attempting delete");
  var lookup=req.body.name_field;
  //database work
  SomeModel.findOne( {name:lookup}, function (err, result) {
    if (err) { 
           console.log("some error occured");
       }  
      if(result){ 
        SomeModel.deleteOne( {name:lookup}, function (err, result) {
          if (err) { 
                 console.log("some error occured");
                 res.sendFile(htmlpath);
             }  
          else{
            console.log("deleted entry named "+lookup);
            res.sendFile(htmlpath);
          }
            })
        }
        else{
              console.log("NO ENTRY EXIST , CAN'T DELETE");
              htmlpath = path.join(__dirname,'..','/staticfiles/','underflow.html')
              res.sendFile(htmlpath);
              
          }
      })
  
  
  // res.sendFile(htmlpath);
  })

module.exports = router;