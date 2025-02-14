import validator from "validator";
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary";
import doctotModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
dotenv.config();
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, experience, speciality, degree, about, fees, address } = req.body;
        const image = req.file;
        if (!name || !email || !password || !experience || !speciality || !degree || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details !!" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email !!" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password !!" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //   upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashPassword,
            speciality,
            about,
            degree,
            experience,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }
        const newDoctor = new doctotModel(doctorData);
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added !!", newDoctor })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API FOR ADMIN LOGIN

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email: email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid Credentials !!' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API TO GET ALL DOCTORS list ADMIN-PANNEL
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctotModel.find({}).select('-password');
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API TO GET ALL APPOINTMENT LIST

const appointmentsAdmin = async(req,res)=>{
    try {
        const appointments = await appointmentModel.find({});
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//CANCEL APPOINTMENT

const appointmentCancel = async(req,res)=>{
    try {
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId) 
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancel:true})
 
        const {docId,slotDate,slotTime} = appointmentData;
        const doctorData = await doctotModel.findById(docId)
        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e=>e !== slotTime)
        await doctotModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment Cancelled !!"})
     } catch (error) {
         console.log(error)
         res.json({ success: false, message: error.message }) 
     } 
}


// API TO GET DASHBOARD DATA

const adminDashboard = async(req,res)=>{
    try {
       const doctors = await doctotModel.find({});
       const users = await userModel.find({})
       const appointment = await appointmentModel.find({})
       
       const dashData = {
        doctors:doctors.length,
        appointment:appointment.length,
        patients:users.length,
        latestAppointments:appointment.reverse().slice(0,5)

       }
       res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

export { addDoctor, loginAdmin, allDoctors ,appointmentsAdmin,appointmentCancel,adminDashboard}