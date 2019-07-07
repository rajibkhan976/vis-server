getTemporaryMembers = (req, res, next) => {
  req.models.temporaryMembers.find().then((members) => {
    return res.send(members);
  }).catch((error) => {
    next(error);
  })
}

registerTemporaryMembers = (req, res, next) => {
  req.models.temporaryMembers.create({
    t_no: req.body.t_no,
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
    return res.status(201).send(member);
  }).catch((error) => {
    next(error);
  })
}

updateTemporaryMemberById = (req, res, next) => {
  req.models.temporaryMembers.updateOne({ _id: req.params.id }, {
    t_no: req.body.t_no,
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
      res.status(201);
    } else if (status.nModified) {
      res.status(200);
    } else {
      res.status(204);
    }
    res.send();
  }).catch((error) => {
    next(error);
  })
}

removeTemporaryMemberById = (req, res, next) => {
  req.models.temporaryMembers.findByIdAndDelete({ _id: req.params.id}).then((member) => {
    if (member) {
      return res.status(200).send(`${member.first_name} has been removed.`);
    }
    res.sendStatus(204);
  }).catch((error) => {
    next(error);
  })
}

module.exports = {
  getTemporaryMembers,
  registerTemporaryMembers,
  updateTemporaryMemberById,
  removeTemporaryMemberById
};
