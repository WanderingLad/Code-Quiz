//#region Variable creation

var timer = document.querySelector("#timer");
var startGameButton = document.querySelector("#startGame");
var viewHighscore = document.querySelector("#viewHighscore");

var theQuestion = document.querySelector("#theQuestion");
var answerOne = document.querySelector("#answerOne");
var answerTwo = document.querySelector("#answerTwo");
var answerThree = document.querySelector("#answerThree");
var answerFour = document.querySelector("#answerFour");
var correctness = document.querySelector("#correctness");

var showStart = document.querySelector("#startSection");
var showQuestions = document.querySelector("#questionSection");
var showForm = document.querySelector("#formSection");
var showHighscore = document.querySelector("#highscoreSection");

var highscoreForm = document.querySelector("#highscore");
var highscoreName = document.querySelector("#highscoreName");
var highscoreList = document.querySelector("#highscoreList");

var reset = document.querySelector("#resetButton");
var restart = document.querySelector("#restartButton");

var timerCountdown = 60;

var countdown;

var questionNumber = 0;

var correctAnswer = "";

var quizFinished = false;

//#region Question Creation

var firstQuestion = 
{
    question: "Which of the following is correct about features of JavaScript?",
    firstAnswer: "JavaScript is is complementary to and integrated with HTML.",
    secondAnswer: "JavaScript is open and cross-platform.",
    thirdAnswer: "Both of the above.",
    fourthAnswer: "All of the above.",
    answer: answerThree
};

var secondQuestion = 
{
    question: "Which of the following is a valid type of function javascript supports?",
    firstAnswer: "Named Function",
    secondAnswer: "Anonymous Function",
    thirdAnswer: "Both of the above",
    fourthAnswer: "None of the above",
    answer: answerThree
};

var thirdQuestion = 
{
    question: "Which built-in method combines the text of two strings and returns a new string?",
    firstAnswer: "append()",
    secondAnswer: "concat()",
    thirdAnswer: "attach()",
    fourthAnswer: "None of the above.",
    answer: answerTwo
};

var fourthQuestion = 
{
    question: "Which of the following function of Number object forces a number to display in exponential notation?",
    firstAnswer: "toExponential()",
    secondAnswer: "toFixed()",
    thirdAnswer: "toPrecision()",
    fourthAnswer: "toLocaleString()",
    answer: answerOne
};

var fifthQuestion = 
{
    question: "Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?",
    firstAnswer: "charAt()",
    secondAnswer: "charCodeAt()",
    thirdAnswer: "concat()",
    fourthAnswer: "indexOf",
    answer: answerTwo
};

var sixthQuestion = 
{
    question: "Which of the following function of String object extracts a section of a string and returns a new string?",
    firstAnswer: "slice()",
    secondAnswer: "split()",
    thirdAnswer: "replace()",
    fourthAnswer: "search",
    answer: answerOne
};

var seventhQuestion = 
{
    question: "Which of the following function of String object returns a string representing the specified object?",
    firstAnswer: "toLocaleUpperCase()",
    secondAnswer: "toUpperCase()",
    thirdAnswer: "toString()",
    fourthAnswer: "substring()",
    answer: answerThree
};

var eigthQuestion = 
{
    question: "Which of the following function of String object causes a string to be displayed in the specified color as if it were in a <font color='color'> tag?",
    firstAnswer: "fixed()",
    secondAnswer: "fontcolor()",
    thirdAnswer: "blink()",
    fourthAnswer: "bold()",
    answer: answerTwo
};

var ninthQuestion = 
{
    question: "Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?",
    firstAnswer: "push()",
    secondAnswer: "join()",
    thirdAnswer: "pop()",
    fourthAnswer: "map()",
    answer: answerFour
};

var tenthQuestion = 
{
    question: "Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?",
    firstAnswer: "unshift()",
    secondAnswer: "sort",
    thirdAnswer: "splice",
    fourthAnswer: "toString()",
    answer: answerOne
};

//#endregion

var questions = [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion, sixthQuestion, seventhQuestion, eigthQuestion, ninthQuestion, tenthQuestion];

var highscores = [];

//#endregion

//#region Base Site Setup

UpdateTimerText(0);

UpdateButtonText();

GetHighscores();

//#endregion

//#region Button OnClick Events

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

//#endregion

//#region Functions

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
            correctness.textContent = "Correct!";
            questionNumber++;
            UpdateButtonText();
        }
        
    }
    else
    {
        if(timerCountdown - 2 >= 0)
        {
            UpdateTimerText(2);

            correctness.textContent = "Incorrect!";
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
    
    timerCountdown = 60;

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
    theQuestion.textContent = questions[questionNumber].question;
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

//#endregion