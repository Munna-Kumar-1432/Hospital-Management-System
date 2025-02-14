import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    const [doctors, setDoctors] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendURL + '/api/admin/all-doctor', {}, { headers: aToken })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const chnageAvailibality = async(docId)=>{
   try {
    const {data} = await axios.post(backendURL+'/api/admin/change-availability',{docId},{headers:{aToken}})
    if (data.success) {
        toast.success(data.message)
        getAllDoctors()
    } else {
        toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
    }

    const getAllAppointments =async()=>{
        try {
           const {data} = await axios.get(backendURL+'/api/admin/appointments',{headers:{aToken}}) 
           if(data.success){
            setAppointments(data.appointments)
            console.log(data.appointments)
           }else{
            toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message) 
        }
    }

    const cancelAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(backendURL+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)  
        }
    }

 const getDashData = async()=>{
    try {
        const {data} = await axios.get(backendURL+'/api/admin/dashboard',{headers:{aToken}})
        if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData)
        }else{
            toast.error(error.message)  
        }
    } catch (error) {
        toast.error(error.message)  
    }
 }

    const value = {
        aToken, setAToken, backendURL,doctors,getAllDoctors,chnageAvailibality,getAllAppointments,appointments,setAppointments,cancelAppointment,getDashData,dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider