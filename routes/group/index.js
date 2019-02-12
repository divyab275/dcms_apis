var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Welcome!');
});

router.use('/reunion', require('./reunion'))



module.exports = router;
