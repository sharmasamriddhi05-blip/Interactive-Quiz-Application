/* =====================================================
   1. THE QUESTIONS  -  add or change questions here!
   Each question has:
     question : the text shown
     options  : the answer choices
     answer   : the position of the correct option (0 = first, 1 = second...)
   ===================================================== */
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Tech Modern Language",
      "Hyperlinks and Text Markup Logic",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which language is used to style a web page?",
    options: ["Python", "CSS", "C++", "SQL"],
    answer: 1,
  },
  {
    question: "Which symbol is used for single-line comments in Python?",
    options: ["//", "/* */", "#", "--"],
    answer: 2,
  },
  {
    question: "What is the output of 2 + 3 * 4 in most programming languages?",
    options: ["20", "14", "24", "10"],
    answer: 1,
  },
  {
    question: "Which of these is a version control system?",
    options: ["VS Code", "Chrome", "Git", "Python"],
    answer: 2,
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["func", "function", "define", "def"],
    answer: 3,
  },
  {
    question: "What does a loop do?",
    options: [
      "Stores data in a file",
      "Repeats a block of code",
      "Deletes variables",
      "Connects to the internet",
    ],
    answer: 1,
  },
];

/* =====================================================
   2. GET THE PARTS OF THE PAGE
   ===================================================== */
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCount = document.getElementById("question-count");
const scoreLive = document.getElementById("score-live");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

/* =====================================================
   3. VARIABLES THAT REMEMBER WHERE THE USER IS
   ===================================================== */
let currentQuestion = 0; // which question we are on
let score = 0;           // how many answers are correct so far

/* =====================================================
   4. FUNCTIONS
   ===================================================== */

// Start (or restart) the quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
}

// Show the current question and its answer buttons
function showQuestion() {
  const q = questions[currentQuestion];

  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreLive.textContent = `Score: ${score}`;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = q.question;

  feedback.textContent = "";
  feedback.className = "";
  nextBtn.classList.add("hidden");
  optionsBox.innerHTML = ""; // remove the old buttons

  // Make one button for each option
  q.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.textContent = optionText;
    button.className = "option-btn";
    button.addEventListener("click", () => checkAnswer(index));
    optionsBox.appendChild(button);
  });
}

// Runs when the user clicks an answer
function checkAnswer(chosenIndex) {
  const correctIndex = questions[currentQuestion].answer;
  const buttons = optionsBox.querySelectorAll(".option-btn");

  // Stop the user from answering twice, and show the colors
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("correct");
  });

  if (chosenIndex === correctIndex) {
    score++;
    feedback.textContent = "Correct!";
    feedback.className = "good";
  } else {
    buttons[chosenIndex].classList.add("wrong");
    feedback.textContent = "Wrong answer.";
    feedback.className = "bad";
  }

  scoreLive.textContent = `Score: ${score}`;

  // Change the button text on the last question
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "See results" : "Next question";
  nextBtn.classList.remove("hidden");
}

// Go to the next question, or finish the quiz
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Show the final score screen
function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percent = Math.round((score / questions.length) * 100);
  finalScore.textContent = `You scored ${score} out of ${questions.length} (${percent}%)`;

  if (percent === 100) {
    resultMessage.textContent = "Perfect score! Excellent work.";
  } else if (percent >= 60) {
    resultMessage.textContent = "Good job! A little more practice and you'll ace it.";
  } else {
    resultMessage.textContent = "Keep learning and try again. You can do it!";
  }
}

/* =====================================================
   5. CONNECT THE BUTTONS TO THE FUNCTIONS
   ===================================================== */
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
