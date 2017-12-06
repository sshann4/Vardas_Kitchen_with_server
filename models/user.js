const mongoose = require('mongoose'); // import mongoose
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if(!email){
    return false;
  }else{
    if(email.length < 5 || email.length > 30 ){
      return false;
    } else {
      return true;
    }
  }
};

let validEmailChecker = (email) => {
  if(!email){
    return false;
  }else{
    // Regular expression to test for a valid e-mail
   const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   return regExp.test(email); // Return regular expression test results (true or false)
  }
};

const emailValidators = [
  {
    validator: emailLengthChecker, message: 'Email must be at least 5 ch and no more then 30 ch'
  },
  // Second Email Validator
  {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
  }
]

// Validate Function to check username length
let usernameLengthChecker = (username) => {
  // Check if username exists
  if (!username) {
    return false; // Return error
  } else {
    // Check length of username string
    if (username.length < 3 || username.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

// Validate Function to check if valid username format
let validUsername = (username) => {
  // Check if username exists
  if (!username) {
    return false; // Return error
  } else {
    // Regular expression to test if username format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username); // Return regular expression test result (true or false)
  }
};

// Array of Username validators
const usernameValidators = [
  // First Username validator
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15'
  },
  // Second username validator
  {
    validator: validUsername,
    message: 'Username must not have any special characters or spaces'
  }
];

// Validate Function to check password length
let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format
let validPassword = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};

// Array of Password validators
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  // Second password validator
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];
// ----------------------------creates model's schemas--------------------------------------------------
const user_schema = new Schema({
  email: {type: String, required: true, unique: true, lowercase: true , validate: emailValidators },
  username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
  password: {type: String, required: true,  validate: passwordValidators}
});//sub schema


// userSchema.pre('save',function(next){
//     if(!this.isModified('password'))
//     return next();
//
//     bcrypt.hash(this.passwors,null,null, (err,hash) => {
//       if(err) return next(err);
//       this.password = hash;
//       next();
//     });
// });

// userSchema.methods.comparePasswords = (password) => {
//   return bcrypt.compareSync(password, this.password); //return true or false
// }
// ----------------------------creates the model in ths DB--------------------------------------------------
module.exports = mongoose.model('User', user_schema);//the schema structure, what is the records structure? recipe-the name of the
