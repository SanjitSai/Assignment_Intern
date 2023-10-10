// Assuming you have a Blog and Comment model
const express = require('express');
const router = express.Router();
const { User, userService } = require("../../userService");

router.get('/first-level-friends/:userId', async (req, res) => {
    const {blogs, Comment} = req.id
  try {
    const userId = req.params.userId;

    // Find the blogs that the user commented on
    const blogs = await Comment.find({ user: userId }).distinct('blog');

    // Find users who have commented on the same blogs (1st level friends)
    const firstLevelFriends = await Comment.find({
      user: { $ne: userId },
      blog: { $in: blogs },
    }).distinct('user');

    res.json({ firstLevelFriends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get('/second-level-friends/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find 1st level friends
      const firstLevelFriends = await Comment.find({ user: userId }).distinct('user');
  
      // Find blogs where 1st level friends have commented
      const blogsOfFirstLevelFriends = await Comment.find({
        user: { $in: firstLevelFriends },
      }).distinct('blog');
  
      // Find users who have commented on those blogs (potential 2nd level friends)
      const potentialSecondLevelFriends = await Comment.find({
        user: { $ne: userId, $nin: firstLevelFriends },
        blog: { $in: blogsOfFirstLevelFriends },
      }).distinct('user');
  
      // Filter out those who have commented on common blogs
      const secondLevelFriends = potentialSecondLevelFriends.filter(async (user) => {
        const userBlogs = await Comment.find({ user, blog: { $in: blogsOfFirstLevelFriends } }).distinct('blog');
        return userBlogs.every((blog) => !blogs.includes(blog));
      });
  
      res.json({ secondLevelFriends });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  