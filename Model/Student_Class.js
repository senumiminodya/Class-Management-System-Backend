import mongoose from "mongoose";

const StudentClassSchema = new mongoose.Schema({
    _id: { type: String },
    subject: { type: String, required: true },
    class: { type: String, required: true },
    SID: { type: String, required: true }
})

StudentClassSchema.pre("save", function (next) {
    if (!this._id) {
        this._id = generateCustomId();
    }
    next();
})

function generateCustomId() {
    return "CLS-S-" + Math.floor(Math.random() * 10000);
}

export default mongoose.model("Student_Class", StudentClassSchema);