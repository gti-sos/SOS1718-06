var fs = require("fs");
var path = require("path");
var config = require("./config");

describe('Add budget', function() {
    it('should add a new budget', function() {
        browser
            .get(config.getAppUrl())
            .then(function() {
                element.all(by.repeater('budget in budgets'))
                    .then(function(mybudgets) {
                        browser.driver.sleep(2000);

                        element(by.model('newbudget.community')).sendKeys('andalucia');
                        element(by.model('newbudget.year')).sendKeys('2017');
                        element(by.model('newteam.section')).sendKeys('Agencia-sanitaria');
                        element(by.model('newteam.budgetofcapital')).sendKeys('100');
                        element(by.model('newteam.total')).sendKeys('150');

                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('budget in budgets')).then(function(budgets) {
                                expect(budgets.length).toEqual(mybudgets.length + 1);
                            });
                        });
                        browser.takeScreenshot()
                            .then(function(png) {
                                var stream = fs.createWriteStream(path.join(process.cwd(), 'public/testBudgetsLaws', 'output', 't02.png'));
                                stream.write(new Buffer(png, 'base64'));
                                stream.end();
                            });

                    });
            });
    });
});
