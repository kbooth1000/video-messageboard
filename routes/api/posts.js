const express = require('express');
const router = express.Router();

// GET /api/posts/test
router.get('/test', (req, res) => res.send({ msg: 'Posts works.' }));

module.exports = router;