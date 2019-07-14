const bcrypt = require('bcrypt')

const saltRounds = 10

getUsersList = (req, res, next) => {
  req.models.Users.find().then((users) => {
    return res.send(users)
  }).catch((error) => {
    next(error)
  })
}

signUpUser = (req, res, next) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.models.Users.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        job_title: req.body.job_title,
        priority: req.body.priority,
        status: true
      }).then((user) => {
        return res.status(201).send(user)
      }).catch((error) => {
        next(error)
      })
    })
  })
}

signInUser = (req, res, next) => {
  req.models.Users.findOne({
    email: req.body.email
  }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result == true) {
          res.send(`${user.name} successfully logged in:)`)
        } else {
          // res.send(`You entered wrong password?`)
          return res.send({
            success: false,
            message: 'You entered wrong password?'
          })
        }
      })
    } else {
      return res.send({
        success: false,
        message: '${req.body.email} not exists!'
      })
      // return res.send(`${req.body.email} not exists!`)
    }
  })
}

signOutUser = (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err)
      } else {
        return res.send(`Logout successful:)`)
      }
    })
  }
}

updateUserById = (req, res, next) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.models.Users.updateOne({
        _id: req.params.id
      }, {
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
    })
  })
}

removeUserById = (req, res, next) => {
  req.models.Users.findByIdAndDelete({
    _id: req.params.id
  }).then((user) => {
    if (user) {
      return res.status(200).send(`${user.name} has been removed.`)
    }
    res.sendStatus(204)
  }).catch((error) => {
    next(error)
  })
}

module.exports = {
  getUsersList,
  signUpUser,
  signInUser,
  signOutUser,
  updateUserById,
  removeUserById
}
