var express = require('express');
var router = express.Router();
var bus = require('../service/shuttlebus');
var userService = require('../service/user');
var bs = require('../service/bus');

/*
router.get('/line/:id', function(req, res, next) {
  bus.search(req.params['id']).then(function(data) {
    res.send(data);
  });
});

router.get('/line', function(req, res, next) {
  bus.getAll().then(function(data) {
    res.send(data);
  });
});
*/
// line APIs
router.get('/search', function(req, res, next) {
	var username = req.get('username');
	var body = req.body;
  var type = body.type;
  var name = body.name;
  bus.search(type, name).then(function(data){
      res.send(data); 
  });
});

router.get('/line', function(req, res, next) {
  var username = req.get('username');
  userService.getSite(username).then(function(site){
    bus.getAll(site).then(function(data) {
      res.send(data);
    });
  });
});

router.get('/line/site/:site', function(req, res, next) {
  var site = req.params['site'];
  bus.getAll(site).then(function(data) {
    res.send(data);
  });
});

router.get('/line/name/:name', function(req, res, next){
  var username = req.get('username');
  var name = req.params['name'];
  userService.getSite(username).then(function(site){
    bus.searchName(site, name).then(function(data){
      res.send(data);
    });
  });
});

router.get('/line/site/:site/name/:name', function(req, res, next) {
  var site = req.params['site'];
  var name = req.params['name'];
  bus.searchName(site, name).then(function(data) {
    res.send(data);
  });
});


router.get('/line/type', function(req, res, next){
	  var username = req.get('username');
	 // var name = req.params['name'];
	  userService.getSite(username).then(function(site){
	    bus.getAllTypes(site).then(function(data){
	      res.send(data);
	    });
	  });
	});

router.get('/line/site/:site/type', function(req, res, next) {
	  var site = req.params['site'];
	  //var type = req.params['type'];
	  bus.getAllTypes(site).then(function(data) {
	    res.send(data);
	  });
});

router.get('/line/site/:site/type/:type', function(req, res, next) {
	  var site = req.params['site'];
	  var type = req.params['type'];
	  bus.searchByType(site, type).then(function(data) {
	    res.send(data);
	  });
});


router.get('/line/type/:type', function(req, res, next){
	  var username = req.get('username');
	  var type = req.params['type'];
	  userService.getSite(username).then(function(site){
	    bus.searchByType(site, type).then(function(data){
	      res.send(data);
	    });
	  });
});

router.get('/line/station/:station', function(req, res, next){
  var username = req.get('username');
  var station = req.params['station'];
  userService.getSite(username).then(function(site){
    bus.searchStation(site, station).then(function(data){
      res.send(data);
    });
  });
});

router.get('/line/site/:site/station/:station', function(req, res, next) {
  var site = req.params['site'];
  var station = req.params['station'];
  bus.searchStation(site, station).then(function(data){
    res.send(data);
  });
});

//buses apis
router.get('/buses/site/:site/name/:name', function(req, res, next) {
  var site = req.params['site'];
  var name = req.params['name'];
  bs.getByLine(site, name).then(function(data) {
    res.send(data);
  });
});


router.get('/buses/name/:name', function(req, res, next) {
  var username = req.get('username');
  var name = req.params['name'];
  userService.getSite(username).then(function(site) {
    bs.getByLine(site, name).then(function(data) {
      res.send(data);
    });
  });
});


router.get('/buses/site/:site', function(req, res, next) {
  var site = req.params['site'];
  bs.getAll(site).then(function(data) {
    res.send(data);
  });
});

router.get('/buses', function(req, res, next) {
  var username = req.get('username');
  userService.getSite(username).then(function(site){
    bs.getAll(site).then(function(data) {
      res.send(data);
    });
  });
});

router.get('/buses/site/:site/station/:station', function(req, res, next) {
  var site = req.params['site'];
  var station = req.params['station'];
  bs.getByStation(site, station).then(function(data) {
    res.send(data);
  });
});

router.get('/buses/station/:station', function(req, res, next) {
  var station = req.params['station'];
  var username = req.get('username');
  userService.getSite(username).then(function(site){
    bs.getByStation(site, station).then(function(data) {
      res.send(data);
    });
  });
});


module.exports = router;
