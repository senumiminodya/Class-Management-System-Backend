import express from 'express';
import Class from '../Model/Instructor_Class.js';


const router = express.Router();


router.post('/', async (req, res) => {
    const { subject, class: className, IID } = req.body;

    try {
        const newClass = new Class({
            subject,
            class: className,
            IID
        });

        const savedClass = await newClass.save();
        res.status(201).json(savedClass);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { subject, class: className, IID } = req.body;

    try {
        const updatedClass = await Class.findByIdAndUpdate(id, { subject, class: className, IID }, { new: true });
        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const class_ = await Class.findById(req.params.id);
        res.json(class_);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        res.json(deletedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all the classes of a particular instructor

router.get('/instructor/:IID', async (req, res) => {
    try {
        const classes = await Class.find({ IID: req.params.IID });  //find all the classes with the given IID
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;