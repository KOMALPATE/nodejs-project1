const jwt = require('jsonwebtoken');
const { verifyToken } = require('../services/jwt');


const requireauth = async (req,res,next) => {
    const token = req.headers["authorization"];
    console.log("-----token :: ",token);
    try {
      let isVerify = verifyToken(token);
      //console.log(isVerify,"::isVerify")
      if(isVerify){
        next();
      }
      else{
       return res.json({
         status: 403,
         message:'user unauthorised'
       })
      }
    } catch (error) {
      return res.json({
        status: 403,
        message:'Session Expired'
      })
    }

}
// const requireauth=async(req,res,next)=>{
//   if(!req.headers.authorization){
//     return res.status(400).send({
//       message:"your:::::",
//     });
//   }
//   try{
//     const token = req.headers.authorization;

//     let isVerify=verifyToken(token);
//     console.log(isVerify,"isverify");
//     next();
//   }catch(err){
//     return res.status(400).send({
//       message:"your:::::",
//     });
//   }

// }


module.exports = { requireauth }