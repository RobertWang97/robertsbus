var statisticsModule = angular.module('statistics', []);

statisticsModule.controller('StatisticsCtrl',function ($scope, getDataStat) {
    // self = this;
    var d = new Date();
    var y = d.getMonth() + 1;
    y = (y < 10 ? '0' : '') + y;
    var finalStr = d.getFullYear().toString() + '-' + y + '-' + d.getDate();
    $('#inputDateFrom').val(finalStr);
    $('#inputDateTo').val(finalStr);
     $scope.start = {
            datefrom:finalStr,
            dateto:finalStr
    };

    $('.form_date').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        startDate: '2017-01-01',
        autoClose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    }).on('hide', function (e) {
        var inputNode = (this.children[0]);
        var input = inputNode.attributes['ng-model'].nodeValue;
        if ( input.indexOf(".") >= 0){
            var leftInput = "$scope." + input.substr(0,input.lastIndexOf("."));
            var rightInput = input.substr(input.lastIndexOf(".") + 1);
            var evalStr = leftInput + "['" + rightInput + "']" + " = inputNode.value;";
            eval(evalStr);
        }else {
            $scope[input] = input.value;
        }
    });

    $scope.searchStatistics = function () {
        //console.log('$scope.start.datefrom', $scope.start.datefrom);
        //console.log('$scope.start.dateto', $scope.start.dateto);
        getDataStat($scope.start.datefrom, $scope.start.dateto).then(function (data) {
            $scope.data = data.data;
        });
    };

    getDataStat($scope.start.datefrom, $scope.start.dateto).then(function (data) {
        $scope.data = data.data;
    });
    // $scope.reloadPage = function () { window.location.reload(); }

});

statisticsModule.factory('getDataStat', function ($http, $q) {
    return function (DateFrom, DateTo) {
        var defer = $q.defer();
       // var tt = $scope.start.datefrom;
        $http.get(BusRestFullUrl + '/admin/statistics?from=' + DateFrom + '&to=' + DateTo)
            .then(function (data) {
                //            console.log(data);
                defer.resolve(data);
            }, function (data) {
                defer.reject(data);
            });

        return defer.promise
    }
});

/*
statisticsModule.factory('StatisticsSubmit', function ($http) {

    var submitInfo = {
        userInfo: function (username, status, comments, approvedate) {
            var req = {
                method: 'POST',
                url: 'http://localhost:5858/admin/statistics',
                headers: {
                    'username': localStorage.username
                },
                data: {
                    'username': username,
                    'status': status,
                    'approveAdmin': localStorage.username,
                    'approveDate': approvedate,
                    'comments': comments
                }
            };
            return $http(req);

        }
    };
    return submitInfo;
});
*/

