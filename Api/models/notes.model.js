import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
    userRef: {
        type: String,
        required: true,
      },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const NotesS = mongoose.model('notes', NotesSchema);

export default NotesS;