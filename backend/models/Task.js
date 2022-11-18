import mongoose from "mongoose";

const JanitorTaskSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    }
}, {
    timestamps: true
})
 
const JanitorTask = mongoose.model('JanitorTask', JanitorTaskSchema)

export default JanitorTask;