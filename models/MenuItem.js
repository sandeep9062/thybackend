import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);
