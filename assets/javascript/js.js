$(document).ready(function () {
    $("#start").on("click", gameState.startTimer);

});

//Handles the Game (start, countdown, stop, and end game if time is up )
var gameState = {
    timeRemaining: 60,
    startTimer: function () {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start").hide();
        trivia.displayQuestions();
    },

    countdown: function () {
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    stopTimer: function () {
        clearInterval();
        trivia.checkAnswers();
    },

    showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
        $("#end-page").show();
        $("#questions").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct answers (Woo-hoo!): " + numCorrect);
        $("#incorrect-answers").text("Incorrect answers (D'oh!): " + numIncorrect);
        $("#unanswered").text("Skipped questions (Meh): " + numUnanswered);
    }
}

var trivia = {
    displayQuestions: function () {
        let currQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
        var currAnswer = Object.values(answerBank)[trivia.currentSet];

        $('#questions').append('<h3>' + currQuestion + '</h3>');

        $('#answers').append('<h3>' + currAnswer + '</h3>'); 
    }
}

var questionBank = ["In the special episode SpongeBob's House Party, who of the following used SpongeBob's three-sided comb?", "Which of the following things has Patrick never mistaken for Squidward?", "Which of the following is NOT a Patrick quote?", "Which of the following episodes does Mr. Krabs never appear in?"];

answerBank = [{
    answer1: ["Mr. Krabs", "Patrick", "Sandy", "Larry the Lobster"],
    answer2: ["A pistachio ice cream cone", "A fire hydrant", "A wax sculpture", "A creature of an unknown species named Smelly"],
    answer3: ["We should take Bikini Bottom and push it somewhere else!", "Good grief! He's naked!", "It's booger time!", "I hate this channel."],
    answer4: ["PreHibernation Week", "Ghoul Fools", "You Don't Know Sponge", "A Day Without Tears"],
}];
var correct = [3, 3, 1, 3];

var photo = ["assets/images/house-party.jpeg", "assets/images/thing.jpeg", "assets/images/best-episode.jpeg", "assets/images/mr-krabs.jpeg"];