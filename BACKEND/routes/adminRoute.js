import express from "express"
import { addDoctor,adminDashboard,allDoctors,appointmentCancel,appointmentsAdmin,loginAdmin } from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js"
import { changeAvailabilty } from "../controllers/doctorController.js"

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctor',authAdmin,allDoctors)
adminRouter.post('/change-availability',changeAvailabilty)
adminRouter.get('/appointments',appointmentsAdmin)
adminRouter.post('/cancel-appointment',appointmentCancel)
adminRouter.get('/dashboard',adminDashboard)
export default adminRouter;