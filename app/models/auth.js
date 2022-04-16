let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
//   _id:{
//     type: String,
//   },  
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  dob: {
    type: String
  },
  role: {
    type: String
    // 1 - admin 
    // 2 - user  
  }
})

module.exports = mongoose.model('user', userSchema)