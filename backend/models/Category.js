const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Kategoriya nomi majburiy'],
      trim: true,
      maxlength: [30, 'Kategoriya nomi 30 ta harfdan ko\'p bo\'lmasligi kerak'],
    },
    color: {
      type: String,
      default: '#6366f1',
      match: [/^#[0-9A-Fa-f]{6}$/, 'Rang hex formatida bo\'lishi kerak'],
    },
    icon: {
      type: String,
      default: '📁',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// User + name unique combination
categorySchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
