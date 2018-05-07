angular.module('sportsApp.services', [])
//Index Services
.service('HttpService', function ($http, $ionicLoading) {
    return {
        getUser: function (name, pass) {
            return $http.get(webapi.url + '/api/users/userlogin?username=' + name + '&password=' + pass).success(function (response) {
            }).error(function (response) {
            });
        },
        getTest: function (name, pass) {
            var data = {name:name,pass:pass};
            return $http.post(webapi.url + '/api/users/Test', JSON.stringify(data)).success(function (response) {
                debugger;
            }).error(function (response) {
                debugger;
                alert(JSON.stringify(response));
                console.log(response);
            });
        },
        registerUser: function (districtId, districtName, fullName, userName, password, email, mobile, role) {
            var data = { Id: 0, DistrictId: districtId, DistrictName: districtName, FullName: fullName, UserName: userName, Password: password, Email: email, Mobile: mobile, UserId: "", Role: role, CreatedDate: null };
            console.log(data);
            return $http.post(webapi.url + '/api/users/Registering', JSON.stringify(data)).success(function (response) {
                debugger;
                console.log(response);
            }).error(function (response) {
                debugger;
                console.log(response);
            });
        },
    };
})
.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});
