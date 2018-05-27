var fs = require("fs");
var path = require("path");

describe('Data is loaded', function() {
    it('should show some spending policies', function(){
       browser
            .get('https://sos171806zgg-sandbox-sos171806zgg.c9users.io')
            .then(function() {
                element
                    .all(by.repeater('spendingPolicie in spendingPolicies')) //todos los elementos que cumplan una condición.
                    .then(function (spendingPolicies) {
                       browser
                        .takeScreenshot()
                        .then(function (png) {
                            
                            var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01.png'));
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                       
                        
                        expect(spendingPolicies.length).toBeGreaterThan(0);  
                    });
            });
    });
});