import express from 'express';
import Student_class from '../Model/Student_Class.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { subject, class: className, SID } = req.body;

    try {
        const newClass = new Student_class({
            subject,
            class: className,
            SID
        });

        const savedClass = await newClass.save();
        res.status(201).json(savedClass);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const classes = await Student_class.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await Student_class.findById(id);
        res.status(200).json(classes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { subject, class: className, SID } = req.body;
    try {
        const classes = await Student_class.findById(id);   //find the class with the given id
        if (!classes) {
            return res.status(404).json({ message: 'Class not found' });
        }
        classes.subject = subject;
        classes.class = className;
        classes.SID = SID;
        const updatedClass = await classes.save();
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClass = await Student_class.findByIdAndDelete(id);  //find the class with the given id and delete it
        res.json(deletedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get all the classes of a particular student
router.get('/SID/:SID', async (req, res) => {
    const { SID } = req.params;
    try {
        const classes = await Student_class.find({ SID });
        res.status(200).json(classes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//get all the class and subjects according to class and subject
router.get('/class/:class/subject/:subject', async (req, res) => {
    const { class: className, subject } = req.params;
    try {
        const classes = await Student_class.find({ class: className, subject });
        res.status(200).json(classes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
export default router;