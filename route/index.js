const express = require('express');
const router = express.Router();
const Session = require('../model/session.js');
const UserController = require('../controller/userController');
const PostController = require('../controller/postController');
const { authenticate } = require('../middleware/authMiddleware.js');

// // User Authentication
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// // Blog Posts
router.use('/posts', authenticate, PostController.createBlogPost);
// router.put('/posts/:postId', authenticate, PostController.updatePost);
// router.delete('/posts/:postId', authenticate, PostController.deletePost);
// router.get('/posts', PostController.getAllPosts);
// router.get('/posts/:postId', PostController.getPostById);


module.exports = router;
