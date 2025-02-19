import mongoose from "mongoose";

const InstructorClassSchema = new mongoose.Schema({
    _id: { type: String },
    subject: { type: String, required: true },
    class: { type: String, required: true },
    IID: { type: String, required: true }
})

InstructorClassSchema.pre("save", function (next) {
    if (!this._id) {
        this._id = generateCustomId();
    }
    next();
});

function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return "CLS-I-" + Math.floor(Math.random() * 10000);
}

export default mongoose.model("InstructorClass", InstructorClassSchema);