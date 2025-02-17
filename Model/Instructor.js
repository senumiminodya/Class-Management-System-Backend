import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "instructor" },
    aid: { type: String, required: true },
    },
    { timestamps: true }
);

InstructorSchema.pre("save", function (next) {
    if (!this._id) {
        this._id = generateCustomId(); // Replace with custom ID generation logic
    }
    next();
});

function generateCustomId() {
    
    return "INS-" + Math.floor(Math.random() * 10000);
}

export default mongoose.model("Instructor", InstructorSchema);