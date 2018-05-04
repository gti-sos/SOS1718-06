/*global angular*/
angular
    .module("budgetsLawsApp")
    .controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) { //$scope permite acceder a los datos, al modelo.
        console.log("Edit Ctrl Budgets Law initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var budgetsLawURL = "/api/v1/budgets-laws/" + $routeParams.section;


        $http.get(budgetsLawURL).then(function(response) {
            $scope.updateBudget = response.data[0];
        });

        $scope.updateBudget = function() {
            if (Object.values($scope.updateBudget).includes(null)) {
                $scope.status = " FAIL: It´s necesary to fill in all the fields";

            }
            else {
                $http.put(budgetsLawURL, $scope.updateBudget).then(function(response) {
                    console.log(Object.values($scope.updateBudget))
                    $scope.status = "UPDATE method status :  Correctly updated (" + response.status + ")";
                    window.alert("edited correctly");
                    $location.path("/");

                });
            }
        };





    }]);
