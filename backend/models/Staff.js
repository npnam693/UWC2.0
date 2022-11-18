import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    email: {type: String, trim: true, unique: true, required: true},
    password: {type: String, trim: true, require: true, minLength: 8},
    name: {type: String, required: true, minLength: 5},
    avatar: String,
    department: {type: String, required: true},
    statusTask: {type: String, required: true}

}, {
    timestamps: true
})

 
const Staff = mongoose.model('Staff', StaffSchema)

export default Staff;