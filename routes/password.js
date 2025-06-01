const express = require('express');
const router = express.Router();
const passwordController = require('./controllers/passwordController');

router.post('/strength', passwordController.checkStrength);
router.get('/suggest', passwordController.suggestPassword);

module.exports = router;