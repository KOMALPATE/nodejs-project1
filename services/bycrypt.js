
//password...
const bcrypt = require('bcrypt');
const saltRounds = 10;
let Password = "tisha123";
let Password1= "komal123";

 function encrypt(passwordString){
    const salt =  bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(passwordString, salt);
}

function compare(passwordString, hash){
    return bcrypt.compareSync(passwordString, hash); // true
}


module.exports = {
    encrypt,
    compare
}