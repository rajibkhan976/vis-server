const mongoose = require("mongoose");

const userCredentialsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validator: (v) => {
      return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  job_title: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  }
});

const Users = mongoose.model('Users', userCredentialsSchema);

module.exports = Users;
