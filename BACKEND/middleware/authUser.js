import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const authUser = async (req, res, next) => {
    try {
        console.log(req.headers)
        // const authHeader = req.headers.authorization;
        const {token}  = req.headers;
        // console.log("Authorization Headedddddr:", authHeader);

        // if (!authHeader) {
        //     return res.json({ success: false, message: "Not Authorized Login Here !!!" });
        // }

        // const token = authHeader.split(' ')[1];
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Here !!!" });
        }
        console.log("JWT Secret:", process.env.JWT_SECRET);

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id
        console.log("Decoded Token:", token_decode);
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser