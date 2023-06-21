const jwt = require('jsonwebtoken');
const db_con = require('../config/database.config')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bycrypt=require('bcrypt');
const auth=require('../middleware/auth');



function generateToken(email, passwordString) {
  let u = {

    email: email,
    passwordString: passwordString,
  }

  return jwt.sign(u, "ABCDEF$123", {
    expiresIn: "2h",

  });

}
function verifyToken(token) 
{
  let isVerify = jwt.verify(token, "ABCDEF$123");
  console.log("===== isVerify :: ", token, isVerify);
  return verifyToken;
} 




  module.exports = {
    generateToken,
    verifyToken
  }