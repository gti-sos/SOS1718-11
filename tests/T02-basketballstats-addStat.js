/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var config = require("./config.js")

describe('Data is added', function() {
    it('should  add a stat', function() {
        browser.get(config.getBasketUrl());

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
                            expect(stats.length).toEqual(6);

                        });
                    });
                });
            });
        });
    });
});
