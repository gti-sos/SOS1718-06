/* global angular*/
angular
    .module("budgetsLawsApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "listBL.html",
                controller: "listCtrlBL"
            })
            .when("/:section", {
                templateUrl: "editBL.html",
                controller: "editCtrlBL"
            });
    });
