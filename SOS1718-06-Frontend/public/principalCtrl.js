/* global angular*/
//Controlador

angular
    .module("ResourcesApp")
    .controller("PrincipalCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        console.log("Principal Ctrl initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var api = "api/v1/spending-policies";


        function getResources() {
            $http.get(api).then(function(response) {
                $scope.resources = response.data;
            });
        }

        getResources();
    }]);
