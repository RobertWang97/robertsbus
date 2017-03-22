var express = require('express');
var router = express.Router();
var userService = require('../service/user');

router.get('/', function(req, res, next) {
  res.send({message : "this is all todos"});
});

router.get('/line', function(req, res, next) {
	var username = req.get('username');
	userService.getLines(username).then(function(data){
		res.send(data);
	});
});
/*
router.post('/line/:line/add', function(req, res, next) {
	var username = req.get('username');
	var line = req.params['line'];
	userService.addLine(username, line, 'ADD').then(function(data){
    if (data.ok === true) {
      res.send({'message' : 'you have added the line.'});
    } else {
      res.send({'message' : 'failed to add line'});
    }
	});
});

router.post('/line/:line/remove', function(req, res, next) {
	var username = req.get('username');
	var line = req.params['line'];
	userService.addLine(username, line, 'REMOVE').then(function(data){
    if (data.ok === true) {
      res.send({'message' : 'you have removed the line.'});
    } else {
      res.send({'message' : 'failed to remove line'});
    }
	});
});
*/
router.get('/station', function(req, res, next) {
	var username = req.get('username');
	userService.getLines(username).then(function(data){
		res.send(data);
	});
});

router.post('/station/update', function(req, res, next) {
	var username = req.get('username');
 var station = req.body.station;
	userService.updateStation(username, station).then(function(data){
    if (data.ok === true) {
      res.send({"message" : "you have updated the station."});
    } else {
      res.send({"message" : "failed to update station"});
    }
	});
});

router.post('/scope/update', function(req, res, next) {
	var username = req.get('username');
  var scope = req.body.scope;
	userService.updateScope(username, scope).then(function(data){
    if (data.ok === true) {
      res.send({"message" : "you have updated the scope."});
    } else {
      res.send({"message" : "failed to update scope"});
    }
	});
});

// router.post('/info', function(req, res, next) {
// 	var username = req.get('username');
// 	var body = req.body;
// 	userService.updateInfo(username, body).then(function(data){
//     if (data.ok === true) {
//       res.send({'message' : 'you have updated the info.'});
//     } else {
//       res.send({'message' : 'failed to update info.'});
//     }
// 	});
// });

router.post('/info', function(req, res, next) {
	//sample body{"serNo":2442222,"seatNo":"SO2206FB111","emailAddress" : "123@xx.com","lines":"线路2","station" : "数码广场"}
	var username = req.get('username');
	var body = req.body;
	console.log(body);
	userService.addInfo(username, body).then(function(data){
    if (data.ok === true) {
      res.send({"message" : "you have updated the info."});
    } else {
      res.send({"message" : "failed to update info."});
    }
	});
});

router.get('/info/:username', function(req, res, next) {
	var username = req.params['username'];
	userService.getUserByName(username).then(function(data){
      res.send(data);
	});
});



module.exports = router;
