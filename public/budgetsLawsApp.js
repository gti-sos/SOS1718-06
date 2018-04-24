/* global angular*/
//Creación de la aplicación.
//Aquí están las diferentes vistas enrutadas.

angular
    .module("budgetsLawsApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", { //vista por defecto.
                templateUrl: "listBL.html",
                controller: "listCtrlBL"
            })
            .when("/budgetsLaws/budgetsLaw/:section", {
                templateUrl: "editBL.html",
                controller: "EditCtrlBL"
            });
    });
