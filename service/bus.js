var cons = require('../config/constant');
var Cloudant = require('cloudant');
var cloudant = Cloudant({url : cons.CLOUDANT, plugin : 'promises'});
var mydb = cloudant.db.use('shuttlebus');

var shuttlebusService = require('./shuttlebus');

var busRepo = {
  'getAll' : function (site) {
    return mydb.view("ShuttleBus", "bus", {'include_docs' : true}).then(function(data){
      var r = [];
      data.rows.forEach(function(d){
        var doc = d.doc;
        doc._id = undefined;
        doc._rev = undefined;
        doc.docType = undefined;
        if (doc.site === site) {
          r.push(doc);
        }
      });
      return r;
    });
  }
};

var busService = {
  'getAll' : function (site) {
    return busRepo.getAll(site);
  },
  'getByLine' : function (site, line) {
    return busService.getAll(site).then(function(data) {
      var r = [];
      data.forEach(function(row) {
        if (row.line === line) r.push(row);
      });
      return r;
    });
  },
  'getByStation' : function (site, station) {
    return shuttlebusService.searchStation(site, station).then(function(lines) {
        var ps = [];
        lines.forEach(function(line) {
          ps.push(busService.getByLine(site, line.name).then(function(d) {
            return d;
          }));
        });
        return Promise.all(ps);
    }).then(function (res) {
      var r = [];
      res.forEach(function(row) {
        row.forEach(function(el) {
          r.push(el);
        });
      });
      return r;
    });;
  }
};
module.exports = exports = busService;
