const mongoose = require('mongoose')

const registeredMembersSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    trim: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  date_of_birth: {
    type: Date,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validator: (v) => {
      return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    }
  },
  phone_no: {
    type: String,
    required: true,
    trim: true
  },
  time_stamp: {
    type: Date,
    default: Date.now
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  dietary_preference: {
    type: String,
    required: true,
    trim: true
  }
})

const registeredMembers = mongoose.model('registeredMembers', registeredMembersSchema)

module.exports = registeredMembers
