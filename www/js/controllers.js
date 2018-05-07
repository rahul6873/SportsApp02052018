angular.module('sportsApp.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('EventCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('EventDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})
.controller('CalendarDemoCtrl', function ($scope) {
    $scope.calendar = {};
    $scope.changeMode = function (mode) {
        $scope.calendar.mode = mode;
    };

    $scope.loadEvents = function () {
        $scope.eventSource = createRandomEvents();
    };

    $scope.onEventSelected = function (event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    };

    $scope.onViewTitleChanged = function (title) {
        $scope.viewTitle = title;
    };

    $scope.today = function () {
        $scope.calendar.currentDate = new Date();
    };

    $scope.isToday = function () {
        var today = new Date(),
            currentCalendarDate = new Date($scope.calendar.currentDate);

        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.onTimeSelected = function (selectedTime, events, disabled) {
        console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0) + ', disabled: ' + disabled);
    };

    function createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
})
.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
})
.controller('StartCtrl', function ($scope, $ionicLoading, $state, $ionicPopup, $stateParams) {
    $scope.OpenLogin = function () {
        $state.go("login");
    };
    $scope.OpenRegister = function (userType) {
        localStorage.setItem("userType", userType);
        $state.go("register");
    };
})
.controller('RegisterCtrl', function ($scope, HttpService, $ionicLoading, $state, $ionicPopup, $stateParams) {
    $scope.UserType = localStorage.getItem("userType");
    $scope.OpenLogin = function () {
        $state.go("login");
    };
    //Validations using toast validations plugin
    $scope.userNameErrorTips = {
        required: 'Please Input User Name!',
    }
    $scope.passwordErrorTips = {
        required: 'Please Input Password!',
    }
    //Validations using toast validations plugin
    $scope.mobileErrorTips = {
        required: 'Please Input Mobile!',
        pattern: 'please input a valid mobile',
    }
    $scope.fullNameErrorTips = {
        required: 'Please Input Full Name!',
    }
    $scope.DistrictId = 1;
    $scope.DistrictName = "Mukatsar";
    $scope.Email = "";
    try {
        $scope.test = function () {
            $ionicLoading.show({
                template: '<img src="../img/scores-loading.gif" height="200" />'
            }),
            HttpService.getTest("fgh", "tst")
            .then(function (response) {
                debugger; $ionicLoading.hide();
            }, function myError(response) {
                $ionicLoading.hide();
            })
        };

        $scope.Register = function () {
            debugger;
            //Ionic Default Loading
            $ionicLoading.show({
                template: '<img src="../img/scores-loading.gif" height="200" />'
            }),
        HttpService.registerUser($scope.DistrictId, $scope.DistrictName, $scope.data.fullName, $scope.data.Username, $scope.data.password, $scope.Email, $scope.data.Mobile, $scope.UserType)
         .then(function (response) {
             if (response.status == 200) {
                 debugger;
                 //Saving Logged User Details to Local Storage
                 if (response.data.IsSuccess) {
                     try {
                         localStorage.setItem("Registered", $scope.data.Username);
                     }
                     catch (ex) { $ionicLoading.hide(); }
                     //Redirect Using Angular Routing State
                     $state.go('login');
                 }
                 else if (!response.data.IsSuccess) {
                     alert(response.data.Message);
                 }
                 console.log(response);
             }
             else {
                 alert(response.status);
             }
             //Stop Loading
             $ionicLoading.hide();
         }, function myError(response) {
             $ionicLoading.hide();
         });
        };
    }
    catch (ex) { alert(ex); }

})
.controller('EventTab', function ($scope, $ionicLoading, $state, $ionicPopup, $stateParams, $window) {
    $scope.data = {
        grid: false
    };
    $window.onload = function () {
        $('[data-countdown]').each(function () {
            var $this = $(this),
                finalDate = $(this).data('countdown');

            $this.countdown(finalDate, function (event) {
                $this.html(event.strftime('<span>%D<br><i>Days</i></span> <span>%H<br><i>Hour</i></span> <span>%M<br><i>Min</i></span> <span>%S<br><i>Sec</i></span>'));
            });
        });
    };
})
.controller('LoginCtrl', function ($scope, HttpService, $ionicLoading, $state, $ionicPopup, $stateParams) {
    $scope.OpenForgot = function () {
        $state.go("forgot");
    };
    $scope.checkUser = function () {
        //Ionic Default Loading
        $ionicLoading.show({
            template: '<img src="../img/scores-loading.gif" height="200" />'
        }),

    HttpService.getUser($scope.data.Username, $scope.data.password)
       .then(function (response) {
           if (response.status == 200) {
               debugger;
               //Saving Logged User Details to Local Storage
               if (response.data.IsSuccess) {
                   try {
                       localStorage.setItem("UserName", $scope.data.Username);
                       localStorage.setItem("Password", $scope.data.password);
                       localStorage.setItem("UserInfoID", response.data.Data[0].Id);
                       localStorage.setItem("UserID", response.data.Data[0].UserId);
                       localStorage.setItem("Email", response.data.Data[0].Email);
                       localStorage.setItem("Mobile", response.data.Data[0].Mobile);
                       localStorage.setItem("Role", response.data.Data[0].Role);
                       localStorage.setItem("DistrictName", response.data.Data[0].DistrictName);
                   }
                   catch (ex) { $ionicLoading.hide(); }
                   //Redirect Using Angular Routing State
                   $state.go('tab');
               }
               else if (!response.data.IsSuccess) {
                   alert(response.data.Message);
               }
               console.log(response);
           }
           else {
               alert(response.status);
           }
           //Stop Loading
           $ionicLoading.hide();
       }, function myError(response) {
           $ionicLoading.hide();
       });
    }
})
.controller('ForgotCtrl', function ($scope, $ionicLoading, $state, $ionicPopup, $stateParams) {
    $scope.OpenLogin = function () {
        $state.go("login");
    };
})
.controller('sportPlaygroundCtrl', function ($scope, $ionicLoading, $state, $ionicPopup, $stateParams, $ionicPlatform) {
    $scope.images = [];
    $scope.getImage = function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            $scope.images.push({ src: imageURI });
            $scope.$apply();
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };
    $scope.selectImage = function () {
        try {
            var options = {
                maximumImagesCount: 10,
                width: 100,
                height: 100,
                quality: 80
            };
            window.imagePicker.getPictures
              (function (results) {
                  for (var i = 0; i < results.length; i++) {
                      console.log('Image URI: ' + results[i]);   // Print image URI
                      // alert(results[i]);
                      $scope.images.push({ src: results[i] });
                      $scope.$apply();
                  }
              }, function (error) {
                  // error getting photos
                  console.log('Error: ' + JSON.stringify(error));
              }, options);
        }
        catch (ex) {
            alert(ex)
        }
    };
})

.controller('sportTalentCtrl', function ($scope, $ionicLoading, $state, $ionicPopup, $stateParams, $ionicPlatform) {
    $scope.images = [];
    $scope.getImage = function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            $scope.images.push({ src: imageURI });
            $scope.$apply();
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };
    $scope.selectImage = function () {
        try {
            var options = {
                maximumImagesCount: 10,
                width: 100,
                height: 100,
                quality: 80
            };
            window.imagePicker.getPictures
              (function (results) {
                  for (var i = 0; i < results.length; i++) {
                      console.log('Image URI: ' + results[i]);   // Print image URI
                      // alert(results[i]);
                      $scope.images.push({ src: results[i] });
                      $scope.$apply();
                  }
              }, function (error) {
                  // error getting photos
                  console.log('Error: ' + JSON.stringify(error));
              }, options);
        }
        catch (ex) {
            alert(ex)
        }
    };
})
