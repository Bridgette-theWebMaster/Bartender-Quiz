'use strict';
//defining a few variables
let shots = 5;
let questionNum = 0;
let trackScore = 0;

// when the user clicks the begin button start the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.beginQuiz').on('click', '.startButton', function (event) {
    $('.beginQuiz').hide();
    $('.questionNum').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(renderQuestion());
  });
}

// display current question
function renderQuestion() {
  if (questionNum < STORE.length) {
    return createQuestion(questionNum);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNum').text(5);
  }
}

// update shots to be taken with each right or wrong answer
//update question
function updateScore() {
  shots--;
  trackScore++;
  $('.shots').text(shots);
}
function updateQuestionNumber() {
  questionNum++;
  $('.questionNum').text(questionNum + 1);
}

// reset question number and shots to be taken
function resetQuiz() {
  shots = 5;
  questionNumber = 0;
  $('.shots').text(0);
  $('.questionNum').text(0);
}



//submits a selected answer and return appropriate response
function submitAnswer() {
  $('.theBar').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNum].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

// html question form
function createQuestion(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answer.forEach(function (answerValue, answerIndex) {
    $(`<label class="bookMark" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

// correct and incorrect response
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
    <button type="button" class="nextButton 
    button">Next</button>`
  );
  updateScore();
}
function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer...</h3>
    <p class="bookMark">It's actually:</p>
    <p class="bookMark">${STORE[questionNum].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

// move on to the next question
function nextQuestion() {
  $('.theBar').on('click', '.nextButton', function (event) { 
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(renderQuestion());
  });
}

//display results
function finalScore() {
  $('.final').show();
    let array = [];
    const pass = [
        "You really know your booze.",
        "correctAnswer.jpg"
    ];
    const fail = [
        "At least you kinda tried.",
        "wrongAnswer.jpg"
    ];
    if (shots > 3){
        array = fail;
    }else{
        array = pass;
    }
    return $('.final').html(`
        <h3>${array[0]}</h3>
            <img src= "${array[1]}"class= "images">
            <h3>Take ${shots} shot(s) for your effort.</h3></br>
            <p> Your score: ${trackScore} / 5</p>
            <button type= "submit" class= "restartButton button">Restart</button>
    `)
}

// restarts the quiz
function restartQuiz() {
  $('.theBar').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetQuiz();
    $('.altBox').hide();
    $('.beginQuiz').show();
  });
}

//runs the functions
function makeQuizApp() {
  startQuiz();
  renderQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuizApp);
