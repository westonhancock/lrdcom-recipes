!function(interval) {
    
    
    var questions = null;
    var selectedIndex = null;
    
    $("#parent_selection").change(function() {
        console.log("change detected triggering...");
        setTimeout(run,1000); 
    });
    
    function getQuestions() { 
        var foundQuestions = []
         $("#child_selection option").each(function () {
            var val = $(this).val();
            if (val !== "none") {
                foundQuestions.push(val);
            }
        });
        console.log("questions: " + foundQuestions);
        return foundQuestions;
    }
    
    
    function run() {
        var newQs = getQuestions();
        if (newQs &&  (questions === null) || (newQs.join(",") != questions.join(","))) {
            questions = newQs;
            selectedIndex = null;
        }
        if (questions && questions.length > 0){
            showNextQuestion();
        }
    }
    
    function showNextQuestion() {
        
            if (selectedIndex === null || (selectedIndex+1 >= questions.length)) { selectedIndex = 0; }
            else { selectedIndex += 1; }

            console.log("picking q " + selectedIndex + " of " + questions.length);
            changeQuestion(questions[selectedIndex]);
        
    }
    function changeQuestion(questionId) {
        setTheme();
        clearTimeout(poller);
        showResults(questionId);
    }
    

      




    
    
    setInterval(run,interval);
    
}(10000);



  function showResults(questionId) {
        $("#container").html('');
        $("#container1").html('');
        $("#container2").html('');

        clearTimeout(poller);

        var q = null;

        var eventId = $("#parent_selection").val();
        eventQuestions[eventId].forEach(function (eq) {
            if (eq.questionId == questionId) {
                q = eq;
            }
        });

        if (!q) {
            return;
        }

        if (q.showResponseCount) {
            $('#count').css('display', 'block');
        } else {
            $('#count').css('display', 'none');
        }

        function shortenUrl() {

            var request = gapi.client.urlshortener.url.insert({
                resource: {
                    longUrl: 'https://mdata.liferay.com/web-polls-multiple-answers' + '?eventId=' + eventId
                }
            });
            request.execute(function (response) {
                var shortUrl = response.id;
                $('#shorturl').text(shortUrl);
                $('#shorturlContainer').css('display', 'block');
            });
        }

    gapi.client.setApiKey("AIzaSyCdAI6HcffRBB2AG0dvH5CBB0eQBmKKdbw");
        gapi.client.load("urlshortener", "v1", shortenUrl);

        switch (q.questionType) {
            case 'single':
            case 'multiple':
                switch (q.chartType) {
                    case 'pie':
                        pie(q);
                        break;
                    case 'bar':
                    default:
                        bar(q);
                }
                break;
            case 'ranking':
                stacked(q);
                break;
            case 'rating':
                gauge(q);
                break;
            case 'text':
                wordcloud(q);
                break;
            default:
        }
    }
