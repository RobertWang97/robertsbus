var cons = require('../config/constant');
var Cloudant = require('cloudant');
var cloudant = Cloudant({url : cons.CLOUDANT, plugin : 'promises'});
var mydb = cloudant.db.use('shuttlebus');
var userService = require('./user');

var uuid = require("uuid");
function getRandomNumber () {
  return (Math.round(Math.random() * 10000000) + '0').substr(0,4);
}

var adminRepo = {
	//2017-03-22 Robert added router for statistics
    'getStatisticsList': function (fromDate, toDate) {
    	var fDate = parseInt(fromDate.replace(/[/-]/g,""));
    	var tDate = parseInt(toDate.replace(/[/-]/g,""));
    	query = {
            "q": "IntDate:["+ fDate +" TO "+ tDate +"] AND docType:\"checkin\"",
			"sort":"IntDate"
		}
        return mydb.search("CheckIn", "idx_checkin",query, function (er, result){
            if (result.rows.length !== 0) {
                var r = [];
                result.rows.forEach(function(d){
                    var doc = d.fields;
                  //  doc._id = undefined;
                    doc._rev = undefined;

                    r.push(doc);
                });
                return r;
            } else {
                return '';
            }
    })},
  	'getUnapprovedList' : function (site) {
		//	return mydb.view("User", "unapproved", {'key' : site, 'include_docs' : true}).then(function(data){
			return mydb.view("User", "userInformation", {'include_docs' : true}).then(function(data){
        if (data.rows.length !== 0) {
					var r = [];
					data.rows.forEach(function(d){
						var doc = d.doc;
          	doc._id = undefined;
						doc._rev = undefined;
						doc.docType = undefined;
          //doc.password = undefined;
          //          doc.token = undefined;
          	doc.emailAddress =  undefined; 
						r.push(doc);  
        	});
        	return r;
        } else {
          return '';
            }
		});
	},
	'auditUser' : function (username,auditInfo) {
				var info = auditInfo;
        return userService.updateInfo(username,info);
     },
	'getBySite' : function(site) {
			return mydb.view("User", "adminBySite", {'key':site,'include_docs' : true}).then(function(data){
				var r = [];
				data.rows.forEach(function(d){
					var doc = d.doc;
					doc._id = undefined;
					doc._rev = undefined;
					r.push(doc);
				});
				return r;
			});
		},
	'getByName' : function(username) {
		return mydb.view("User", "adminByName", {'key' : username, 'include_docs' : true}).then(function(data){
	        if (data.rows.length === 1) {
	          var d = data.rows[0].doc;
	          return d;
	        } else {
	          return '';
	        }
			});
	},
  	'getAdminDoc' : function(username) {
		return mydb.view("User", "admin", {'key' : username, 'include_docs' : true}).then(function(data){
	        if (data.rows.length === 1) {
	          var d = data.rows[0].doc;
	          return d;
	        } else {
	          return '';
	        }
	  	});
	}
		
}
var adminService = {
  'getUnapprovedList' : function(site){
	  return adminRepo.getUnapprovedList(site).then(function(data){
		  return data;
	  });
  },
//2017-03-22 Robert added router for statistics
'getStatistics': function (fromDate, toDate) {
      return adminRepo.getStatisticsList(fromDate, toDate).then(function (data) {
          return data.rows;
      });
  },
 'auditUser' : function(username,auditInfo){
	  return adminRepo.auditUser(username,auditInfo).then(function(data){
		  return data;
	  });
  },
 'getBySite' : function (site) {
		return adminRepo.getBySite(site).then(function(data){
			return data;
		});
	},
	'getByName' : function (username) {
    return adminRepo.getByName(username).then(function(data) {
      return data;
    })
  },
 'getAdminDoc' : function(username){
	  return adminRepo.getAdminDoc(username).then(function(data){
		  return data;
	  });
  }
}

module.exports = exports = adminService;