
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// angular.module('shuttleBusWeb', ['ionic','ngMessages','home','login','notice','case','account','report','mcenter','sharedConfig'])
angular.module('shuttleBusWeb', ['ui.router', 'ui.router.state', 'login', 'audit', 'statistics', 'comment'])

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('pages', {
                url: '/pages',
                abstract: true,
                templateUrl: 'templates/layout.html'
            })

            // Each tab has its own nav history stack:

            .state('pages.home', {
                url: '/home',
                views: {
                    'content': {
                        templateUrl: 'js/home/home.html' //,
                        // controller: 'NoticeCtrl'
                    }
                }
            })
            .state('pages.audit', {
                url: '/audit',
                views: {
                    'content': {
                        templateUrl: 'js/audit/audit.html',
                        controller: 'AuditCtrl'
                    }
                }
            })
            .state('pages.audit-detail', {
                url: '/audit-detail',
                views: {
                    'content': {
                        templateUrl: 'js/audit/audit-detail.html' //,
                        // controller: 'NoticeWgtCtrl'
                    }
                }

            })
            .state('pages.statistics', {
                url: '/statistics',
                views: {
                    'content': {
                        templateUrl: 'js/statistics/statistics.html',
                        controller: 'StatisticsCtrl'
                    }
                }
            })
            .state('pages.comment', {
                url: '/comment',
                views: {
                    'content': {
                        templateUrl: 'js/comment/comment.html',
                        controller: 'CommentCtrl'
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'js/login/login.html',
                controller: 'SignInCtrl'
            });

        // // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

        //  $httpProvider.interceptors.push(['$rootScope', '$q', function ($rootScope, $q) {
        //      return {
        //        request: function (config) {
        //
        //          // Header - Token
        //          config.headers = config.headers || {};
        //          if (localStorage.token) {
        //            config.headers.client_id = '94c105cc-f74b-4909-822d-54f6c7b6c9c9';
        //			config.headers.username = localStorage.username;
        //			config.headers.token = localStorage.token;
        //          };
        //          
        //          return config;
        //        },
        //
        //        response: function (response) {
        //
        //          if (response.status == 200) {
        ////           console.log('do something...');
        //          }
        //          
        //          return response || $q.when(response);
        //        },
        //
        //        responseError: function (response) {
        //        
        //          return $q.reject(response);
        //        }
        //      }
        //    }]);

    }]);

