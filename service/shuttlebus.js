var cons = require('../config/constant');
var Cloudant = require('cloudant');
var cloudant = Cloudant({url : cons.CLOUDANT, plugin : 'promises'});
var mydb = cloudant.db.use('shuttlebus');

var shuttlebusRepo = {
		'search' : function (type, name) {
			return mydb.view("ShuttleBus", "searchByName", {'key' : type + '-' + name, 'include_docs' : true}).then(function(data){
/*				var r = [];
				data.rows.forEach(function(d){
					var doc = d.doc;
					doc._id = undefined;
					doc._rev = undefined;
					doc.docType = undefined;
					r.push(doc);
				});
				return r;
				*/
				if (data.rows.length === 1) {
				var d = data.rows[0].doc;
				return d;
				} else {
				return '';
				}
			});
		},
		'getAll' : function(site) {
			return mydb.view("ShuttleBus", "searchBySite", {'key':site,'include_docs' : true}).then(function(data){
				var r = [];
				data.rows.forEach(function(d){
					var doc = d.doc;
					doc._id = undefined;
					doc._rev = undefined;
					doc.docType = undefined;
					r.push(doc);
				});
				return r;
			});
		},
		'add' : function (line) {
			line.docType = 'shuttlebus';
			return mydb.insert(line);
		},
		'addBus' : function (busInfo) {
			busInfo.docType = 'bus';
			return mydb.insert(busInfo);
		}
};

var shuttlebusService = {
	'getAll' : function (site) {
		return shuttlebusRepo.getAll(site).then(function(data){
			return data;
		});
	},
	'getAllTypes' : function (site) {
		return shuttlebusService.getAll(site).then(function(data) {
			var types = [];
			data.forEach(function(row) {
				var t = row.type;
				if (types.indexOf(t) == -1) {
					types.push(t);
				} else {
					
				}
			});
			return types;
		});
	},
	'searchStation' : function (site, station) {
		return shuttlebusService.getAll(site).then(function(data){
			var r = [];
			data.forEach(function(row) {
					var s = row.stations;
					s.forEach(function(st) {
						if (st.name === station) r.push(row);
					});
			});
			return r;
		});
	},
	'searchName' : function (site, name) {
		return shuttlebusService.getAll(site).then(function (data) {
			var r = [];
			data.forEach(function(row) {
				if (row.name === name) r.push(row);
			});
			return r;
		});
	},
	'searchByType' : function (site, type) {
		return shuttlebusService.getAll(site).then(function(data) {
			var r = [];
			data.forEach(function(row) {
				if (row.type === type) r.push(row);
			});
			return r;
		});
	}, 
	'search' : function(type, name) {
		return shuttlebusRepo.search(type, name);
	},
	'addBus' : function (bus) {
		return shuttlebusRepo.addBus(bus);
	}
};
module.exports = exports = shuttlebusService;
