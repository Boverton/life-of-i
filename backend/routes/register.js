const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
   return res.sendStatus(200)
});


module.exports = router;