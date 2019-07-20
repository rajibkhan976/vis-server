getUnapprovedMembers = (req, res, next) => {
  req.models.registeredMembers.find().then((members) => {
    return res.send(members)
  }).catch((error) => {
    next(error)
  })
}

registerMembers = (req, res, next) => {
  req.models.registeredMembers.create({
    term: req.body.term,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    email: req.body.email,
    phone_no: req.body.phone_no,
    time_stamp: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    nationality: req.body.nationality,
    dietary_preference: req.body.dietary_preference
  }).then((member) => {
    return res.status(201).send(member)
  }).catch((error) => {
    next(error)
  })
}

let sd = require('silly-datetime')

module.exports = {
  getUnapprovedMembers,
  registerMembers
}