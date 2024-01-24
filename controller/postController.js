const Post = require('../model/post.js');

const createBlogPost = async (req, res) => {
    try {
      const { title, content, userData} = req.body;
      const id = userData.id; // Assuming you set the user in the request object using middleware
  
     
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      let isAvailable = await Post.findOne({
        where:{
            title:title
        }
      })

      if(isAvailable)
      {
        return res.status(200).send({message:"Post Already Exists."})
      }

  
      const blogPost = await Post.create({
        title,
        content,
        id,
      });
  
      return res.status(200).send({message:"Post Created... "});

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const updatePost = async (req, res) => {
  // Implement logic to update a blog post
};

const deletePost = async (req, res) => {
  // Implement logic to delete a blog post
};

const getAllPosts = async (req, res) => {
  // Implement logic to retrieve all blog posts
};

const getPostById = async (req, res) => {
    try {
      console.log("inside blog post by id ");
      const userData = req.body;

      const postId = userData.id;

  
      // Retrieve the blog post by ID with its associated author and comments
      const blogPost = await Post.findByPk(postId, {
        include: [
          {
            model: User,
            attributes: ['title', 'content'], // Adjust attributes as needed
          }
        ],
      });
  
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      return res.status(200).json(blogPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
  createBlogPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
};
