var cons = require('../config/constant');
var Cloudant = require('cloudant');
var cloudant = Cloudant({url : cons.CLOUDANT, plugin : 'promises'});
var mydb = cloudant.db.use('shuttlebus');
var user = require('./user');
var shuttlebus = require('./shuttlebus');
//var dateFormat = require('dateformat');


/*

4.checkin
/checkin - POST with body in format:
{
	"site": "大连",
	  "line": "加车",
	  "shuttletype": "摆渡车",
	  "plate": "辽Bxxx21",
	  "departuretime": "14:00",
	  "date": "2016-11-27"
}

return
{'status' : 200, 'message' : 'You have checked in.'}  - success
{'status' : 201, 'message' : 'Failed'} - failed
 */
//var stationtime = new map();
// var timelist1 = checkinRepo.getTimelist();
var checkinRepo = {
	  'getTimelist' : function (){
			var timelist = new Map();
			return shuttlebus.searchByType('大连','早班车').then(function(data){
				data.forEach(function(d){
					d.stations.forEach(function(s){
						if (s.name !== '天地软件园') {
							timelist.set(s.name + d.scope,s.time);
						}
					})
				})
				timelist.set('晚班车8','17:15:00');
				timelist.set('晚班车9','18:15:00');
				timelist.set('午班车黑石礁','12:15:00');
				timelist.set('午班车数码广场','12:20:00');
				timelist.set('午班车9号楼','12:20:00');
				timelist.set('加车16号楼','09:00:00');
				timelist.set('加车9号楼','09:00:00');
				//return timelist;
				return timelist;
			});
		},
		
		'checkin' : function (username,body) {
			body.username = username;
			body.docType = 'checkin';	
			var myDate1 = new Date();
			date1 = myDate1.toLocaleDateString();
			var myDate = new Date(date1 +' 17:10:00');
	    	body.date = myDate.toLocaleDateString();
			var datetime = myDate.toLocaleString();
			body.checkinTime = myDate.toLocaleTimeString();
			//console.log(body.date);
			return checkinRepo.clineCheck(username, body.busType, body.station, body.scope).then(function(ind){
					//chuan xian
					console.log(ind);
					if (ind === 1){
						body.cline = 1;
					}
					console.log(body);
					return checkinRepo.valCheckedIn(username,body,datetime,'checkin').then(function(data){
						console.log(data.length);
						if (data.length > 0){
							//checked before.
							return -201;
						} else if(data.length === 0){
							return mydb.insert(body).then(function(d){
								//return d;
								// console.log(body.cline);
								// if (d.ok === true){
								// 	if (body.cline === 1) {
								// 		// 串线
								// 		return 201;
								// 	}
								// 	return 200;
								// }
								return d;
							});
						} else {
							return data;
						}
					});
				}); 
		},

		'valCheckedIn' : function(username,body,datetime,type){
			if (body.busType !== "摆渡车"){
				//班车check in 
				if (type === 'checkin'){
					//
					var key = '';
					return checkinRepo.getTimelist().then(function(map){
						if (body.busType === '早班车'){
							key = body.station + body.scope;
						} else if(body.busType === '晚班车'){
							if (!body.scope){
								// Missing scope information.
								return -105;	
							} else {
								key = body.busType + body.scope;
							}
						} else if((body.busType === '午班车')||(body.busType === '加车')){
							key = body.busType + body.station;
						} else return ''; // type error.
						var starttime = body.date + ' ' + map.get(key);
						var currenttime = datetime;
						console.log(starttime);
						console.log(currenttime);
						var subtime = checkinRepo.timeCalculate(currenttime,starttime)
						console.log(subtime);
						if (body.cline === 1){
							if((subtime > 5)||(subtime < 0)){
									// check in window not open.
								return -101;
							// } else {
							// 	//return mydb.view("CheckIn", "byName&busType", {'key' : username + '-' + body.busType + '-' + body.date, 'include_docs' : true}).then(function(data){
							// 	return checkinRepo.getDocByNameTypeDate(username, body.busType, body.date).then(function(data){
							// 		if(!body.busType){
							// 			//Missing checkin information(busType)
							// 			return -103
							// 		} else {
							// 			return data;
							// 		}
							// 	});
							// 			//return data.rows.length
								// 	return data.rows.length;
								// }); 
							}
						} else {
							if((subtime > 15)||(subtime < 0)){
									// check in window not open.
								return -102;
							} 
						}
						return checkinRepo.getDocByNameTypeDate(username, body.busType, body.date).then(function(data){
							console.log(data);
							if(!body.busType){
								// Missing checkin information(busType)
								return -103
							} else {
								if (data.length === 0) {
									return checkinService.getUncheckinByLine(body.busType, body.line).then(function (seat){
										console.log(seat);
										if  (seat <= 0){
											return -100;
										}
										return data;
										// return data;
									});
								}
								return data;
							}
						});

					});
				} else if (type === 'uncheckin') {
					// console.log('here');
					return checkinRepo.getDocByNameTypeDate(username, body.busType, body.date).then(function(data){
						if(!body.busType){
							return -103
						} else {
							return data;
						}
					});
					// return mydb.view("CheckIn", "byName&busType", {'key' : username + '-' + body.busType + '-' + body.date, 'include_docs' : true}).then(function(data){
					// 	return data.rows.length;
					// });
				}
				
			} else {
				return checkinRepo.getDocByNameTypeDateTimeSt(username, body.busType, body.date, body.departuretime, body.station).then(function(data){
					console.log(body.departuretime + ' ' + body.station + ' ' +body.busType);
					if((!body.departuretime)||(!body.station)||(!body.busType)){
						// Missing checkin information(departuretime, station, busType);
						return -104;
					} else{
						return data;
					}
					//return data;
				});
			// 	return mydb.view("CheckIn", "checkedDetail", {'key' : username + '-' + body.busType + '-' + body.date + '-' + body.departuretime + '-' +body.station, 'include_docs' : true}).then(function(data){
			// //return mydb.view("CheckIn", "checkedDetail", {'key' : username + '-' + body.busType + '-' + date, 'include_docs' : true}).then(function(data){
			// 		//return data.rows.length;
			// 		return data.rows.length;
			// 	});
			}
			
		},

		'clineCheck' : function(username, busType ,station, scope) {
			//
			return user.getUserByName(username).then(function(ur){
				if (busType === '晚班车'){
					if ((station !== ur.station)||(scope !== ur.scope)){
					//chuan xian
						return 1;
					}
					else return 0;
					
				} else return 0;
			});
				 //return 0;
		},

		'unCheckin' : function (username, body) {
	       var myDate = new Date();
	       body.date = myDate.toLocaleDateString();
		   return checkinRepo.valCheckedIn(username,body,'','uncheckin').then(function(data){
			   //console.log(data[0]._id);
			   console.log(data.length);
			   if (data.length === 0){
				   return '';
			   } else if(data.length > 0){
				    var docUniqueId = data[0]._id;
				    var docRevNum = data[0]._rev;
					return mydb.destroy(docUniqueId, docRevNum, function(err, d, header) {
						//
						if (!err) {
							console.log("Successfully deleted doc", docUniqueId);
							return d;
						} else {
							// uncheckin not Successfully.
							console.log(err);
							return -106;
						}
					});
			   } else {
				   	return data;
			   }
		   });
				// return mydb.view("CheckIn", "byName&busType", {'key' : username + '-' + busType + '-' + date, 'include_docs' : true}).then(function(data){
				// 	if (data.rows.length === 1) {
			    // 		var docUniqueId = data.rows[0].doc._id;
				//     	var docRevNum = data.rows[0].doc._rev;
				// 		return mydb.destroy(docUniqueId, docRevNum, function(err, body, header) {
				// 			if (!err) {
				// 			console.log("Successfully deleted doc", docUniqueId);
				// 			}
				// 		});	
				// 	} else {
				// 		return '';
				// 	}
				// });
		},
		'getDocByStation' : function(type, scope, name) {
		    return mydb.view("ShuttleBus", "byStation", {'key' : type + '-' + scope + '-' + name, 'include_docs' : true}).then(function(data){
				if (data.rows.length === 1) {
				var d = data.rows[0].doc;
				return d;
				} else {
				return '';
				}
		    });
	    },

			'getDocByNameTypeDate' : function(username, busType, date){
				return mydb.view("CheckIn", "byName&busType", {'key' : username + '-' + busType + '-' + date, 'include_docs' : true}).then(function (data){
					var r=[];
					data.rows.forEach(function(d){
						var doc = d.doc;
						r.push(doc);
					});
					return r;
				});
			},

			'getDocByNameTypeDateTimeSt' : function(username, busType, date, departuretime, station){
				return checkinRepo.getDocByNameTypeDate(username, busType, date).then(function(data){
					var r = [];
					data.forEach(function(row){
						if (row.departuretime === departuretime && row.station === station) r.push(row);
					});
					//console.log(r);
					return r;
				});
				//return mydb.view("CheckIn", "checkedDetail", {'key' : username + '-' + body.busType + '-' + body.date + '-' + body.departuretime + '-' +body.station, 'include_docs' : true});
			},

			'getDocByDate' : function(date){
				return mydb.view("CheckIn", "byDate", {'key' : date, 'include_docs' : true}).then(function (data){
					var r=[];
					data.rows.forEach(function(d){
						d._id = undefined;
						d._rev = undefined;
						var doc = d.doc;
						r.push(doc);
					});
					return r;
				});
			},

		'getCheckedIn' : function (busType, line) {
			var myDate = new Date();
	        var date = myDate.toLocaleDateString();
			return mydb.view("CheckIn", "byLine", {'key' : date + '-' + busType + '-' + line, 'include_docs' : true}).then(function(data){
				var r = [];
				data.rows.forEach(function (row){
					var doc = row.doc;
					r.push(doc);
				});
				return r.length;
				// return data.rows.length;
			});
		 },

		 'searchCheckedInByDate' : function (date) {
			 //add
			 return mydb.view("CheckIn", "byDate", {'key' : date, 'include_docs' : true}).then(function(data){
				 var r =[];
				 data.rows.forEach(function (row){
					var doc = row.doc;
					doc._id = undefined;
					doc._rev = undefined;
					doc.docType = undefined;
					r.push(doc);
				 });
				return r;
			});
		 },

		 'searchCheckedInByUser' : function (username) {
			//
			return mydb.view("CheckIn", "byUser", {'key' : username, 'include_docs' : true}).then(function (data){
				var r = [];
				data.rows.forEach(function (row){
					var doc = row.doc;
					doc._id = undefined;
					doc._rev = undefined;
					doc.docType = undefined;
					r.push(doc);
				});
				return r;
			});
		 },

		 'getSeatNoByLine' : function (type, line) {
			//
			return shuttlebus.search(type, line).then(function (data){
				return data.seatNumber;
			});
		 },

		 'timeCalculate' : function(ctime,time){
			 t1 = new Date(ctime);
			 t2 = new Date(time);
			 var subtime = parseInt(t2.getTime()/60000) - parseInt(t1.getTime()/60000);
			 return subtime;
		 },

		 'dateCalculate' : function(date,month){
			 var dt = new Date(date);
			 dt.setMonth(dt.getMonth() + month);
			 return dt;
		 }

  };

var checkinService = {
  'checkin' : function (username, body) {
		//return checkinRepo.timeCalculate()
	  return checkinRepo.checkin(username,body)
  },
  'unCheckin' : function (username, body) {
	  return checkinRepo.unCheckin(username, body);
  },
  'getDocByStation' : function (type, scope, station) {
	  return checkinRepo.getDocByStation(type, scope, station);
  },
  'getLineByStation' : function (type, scope, station) {
    return checkinRepo.getDocByStation(type, scope, station).then(function(d) {
      return d.name;
    });
  },
  'getCheckedIn' : function (type, scope, station) {
	return checkinService.getLineByStation(type, scope, station).then(function(d) {
	  var busType = type;
	  var line = d;
	  return checkinRepo.getCheckedIn(busType, line);
	});  
  },
  'getTotalSeatByStation' : function (type, scope, station) {
    return checkinRepo.getDocByStation(type, scope, station).then(function(d) {
      return d.seatNumber;
    });
  },
  'getUncheckedIn' : function(type, scope, station){
	  return checkinService.getTotalSeatByStation(type, scope, station).then(function(total) {
		  return checkinService.getCheckedIn(type, scope, station).then(function(chk) {
			   console.log(total);
			    console.log(chk);
			  return total - chk;
		  });
	  });
  },  
  'getUncheckinByLine' : function(type,line){
	  return checkinRepo.getSeatNoByLine(type, line).then(function(total){
		  if(!total) return 0;
		  return checkinRepo.getCheckedIn(type, line).then(function (checkedin){
			  return total - checkedin;
		  })
	  });
  },

//   'valCheckedIn' : function(username, body) {
// 	  return checkinRepo.valCheckedIn(username, body).then(function(data){
// 		  return data.rows[0].doc;
// 	  });
//   },
  'getLineByStation' : function (type, scope, station) {
    return checkinRepo.getDocByStation(type, scope, station).then(function(d) {
      return d.name;
    });
  },
	'getTimelist' : function (){
		return checkinRepo.getTimelist();
	},
	'timeCalculate' : function (time1, time2){
		return checkinRepo.timeCalculate(time1,time2)
	},
	'dateCalculate' : function (date,month){
		return checkinRepo.dateCalculate(date,month);
	},

	'getDocByNameTypeDate' : function (username,busType,date){
		return checkinRepo.getDocByNameTypeDate(username,busType,date);
	},

	'getDocByNameTypeDateTimeSt' : function (username,busType,date,departuretime,station){
		return checkinRepo.getDocByNameTypeDateTimeSt(username,busType,date,departuretime,station);
	},

	'getDocByDate' : function (date){
		return checkinRepo.getDocByDate(date);
	},

	'searchCheckedInHis' : function (username, date){
		return checkinRepo.searchCheckedInByUser(username).then(function (data){
			console.log(date);
			var r = [];
			if (date){
				data.forEach(function (row){
					if (row.date === date) r.push(row);
				}); 
			} else {
				r = data;
			}
			console.log(r.length);
			return r.sort(function(a,b){
				//
				var x = a.date + '-' + a.checkinTime;
				var y = b.date + '-' + b.checkinTime;
				if (x < y) return 1;
				if (x > y) return -1;
				return 0;
			});
		});
	}

};

module.exports = exports = checkinService;
