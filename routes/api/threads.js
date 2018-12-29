const express = require('express');
const router = express.Router();

// GET /api/threads/test
router.get('/test', (req, res) => res.send({ msg: 'Threads works.' }));

module.exports = router;