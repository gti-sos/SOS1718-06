/* global angular*/
//Creación de la aplicación.
//Aquí están las diferentes vistas enrutadas.

angular
    .module("ResourcesApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", { //vista por defecto.
                templateUrl: "listSP.html",
                controller: "ListCtrlSP"
            })
            .when("/spendingPolicies/:section", {
                templateUrl: "editSP.html",
                controller: "EditCtrlSP"
            })
            .when("/integration", {
                templateUrl: "integrationSP.html",
                controller: "IntegrationCtrlSP"
            })
             .when("/proxy", {
                templateUrl: "proxySP.html",
                controller: "ProxyCtrlSP"
            })
            .when("/analytics", {
                templateUrl: "analyticsSP.html",
                controller: "AnalyticsCtrlSP"
            })
            .when("/apisExternas", {
                templateUrl: "apisExternasSP.html",
                controller: "ApisExternasCtrlSP"
            });


    });
