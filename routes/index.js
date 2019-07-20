const express = require('express')

const router = express.Router()

const moment = require('moment')

const userHandlers = require('./userHandlers.js')

const registeredMembersHandlers = require('./registeredMembersHandlers.js')

const formalMembersHandlers = require('./formalMembersHandlers.js')

const temporaryMembersHandlers = require('./temporaryMembersHandlers.js')

const formalMembers = require('.././models/formalMembersModel.js')

// routes and methods for managing system users
router.get('/users', userHandlers.getUsersList)
router.post('/signup', userHandlers.signUpUser)
router.patch('/user/:id', userHandlers.updateUserById)
router.delete('/user/:id', userHandlers.removeUserById)
router.post('/signin', userHandlers.signInUser)
router.get('/signout', userHandlers.signOutUser)
// routes and methods for handling VIS members registration
router.get('/unapproved_members', registeredMembersHandlers.getUnapprovedMembers)
router.post('/register_member', registeredMembersHandlers.registerMembers)
// routes and methods for handling approved VIS members
router.get('/approved_members', formalMembersHandlers.getFormalMembers)
router.post('/approve_member', formalMembersHandlers.approveMembers)
router.patch('/update_member/:id', formalMembersHandlers.updateMemberById)
// routes and methods for handling Temporary members registration
router.get('/get_temporary_members', temporaryMembersHandlers.getTemporaryMembers)
router.post('/register_temporary_member', temporaryMembersHandlers.registerTemporaryMembers)
router.patch('/remove_temporary_member/:id', temporaryMembersHandlers.removeTemporaryMemberById)
router.patch('/update_temporary_member/:id', temporaryMembersHandlers.updateTemporaryMemberById)

removeHalfYearMember = () => {
  let currentTime = moment().subtract(6, 'months')
  currentTime = moment.utc(currentTime).format()
  formalMembers.deleteMany({
    time_stamp: {
      $lte: currentTime
    }
  }, (err) => {
    if (err) {
      return console.log('Error while erasing members ' + err)
    }
    // console.log("successfully removed members");
  })
}

removeFullYearMember = () => {
  let currentTime = moment().subtract(1, 'years')
  currentTime = moment.utc(currentTime).format()
  formalMembers.deleteMany({
    time_stamp: {
      $lte: currentTime
    }
  }, (err) => {
    if (err) {
      return console.log('Error while erasing members ' + err)
    }
    // console.log("successfully removed members");
  })
}

// setInterval(removeHalfYearMember, 1000)

// setInterval(removeFullYearMember, 1000)

// routes and methods for handling temporary VIS members
router.get('/temporary_members', temporaryMembersHandlers.getTemporaryMembers)
router.post('/register_temporary_members', temporaryMembersHandlers.registerTemporaryMembers)
router.patch('/update_temporary_members/:id', temporaryMembersHandlers.updateTemporaryMemberById)
router.delete('/delete_temporary_members/:id', temporaryMembersHandlers.removeTemporaryMemberById)

module.exports = router