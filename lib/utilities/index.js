var cheerio = require("cheerio");

module.exports = util = function () {
   // getCourseInfo: function() {}
  //  detailSchedule: function() {}
//};      

     var self = this;
   
     self.getCourseInfo = function(tables, error, callback) {
        tables = tables || { };
        var info = tables[0];
        var times = tables[1];
        //console.log(tables);

            var course = { };
            var $ =  cheerio.load(info);
            var $adminVals = $('.dddefault');
            var titleStr = $('.captiontext').text();
            $ = cheerio.load(times);
            var $logistics = $('.dddefault');
            //console.log($logistics.html());
            if (
                $adminVals.length == 0 || $logistics.length == 0
                ) 
            {

                error = "Error";
//                console.log($adminVals.html());
                //console.log($.html());
                //console.log($datadisplaytable.html());
                //console.log($table1.html());
                //console.log($table2.html());
                
            } else
            {
                //console.log($($adminVals).html());
                course.crn = $($adminVals[1]).text();
                //console.log(titleStr);
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
            callback(error, course);
        }
    };


