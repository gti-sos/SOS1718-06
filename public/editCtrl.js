/* global angular */
angular.module("app")
  .controller("editCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
            console.log("Edit Ctrl initialized!");
            var budgetUrl = "/api/v1/budgets-laws/"+$routeParams.section ;
               
               
                $http.get(budgetUrl).then(function (response){
                    $scope.updatedBudget= response.data[0];
                });
                
                
                $scope.updateBudget= function(){
                $http.put(budgetUrl,$scope.updatedBudget).then(function (response){
                    $scope.status= "Cambios realizados con éxito";
                     window.alert("OK: estadistica actualizada");
                    $location.path("/budgets-laws");
                   
                    
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