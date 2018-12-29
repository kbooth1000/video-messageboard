const express = require('express');
const router = express.Router();

// GET /api/auth/test
router.get('/test', (req, res) => res.send({ msg: 'Auth works.' }));

module.exports = router;