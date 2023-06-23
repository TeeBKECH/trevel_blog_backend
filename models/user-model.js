import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, length: { min: 7, max: 16 } },
    phoneNumber: { type: String, default: '' },
    avatar: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    nickname: { type: String, default: '' },
    nationality: { type: String, default: '' },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    roles: [
      {
        type: String,
        ref: 'Role',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('User', UserSchema)
