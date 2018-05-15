/* global angular */
angular
    .module("App")
    .controller("listCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/budgets-laws";

        $scope.addBudget = function() {
            $http.post(api, $scope.newbudget).then(function(response) {
                $scope.status = "Budget creado con éxito";
                getBudgets();
            }, function() {
                if ($scope.length != 5) {
                    $scope.status = "Debe completar todos los campos";
                }
                else {
                    $scope.status = "La estadistica ya existe";
                }
            });
            getBudgets();
        };

        $scope.deleteBudget = function(section) {
            console.log("Stadistic to be delete :" + section);
            $http.delete(api + "/" + section).then(function(response) {
                $scope.status = "Recurso borrado";
                getBudgets();
            });
            getBudgets();
        };

        $scope.deleteBudgets = function() {
            console.log("all stadistic will be delete");
            $http.delete(api + "/").then(function(response) {
                $scope.status = "No hay recursos";
                getBudgets();
            });
            getBudgets();
        };

        $scope.fromTo = function() {
            console.log("from-to");

            getBudgets();

        };
        var pag = 0;
        var numero;
        $scope.getStadisticsPagination = function(num) {
            numero = num;

            if (num == 1) {
                pag = pag - 10;
                if (pag < 0) {
                    pag = 0;
                    $http.get(api + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                        $scope.budgets = response.data;
                        console.log("pagination1");
                        numero = num;
                        console.log(numero);
                        getBudgets();
                    });

                }
                else {
                    $http.get(api + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                        $scope.budgets = response.data;
                        console.log("pagination2");
                        numero = num;
                        console.log(numero);
                        getBudgets();
                    });
                }
            }
            else {

                pag = pag + 10;
                $http.get(api + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                    $scope.budgets = response.data;
                    console.log("pagination3");
                    numero = num;
                    console.log(numero);
                    getBudgets();
                });


            }
        };


        $scope.busqueda = function() {
            console.log(api + "?" + $scope.atributo + "=" + $scope.valor);
            $http.get(api + "?" + $scope.atributo + "=" + $scope.valor).then(function successCallback(response) {
                $scope.status = "Recurso encontrado";
                $scope.budgets = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        };
        //Paginación

        $scope.paginacion = function() {

            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status = "Recurso obtenido";
                $scope.budgets = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };



        $scope.obtenerpaginaAnterior = function() {
            $scope.offset = $scope.offset + $scope.limit;
            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status = "Recurso obtenido";
                $scope.budgets = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };

        $scope.obtenerpaginaSiguiente = function() {
            $scope.offset = $scope.offset - $scope.limit;
            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status = "Recurso obtenido";
                $scope.budgets = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };


        function getBudgets() {
            $http.get(api).then(function(response) {
                $scope.budgets = response.data;
            });
        }

        getBudgets();
    }]);
