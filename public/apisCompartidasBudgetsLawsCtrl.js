/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("App")
    .controller("apisCompartidasBudgetsLawsCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var apiPropia = "/api/v1/budgets-laws"
        var api1 = "https://sos1718-06.herokuapp.com/api/v1/budgets-laws";


        $http.get(api1).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                Highcharts.chart('GraficoNormal', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: ' GraficoNormal '
                    },

                    xAxis: {
                        categories: response2.data.map(function(d) { return (parseInt(d.year)) })
                    },
                    yAxis: {
                        title: {
                            text: 'budgets1'
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: 'Community',
                        data: response2.data.map(function(d) { return d["community"] })
                    }, {
                        name: 'Section',
                        data: response2.data.map(function(d) { return d["section"] })
                    }, {

                        name: 'Budgetofcapital',
                        data: response1.data.map(function(d) { return (parseFloat(d["budgetofcapital"])) })

                    }, {
                        name: 'Total',
                        data: response1.data.map(function(d) { return (parseFloat(d["total"])) })


                    }]
                });
            });
        });

    }]);
