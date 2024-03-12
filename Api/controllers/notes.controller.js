import NotesS from '../models/notes.model.js';
import { errorHandler } from '../utils/error.js';

export const createNotes = async (req, res, next) => {
    try {
      const Notes = await NotesS.create(req.body);
      return res.status(201).json(Notes);
    } catch (error) {
      next(error);
    }
  };

  export const getNotes = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const getNotes = await NotesS.find({ userRef: req.params.id });
        res.status(200).json(getNotes);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, 'You can only view your own notes!'));
    }
  };

  export const deleteNote = async (req, res, next) => {
    const notes = await NotesS.findById(req.params.id);
  
    if (!notes) {
      return next(errorHandler(404, 'note not found!'));
    }
  
    if (req.user.id !== notes.userRef) {
      return next(errorHandler(401, 'You can only delete your own note!'));
    }
  
    try {
      await NotesS.findByIdAndDelete(req.params.id);
      res.status(200).json('note has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  export const updateNotes = async (req, res, next) => {
    const Notes = await  NotesS.findById(req.params.id);
    if (!Notes) {
      return next(errorHandler(404, 'Notes not found!'));
    }
    if (req.user.id !== Notes.userRef) {
      return next(errorHandler(401, 'You can only update your own Notess!'));
    }
  
    try {
      const updatedNotes = await  NotesS.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedNotes);
    } catch (error) {
      next(error);
    }
  };