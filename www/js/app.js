// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('sportsApp', ['ionic', 'sportsApp.controllers', 'sportsApp.services', 'angularValidateWithToast', 'ionic-toast', 'ui.rCalendar'])

.run(function ($ionicPlatform, $rootScope, $ionicHistory, $state, $ionicPopup) {
    var localstorageLoginid = localStorage.getItem("UserInfoID");
    if (localstorageLoginid != null && localstorageLoginid != undefined && localstorageLoginid != "") {
        $state.go("tab");
    }

    $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        // Application Exit Popup
        function showConfirm() {
            var confirmPopup = $ionicPopup.show({
                title: 'Exit App?',
                template: 'Are you sure you want to exit?',
                buttons: [{
                    text: 'Cancel',
                    type: 'button button-light',
                }, {
                    text: 'Ok',
                    type: 'button button-dark',
                    onTap: function () {
                        ionic.Platform.exitApp();
                    }
                }]
            });
        };

        // Is there a page to go back to?
        if ($ionicHistory.backView()) {
            // Go back in history
            if ($state.current.name == "login") {
                showConfirm();
            }
            else {
                $ionicHistory.backView().go();
            }
        } else {
            // This is the last page: Show confirmation popup
            showConfirm();
        }

        return false;
    }, 101);
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        $('[data-countdown]').each(function () {
            var $this = $(this),
                finalDate = $(this).data('countdown');

            $this.countdown(finalDate, function (event) {
                $this.html(event.strftime('<span>%D<br><i>Days</i></span> <span>%H<br><i>Hour</i></span> <span>%M<br><i>Min</i></span> <span>%S<br><i>Sec</i></span>'));
            });
        });
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider


     .state('start', {
         url: '/start',
         templateUrl: 'templates/start.html'
     })
     .state('login', {
         url: '/login',
         templateUrl: 'templates/login.html'
     })
     .state('register', {
         url: '/register',
         templateUrl: 'templates/register.html'
     })
    .state('forgot', {
        url: '/forgot',
        templateUrl: 'templates/forgotpassword.html'
    })
    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          templateUrl: 'templates/tabs.html'
      })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.events', {
        url: '/event',
        views: {
            'tab-event': {
                templateUrl: 'templates/tab-event.html',
                controller: 'EventCtrl'
            }
        }
    })
      .state('tab.event-detail', {
          url: '/event/:chatId',
          views: {
              'tab-event': {
                  templateUrl: 'templates/event-detail.html',
                  controller: 'EventDetailCtrl'
              }
          }
      })
      .state('tab.eventcal', {
          url: '/eventcal',
          views: {
              'tab-event': {
                  templateUrl: 'templates/eventCal.html',
              }
          }
      })
          .state('tab.spotPlayground', {
              url: '/spotPlayground',
              views: {
                  'tab-spotPlayground': {
                      templateUrl: 'templates/spotPlayground.html',
                  }
              }
          })
          .state('tab.spotTalent', {
              url: '/spotTalent',
              views: {
                  'tab-spotTalent': {
                      templateUrl: 'templates/spotTalent.html',
                  }
              }
          })
    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/start');
    $ionicConfigProvider.tabs.position('bottom');
});
