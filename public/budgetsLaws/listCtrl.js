/* global angular*/
angular
    .module("budgetsLawsApp")
    .controller("listCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        console.log("List Ctrl Budgets Laws initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var api = "/api/v1/budgets-laws";

        $scope.addBudget = function() {
            $http.post(api, $scope.newBudget).then(function(response) {
                $scope.status = "Status: " + response.status;
                getBudgetsLaws();
            }, function() {
                if ($scope.length != 5) {
                    $scope.status = "Error 400: debe completar todos los campos";
                }
                else {
                    $scope.status = "Error 409: la estadistica ya existe";
                }
            });
        };

        $scope.deleteBudget = function(section) {
            console.log("Budgets Law to be deleted: " + section);

            $http.delete(api + "/" + section).then(function(response) {
                $scope.status = "Status: " + response.status;
                getBudgetsLaws();
            });
            getBudgetsLaws();
        };

        $scope.deleteAllBudgets = function() {
            console.log("Budgets Laws deleted: ");

            $http.delete(api).then(function(response) {
                $scope.status = "Status: " + response.status;
                getBudgetsLaws();
            });
        };


        function getBudgetsLaws() {
            $http.get(api).then(function(response) {
                $scope.budgetsLaws = response.data;
            });
        }

        getBudgetsLaws();
    }]);