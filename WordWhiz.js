// const wordUrl = "https://words.dev-apis.com/word-of-the-day";
const letters = document.querySelectorAll(".game-letter");
const loadingDiv = document.querySelector("info-bar");
const answerLength = 5;

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// let randomNumber = getRandomInt(1, 100);

// const randomWordUrl = `https://words.dev-apis.com/word-of-the-day?random=${randomNumber}`;
// console.log(randomWordUrl);

const play = async () => {
  let currentGuess = "";
  const currentRow = 0;

  const addLetter = (letter) => {
    if (currentGuess.length < answerLength) {
      currentGuess += letter;
    } else {
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[answerLength * currentGuess + currentGuess.length - 1].innerText =
      letter;
  };

  const commit = async () => {
    if (currentGuess.length !== answerLength) {
      //do nothing
      return;
    }
    currentRow++;
    currentGuess = "";
  };
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

play();

// const words = document.getElementById("word-target");

// const getWord = async () => {
//   const promise = await fetch(randomWordUrl);
//   const processedResult = await promise.json();
//   const word = document.createElement("word");
//   word = processedResult.word;
//   console.log(word);
//   words.appendChild(word);
// };

// document.getElementById("get-word-btn").addEventListener("click", getWord);

// const validateWord = async () => {
//   const promise = await fetch(validateUrl, {
//     method: 'POST',
//     body: JSON.stringify({"word": "intent"})}
// const processedResult = await promise.json()

//   }

document
  .querySelector(".tester-input")
  .addEventListener("keydown", function (event) {
    if (!isLetter(event.key)) {
      event.preventDefault();
    }
  });
