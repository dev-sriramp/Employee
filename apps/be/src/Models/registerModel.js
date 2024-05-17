import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const registerSchema = new Schema(
  {
    name: String,
    email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
    password: String,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
  { versionKey: false }
);

const Register = model('Users', registerSchema);


export default Register;
