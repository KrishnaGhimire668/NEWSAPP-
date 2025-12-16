import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: { type: Number, required: true },
    password: {
      type: String,
      required: true
    },
    tokens: [
      {
        token: { type: String }
      }
    ]
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});


// Generate JWT
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.SECRETKEY,
    { expiresIn: '1d' }
  );

  this.tokens.push({ token });
  await this.save();

  return token;
};

export default mongoose.model('User', userSchema);
