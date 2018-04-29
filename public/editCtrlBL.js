/*global angular*/
angular
    .module("budgetsLawsApp")
    .controller("editCtrlBL", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) { //$scope permite acceder a los datos, al modelo.
        console.log("Edit Ctrl Budgets Law initialized!"); //$http establece la conexión entre el navegador del usuario y el servidor (backend).
        var budgetsLawURL = "/api/v1/budgets-laws/" + $routeParams.section;


        $http.get(budgetsLawURL).then(function(response) {
            $scope.updatedBudgetsLaw = response.data[0];
        });

        $scope.updateBudgetsLaw = function() {
            $http.put(budgetsLawURL, $scope.updatedBudgetsLaw).then(function(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/budgetsLaws");
            },function(){
                    var i;
                    for(i=0;i<$scope.length;i++){
                        if($scope[i]==null){
                            $scope.status="Error 400: debe completar todos los campos";
                            break;
                        }
                    }
                
                
            });
        };

    }]);