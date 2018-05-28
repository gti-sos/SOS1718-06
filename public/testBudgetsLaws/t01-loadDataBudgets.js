var fs = require("fs");
var path = require("path");
var config = require('./config');

describe('Data is loaded', function() {
    it('should show some budgets', function() {
        browser
            .get(config.getAppUrl())
            .then(function() {
                element.all(by.repeater('budget in budgets'))
                    .then(function(budgets) {
                        browser.takeScreenshot()
                            .then(function(png) {
                                var stream = fs.createWriteStream(path.join(process.cwd(), 'public/testBudgetsLaws', 'output', 't01.png'));
                                stream.write(new Buffer(png, 'base64'));
                                stream.end();
                            });

                        expect(budgets.length).toBeGreaterThan(0);
                    });
            });
    });
});
