const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {
    console.log('Index root route');
    res.sendStatus(200);
});

module.exports = router;