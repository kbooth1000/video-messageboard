const Validator = require('validator');
const isEmpty = require('./is-empty');

function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 45 })){
    errors.name = 'Name must be between 2 and 45 characters.'
  } 
  data.name = isEmpty(data.name) ? '' : data.name;
  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;
  data.password2 = isEmpty(data.password2) ? '' : data.password2;

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Please enter your name.'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please enter your email address.'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please enter a password.'
  }
  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must be at least 6 and no more than 30 characters.'
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Please enter a password.'
  }
  if (!Validator.equals(data.password,data.password2)) {
    errors.password2 = 'Passwords must match.'
  }

  return {
    errors, isValid: isEmpty(errors)
  }
}

module.exports = validateRegisterInput;