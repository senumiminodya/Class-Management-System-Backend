import express from 'express';
import Message from '../Model/Message.js'

const router = express.Router();


router.post('/', async (req, res) => {
    const { subject, class: className, message, IID } = req.body;

    try {
        const newMessage = new Message({
            subject,
            class: className,
            message,
            IID
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findById(id);
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//get all the messages for a particular class and subject
router.get('/class/:class/:subject', async (req, res) => {
    const { class: className, subject } = req.params;
    try {
        const messages = await Message.find({ class: className, subject });
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

//get all the messages from IID
router.get('/IID/:IID', async (req, res) => {
    const { IID } = req.params;
    try {
        const messages = await Message.find({ IID });
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMessage = await Message.findByIdAndDelete(id);
        res.json(deletedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { subject, class: className, message, IID } = req.body;
    try {
        const msg = await Message.findById(id);
        if (!msg) {
            return res.status(404).json({ message: 'Message not found' });
        }
        msg.subject = subject;
        msg.class = className;
        msg.message = message;
        msg.IID = IID;
        const updatedMessage = await msg.save();
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;

