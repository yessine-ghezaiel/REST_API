const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    required: [true, ' add your last name please.'],  
    type:String},
  last_name: {
    required: [true, ' add your last name please.'],
    type: String,
  },
  age: {
    type: Number,
    required: [true, 'Enter you age please.'],
  },
  
});

const user = mongoose.model('person', userSchema);
module.exports = user;
