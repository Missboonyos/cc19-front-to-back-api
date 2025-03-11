// filepath: d:\00_Study\cc19\cc19-group-project\cc19-gpmock-api\routes\mfa-route.js
const express = require('express');
const router = express.Router();
const mfaControllers = require('../controllers/mfa-controllers');
const { authenticate } = require('../middlewares/authenticate');

router.post('/generate-mfa-secret', authenticate, mfaControllers.generateMfaSecret);
router.post('/verify-mfa-token', authenticate, mfaControllers.verifyMfaToken);

module.exports = router;