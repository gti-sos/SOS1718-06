/* global angular */
angular.module("App")
    .controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Ctrl initialized!");
        var api = "/api/v1/budgets-laws/" + $routeParams.section;


        $http.get(api).then(function(response) {
            $scope.updatedBudget = response.data[0];
        });


        $scope.updateBudget = function() {
            $http.put(api, $scope.updatedBudget).then(function(response) {
                $scope.status = "Cambios realizados con éxito";
                window.alert("OK: estadistica actualizada");
                $location.path("/budgets-laws");

            }, function errorCallback(response) {
                console.log("Bad request");
                window.alert("All fields must be numbers!!");
            });
        };

    }]);
