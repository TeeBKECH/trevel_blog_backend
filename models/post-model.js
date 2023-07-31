import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      length: {
        min: 3,
        max: 35,
      },
    },
    text: { type: String, length: { min: 3, max: 350 }, default: '' },
    imageUrl: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Post', PostSchema)
