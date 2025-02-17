import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({

    _id:{type: String},
    name: {type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String, required: true},
})


AdminSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
});

function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'ADM-' + Math.floor(Math.random() * 10000);
}


export default mongoose.model('Admin', AdminSchema);