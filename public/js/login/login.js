var loginModule = angular.module('login',[]);
// var homeModule = angular.module('home',['sharedServices']);
// homeModule.service('loginService', function(NetworkService){});

loginModule.controller('SignInCtrl', ['$scope','$state','$rootScope','LogIn',function($scope, $state,$rootScope,LogIn) {
  self = this;
  $scope.user = {
    username: '',
    password : ''   
  }; 
  
	$scope.pwderr=true;
	$scope.network=true;
	localStorage.username='';
	
  $scope.signIn = function() {
		LogIn.authenticate($scope.user.username,$scope.user.password)
		.then(function(response){
			 
//			console.log(response);
			
			if (response.data.message === 'you input wrong password')	{
				$scope.pwderr=false;				
			} else {
				localStorage.username=$scope.user.username;				
//				console.log(localStorage.token);
//				console.log(localStorage.username);
				$state.go('pages.home');
			};
	
		},function(response){
			console.log("fall");

		})

  };
  
}]);

loginModule.factory('LogIn', function($http) {
	
	var LoginService = {
		authenticate: function(username,password){
			var req = {
					 method: 'POST',
                     url: BusRestFullUrl + '/login',
					 headers: {
					   'client_id': '94c105cc-f74b-4909-822d-54f6c7b6c9c9',
					   'username' : username,
					   'password' : password
					 }
					};	

		  return $http(req);
		},
		
	};
	
	return LoginService;
});

