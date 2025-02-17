import express from 'express';
import bcrypt from 'bcrypt'
import Instructor from '../Model/Instructor.js'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password, phone, address, aid } = req.body;

    try {
        // Check if an admin with the same email already exists
        const existingAdmin = await Instructor.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Instructor with this email already exists' });
        }

        // If the email is unique, create a new instructor
        const instructor = new Instructor({
            name,
            email,
            phone,
            address,
            password: await bcrypt.hash(password, 10),
            aid
        });

        const newInstructor = await instructor.save();
        res.status(201).json(newInstructor);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const instructor = await Instructor.findOne({ email });
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, instructor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { _id, name, role } = instructor;
        const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

        return res.status(200).json({ id: _id, name, role, token, status: true, message: 'Login success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const instructor = await Instructor.find();
        res.status(200).json(instructor);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const instructor = await Instructor.findById(id);
        res.status(200).json(instructor);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address,password } = req.body;
    try {
        const instructor = await Instructor.findById(id);
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        instructor.name = name;
        instructor.email = email;
        instructor.phone = phone;
        instructor.address = address;
        // instructor.password = await bcrypt.hash(password, 10);
        const updatedInstructor = await instructor.save();
        res.status(200).json(updatedInstructor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const instructor = await Instructor.findByIdAndDelete(id);
        res.status(200).json(instructor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
export default router;

