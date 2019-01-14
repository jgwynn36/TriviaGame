$(document).ready(function () {
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: "In the special episode SpongeBob's House Party, who of the following used SpongeBob's three-sided comb?",
        q2: "Which of the following things has Patrick never mistaken for Squidward?",
        q3: "Which of the following is NOT a Patrick quote?",
        q4: 'Which of the following episodes does Mr. Krabs never appear in?',
    },
    options: {
        q1: ["Mr. Krabs", "Patrick", "Sandy", "Larry the Lobster"],
        q2: ["A pistachio ice cream cone", "A fire hydrant", "A wax sculpture", "A creature of an unknown species named Smelly"],
        q3: ["We should take Bikini Bottom and push it somewhere else!", "Good grief! He's naked!", "It's booger time!", "I hate this channel."],
        q4: ["PreHibernation Week", "Ghoul Fools", "You Don't Know Sponge", "A Day Without Tears"],
    },
    answers: {
        q1: 'Larry the Lobster',
        q2: 'A creature of an unknown species named Smelly',
        q3: "Good grief! He's naked!",
        q4: 'A Day Without Tears',
    },

    // method to initialize game
    startGame: function () {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();
        $('#results').html('');
        $('#timer').text(trivia.timer);
        $('#start').hide();
        $('#remaining-time').show();
        trivia.nextQuestion();
    },

    nextQuestion: function () {
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    timerRunning: function () {
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        } else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        } else if (trivia.currentSet === Object.keys(trivia.questions).length) {
            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');

            $('#game').hide();
            $('#start').show();
        }
    },

    guessChecker: function () {
        var resultId;
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        } else {
            $(this).addClass('btn-danger').removeClass('btn-info');
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },

    guessResult: function () {
        trivia.currentSet++;
        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();

    }

}