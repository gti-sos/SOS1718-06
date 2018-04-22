/* global angular*/
//Controlador

angular
    .module("ResourcesApp")
    .controller("ListCtrlSP", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        console.log("List Ctrl Spending Policies initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var api = "api/v1/spending-policies";

        $scope.addSpendingPolicie = function() {
            $http.post(api, $scope.newSpendingPolicie).then(function(response) {
                /*$scope.newSpendingPolicie.section = response.data;
                if ($scope.newSpendingPolicie.section) {
                     $scope.status = "Status: 422";
                }*/
                $scope.status = "Status: " + response.status;
                getSpendingPolicies();
            });
        }

        $scope.deleteSpendingPolicie = function(section) {
            console.log("Spending Policie to be deleted: " + section);

            $http.delete(api + "/" + section).then(function(response) {
                $scope.status = "Status: " + response.status;
                getSpendingPolicies();
            });
        }
        
         $scope.deleteSpendingPolicies = function() {
            console.log("Spending Policies deleted: ");

            $http.delete(api + "/").then(function(response) {
                $scope.status = "Status: " + response.status;
                getSpendingPolicies();
            });
        }


        function getSpendingPolicies() {
            $http.get(api).then(function(response) {
                $scope.spendingPolicies = response.data;
            });
        }

        getSpendingPolicies();
    }]);
