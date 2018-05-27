/*global angular*/
/*global Highcharts*/
angular
    .module("ResourcesApp")
    .controller("ProxyCtrlSP", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).


        $http.get("proxyGTD/api/v1/global-terrorism-data").then(function(responseMA) {
            $http.get("api/v1/spending-policies").then(function(responseZ) {
                Highcharts.chart('container', {

                    title: {
                        text: 'Solar Employment Growth by Sector, 2010-2016'
                    },

                    subtitle: {
                        text: 'Source: thesolarfoundation.com'
                    },

                    yAxis: {
                        title: {
                            text: 'Number of Employees'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 2010
                        }
                    },

                    series: [{
                        name: 'United States',
                        data: responseZ.data.map(function(d) { return d.percentagetotal })
                    },{
                        name: 'Italy',
                        data: responseMA.data.map(function(d) { return d.nkill })
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }

                });

            });
        });

    }]);

