import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    _id: { type: String },
    subject: { type: String, required: true },
    class: { type: String, required: true },
    message: { type: String, required: true },
    IID: { type: String, required: true }
},{timestamps:true});

messageSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
});

function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'MSG-' + Math.floor(Math.random() * 10000);
}

export default mongoose.model('Message', messageSchema);




