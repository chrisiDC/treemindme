

angular.module('app.services', []);
angular.module('app.controllers', [])

angular.module('app', ['ionic',"LocalStorageModule", 'ion-tree-list','app.controllers', 'app.services'])

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
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        controller:"app.controllers.base",
        templateUrl: 'app/shared/templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'app/home/template.html',
            controller: 'app.controllers.home'
          }
        }
      })

      .state('tab.tree', {
        url: '/tree',
        views: {
          'tab-tree': {
            templateUrl: 'app/shared/templates/tree.html',
            controller: 'app.controllers.tree'
          }
        }
      })
      .state('tab.select', {
        url: '/select',
        views: {
          'tab-select': {
            templateUrl: 'app/shared/templates/tree.html',
            controller: 'app.controller.select'
          }
        }
      })



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });


