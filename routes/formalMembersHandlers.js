getFormalMembers = (req, res, next) => {
  req.models.formalMembers.find().then((members) => {
    return res.send(members)
  }).catch((error) => {
    next(error)
  })
}

approveMembers = (req, res, next) => {
  req.models.formalMembers.create({
    ESNcard_no: req.body.ESNcard_no,
    term: req.body.term,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    email: req.body.email,
    phone_no: req.body.phone_no,
    time_stamp: req.body.time_stamp,
    nationality: req.body.nationality,
    dietary_preference: req.body.dietary_preference
  }).then((member) => {
    return res.status(201).send(member)
  }).catch((error) => {
    next(error)
  })
}

updateMemberById = (req, res, next) => {
  req.models.formalMembers.updateOne({
    _id: req.params.id
  }, {
    ESNcard_no: req.body.ESNcard_no,
    term: req.body.term,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    email: req.body.email,
    phone_no: req.body.phone_no,
    time_stamp: req.body.time_stamp,
    nationality: req.body.nationality,
    dietary_preference: req.body.dietary_preference
  }, {
    new: true,
    upsert: true,
    runvalidators: true
  }).then((status) => {
    if (status.upserted) {
      res.status(201)
    } else if (status.nModified) {
      res.status(200)
    } else {
      res.status(204)
    }
    res.send()
  }).catch((error) => {
    next(error)
  })
}

module.exports = {
  getFormalMembers,
  approveMembers,
  updateMemberById
}