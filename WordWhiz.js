// const wordUrl = "https://words.dev-apis.com/word-of-the-day";
const letters = document.querySelectorAll(".game-letter");
const loadingDiv = document.querySelector(".info-bar");
const answerLength = 5;

const randomWordUrl = `https://words.dev-apis.com/word-of-the-day?random=1`;
// console.log(randomWordUrl);

const play = async () => {
  let currentGuess = "";
  const currentRow = 0;

  const res = await fetch(randomWordUrl);
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  setLoading(false);

  console.log(word);
  console.log(randomWordUrl);

  const addLetter = (letter) => {
    if (currentGuess.length < answerLength) {
      currentGuess += letter;
    } else {
      current = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[currentRow * answerLength + currentGuess.length - 1].innerText =
      letter;
  };
  const commit = async () => {
    if (currentGuess.length !== answerLength) {
      // do nothing
      return;
    }

    const guessParts = currentGuess.split("");
    for (let i = 0; i < answerLength; i++) {
      //mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * answerLength + i].classList.add("correct");
      }
    }

    currentRow++;
    currentGuess = "";
  };

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[answerLength * currentRow + currentGuess.length].innerText = "";
  }
  document.addEventListener("keydown", function handleKeyDown(event) {
    const action = event.key;
    console.log(action);
    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      //do nothing
    }
  });
};

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
};

function setLoading(isLoading) {
  loadingDiv.classList.toggle("show", isLoading);
}

play();

document
  .querySelector(".tester-input")
  .addEventListener("keydown", function (event) {
    if (!isLetter(event.key)) {
      event.preventDefault();
    }
  });
