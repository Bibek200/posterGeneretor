import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poster', required: true },
  scheduleDate: { type: Date, required: true },
});

export default mongoose.model('Schedule', scheduleSchema);
