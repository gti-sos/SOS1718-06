/*global angular*/
angular
    .module("app", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/budgets-laws",{
                    templateUrl:"list.html",
                    controller: "listCtrl"
                }).when("/budgets-laws/:section",{
                    templateUrl:"edit.html",
                    controller: "editCtrl"
                }).when("/analytics",{
                    templateUrl:"analytics.html"
                }).when("/budgets-laws/analytics",{
                    templateUrl:"main.html",
                    controller: "mainCtrl"
                }).when("/budgets-laws/compartidas",{
                    templateUrl:"apisCompartidasBudgetsLaws.html",
                    controller: "apisCompartidasBudgetsLawsCtrl"
                });
                
});