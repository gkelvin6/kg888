import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getPost,getPosts,addPost } from "../controllers/post.controller.js";


const router = express.Router()

router.get("/",verifyToken,getPosts);
router.get("/:id",verifyToken,getPost);
router.post("/",verifyToken, addPost);

export default router;