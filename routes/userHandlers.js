const bcrypt = require('bcrypt');

const saltRounds = 10;

getUsersList = (req, res, next) => {
  req.models.Users.find().then((users) => {
    return res.send(users);
  }).catch((error) => {
    next(error);
  })
}

signUpUser = (req, res, next) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.models.Users.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        job_title: req.body.job_title,
        priority: req.body.priority
      }).then((user) => {
        return res.status(201).send(user);
      }).catch((error) => {
        next(error);
      })
    });
});
}

updateUserById = (req, res, next) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.models.Users.updateOne({ _id: req.params.id },{
          name: req.body.name,
          email: req.body.email,
          password: hash,
          job_title: req.body.job_title,
          priority: req.body.priority
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
    });
});
}

module.exports = {
  getUsersList,
  signUpUser,
  updateUserById
};
