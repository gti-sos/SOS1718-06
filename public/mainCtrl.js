/*global angular*/
/*global Highcharts*/
/*global google*/
/*global uv*/
"use strict"
angular
    .module("App")
    .controller("mainCtrl", ["$scope", "$http", function($scope, $http) {



        console.log("main Controller initialized");

        $http.get("/api/v1/budgets-laws").then(function(response) {
            console.log((response.data));

            //Highcharts

            Highcharts.chart('analytics1', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'My Analytics'
                },
                subtitle: {
                    text: 'Source: Budgets-laws'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return d["community"] })
                },
                yAxis: {
                    title: {
                        text: 'BUDGETS'
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
                    name: 'Section',
                    data: response.data.map(function(d) { return d["section"] })
                }, {
                    name: 'Budget Of Capital',
                    data: response.data.map(function(d) { return d["budgetofcapital"] })
                }, {
                    name: 'Total',
                    data: response.data.map(function(d) { return d["total"] })
                }]
            });




        });



        $http.get("/api/v1/budgets-laws").then(function(response) {
            console.log((response.data));
            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable([
                    ['Community', 'Section'],
                    ['andalucia', 'Agencia-andaluza-del-conocimiento']
                ]);

                var options = {
                    region: 'ES',
                    colorAxis: { colors: ['#00853f', 'green', '#e31b23'] },
                    displayMode: 'markers',
                    colorAxis: { colors: ['red', 'grey', 'black', 'orange'] }
                };

                var chart = new google.visualization.GeoChart(document.getElementById('budgets'));

                chart.draw(data, options);
            }

        });

        $http.get("/api/v1/budgets-laws").then(function(response) {
            console.log((response.data));


            var graphdef = {
                categories: ['andalucia'],
                dataset: {
                    'andalucia': [
                        { name: 'budgetofcapital', value: 6 },
                        { name: 'total', value: 2 }
                    ]
                }
            };

            var config = {};

            var charObject = uv.chart('Bar', graphdef);


        });
    }]);
