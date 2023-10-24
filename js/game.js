import formatData from "./helper.js";

const loader = document.querySelector("#loader");
const container = document.querySelector("#container");
const questionText = document.querySelector("#question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.querySelector("#score");
const nextButton = document.querySelector("#next-button");
const questionNumber = document.querySelector("#question-number");
const finishButton = document.querySelector("#finish-button");
const errorText = document.querySelector("#error");

const level = localStorage.getItem("level") || "medium";

const CORRECT_BONUS = 10;
const BASE_URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(BASE_URL);
    const json = await response.json();
    formatedData = formatData(json.results);
    start();
  } catch (error) {
    loader.style.display = "none";
    errorText.style.display = "block";
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answer, corroctAnswerIndex } = formatedData[questionIndex];
  correctAnswer = corroctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answer[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  const isCorroct = index === correctAnswer ? true : false;
  if (isCorroct) {
    event.target.classList.add("corroct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorroct");
    answerList[correctAnswer].classList.add("corroct");
  }
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formatedData.length) {
    removeClass();
    showQuestion();
    isAccepted = true;
  } else {
    finishHandler();
  }
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("end.html");
};

const removeClass = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
