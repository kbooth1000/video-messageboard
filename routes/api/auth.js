const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretOrKey = require('../../config/keys').SECRET_OR_KEY;
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

module.exports = router;

// POST api/users/register

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'An account with this email address already exists.'
      return res
        .status(400)
        .json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// POST api/users/login

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }
  const { password, email } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found.'
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(passwordMatches => {
      if (passwordMatches) {
        let { id, name, avatar } = user;
        const payload = { id, name, avatar };
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 10800 },
          (err, token) => {
            if(err){
              res.json(err)
            } else {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
          }
        );
      } else {
        errors.password = 'Incorrect password.'
        return res.status(400).json(errors);
      }
    });
  });
});

// GET api/users/current

router.get('/current', passport.authenticate('jwt', { session : false}), (req, res) => {
  let { name, email, id } = req.user;
  res.json({ name, email, id });
})

module.exports = router;
