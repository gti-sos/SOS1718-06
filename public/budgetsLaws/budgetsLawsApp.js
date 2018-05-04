/* global angular*/
angular
    .module("budgetsLawsApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "listCtrl"
            })
            .when("/:section", {
                templateUrl: "edit.html",
                controller: "editCtrl"
            });
    });
