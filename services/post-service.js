import mongoose from 'mongoose'

import PostModel from '../models/post-model.js'

import { ApiError } from '../utils/api-error.js'

export const createPost = async (data, id) => {
  const post = await PostModel.create({ ...data, user: id })

  return post
}

export const updatePost = async (data, id) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: id },
    { ...data },
    { returnDocument: 'after' },
  )

  return post
}

export const deletePost = async (id) => {
  const post = await PostModel.findByIdAndDelete(id)

  return post
}

export const getOnePost = async (id) => {
  const objId = mongoose.Types.ObjectId(id)
  const post = await ProductModel.findOne({ _id: objId })

  if (!post) {
    throw ApiError.NotFoundError(`Пост не найден`)
  }

  return post
}

export const getAllPosts = async () => {
  const posts = await PostModel.find()
    .populate('user', '_id nickname nationality firstName lastName avatar')
    .exec()

  if (posts.length === 0) {
    throw ApiError.NotFoundError(`Посты не найдены`)
  }

  return posts
}
