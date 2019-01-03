const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const User = require('../../models/User');
const validatePostInput = require('../../validation/post');

// GET /api/posts/test
router.get('/test', (req, res) => res.send({ msg: 'Posts works.' }));

// GET /api/posts
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found.' }));
});

// GET /api/posts/:id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post with this id.' })
    );
});

// DELETE /api/posts/:id
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('User: ', req.user.id);
    // console.log('user: ', Post.findOne({ user: req.user.id }));
    User.findOne({ _id: req.user.id }).then(user => {
      console.log('USER::::: ', user._id, req.user.id);

      Post.findById(req.params.id).then(post => {
        if (user._id.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthourized: 'Unauthorized to delete post.' });
        }
        post.remove().then(() =>
          res.json({ success: `Deleted post: ${post}` }).catch(err =>
            res.status(404).json({
              postnotfound: `No post with the id ${req.params.id} exists.`
            })
          )
        );
      });
    });
  }
);

// POST api/posts
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('validatePostInput: ', validatePostInput(req.body));
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.body.id
    });
    console.log('newPost: ', newPost);

    newPost.save().then(post => res.json(post));
  }
);

// POST api/posts/like/:id
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(usr => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User has already liked this post.' });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({
              postnotfound: `No post with the id ${req.params.id} exists.`
            })
        );
    });
  }
);

// POST api/posts/unlike/:id
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(usr => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'User has not yet liked this post.' });
          }
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({
              postnotfound: `No post with the id ${req.params.id} exists.`
            })
        );
    });
  }
);

module.exports = router;
