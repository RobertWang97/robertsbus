var shuttlebus = require('./service/shuttlebus');
var bus = require('./service/bus');
var user = require('./service/user');
var checkin = require('./service/checkin');
var admin = require('./service/admin');
var weixin = require('./service/weixin');
var comment = require('./service/comment');
var mailService = require('./service/mailService');

/*
checkin.unCheckin('Jeff', '早班车').then(function(data) {
	console.log(data);
});
*/
/* 
	var date = new Date();
var	myDate = date.toLocaleDateString();
	var yourDate = '2017-01-12';
	if (myDate<yourDate){
		console.log('200');

    }else {console.log('300');}
    */
/*
checkin.getLineByStation('早班车','8','马栏广场').then(function(d) {
	console.log(d);
});
*/
checkin.getUncheckedIn('早班车','9','净水厂').then(function(d) {
	console.log(d);
});

/*
 shuttlebus.search('早班车','线路1').then(function(data) {
   console.log(data);
});
*/
/*
user.getUserByName('Ada').then(function(d) {
	console.log(d);
});
*/