import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      unique: true,
      enum: ['USER', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Role', RoleSchema)
