import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
// // ADMIN AUTHENTICATION


const authAdmin=async(req,res,next)=>{
   try {

    const {aToken}  = req.headers;
    console.log(aToken)
    if(!aToken){
        return res.json({success:false,message:"Not Authorized Login Here !!!"})
    }

    const token_decode = jwt.verify(aToken,process.env.JWT_SECRET)

    if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ){
        return res.json({success:false,message:"Not Authorized Login Here........ !!"})
    }
    next()

   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }
}

// export default authAdmin;




// const authAdmin = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         console.log("Authorization Header:", authHeader);

//         if (!authHeader) {
//             return res.json({ success: false, message: "Not Authorized Login Here !!!" });
//         }

//         const token = authHeader.split(' ')[1];
//         if (!token) {
//             return res.json({ success: false, message: "Not Authorized Login Here !!!" });
//         }
//         console.log("JWT Secret:", process.env.JWT_SECRET);

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", token_decode);
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

export default authAdmin;
