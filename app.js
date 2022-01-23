const express = require('express')
const app = express()
const port = 3000

const path=require('path')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var auth_path = require('./routes/authority.js');
var  delete_path= require('./routes/delete.js');

app.use('/post',urlencodedParser, auth_path);
app.use('/delete_user',urlencodedParser, delete_path);
      
 app.get('/', (req, res) => {
 var htmlpath = path.join(__dirname,'/staticfiles/','index.html')
 res.sendFile(htmlpath);
  })
          
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})