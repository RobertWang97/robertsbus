var express = require('express');
var router = express.Router();

router.get('/index', function(req, res) {
    res.render('pages/index');
});

router.get('/signin', function(req, res) {
    res.render('pages/login');
});

router.get('/auditlist', function(req, res) {
    res.render('pages/auditlist');
});

router.get('/auditdetail', function(req, res) {
    res.render('pages/auditdetail');
});

module.exports = router;
