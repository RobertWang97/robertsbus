var express = require('express');
var router = express.Router();
var checkinService = require('../service/checkin');

/*
 {"site": "大连",
  "line": "加车",
  "shuttletype": "摆渡车",
  "plate": "辽Bxxxxx",
  "departuretime": "14:00",
  "date": "2016-11-27"}
  
  body
 */
router.post('/', function(req, res, next) {
	var username = req.get('username');
	var body = req.body;
	checkinService.checkin(username, body).then(function(data){
		if (data.ok === true) {
			res.send({'status' : 200, 'message' : 'You check in successfully.'});
		} 
		// else if (data === 201){
		// 	//串线
		// 	res.send({'status' : 201, 'message' : 'You check in with crossed line.'});
	// } 
		else if (data === -201){
			res.send({'status' : -201, 'message' : 'You can only checkin one time'});
		} else if (data === -101){
			res.send({'status' : -101, 'message' : 'You can only checkin before 5 min'});
		} else if (data === -102){
			res.send({'status' : -102, 'message' : 'You can only checkin before 15 min'});
		} else if (data === -103){
			res.send({'status' : -103, 'message' : 'Missing checkin information(busType)'});
		} else if (data === -104){
			res.send({'status' : -104, 'message' : 'Missing checkin information(departuretime, station, busType)'});
		} else if (data === -105){
			res.send({'status' : -105, 'message' : 'Missing checkin information(scope)'});
		} else if (data === -100){
			res.send({'status' : -100, 'message' : 'Not enouth seat'});
		} else{
			res.send({'status' : -202, 'message' : 'failed'});
		}
	}); 
});

router.post('/cancel', function(req, res, next) {
	var username = req.get('username');
	//var busType = req.body.busType;
	var body = req.body;
	checkinService.unCheckin(username, body).then(function(data){
//		console.log(data);
		if (data.ok === true) {
			res.send({'status' : 200, 'message' : 'You have cancelled.'});
		} else if (data === -103){
			res.send({'status' : -103, 'message' : 'Missing checkin information(busType)'});
		} else if (data === -104){
			res.send({'status' : -104, 'message' : 'Missing checkin information(departuretime, station, busType)'});
		} else if (data === -106){
			res.send({'status' : -106, 'message' : 'Uncheckin not successfully.'});
		} else if (data === ''){
			res.send({'status' : -201, 'message' : 'No checkedin information'});
		} else {
			res.send({'status' : -202, 'message' : 'Failed'});
		}	
	}); 
});

router.post('/vacant', function(req, res, next) {
	//sample data {"type" : "早班车", "scope" : "9", "station" : "海事大学"}
	var username = req.get('username');
	var body = req.body;
	var type = body.type;
	var scope = body.scope;
	var station = body.station;
	console.log(username);
	console.log(body);
	console.log(type);
	console.log(scope);
	console.log(station);
	checkinService.getUncheckedIn(type, scope, station).then(function(data){
          res.send({"vacant" : data});
   console.log(data);
 //  console.log(status);
/*
	if (status === 0) {
      res.send({'message' : 'The vacant seat is:',data});
    } else {
      res.send({'message' : 'Failed.'});
    }
*/
	}); 
});

router.post('/vacant/line', function(req, res, next) {
	var username = req.get('username');
	var body = req.body;
	var type = body.type;
	var line = body.line;
	checkinService.getUncheckinByLine(type, line).then(function (data){
		res.send({"vacant" : data});
	});
});

router.get('/info/:date',function(req, res ,next) {
	var date = req.params['date'];
	checkinService.getDocByDate(date).then(function(data){
		res.send(data);
	});
});

router.post('/info/user', function(req, res, next){
	var username = req.get('username');
	var body = req.body;
	var date = body.date;
	checkinService.searchCheckedInHis(username, date).then(function (data){
		res.send(data);
	});
});


module.exports = router;
