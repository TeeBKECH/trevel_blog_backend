import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Token', TokenSchema)
