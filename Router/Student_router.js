import express from 'express';
import bcrypt from 'bcrypt'
import Student from '../Model/Student.js'
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password, phone, address , IID } = req.body;

    try {
        // Check if an admin with the same email already exists
        const existingAdmin = await Student.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Student with this email already exists' });
        }

        // If the email is unique, create a new student
        const student = new Student({
            name,
            email,
            phone,
            address,
            IID,
            password: await bcrypt.hash(password, 10)   //hash the password
        });

        const newStudent = await student.save();
        res.status(201).json(newStudent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const student = await Student.find();
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { _id, name, role } = student;
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
    const { name, email, phone, address } = req.body;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        student.name = name;
        student.email = email;
        student.phone = phone;
        student.address = address;
        // student.password = await bcrypt.hash(password, 10);
        const updatedStudent = await student.save();
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
export default router;