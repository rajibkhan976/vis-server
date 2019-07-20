getFormalMembers = (req, res, next) => {
  req.models.formalMembers.find().then((members) => {
    return res.send(members)
  }).catch((error) => {
    next(error)
  })
}

approveMembers = (req, res, next) => {
  req.models.formalMembers.create(
    req.body.list,
    function () {
      for (let i = 0, length = req.body.list; i < length; i++) {
        let item = req.body.list[i]
        item.ESNcard_no = req.body.list[i].ESNcard_no
        item.term = req.body.list[i].term
        item.first_name = req.body.list[i].first_name
        item.last_name = req.body.list[i].last_name
        item.date_of_birth = req.body.list[i].date_of_birth
        item.email = req.body.list[i].email
        item.phone_no = req.body.list[i].phone_no
        item.time_stamp = req.body.list[i].time_stamp
        item.nationality = req.body.list[i].nationality
        item.dietary_preference = req.body.list[i].dietary_preference
      }
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