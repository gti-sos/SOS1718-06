exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['t00-API.js', 't01-loadDataBudgets.js', 't02-addBudget.js'],
    capabalities: {
        'browserName': 'phantomjs'
    },

    params: {
        host: 'localhost',
        port: '8080',
        nombreapi: "/App.html#!/budgets-laws"
    }
};

exports.getAppUrl = function() {
    return "http://" + browser.params.host + ":" + browser.params.port + browser.params.nombreapi;
};
