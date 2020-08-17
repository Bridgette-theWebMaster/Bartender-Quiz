'use strict';
// defining a few variable used throughout
let shots = 5;
let questionNum = 0;
let currentQuestion = 0;

// when the user clicks the begin button
function startQuiz() {
    $('.altBox').hide();
    $('.beginQuiz').on('click', '.startButton', function (event){
        $('.startButton').hide();
        $('.questionNum').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(renderQuestions());
    });
}
// display question
function renderQuestions(){
    if(questionNum < STORE.length){
        return questionForm(questionNum);
    }else{
        $('.questionBox').hide();
        endQuiz();
        $('.questionNum').text(5);
    }
}

// display question number and shots to take
function updateQuestion(){
    questionNum++;
    $('.questionNum').text(questionNum + 1);
}
function updateShots(){    
    shots--;
    $('.shots').text(shots);
}

function resetQuiz(){
    shots = 5;
    questionNum = 0;
    $('.shots').text(5);
    $('.questionNum').text(0);
}

function submitAnswer(){
    $(".theBar").on('submit', function(event){
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNum].correctAnswer;
        if (answer === correct){
            correctAnswer();
        }else{
            wrongAnswer();
        }
    });
}

// html question form
function questionForm(questionIndex){
    let formMaker = $(`<form>
    <fieldset>
        <legend class= "questionText">${STORE[questionIndex].question}
        </legend>
    </fieldset>
</form>`)
    let answerSelector = $(formMaker).find('fieldset');
    STORE[questionIndex].answer.forEach(function (answerValue, answerIndex){
        $(`<label class="bookMark" for=${answerIndex}">
        <input class= "radio" type= "radio" id= "${answerIndex}" value= "${answerValue}" name= "answer" required>
        <span>${answerValue}</span>
        </label>`).appendTo(answerSelector);
    });
    $(`<button type= "submit" class= "submitButton button">Submit</button>`).appendTo(answerSelector);
    return formMaker;
}
// correct and incorrect reponse
function correctAnswer(){
    $('.response').html(`
        <h3>You're right!</h3>
        <button type= "button" class= "nextButton button">Next</button>
    `);
}
function wrongAnswer(){
    $('.reponse').html(`
        <h3>Your answer is not correct.</h3>
        <p>The correct answer is:</p>
        <p>${STORE[questionNum].correctAnswer}</p>
        <button type= "button" class= "nextButton button">Next</button>
    `);    
    updateShots();
}

// move on to the next question
function nextQuestion(){
    $('.theBar').on('click', 'nextButton', function(event){
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNum();
        $('.questionBox form').replaceWith(renderQuestions());
    });
}

// check progression throughout the quiz
function quizProgession(){
  $('body').on('click','.nextButton', (event) => {
    STORE.currentQuestion === STORE.questions.length?displayResults() : renderQuestions();
  });
}

// display results
function displayResults(){
    $('.final').show();
    let array = "";
    const pass = [
        "You really know your booze",
        "correctAnswer.jpg"
    ];
    const fail = [
        "At least you kinda tried.",
        "wrongAnswer.jpg",
        "Take ${shots} for your sort effort"
    ];
    if (shots > 2){
        array = pass;
    }else{
        array = fail;
    }
    return $('.final').html(`
        <h3>${array[0]}</h3>
            <img src= "${array[1]}" alt= "${array[2]}" class= "images">
            <h3>You got ${shots} / 5</h3>
            <button type= "submit" class= "restartButton button>Restart</button>
    `)
}

// restarts the quiz
function restartQuiz(){
    $('.theBar').on('click', 'restartButton', function(event){
        event.preventDefault();
        resetQuiz();
        $('.altBox').hide();
        $('.beginQuiz').show();
    });
}

function handleQuizApp() {
    startQuiz();
    renderQuestions();
    restartQuiz();
}

$(handleQuizApp);
