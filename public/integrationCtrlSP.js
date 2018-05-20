/*global angular*/
/*global Highcharts*/
angular
    .module("ResourcesApp")
    .controller("IntegrationCtrlSP", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        var dataCountries = [];
        var dataPercentageTotal = [];
        var dataTotalSelf = [];

        $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                dataCountries.push(response.data[i].country);
            }
        });

        $http.get("api/v1/spending-policies").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                dataPercentageTotal.push(response.data[i].percentagetotal);
            }
        });

        $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                dataTotalSelf.push(response.data[i].totalself);
            }
            Highcharts.chart('container', {
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: "Relation between Percentage Total and Self-employments"
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 1500,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories: dataCountries,

                },

                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                    name: 'Total Percentage Total',
                    data: dataPercentageTotal
                }, {
                    name: 'Total Self',
                    data: dataTotalSelf
                }]
            });
        });

        console.log(dataCountries, dataPercentageTotal, dataTotalSelf);
    }]);
