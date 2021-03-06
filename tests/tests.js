// Dependencies
var assert = require("assert")
var selfService = require("../lib/");
var creds;
try {
    creds = require('../credentials.json');
} catch (e) {
    console.log(e);
    console.log("Please create a file `credentials.json` in the project root directory.");
    console.log("{ 'username': 'A12345', 'password': 'password' }");
    process.exit(1);
}

var s = new selfService;

// Run tests
describe('User', function() {
  describe('#Login()', function(){
    
    it('should login without error', function(done){
      
        s.login({'username': creds.username, 'password': creds.password }, function(error, response, localService) {
            //console.log("Completed!");
            //console.log(error, response, body);
            //console.log(error);
            
            if (!error) {
                done();
            } else {
                throw error;
            }

            describe('#weekAtAGlance()', function() {
                it('should get Week at a Glance without error', function(done){

                    this.timeout(10000);

                    localService.weekAtAGlance({ /*'startDate': new Date()*/ }, function(error, response, courses) {
                        
                        console.log("Completed!", courses);
                        
                        if (!error) {
                            done();
                        } else {
                            throw error;
                        }
                    });
                });
            });

            /*
            describe("#course()", function() {
                it('should get a Course without error', function(done) {
                    this.timeout(5000);
                    
                    localService.getCourse({ 
                        'term_in': 201420, 
                        'crn': 21822
                    }, function(error, response, course) {
                        console.log(error, course);
                        done();
                    });

                });
            });
            */

        });

    })

  })
})