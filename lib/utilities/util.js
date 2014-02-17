module.exports = info = function () {
   // getCourseInfo: function() {}
  //  detailSchedule: function() {}
//};      

     var self = this;
   
     self.getCourseInfo = function(tables, callback) {
        tables = tables || { };
        var $info = $(tables[0]);
        var $times = $(tables[1]);
        var subj = "%";
        var crse = "%";


        return self.request(function (error, response, body) {
            var course = { };
            //console.log(error, response);

            //console.log('Done loading.');
            
            
            var $adminVals = $('.dddefault', $info);
            var $logistics = $('.dddefault', $times);

            if (
                $adminVals.length == 0 || logistics.length == 0
                ) {

                error = "Error";
                //console.log($values.html());
                //console.log($.html());
                //console.log($datadisplaytable.html());
                //console.log($table1.html());
                //console.log($table2.html());
                

            } else {

                //for (var i=0, len=$logistics.length; i<len; i++) {
                  //  var $curr = $($logistics[i]);
                    //console.log("Value: ", i,  $curr.html());
                //}
                course.crn = $($adminVals[1]).text();
                var titleStr = $('.captiontext', $logistics).text();
                course.title = titleStr.split(' - ')[0];
                course.subject = titleStr.split(' - ')[1];

                
                
                var dateRangeStr = $($logistics[4]).text();
                //console.log(dateRangeStr); 

                course.type = $($logistics[0]).text();
                var timeStr = $($logistics[1]).text();
                var time = {
                    start: timeStr.split(' - ')[0],
                    end: timeStr.split(' - ')[1]
                };
                course.time = time;
                course.days = $($logistics[2]).text().split('');
               course.location = $($logistics[3]).text();
                
                course.startDate = new Date(dateRangeStr.split(' - ')[0]);
                course.endDate = new Date(dateRangeStr.split(' - ')[1]);

                course.scheduleType = $($logistics[5]).text();
                course.instructors = $($logistics[6]).text();
            
            }
            
            callback(error, response, course);
        
        });

    };


    // Detail Schedule
    self.detailSchedule = function(params, callback) {
        var url = self.baseURL + "bwskfshd.P_CrseSchdDetl";
        var referer = "twbkwbis.P_GenMenu?name=bmenu.P_RegMnu";
        params = params || { };
        var SESSID = params.SESSID;

        if (SESSID) {
            // Setup Cookie Session
            var sessionCookie = "SESSID="+SESSID;
            var cookie = self.request.cookie(sessionCookie);
            self.cookieJar.setCookie(cookie, self.baseURL, function (err, cookie){})
        }

       
        }

        var options = {
            url: url,
            headers: {
                "User-Agent": self.userAgent
                , "Referer": self.baseURL + referer
                //, "Cookie": sessionCookie
            },
            jar: self.cookieJar
        };

        //
        return self.request(options, function (error, response, body) {
            //console.log('Completed request', error, response, body);
            if (!error && response.statusCode == 200) {
                // console.log(body) // Print the google web page.
                // Process Body into an array of Courses
                var $ = cheerio.load(body);
                var $table = $('.datadisplaytable');
                var courses = [ ];
                for (var i=0, len=$table.length; i<len; i=i+2) {
                    self.getCourseInfo($table.slice(i,i+1), function(error, data){
                        if (!error){
                            courses.push(data);
                            completionCallback;
                        } else {
                            // An error occured.
                            // Instead of having Self-Service retry the request, 
                            // it will callback with an error argument, 
                            // giving the user of Self-Service the opportunity to retry.
                            callback(error,response, courses);
                        }
                    });
                }
            } else {
                callback(error, response, {});
            }
        });

        //return self;
    }
}
