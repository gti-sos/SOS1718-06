/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("App")
    .controller("apisCompartidasBudgetsLawsCtrl", ["$scope", "$http", function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v1/budgets-laws"
            var api = "proxyALVARO/api/v1/transferincomes-stats";


            $http.get(api).then(function(response) {
                    $http.get(apiPropia).then(function(response2) {
                            Highcharts.chart('sharedAnalytics2', {
                                    chart: {
                                        type: 'area'
                                    },
                                    title: {
                                        text: 'sharedAnalytics2'
                                    },
                                    xAxis: {
                                        categories: response2.data.map(function(d) { return d["team"] })
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'transfer1'
                                        }
                                    },
                                    plotOptions: {
                                        line: {
                                            dataLabels: {
                                                enabled: true
                                            },
                                            enableMouseTracking: false
                                        }
                                    },
                                    series: [{
                                            name: 'TiMaxExp',
                                            data: response.data.map(function(d) { return d["timaxexp"] })
                                        }, {
                                            name: 'TiLessExp',
                                            data: response.data.map(function(d) { return d["tilessexp"] })
                                        }, {
                                            name: 'Budget of capital',
                                            data: response2.data.map(function(d) { return d["budgetofcapital"] })
                                        }, {
                                            name: 'Total',
                                            data: response2.data.map(function(d) { return d["total"] })
                                        }]
                                    });
                            });
                    });

            }]);
