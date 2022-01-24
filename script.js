var timer = document.querySelector("#timer");
var startGameButton = document.querySelector("#startGame");
var viewHighscore = document.querySelector("#viewHighscore");

var answerOne = document.querySelector("#answer-one");
var answerTwo = document.querySelector("#answer-two");
var answerThree = document.querySelector("#answer-three");
var answerFour = document.querySelector("#answer-four");

var showStart = document.querySelector("#startSection");
var showQuestions = document.querySelector("#questionSection");
var showForm = document.querySelector("#formSection");
var showHighscore = document.querySelector("#highscoreSection");

var highscoreForm = document.querySelector("#highscore");
var highscoreName = document.querySelector("#highscoreName");
var highscoreList = document.querySelector("#highscoreList");

var reset = document.querySelector("#resetButton");
var restart = document.querySelector("#restartButton");

var timerCountdown = 10;

var countdown;

var questionNumber = 0;

var correctAnswer = "";

var quizFinished = false;

var firstQuestion = 
{
    firstAnswer: "one",
    secondAnswer: "two",
    thirdAnswer: "three",
    fourthAnswer: "four",
    answer: answerOne
};

var secondQuestion = 
{
    firstAnswer: "oneone",
    secondAnswer: "twotwo",
    thirdAnswer: "threethree",
    fourthAnswer: "fourfour",
    answer: answerThree
};

var questions = [firstQuestion, secondQuestion];

var highscores = [];

UpdateTimerText(0);

UpdateButtonText();

GetHighscores();

startGameButton.addEventListener("click", function(){

    MakeVisible(showQuestions, showStart);
    
    countdown = setInterval(TimerCountdown, 1000);
});

viewHighscore.addEventListener("click", function()
{
    if(!showStart.classList.contains("none"))
    {
        MakeVisible(showHighscore, showStart);
    }
    else if(!showQuestions.classList.contains("none"))
    {
        MakeVisible(showHighscore, showQuestions);
    }
    else if(!showForm.classList.contains("none"))
    {
        MakeVisible(showHighscore, showForm);
    }
})

answerOne.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerOne)});

answerTwo.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerTwo)});

answerThree.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerThree)});

answerFour.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerFour)});

highscoreForm.addEventListener("submit", HighscoreSubmit)

reset.addEventListener("click", ResetLocal)

restart.addEventListener("click", RestartGame);

function GetHighscores()
{
    if(localStorage.getItem("highscores"))
    {
        var printList = JSON.parse(localStorage.getItem("highscores"));

        for(var i = 0; i < printList.length; i++)
        {
            var listItem = document.createElement("li");
            listItem.classList.add("body-font");
            listItem.textContent = printList[i];
            highscoreList.append(listItem);
            highscores[highscores.length] = listItem.textContent;
        }
    }
};

function HighscoreSubmit(event)
{
    event.preventDefault();
    
    var listItem = document.createElement("li");

    listItem.textContent = highscoreName.value + ": " + timerCountdown;

    listItem.classList.add("body-font");

    highscores[highscores.length] = listItem.textContent;

    localStorage.setItem("highscores", JSON.stringify(highscores));

    highscoreList.append(listItem);

    highscoreName.value = "";

    MakeVisible(showHighscore, showForm);
};

function CheckAnswer(passedButton)
{
    if(correctAnswer === passedButton)
    {
        if(questionNumber + 1 === questions.length)
        {
            UpdateTimerText(0);

            quizFinished = true;
        }
        else
        {
            questionNumber++;
            UpdateButtonText();
        }
        
    }
    else
    {
        if(timerCountdown - 2 >= 0)
        {
            UpdateTimerText(2);
        }
        else
        {
            UpdateTimerText(Math.abs(timerCountdown));
        }
        
    }
};

function MakeVisible(divToShow, divToHide)
{
    divToHide.classList.add("none");
    
    divToShow.classList.remove("none");
};

function ResetLocal(event)
{
    event.preventDefault();

    localStorage.clear();

    while (highscoreList.firstChild) 
    {
        highscoreList.removeChild(highscoreList.firstChild);
    }
};

function RestartGame(event)
{
    event.preventDefault();
    
    timerCountdown = 10;

    questionNumber = 0;

    UpdateTimerText(0);

    quizFinished = false;

    UpdateButtonText();

    MakeVisible(showStart, showHighscore);
};

function TimerCountdown()
{    
    if(timerCountdown > 0)
    {
        UpdateTimerText(1);
    }
    else if(timerCountdown <= 0)
    {
        UpdateTimerText(Math.abs(timerCountdown) - timerCountdown);

        clearInterval(countdown);

        MakeVisible(showForm, showQuestions);
    }
    if(quizFinished === true)
    {
        UpdateTimerText(0);
        
        clearInterval(countdown);

        MakeVisible(showForm, showQuestions);
    }
    if(!showHighscore.classList.contains("none"))
    {
        UpdateTimerText(0);

        clearInterval(countdown);
    }
};

function UpdateButtonText()
{
    answerOne.innerHTML = questions[questionNumber].firstAnswer;
    answerTwo.innerHTML = questions[questionNumber].secondAnswer;
    answerThree.innerHTML = questions[questionNumber].thirdAnswer;
    answerFour.innerHTML = questions[questionNumber].fourthAnswer;
    correctAnswer = questions[questionNumber].answer;   
};

function UpdateTimerText(subtractTime)
{
    timerCountdown = timerCountdown - subtractTime;
    timer.textContent = timerCountdown;
};