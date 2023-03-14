import express from 'express';
import { addPost, createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.js';

const router = express.Router();
router.get('/test',createPost)
router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)

export default router;