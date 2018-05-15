/*global angular*/
angular
    .module("App", ["ngRoute"])
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
                }).when("/analytics/budgets-laws",{
                    templateUrl:"main.html",
                    controller: "mainCtrl"
                }).when("/budgets-laws/compartidas",{
                    templateUrl:"apisCompartidasBudgetsLaws.html",
                    controller: "apisCompartidasBudgetsLawsCtrl"
                });
                
});