/*global angular*/
/*global Highcharts*/

angular.module("App").controller("mainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("main Controller initialized");

    $http.get("/api/v1/budgets-laws").then(function(response) {

        Highcharts.chart('analytics', {
            data: {
                table: 'budgets-laws'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'My Analytics'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'values'
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });

    });

}]);
