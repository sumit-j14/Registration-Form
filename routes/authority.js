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
// Define schema
var Schema = mongoose.Schema;
var SomeModel = require(path.join(__dirname,'..','/db/','user_model.js'))

router.post('/',urlencodedParser, (req, res)=>{

  console.log(__dirname);
  console.log("postrequest activated");
  console.log(req.body.name_field);
  var lookup=req.body.name_field;
  //database work

  SomeModel.findOne( {name:lookup}, function (err, result) {
    if (err) { 
           console.log("some error occured");
       }  
      if(result){ 
            console.log("talking about "+lookup);
            console.log("User exists")
            let alreadyexistpath = path.join(__dirname,'..','/staticfiles/','overflow.html')
            res.sendFile(alreadyexistpath , err=>{
              if(err)
              console.log(err);
            });
        }
        else{
              console.log("entering new");
              var awesome_instance = new SomeModel({ name: lookup });
  
              awesome_instance.save();
              let htmlpath =  path.join(__dirname,'..','/staticfiles/','registerednew.html')
              res.sendFile(htmlpath);
          }
      })
  })

module.exports = router;