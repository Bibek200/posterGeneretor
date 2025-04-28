import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema({
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  positions: [
    {
      text: { type: String },
      top: { type: Number },
      left: { type: Number },
    },
  ],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Poster', posterSchema);
