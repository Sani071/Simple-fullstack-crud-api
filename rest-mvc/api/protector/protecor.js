const jwt = require("jsonwebtoken")
const auth= (req,res,next)=>{
    try{
   const token = req.headers.authorization.split(' ')[1]
   const decoded = jwt.verify(token,'shaan',{})
   console.log(decoded)
   
   next()
   
    } catch (error){
           res.json({
               msg:"Auth failed"
           })
    }
}
module.exports = auth