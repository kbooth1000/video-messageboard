const Validator = require('validator');
const isEmpty = require('./is-empty');

function validatePostInput(data) {
  let errors = {};


  data.text = isEmpty(data.text) ? '' : data.text;

  if(!Validator.isLength(data.text, {min: 2, max: 300})){
    errors.text = 'Post must be between 2 and 300 characters.'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Please enter your comment text.'
  }

  return {
    errors, isValid: isEmpty(errors)
  }
}


module.exports = validatePostInput;