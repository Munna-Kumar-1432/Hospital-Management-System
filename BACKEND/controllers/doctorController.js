import doctotModel from "../models/doctorModel.js";

const changeAvailabilty = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctotModel.findById(docId)
        await doctotModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctotModel.find({}).select('-password -email');
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { changeAvailabilty, doctorList }