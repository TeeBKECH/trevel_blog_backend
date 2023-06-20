import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    country: { type: String, required: true },
    city: { type: String },
    text: { type: String, length: { min: 3, max: 350 }, default: '' },
    image: { type: String, default: '' },
    rating: [
      {
        type: Number,
        min: 0,
        max: 5,
      },
    ],
    recommend: {
      type: String,
      enum: ['COOL', 'OK', 'BAD'],
    },
    locations: [
      {
        title: { type: String, default: '' },
        descriptions: { type: String, default: '' },
        images: [
          {
            type: String,
            default: '',
          },
        ],
        coordinates: [
          {
            lat: {
              type: Number,
              default: null,
            },
            lon: {
              type: Number,
              default: null,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Post', PostSchema)
