// const express = require("express");
const router = require("express").Router();
// const routerPostt = express.Router()
// const User = require("../models/User");
const Benner = require('../controllers/Post')
const Post = require("../models/Post");

//CREATE POST
router.route('/api/benner')
  // .get(Benner.getAllBenner)
  .post(Benner.PostBenner)

//UPDATE POST
router.route("/api/benner/:id")
  .put(Benner.updatePost)

//DELETE POST
router.delete("/api/benner/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.photo === req.body.photo) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.route('/api/benner')
  .get(Benner.getAllPostBenner)
// .post(Question.PostBenner)

// router.get("/api/benner", async (req, res) => {
//   const username = req.query.user;
//   const catName = req.query.cat;
//   try {
//     let posts;
//     if (username) {
//       posts = await Post.find({ username });
//     } else if (catName) {
//       posts = await Post.find({
//         categories: {
//           $in: [catName],
//         },
//       });
//     } else {
//       posts = await Post.find();
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
