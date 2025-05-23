const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const pool = require("../db/db");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("content", "Content is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { content } = req.body;
      // First insert the post
      const newPost = await pool.query(
        "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
        [req.user.id, content]
      );

      // Then get the post with user information
      const postWithUser = await pool.query(
        `SELECT p.*, u.username, u.id as user_id 
         FROM posts p 
         JOIN users u ON p.user_id = u.id 
         WHERE p.id = $1`,
        [newPost.rows[0].id]
      );

      res.json(postWithUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const posts = await pool.query(
      `SELECT p.*, u.username, u.id as user_id 
       FROM posts p 
       JOIN users u ON p.user_id = u.id 
       ORDER BY p.created_at DESC`
    );
    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const post = await pool.query(
      `SELECT p.*, u.username, u.id as user_id 
       FROM posts p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.id = $1`,
      [req.params.id]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check user
    if (post.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [req.params.id]);

    res.json({ message: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
