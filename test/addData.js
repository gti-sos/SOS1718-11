describe('Add crime', function(){
   
   it('should add a new crime', function(){
      browser.get('https://sos171811ldvc-sos171811ldvc.c9users.io/#!/football-stats')
      .then(function(){
          element.all(by.repeater('footbalstat in initialfootballstats'))
            .then(function(initialfootball){
                //browser.driver.sleep(2000);
                element(by.model('newFootballStat.stadium')).sendKeys('sevilla');
                element(by.model('newFootballStat.date')).sendKeys(2018-02-02);
                element(by.model('newFootballStat.goal')).sendKeys(Math.random());
                element(by.model('newFootballStat.corner')).sendKeys(Math.random());
                element(by.model('newFootballStat.fault')).sendKeys(Math.random());
               
                
                element(by.buttonText('add_box')).click().then(function(){
                   element.all(by.repeater('footbalstat in initialfootballstats')).then(function(initialfootballstats){
                       expect(initialfootballstats.length).toEqual(initialfootball.length+1);
                   }); 
                });
            });
      });
   });
   
    
});