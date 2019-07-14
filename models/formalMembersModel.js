const mongoose = require('mongoose')

const formalMembersSchema = new mongoose.Schema({
  ESNcard_no: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true
  },
  term: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  date_of_birth: {
    type: Date,
    required: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
    validator: (v) => {
      return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    }
  },
  phone_no: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  time_stamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  dietary_preference: {
    type: String,
    required: true,
    trim: true,
    index: true
  }
})

const formalMembers = mongoose.model('formalMembers', formalMembersSchema)

module.exports = formalMembers
