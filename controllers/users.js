
const express=require('express');
const app=express()
const db_con = require('../config/database.config')
const { encrypt, compare } = require('../services/bycrypt');
const jwtToken =require('../services/jwt');
const saltRounds = 10;
const user=express();
const jwt=require('jsonwebtoken');
const { token } = require('morgan');
const multer=require('multer');
//const{ transporter,mailOptions}=require('../services/sendemail');
//const randombytes=require('randombytes');

let userController = {};

 
userController.getUsers = function(req,res){
  let sqlQuery='select * from user';
  db_con.query(sqlQuery,function(err,result){
      if(err)throw err;
      console.log("record display",result);
      res.send(result);
  });
  
};
userController.searchdata=function(req,res){
  let q=[req.params.user];
  console.log(q);
  let sqlQuery='select first_name from user where first_name LIKE "%'+req.params.user+'%" ';
  db_con.query(sqlQuery,function(err,result){
    if(err)throw err;
   // console.log("serchdata",result);
    res.send(result);
  });
};

userController.searcdata1=function(req,res){
  //let fetchStatus=req.params.Status;
  console.log(typeof req.params.fetchStatus)
  db_con.query(`select * from user where Status='${req.params.fetchStatus}'`,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
 
   
};




 userController.insertuser= async function(req,res){
   let user =req.body;
   const { email, password } = req.body;
   //console.log("====user.book_name :: ", user.book_name);
   //console.log("=====user.book_price::",user.book_price);
  user.password =  encrypt(user.password)
  console.log("::::::::::::::::::::;user:::::::::::::",user);
  
  let tokenGenerate=jwtToken.generateToken(email,password);
  console.log(tokenGenerate,":::tokenGenerate");
    res.send(tokenGenerate);
    let sqlQuery = `INSERT INTO user(first_name, last_name, email, password,Status) VALUES('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}','${user.Status}');`
   
  
    db_con.query(sqlQuery,function(err,result){
    if(err)throw err;
    console.log("1 record inserted",result);
    res.send(result);
        
      });
      
      
  // });
   
};
userController.verifyToken=async function(req,res)
{
 const token = req.body;
 let tokenverify=jwtToken.verifyToken(token);
  console.log(tokenverify,"::::::::::::hi:::");
  let sqlQuery = `INSERT INTO user(first_name, last_name, email, password) VALUES('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}');`
  db_con.query(sqlQuery,function(err,result){
    if(err)throw err;
    console.log("1 record inserted",result);
    res.send(result);
    return jwt.verifyToken(token,'ABCDEF$123',{
      expiresIn:"2h",
    });
  }); 
}



userController.chnageUserPassword = async function (req, res) {
  let user = req.body;
  let  password  = req.body;
   let findUserQuery = `Select * from user where user_id= '${user.user_id}' `;
  db_con.query(findUserQuery, async function (err, result) {
     if (err) throw err;
    console.log("get record", result,result[0]);
    user.new_password =  encrypt(user.new_password)
    console.log("::::::::::::::::::::",user);
   let check =  compare(user.old_password, result[0].password)
    console.log("check", check);
    if (result.length > 0 && check == true) {
      user.new_password =  encrypt(user.new_password)
      console.log("user", user);
      let sqlQuery = `UPDATE user SET password = '${user.new_password}' WHERE user_id = '${user.user_id}';`

      db_con.query(sqlQuery, function (err, data) {
        if (err) throw err;
        console.log("1 record inserted", data);
        res.send(result);
      });
    }

  });

};

userController.forgetpassword = async function (req, res) {
  const user = req.body;
  const email = req.body.email;
  let sqlQuery = `SELECT * FROM user WHERE email ='${email}'`;
  db_con.query(sqlQuery, async function (err, result) {
   if (err) throw err;
   console.log("get record",result[0]);
    user.new_password =  encrypt(user.new_password)
       console.log("::::::::::::::::::::",user);
        let check =  compare(user.confirm_password, result[0].password)
     console.log("check", check);
    if (result.length == 1 && check == true) {
      user.confirm_password =  encrypt(user.confirm_password)
       console.log("::::::::::::::::::::",user);
       let sqlQuery=`UPDATE user set password='${user.new_password}'WHERE email='${user.email}'`;
       db_con.query(sqlQuery,function(err,data){
        if(err)throw err;
      console.log("forgetpassword",data);
      res.send(result);
      
      })
    }
   });
  };

 userController.verifytoken = async function (req, res) {
 // const user = req.body;
  const email = req.header['Authentication']
  let sqlQuery= `select * from user where email='${email}'`;
  db_con.query(sqlQuery, async function (err, result) {
    if(err)throw err;
         //console.log("record display",result[0]);
         console.log("record display",result);
         // //         res.send(result);
         res.send(result);


});
}






userController.update=function(req,res){
    let sqlQuery='UPDATE `user` '+
                  'SET `user_id` = ? where ';
    const values = ['1'];              
  
    db_con.query(sqlQuery,values,(err,result)=>{          
      if(err)throw err;{
        console.log("update record ",result);
            res.send(result);
       
      }
    });
    db_con.end();
};
userController.delete=function(req,res){
  let sqlQuery='DELETE FROM product1';
  db_con.query(sqlQuery,(err,result)=>{
    if(err)throw err;{
      console.log("deleteuser",result);
      res.send(result);
    }

  })
};

module.exports = userController;