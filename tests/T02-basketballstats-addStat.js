describe('Data is added', function() {
    it('should  add a stat', function() {
        browser.get('https://sos1718-11.herokuapp.com//#!/basketball-stats');

        element(by.id('next')).click().then(function() {
            element(by.id('next')).click().then(function() {
                element.all(by.repeater('stat in stats')).then(function(initialStats) {
                    browser.driver.sleep(2000);

                    element(by.model('newStat.stadium')).sendKeys('utah');
                    element(by.model('newStat.date')).sendKeys('2019-01-01');
                    element(by.model('newStat.first')).sendKeys(100);
                    element(by.model('newStat.second')).sendKeys(100);
                    element(by.model('newStat.third')).sendKeys(100);
                    element(by.model('newStat.fourth')).sendKeys(100);

                    element(by.id('addButton')).click().then(function() {
                        element.all(by.repeater('stat in stats')).then(function(stats) {
                            expect(stats.length).toEqual(initialStats.length + 1);

                        });
                    });
                });
            });
        });
    });
});
