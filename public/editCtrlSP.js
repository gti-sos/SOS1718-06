/*global angular*/

//Controlador

angular
    .module("ResourcesApp")
    .controller("EditCtrlSP", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var spendingPolicieURL = "api/v1/spending-policies/" + $routeParams.section;


        $http.get(spendingPolicieURL).then(function(response) {
            $scope.updatedSpendingPolicie = response.data;
        });

        $scope.updateSpendingPolicie = function() {
            $http.put(spendingPolicieURL, $scope.updatedSpendingPolicie).then(function(response) {
                    $scope.status = "Status: " + response.status;
                    $location.path("/");
                    console.log("Spending Policie edited correctly!");
                    window.alert("Spending policie edited correctly!");
                },
                function(response) {
                    if (response.data == null) {
                        console.log("Spending Policie no edited correctly!");
                        window.alert("Debes respetar los campos obligatorios, gracias!");
                    }
                });
            /*function() {
                var i;
                for (i = 0; i < $scope.length; i++) {
                    if ($scope[i] == null) {
                        $scope.status = "Debe completar todos los campos";
                        break;
                    }
                }
            });*/
            /*function() {


                if ($scope.updatedSpendingPolicie. == null) {
                    $scope.status = "Debe completar todos los campos";
                    $location.path("/");
                    window.alert("Debe completar todos los campos");
                }

            });*/

        };

    }]);
