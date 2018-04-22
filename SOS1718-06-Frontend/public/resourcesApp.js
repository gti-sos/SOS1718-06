/* global angular*/
//Creación de la aplicación.
//Aquí están las diferentes vistas enrutadas.

angular
    .module("ResourcesApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", { //vista por defecto.
                templateUrl: "principal.html",
                controller: "PrincipalCtrl"
            })
            .when("/spendingPolicies", { 
                templateUrl: "listSP.html",
                controller: "ListCtrlSP"
            })
            .when("/spendingPolicies/spendingPolicie/:section", {
                templateUrl: "editSP.html",
                controller: "EditCtrlSP"
            });
    });
