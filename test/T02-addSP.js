describe('Add spending policie', function() {
    it('should add a new spending policie', function() {
         browser
            .get('https://sos171806zgg-sandbox-sos171806zgg.c9users.io')
            .then(function() {
                 element
                    .all(by.repeater('spendingPolicie in spendingPolicies')) //todos los elementos que cumplan una condición.
                    .then(function (initialSpendingPolicies) {
                        
                        element(by.model('newSpendingPolicie.section')).sendKeys(Math.random());
                        element(by.model('newSpendingPolicie.community')).sendKeys('Andalucia');
                        element(by.model('newSpendingPolicie.year')).sendKeys('2017');
                        element(by.model('newSpendingPolicie.percentagetotal')).sendKeys('1.1');
                        element(by.model('newSpendingPolicie.percentagevariable')).sendKeys('9.9');
                        
                        element(by.buttonText('Add')).click().then(function () {
                            
                            element
                                .all(by.repeater('spendingPolicie in spendingPolicies'))
                                .then(function (spendingPolicies) {
                                   expect(spendingPolicies.length).toEqual(initialSpendingPolicies.length+1); 
                                });
                        });
                    });
            });
    });
});