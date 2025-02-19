import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "student" },
    IID:    { type: String, required: true },
});

studentSchema.pre("save", function (next) {
    this._id = this.email;
    next();
});



export default mongoose.model("Student", studentSchema);