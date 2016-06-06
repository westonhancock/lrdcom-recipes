
    
    var questions = [1601,1602,1603,1603];
    
    
    
    
    function changeAnswer() {
        
        var questions = []; 
        $("#child_selection option").each(function() {
            var val = $(this).val();
            if (val !== "none") {
                questions.push(val);
            }
        });
        console.log("questions: " + questions);
        
        if (questions.length > 0) {
            var number = 0 + Math.floor(Math.random() * questions.length);
            console.log("picking q " + number + " of " + questions.length);
            changeQuestion(questions[number]);   
        }   
        
        function changeQuestion(questionId) {
            setTheme();
            clearTimeout(poller);
            showResults(questionId);
        }
    }
    
    
    
    