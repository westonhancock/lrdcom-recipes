
function changeAnswer(interval) {

    var questions = [];
    $("#child_selection option").each(function () {
        var val = $(this).val();
        if (val !== "none") {
            questions.push(val);
        }
    });


    console.log("questions: " + questions);

    var selectedIndex = null;

    function showNextQuestion() {
        if (questions.length > 0) {
            if (selectedIndex == null || (selectedIndex > questions.length)) { selectedIndex = 0; }
            else { selectedIndex += 1; }

            console.log("picking q " + selectedIndex + " of " + questions.length);
            changeQuestion(questions[selectedIndex]);
        }
    }
    function changeQuestion(questionId) {
        setTheme();
        clearTimeout(poller);
        showResults(questionId);
    }
    var timer = setInterval(showNextQuestion, interval);
}



