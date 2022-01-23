const mongoose = require('mongoose');
let mongoDB = 'mongodb://127.0.0.1/names';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Define schema
var Schema = mongoose.Schema;
var SomeModelSchema = new Schema({
  name: String,
});
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
module.exports =SomeModel