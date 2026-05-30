const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ism majburiy'],
      trim: true,
      minlength: [2, 'Ism kamida 2 ta harf bo\'lishi kerak'],
      maxlength: [50, 'Ism 50 ta harfdan ko\'p bo\'lmasligi kerak'],
    },
    email: {
      type: String,
      required: [true, 'Email majburiy'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email formati noto\'g\'ri'],
    },
    password: {
      type: String,
      required: [true, 'Parol majburiy'],
      minlength: [6, 'Parol kamida 6 ta belgi bo\'lishi kerak'],
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Password hash before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
