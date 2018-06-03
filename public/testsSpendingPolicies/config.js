/*global browser*/

exports.config = {
    
    seleniumAddress: 'http://localhost:8910',  //en qué sitio hay corriendo un proceso que entienda el protocolo de selenium.
    
    specs: ['T00-API.js','T01-loadData.js','T02-addSP.js'],  //qué archivos de tests voy a lanzar.
    
    capabilities: {
        'browserName': 'phantomjs'  //qué tipo de navegador es (phantomjs).
    },
    
    params: {
        host: 'localhost',
        port: '8080'
    }
};

exports.getAppurl = function () {
    return "http://"+browser.params.host+":"+browser.params.port;
}; 