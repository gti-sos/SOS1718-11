browser.get('https://sos1718-11.herokuapp.com/#!/baseball-stats');


    element(by.id('next')).click().then(function() {
        element.all(by.repeater('baseballstat in initialbaseballstats')).then(function(initialStats) {
            browser.driver.sleep(2000);

            element(by.model('newBaseballStat.stadium')).sendKeys('utah');
            element(by.model('newBaseballStat.date')).sendKeys('2019-01-01');
            element(by.model('newBaseballStat.hit')).sendKeys(100);
            element(by.model('newBaseballStat.run')).sendKeys(100);
            element(by.model('newBaseballStat.error')).sendKeys(100);

            element(by.id('addButton')).click().then(function() {
                element.all(by.repeater('baseballstat in initialbaseballstats')).then(function(stats) {
                    expect(stats.length).toEqual(initialStats.length + 1);

                });
            });
        });
    });
