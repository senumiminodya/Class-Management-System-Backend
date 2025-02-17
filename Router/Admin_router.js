import express from 'express';
import bcrypt from 'bcrypt'
import Admin from '../Model/Admin.js'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if an admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin with this email already exists' });
        }

        // If the email is unique, create a new admin
        const admin = new Admin({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role: 'admin'
        });

        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { _id, name, role } = admin;
        const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

        return res.status(200).json({ id: _id, name, role, token, status: true, message: 'Login success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const admin = await Admin.findById(id);
        admin.name = name;
        admin.email = email;
        admin.password = await bcrypt.hash(password, 10);
        const updatedAdmin = await admin.save();
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});
export default router;