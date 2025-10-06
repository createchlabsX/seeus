const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score');

const startButton = document.getElementById('start-btn');
const landingScreen = document.getElementById('landing-screen');

const bonusIntro = document.getElementById('bonus-intro');
const startBonusButton = document.getElementById('start-bonus-btn');

const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let inBonusRound = false;

// Main Quiz Questions
const questions = [
  { question: 'What does IEP stand for?', answers: [
    { text: 'Individualized Education Program', correct: true },
    { text: 'Inclusive Education Plan', correct: false },
    { text: 'Instructional Equity Program', correct: false },
    { text: 'Individual Education Pathway', correct: false }
  ] },
  { question: 'What is a 504 Plan designed to do?', answers: [
    { text: 'Provide accommodations for students with disabilities', correct: true },
    { text: 'Replace an IEP', correct: false },
    { text: 'Identify gifted students', correct: false },
    { text: 'Provide behavior therapy', correct: false }
  ] },
  { question: 'What does LRE mean?', answers: [
    { text: 'Least Restrictive Environment', correct: true },
    { text: 'Learning Resource Environment', correct: false },
    { text: 'Limited Resource Education', correct: false },
    { text: 'Local Regulation Education', correct: false }
  ] },
  { question: 'What does PWN stand for?', answers: [
    { text: 'Prior Written Notice', correct: true },
    { text: 'Parent Written Notification', correct: false },
    { text: 'Plan With Notes', correct: false },
    { text: 'Professional Written Notice', correct: false }
  ] },
];

// Bonus Scenarios
const scenarios = [
  { question: 'A teacher notices a student struggling and suggests testing for special education. What document should be provided before testing?', answers: [
    { text: 'Prior Written Notice (PWN)', correct: true },
    { text: 'Behavior Intervention Plan (BIP)', correct: false },
    { text: 'Manifestation Determination', correct: false },
    { text: '504 Accommodation Form', correct: false }
  ] },
  { question: 'A parent requests an IEP meeting to review services. The school must respond how?', answers: [
    { text: 'By providing a Prior Written Notice and scheduling within a reasonable time', correct: true },
    { text: 'By denying the request without notice', correct: false },
    { text: 'By waiting until the next school year', correct: false },
    { text: 'By referring the parent to the counselor', correct: false }
  ] },
];

// Start Button
startButton.addEventListener('click', () => {
  landingScreen.classList.add('hide');
  document.getElementById('game').classList.remove('hide');
  startGame();
});

// Bonus Start Button
startBonusButton.addEventListener('click', () => {
  bonusIntro.classList.add('hide');
  currentQuestionIndex = 0;
  inBonusRound = true;
  showQuestion();
});

// Start or Restart Game
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  inBonusRound = false;
  resultContainer.classList.add('hide');
  document.getElementById('game').classList.remove('hide');
  showQuestion();
}

// Show Question
function showQuestion() {
  resetState();
  let currentQuestion = inBonusRound
    ? scenarios[currentQuestionIndex]
    : questions[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

// Reset Answer Buttons
function resetState() {
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Select Answer
function selectAnswer(button, correct) {
  if (correct) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
  }
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
  nextButton.classList.remove('hide');
}

// Next Button
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (!inBonusRound && currentQuestionIndex >= questions.length) {
    // Show Bonus Intro
    document.getElementById('game').classList.add('hide');
    bonusIntro.classList.remove('hide');
  } else if (inBonusRound && currentQuestionIndex >= scenarios.length) {
    showResults();
  } else {
    showQuestion();
  }
});

// Show Results
function showResults() {
  document.getElementById('game').classList.add('hide');
  bonusIntro.classList.add('hide');
  resultContainer.classList.remove('hide');
  scoreText.innerText = `${score} / ${questions.length + scenarios.length}`;
}

// Restart Button
restartButton.addEventListener('click', () => {
  landingScreen.classList.remove('hide');
  resultContainer.classList.add('hide');
});
