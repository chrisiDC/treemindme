
angular.module('starter', ['ionic',"LocalStorageModule", 'ion-tree-list','starter.controllers', 'starter.services'])

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
  .constant('TreeNode', require("jsx.TreeNode"))
    .constant("CircularJSON",CircularJSON)
  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js





    $stateProvider.state('home', {
      url: '/',
      views: {
        'home': {
          templateUrl: 'templates/home.html',
          controller: "HomeCtrl"
        }
      }

    });
    $stateProvider.state('selectnode', {
      url: '/selectnode',
      views: {
        'selectnode': {
          templateUrl: 'templates/selectnode.html',
          controller: "SelectNodeCtrl"
        }
      }

    });

    $stateProvider.state('tree', {
      url: '/tree',
      views: {
        'tree': {
          templateUrl: 'templates/tree.html',
          controller: "TreeCtrl"
        }
      }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });


