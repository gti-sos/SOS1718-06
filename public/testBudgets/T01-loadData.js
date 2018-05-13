var fs = require("fs");
var path = require("path");

describe('Data is loaded', function(){
    it('should show some budgets', function(){
        browser
        .get('https://sos1718-06.herokuapp.com/app.html#!/budgets-laws')
        .then(function(){
            element.all(by.repeater('budget in budgets'))
            .then(function(budgets){
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'testBudgets','output','Img01.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
                
                expect(budgets.length).toBeGreaterThan(0);
            });
        });
    });
});