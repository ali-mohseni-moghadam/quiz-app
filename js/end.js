const score = localStorage.getItem("score");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreButton = document.querySelector("p");
const saveInput = document.querySelector("input");
const saveButton = document.querySelector("button");

scoreButton.innerText = score;

const saveName = () => {
  const savedName = saveInput.value;
  if (!savedName || !score) {
    alert("invalid username or score");
  } else {
    const finalScore = { name: savedName, score: score };
    highScores.push(finalScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("score");
    window.location.assign("/");
  }
};

saveButton.addEventListener("click", saveName);
