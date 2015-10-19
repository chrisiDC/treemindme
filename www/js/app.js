
angular.module('starter', ['ionic',"LocalStorageModule", 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }

    });
  })
  .constant('_', _)
/*  .constant('TreeNode',require('js-extensions'))*/
  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js



    /*  .state('main', {
     url: '/main',
     views: {
     'main': {
     templateUrl: 'templates/main.html',
     controller: 'MainCtrl'
     }
     }
     })*/

    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: "HomeCtrl"

    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });


