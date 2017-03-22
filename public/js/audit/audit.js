var auditModule = angular.module('audit', []);

auditModule.controller('AuditCtrl', function($filter, $state, $scope, getData,
		AuditSubmit) {

	getData().then(function(data) {
		//    	console.log(data);
		$scope.data = data.data;
	});
	


	$scope.auditsub = function() {

		var approvedate = $filter('date')(new Date(), 'yyyy-MM-dd');

		for (var i = 0; i < $scope.data.length; i++)
			if (!$scope.data[i].approved || $scope.data[i].approved == '') {
				continue;
			} else {

				if (!$scope.data[i].comments) {
					$scope.data[i].comments = ''
				}
				;
				AuditSubmit.userInfo($scope.data[i].username,
						$scope.data[i].approved, $scope.data[i].comments,
						approvedate).then(function(response) {

//					console.log(response);

				}, function(response) {
//					console.log(response);

				})
			}

	};
	
	
	$scope.reloadPage = function(){window.location.reload();}

});

auditModule.factory('getData', function($http, $q) {
	return function() {
		var defer = $q.defer();
		$http.get(BustRestFullUrl + '/admin/audit/info')
				.then(function(data) {
					//            console.log(data);
					defer.resolve(data);
				}, function(data) {
					defer.reject(data);
				});

		return defer.promise
	}
});

auditModule.factory('AuditSubmit', function($http) {

	var submitInfo = {
		userInfo : function(username, status, comments, approvedate) {
			var req = {
				method : 'POST',
				url : BustRestFullUrl + '/admin/audit',
				headers: {					
					'username' : localStorage.username					
				},
				data : {
					'username' : username,
					'status' : status,
					'approveAdmin' : localStorage.username,
					'approveDate' : approvedate,
					'comments' : comments
				}
			};
			return $http(req);

		}
	};
	return submitInfo;
});