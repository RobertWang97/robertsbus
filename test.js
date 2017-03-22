var shuttlebus = require('./service/shuttlebus');
var bus = require('./service/bus');
var user = require('./service/user');
var checkin = require('./service/checkin');
var admin = require('./service/admin');
var weixin = require('./service/weixin');
var comment = require('./service/comment');
var mailService = require('./service/mailService');
// shuttlebus.search('早班车', '线路1').then(function(data) {
//   console.log(data);
// });
/*
shuttlebus.add({  "line": "线路3",
	  "start": "百合2",
	  "end": "天地2"}).then(function(data) {
      console.log(data);
    });
		*/
//
//shuttlebus.searchByType('大连', '早班车').then(function(data) {
//	data.forEach(function(row){
//		console.log(row);
//		/*var site = row.site;
//		var line = row.name;
//		var total = row.busNumber;
//		for(var i = 0; i < total; i++) {
//			shuttlebus.addBus({'site' : site, 'line' : line, 'plate' : '辽Bxxxxx', 'driverName' : '王五', 'driverPhone' : "139xxxxxxxx", 'totalSeat' : 45});
//		}*/
//	});
//});
/*
bus.getByStation('大连','百合山庄').then(function(data){
	console.log(data);
});*/

// user.updateScope('Ada', '9').then(function(data){
// 	console.log(data);
// });

/*
checkin.checkin({
	
	"site": "大连",
	  "line": "加车",
	  "shuttletype": "摆渡车",
	  "plate": "辽Bxxx21",
	  "departuretime": "14:00",
	  "date": "2016-11-27",
	  "mail": "jian@cn.ibm.com"
}).then(function(data) {
	console.log(data);
});*/
/*
user.login('carl', 'carl').then(function(d) {
	console.log(d);
});
*/
/*
checkin.getUncheckedIn(
		"2016-11-27", 
		"14:00", 
		"辽Bxxx21"
		).then(function(d){console.log(d);
		console.log(typeof(d));});*/

/*checkin.getTotalSeat(
"辽Bxxx21"
).then(function(d){console.log(d)});*/

//var v = {'a':1,'b':2,'e':8};

//var n = {'c' : 3,'a':5,'d':7};
/*
function extend(des, src, override){
   if(src instanceof Array){
       for(var i = 0, len = src.length; i < len; i++){
            extend(des, src[i], override);
	   }
   }
   for( var i in src){
	//   console.log(i);
       if(override || !(i in des)){
           des[i] = src[i];
       }
   } 
   return des;
}

var c = extend({},[v,n],1);
*/
/*for (var f in v) {
	n[f] = v[f];
}
console.log(n);
*/
/*
user.updateInfo('jerry1',{'serNo':2442222,'seatNo':'SO2206FB111','lines':'线路2'}).then(function(data){
	console.log(data);
});
*/
//console.log(c);
/*

user.updateLine('jerry1',{'lines': ['线路665', '线路887']}, 'UPDATE').then(function(d) {
	console.log(d);
});

user.updateLine('jerry1',{'lines': ['线路666', '线路888']}, 'UPDATE').then(function(d) {
	console.log(d);
});*/

/*
shuttlebus.getAll('大连').then(function(data){
	console.log(data);
})

*/

/*
user.addLine('jerry1','线路777', 'REMOVE').then(function(d) {
	console.log(d);
});
*/

/*
admin.getUnapprovedList('大连').then(function(d) {
	console.log(d);
});
*/
/*
admin.getByName('admin3').then(function(d) {
	console.log(d);
});
*/


// admin.auditUser('dlcc',{'status' : 'reject','approveAdmin':'admin1','approveDate':'20161212'}).then(function(d) {
// 	console.log(d);
// });


/*
user.addLine('jasmine','线路2','REMOVE').then(function(d) {
	console.log(d);
});
*/
//001MkRrL03GAW42wospL0FPYrL0MkRrE
/*
weixin.verify("021JBEqx1iWLbe0Psxpx13ACqx1JBEqu").then(function(body) {
	console.log(body);
});
*/



// comment.getAllComment().then(function(d){
// 	console.log(d);
// })

/*
comment.getCommentByDate('20161223').then(function(d){
	console.log(d);
})
*/

comment.addComment('@dlcc1','good1111').then(function(data){
	console.log(data);
});

			// var myDate1 = new Date();
			// date1 = myDate1.toLocaleDateString();
			// var myDate = new Date(date1 +' 17:10:00');
			// console.log(myDate.toLocaleDateString());
			// console.log(myDate.toLocaleTimeString());

/*
comment.getAllComment().then(function(data){
	console.log(data); 
});
*/

/*
weixin.getWeixinInfo("oWXCEwYkz7rXQTQ8Ox2HHQbFw1AQ","q5BsjZjpuwnDRXcOOh0uVQpdDaV_Jbl0_7_AHL4aEGAtCFtIogljrIAncCXYaziw6ph7zPAOgyFr-fnJk7tSfDnRoYb7UC4_M7dGs_DLLoA").then(function(body){
	console.log(body);
	
});
*/

//   var body = {"username":["张三"]};
// 	body.username.forEach(function(d){
// 	var user = d;
// 	//console.log(user);
//       mailService.sendAudit(user).then(function(data){ 
		  
//       if (data.ok !== true) {       
//          for( var i in user){
//            fail_user[i] = user[i];
//          }
//        }
	   
// 	   console.log(data);
//      });
// //	 console.log(fail_user);
// 	});


// 、"departuretime": "14:00"

// checkin.checkin('@dlcc',{
// 	  "station": "数码广场",
// 	  "busType": "晚班车",
// 	  "scope": "8",
// 	  "line": "线路1"
// 	  }).then(function(data){
// 		  console.log(data);
// 	  });

// checkin.getUncheckinByLine('晚班车', '线路1').then(function(data){
// 	console.log(data);
// })

// checkin.getDocByNameTypeDate('Ad1','晚班车','2017-03-02').then(function(data){
// 	console.log(data.length);
// });

// checkin.getDocByNameTypeDateTimeSt('Ada','早班车','2017-03-02','07:14:00','数码广场').then(function(data){
// 	console.log(data.length);
// });

// checkin.timeCalculate('2017-03-02 08:00:00','2017-03-02 7:15:00').then(function(data){
// 	console.log(data);
// })

// console.log(checkin.dateCalculate('2017-03-02 08:00:00',3).toLocaleString());

// checkin.unCheckin('Ada',{
// 	  "station": "数码广场",
// 	  "busType": "晚班车",
// 	  //"scope": "8",
// 	  "line": "线路56"}).then(function(data){
// 	console.log(data);
// 	if (data === ''){
// 		console.log('data is null');
// 	}
// });

// mydate1 = new Date().toLocaleDateString();
// mydate2 = new Date().toDateString();
// mydate3 = new Date().toLocaleTimeString();
// mydate4 = new Date().toLocaleString();
// mydate5 = new Date().toISOString();
// mydate6 = new Date().toString();
// mydate7 = new Date().toTimeString();
// mydate8 = new Date().toUTCString();
// console.log(mydate1);
// console.log(mydate2);
// console.log(mydate3);
// console.log(mydate4);
// console.log(mydate5);
// console.log(mydate6);
// console.log(mydate7);
// console.log(mydate8);
// //var time = 18:15:00 - mydate1;
// console.log('1111111111111111111111111111111111111111');
// //console.log(time);
// var days =  2;
// var date1 = new Date();
// date1.setDate(date1.getDate() + days);
// console.log(date1.toLocaleDateString());
// console.log('22222222222222222222222222222222222222222');
// var date2 = new Date();
// datetime2 = date2.toLocaleDateString() + ' ' + '14:15:00';
// console.log(datetime2);
// var tempdate2 = new Date(datetime2);
// console.log(date2.toLocaleString());
// var temptime1 = parseInt(tempdate2.getTime()/60000);
// var temptime2 = parseInt(date2.getTime()/60000);
// console.log(temptime1);
// console.log(temptime2);
// //var time2 = (tempdate2.getTime() - date2.getTime())/1000;
// var time2 = temptime2 - temptime1;
// //var timemin = parseInt(time2/60);
// console.log(time2);
// //console.log(timemin);
// //date2.setTime(date2.getTime() - 
// console.log('333333333333333333333333333333333333333333');
// var date3 = new Date();
// date3.setMonth(date3.getMonth()-3);
// console.log(date3.toLocaleDateString());

//  checkin.getTimelist().then(function(data){
//  	console.log(data);
//  })

// checkin.getTimelist();
// var map = new Map();
// map.set('1',1);
// map.set('1',2);
// console.log(map);
// shuttlebus.searchByType('大连','早班车').then(function(data){
// 	//var r = [];
// 	//console.log(data.site);
// 	data.forEach(function(d){
// 	//	if (d.type === '早班车'){
//             //c = d.scope
// 			d.stations.forEach(function(station){
// 				if (station.name === '马栏广场'){
// 					//console.log(c);
// 				console.log(station.name + d.scope + ':'+ station.time);
// 				}
// 			})
// 			//console.log(d.stations);
// 	//	}
// 	});
	
// });

// checkin.getDocByDate('2017-01-17').then(function(data){
// 	console.log(data);
// });

// user.addInfo('dlcc',{"serNo":2442222,"seatNo":"SO2206FB111","emailAddress" : "123@xx.com","lines":"线路2","station" : "数码广场"}).then(function (data){
// 	console.log(data);
// })
// user.deleteInfo('jerry').then(function (data){
// 	console.log(data);
// })

// user.getInfoByName("dlcc").then(function (data){
// 	// var body = data;
// 	console.log(data);
// 		user.updateInfo("dlcc",data).then(function (d1){
// 			//console.log(d);
// 		console.log(d1);
// 	})
	
// })

// user.getUserByName("dlcc").then(function(data){
// 	console.log(data);
// })

// mailService.sendAudit("@dlcc").then(function (data) {
// 	if (data==='202') {
// 		console.log("data:" + data);
// 	} else {
// 		console.log('error');
// 	}
	
// })	

// admin.getUnapprovedList().then(function(data){
// 	console.log(data);
// })

// checkin.getUncheckedIn('早班车','9','海事大学').then(function(data){
// 	console.log(data);
// })

// checkin.getDocByStation('早班车','9','海事大学').then(function(data){
// 	console.log(data);
// })

// checkin.searchCheckedInHis('Ada').then(function(data){
// 	console.log(data);
// });