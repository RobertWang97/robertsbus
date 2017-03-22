var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.send({message : "this is all todos"});
});

module.exports = router;
