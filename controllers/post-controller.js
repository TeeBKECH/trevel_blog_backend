import * as postService from '../services/post-service.js'

export const getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts()
    return res.json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await postService.getOnePost(id)
    return res.json(post)
  } catch (error) {
    next(error)
  }
}

export const addPost = async (req, res, next) => {
  try {
    const { user } = req
    const { postData } = req.body
    const post = await postService.createPost(postData, user.id)
    return res.json(post)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const { postData } = req.body
    const post = await postService.updatePost(postData, id)
    return res.json(post)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await postService.deletePost(id)
    return res.json(post)
  } catch (error) {
    next(error)
  }
}
