var config = require("./config.js")


describe('Baseball data is added', function() {

    it('should add a new stat', function() {
        browser.get(config.getBaseballUrl())
            .then(function() {
                element.all(by.repeater('baseballstat in initialbaseballstats'))
                    .then(function(initialbaseball) {
                        //browser.driver.sleep(2000);
                        element(by.model('newBaseballStat.stadium')).sendKeys('sevilla');
                        element(by.model('newBaseballStat.date')).sendKeys("2018-02-02");
                        element(by.model('newBaseballStat.hit')).sendKeys(Math.random());
                        element(by.model('newBaseballStat.run')).sendKeys(Math.random());
                        element(by.model('newBaseballStat.error')).sendKeys(Math.random());



                        element(by.id('addButton')).click().then(function() {
                            element(by.id('next')).click().then(function() {
                                element.all(by.repeater('baseballstat in initialbaseballstats')).then(function(initialbaseballstats) {
                                    expect(2).toEqual(2);
                                });
                            });
                        });
                    });
            });
    });


});
