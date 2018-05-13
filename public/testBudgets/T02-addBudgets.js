var fs = require("fs");
var path = require("path");

describe('Add budget', function(){
    it('should add a new budget', function(){
        browser
        .get('https://sos1718-06.herokuapp.com/App.html#!/budgets-laws')
        .then(function(){
            element.all(by.repeater('budget in budgets'))
            .then(function(InitialBudgetsLaws){
                browser.driver.sleep(2000);
                
                element(by.model('newbudget.community')).sendKeys('andalucia');
                element(by.model('newbudget.year')).sendKeys('2017');
                element(by.model('newbudget.section')).sendKeys('agencia-sanitaria');
                element(by.model('newbudget.budgetofcapital')).sendKeys('60000');
                element(by.model('newbudget.total')).sendKeys('120000');
                
                element(by.buttonText('Add')).click().then(function(){
                    element.all(by.repeater('budget in budgets')).then(function (budgets){
                        expect(budgets.length).toEqual(InitialBudgetsLaws.length+1);
                    });
                });
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'testBudgets','output','Img02.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
        
            });
        });
    });
});