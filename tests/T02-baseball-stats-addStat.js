describe('Add stat', function(){
   
   it('should add a new stat', function(){
      browser.get('https://sos171811mls-sos171811mls.c9users.io/#!/baseball-stats')
      .then(function(){
          element.all(by.repeater('baseballstat in initialbaseballstats'))
            .then(function(initialbaseball){
                //browser.driver.sleep(2000);
                element(by.model('newBaseballStat.stadium')).sendKeys('sevilla');
                element(by.model('newBaseballStat.date')).sendKeys("2018-02-02");
                element(by.model('newBaseballStat.hit')).sendKeys(Math.random());
                element(by.model('newBaseballStat.run')).sendKeys(Math.random());
                element(by.model('newBaseballStat.error')).sendKeys(Math.random());
               
                
                element(by.buttonText('add_box')).click().then(function(){
                   element.all(by.repeater('baseballstat in initialbaseballstats')).then(function(initialbaseballstats){
                       expect(initialbaseballstats.length).toEqual(initialbaseball.length+1);
                   }); 
                });
            });
      });
   });
   
    
});





browser.get('https://sos171811mls-sos171811mls.c9users.io/#!/baseball-stats');

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

