import express from 'express';
import { createNotes,deleteNote,getNotes, updateNotes } from '../controllers/notes.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();

router.post('/create', verifyToken, createNotes);
router.get('/getnotes/:id', verifyToken, getNotes);
router.delete('/delete/:id', verifyToken, deleteNote);
router.post('/update/:id', verifyToken, updateNotes);

export default router;