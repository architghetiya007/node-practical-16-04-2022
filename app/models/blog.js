let mongoose = require('mongoose');
const Schema = mongoose.Schema

let blogSchema = new mongoose.Schema({
//   _id:{
//     type: String,
//   },  
  title: {
    type: String
  },
  userId: {
    type:Schema.Types.ObjectId
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  status: {
    type: String
  },
});

module.exports = mongoose.model('blog', blogSchema);