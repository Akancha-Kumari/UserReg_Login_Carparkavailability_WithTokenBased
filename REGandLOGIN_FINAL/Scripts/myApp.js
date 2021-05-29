var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .when('/home', {
            templateUrl: '/template/home.html',
            controller: 'homeController'
        })
        .when('/authenticated', {
            templateUrl: '/template/authenticate.html',
            controller: 'authenticateController'
        })
        .when('/authorized', {
            templateUrl: '/template/authorize.html',
            controller: 'authorizeController'
        })
        .when('/login', {
            templateUrl: '/template/login.html',
            controller: 'loginController'
        })
        .when('/unauthorized', {
            templateUrl: '/template/unauthorize.html',
            controller: 'unauthorizeController'
        })
        .when('/signup', {
            templateUrl: '/template/signup.html',
            controller: 'signupController'
        })
        .when('/carparkavailability', {
            templateUrl: '/template/carparkavailability.html',
            controller: 'carparkavailabilityController'
        })
}])

//baseurl
//myApp.constant('serviceBasePath', 'https://localhost:44350');


//controller
myApp.controller('homeController', ['$scope', 'dataService', '$http', function ($scope, dataService, $http) {
    //FETCH DATA FROM SERVICES
    $scope.data = "";
    dataService.GetAnonymousData().then(function (data) {
        $scope.data = data;
    })
}])
myApp.controller('authenticateController', ['$scope', 'dataService', function ($scope, dataService) {
    //FETCH DATA FROM SERVICES
    $scope.data = "";
    dataService.GetAuthenticateData().then(function (data) {
        $scope.data = data;
    })
}])
myApp.controller('authorizeController', ['$scope', 'dataService', function ($scope, dataService) {
    //FETCH DATA FROM SERVICES
    $scope.data = ""; $scope.data1 = ""; $scope.data2 = ""; $scope.data3 = ""; $scope.data4 = "";
    dataService.GetAuthorizeData().then(function (data) {
        $scope.data = data.FirstName;
        $scope.data1 = data.LastName;
        $scope.data2 = data.Email;
        $scope.data3 = data.Contact_Number;
        $scope.data4 = data.LoggedON;
    })
}])
myApp.controller('loginController', ['$scope', 'accountService', '$location', function ($scope, accountService, $location) {
    //FETCH DATA FROM SERVICES
    $scope.account = {
        username: '',
        password: ''
    }
    $scope.message = "";
    $scope.login = function () {
        accountService.login($scope.account).then(function (data) {
            /*$location.path('/home');*/
            $location.path('/authenticated');
        }, function (error) {
            $scope.message = error.error_description;
            $scope.Clear();
        })
    }

    $scope.Clear = function () {
        $scope.account.username = "";
        $scope.account.password = "";
    }
}])
myApp.controller('unauthorizeController', ['$scope', function ($scope) {
    //FETCH DATA FROM SERVICES
    $scope.data = "Sorry you are not authorize to access this page";
}])

myApp.controller('signupController', ['$scope', '$http', function ($scope, $http) {
    $scope.validatemessage = "";
    var urlGet = '';
    $scope.btnText = "Save";
    $scope.studentID = 0;
    $scope.SaveUserUpdate = function () {
        var user = {
            FirstName: $scope.firstName,
            LastName: $scope.lasttName,
            Email: $scope.email,
            Password: $scope.password,
            Contact_Number: $scope.contact_number,
            UserID: $scope.UserID
        }
        if ($scope.btnText == "Save" && $scope.validatemessage == "") {
            var apiRoute = '/api/user/SaveUser/';
            var saveUser = $scope.post(apiRoute, user);
            saveUser.then(function (response) {
                if (response.data != "") {
                    alert("User has been registered successfully.Please click authenticated/authorize for login.");
                    $scope.Clear();
                } else {
                    alert("Some error");
                }
            }, function (error) {
                console.log("Error: " + error);
            });
        }
        else {
            alert("Please sign up with different email. This email is already in use!");
        }
    }

    $scope.GetUsers = function () {
        var apiRoute = '/api/user/GetUsers/';
        var user = $scope.getAll(apiRoute);
        user.then(function (response) {
            $scope.users = response.data;
        },
            function (error) {
                console.log("Error: " + error);
            });
    }

    $scope.getAll = function (apiRoute) {
        urlGet = apiRoute;
        return $http.get(urlGet);
    }

    $scope.validate = function (event) {
        var count = 0;
        var CurrentEmail = event.target.value;
        if (CurrentEmail == "") {
            $scope.validatemessage = "";
        }
        else {
            $scope.GetUsers();
            angular.forEach($scope.users, function (value, index) {
                if (count != 1) {
                    if (value.Email == CurrentEmail) {
                        $scope.validatemessage = "Email Exist";
                        count = count + 1;
                    }
                    else {
                        if (count = 0) {
                            $scope.validatemessage = "";
                        }
                    }
                }
            });
        }
    }

    $scope.post = function (apiRoute, Model) {
        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;
    }

    $scope.Clear = function () {
        $scope.btnText = "Save";
        $scope.UserID = 0;
        $scope.firstName = "";
        $scope.lasttName = "";
        $scope.email = "";
        $scope.password = "";
        $scope.contact_number = "";

    }
    $scope.GetUsers();

}])

//myApp.controller('carparkavailabilityController', function ($scope, $http) {
//    $http({
//        method: 'GET',
//        url: 'https://api.data.gov.sg/v1/transport/carpark-availability'
//    }).success(function (data) {
//        $scope.carparkdata = data.items[0].carpark_data; // response data
//    });
//})

myApp.controller('carparkavailabilityController', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
    $scope.data = "";
    dataService.GetCarParkData().then(function (data) {
        $scope.carparkdata = data.items[0].carpark_data;
    })
}])



//services
//myApp.factory('dataService', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
//    var fac = {};
//    fac.GetAnonymousData = function () {
//        return $http.get(serviceBasePath + '/api/user/forall').then(function (response) {
//            return response.data;
//        })
//    }

//    fac.GetAuthenticateData = function () {
//        return $http.get(serviceBasePath + '/api/user/authenticate').then(function (response) {
//            return response.data;
//        })
//    }

//    fac.GetAuthorizeData = function () {
//        return $http.get(serviceBasePath + '/api/user/authorize').then(function (response) {
//            return response.data;
//        })
//    }

//    fac.GetCarParkData = function () {
//        return $http.get(serviceBasePath + '/api/user/carparkavailability').then(function (response) {
//            console.log(response);
//            return response.data;
//        })
//    }
//    return fac;
//}])

myApp.factory('dataService', ['$http', function ($http) {
    var fac = {};
    fac.GetAnonymousData = function () {
        return $http.get('/api/user/forall').then(function (response) {
            return response.data;
        })
    }

    fac.GetAuthenticateData = function () {
        return $http.get('/api/user/authenticate').then(function (response) {
            return response.data;
        })
    }

    fac.GetAuthorizeData = function () {
        return $http.get('/api/user/authorize').then(function (response) {
            return response.data;
        })
    }

    fac.GetCarParkData = function () {
        return $http.get('/api/user/carparkavailability').then(function (response) {
            console.log(response);
            return response.data;
        })
    }
    return fac;
}])
myApp.factory('userService', function () {
    var fac = {};
    fac.CurrentUser = null;
    fac.SetCurrentUser = function (user) {
        fac.CurrentUser = user;
        sessionStorage.user = angular.toJson(user);
    }
    fac.GetCurrentUser = function () {
        fac.CurrentUser = angular.fromJson(sessionStorage.user);
        return fac.CurrentUser;
    }
    return fac;
})
//myApp.factory('accountService', ['$http', '$q', 'serviceBasePath', 'userService', function ($http, $q, serviceBasePath, userService) {
//    var fac = {};
//    fac.login = function (user) {
//        var obj = { 'username': user.username, 'password': user.password, 'grant_type': 'password' };
//        Object.toparams = function ObjectsToParams(obj) {
//            var p = [];
//            for (var key in obj) {
//                p.push(key + '=' + encodeURIComponent(obj[key]));
//            }
//            return p.join('&');
//        }

//        var defer = $q.defer();
//        $http({
//            method: 'post',
//            url: serviceBasePath + "/token",
//            data: Object.toparams(obj),
//            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//        }).then(function (response) {
//            userService.SetCurrentUser(response.data);
//            defer.resolve(response.data);
//        }, function (error) {
//            defer.reject(error.data);
//        })
//        return defer.promise;
//    }
//    fac.logout = function () {
//        userService.CurrentUser = null;
//        userService.SetCurrentUser(userService.CurrentUser);
//    }
//    return fac;
//}])


myApp.factory('accountService', ['$http', '$q', 'userService', function ($http, $q, userService) {
    var fac = {};
    fac.login = function (user) {
        var obj = { 'username': user.username, 'password': user.password, 'grant_type': 'password' };
        Object.toparams = function ObjectsToParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        }

        var defer = $q.defer();
        $http({
            method: 'post',
            url: "/token",
            data: Object.toparams(obj),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            userService.SetCurrentUser(response.data);
            defer.resolve(response.data);
        }, function (error) {
            defer.reject(error.data);
        })
        return defer.promise;
    }
    fac.logout = function () {
        userService.CurrentUser = null;
        userService.SetCurrentUser(userService.CurrentUser);
    }
    return fac;
}])


//http interceptor
myApp.config(['$httpProvider', function ($httpProvider) {
    var interceptor = function (userService, $q, $location) {
        return {
            request: function (config) {
                var currentUser = userService.GetCurrentUser();
                if (currentUser != null) {
                    config.headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/login');
                    return $q.reject(rejection);
                }
                if (rejection.status === 403) {
                    $location.path('/unauthorized');
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }

        }
    }
    var params = ['userService', '$q', '$location'];
    interceptor.$inject = params;
    $httpProvider.interceptors.push(interceptor);
}]);