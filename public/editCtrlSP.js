/*global angular*/
//Controlador

angular
    .module("ResourcesApp")
    .controller("EditCtrlSP", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) { //$scope permite acceder a los datos, al modelo.
        console.log("Edit Ctrl Spending Policie initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var spendingPolicieURL = "api/v1/spending-policies/" + $routeParams.section;


        $http.get(spendingPolicieURL).then(function(response) {
            $scope.updatedSpendingPolicie = response.data;
        });

        $scope.updateSpendingPolicie = function() {
            $http.put(spendingPolicieURL, $scope.updatedSpendingPolicie).then(function(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/spendingPolicies");
            });
        }

    }]);
