import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"data:image/png;base64,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"
    },
    address:{
        type:Object,
        default:{line1:'',line2:''}
    },
    gender:{
        type:String,
        default:"Not Selected !!"
    },
    dob:{
        type:String,
        default:"Not Selected !!"
    },
    phone:{
        type:String,
        default:"0000000"
    }
})


const userModel =mongoose.models.user || mongoose.model('user',userSchema)
export default userModel