const answerLength = 5;
const rounds = 6;
const letters = document.querySelectorAll(".game-letter");
const loadingDiv = document.querySelector(".info-bar");
const wordUrl = "https://words.dev-apis.com/word-of-the-day?random=1";
const validateWordUrl = "https://words.dev-apis.com/validate-word";

// I like to do an async play function so I can use "await"
async function play() {
  // the state for the app
  let currentRow = 0;
  let currentGuess = "";
  let done = false;
  let isLoading = true;

  // nab the word of the day
  const res = await fetch(wordUrl);
  const { word: wordRes } = await res.json();
  const word = wordRes.toUpperCase();
  console.log(word);
  const wordParts = word.split("");
  isLoading = false;
  setLoading(isLoading);

  function addLetter(letter) {
    if (currentGuess.length < answerLength) {
      currentGuess += letter;
    } else {
      current = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[currentRow * answerLength + currentGuess.length - 1].innerText =
      letter;
  }

  // user tries to enter a guess
  async function commit() {
    if (currentGuess.length !== answerLength) {
      // do nothing
      return;
    }

    isLoading = true;
    setLoading(isLoading);
    const res = await fetch(validateWordUrl, {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });
    const { validWord } = await res.json();
    isLoading = false;
    setLoading(isLoading);

    // not valid, mark the word as invalid and return
    if (!validWord) {
      markInvalidWord();
      return;
    }

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);
    let allRight = true;

    // first pass just finds correct letters so we can mark those as
    // correct first
    for (let i = 0; i < answerLength; i++) {
      if (guessParts[i] === wordParts[i]) {
        // mark as correct
        letters[currentRow * answerLength + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    // second pass finds close and wrong letters
    // we use the map to make sure we mark the correct amount of
    // close letters
    for (let i = 0; i < answerLength; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing
      } else if (map[guessParts[i]] && map[guessParts[i]] > 0) {
        // mark as close
        allRight = false;
        letters[currentRow * answerLength + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        // wrong
        allRight = false;
        letters[currentRow * answerLength + i].classList.add("wrong");
      }
    }

    currentRow++;
    currentGuess = "";
    if (allRight) {
      // win
      alert("you win");
      document.querySelector(".brand").classList.add("winner");
      done = true;
    } else if (currentRow === rounds) {
      // lose
      alert(`you lose, the word was ${word}`);
      done = true;
    }
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[currentRow * answerLength + currentGuess.length].innerText = "";
  }

  function markInvalidWord() {
    for (let i = 0; i < answerLength; i++) {
      letters[currentRow * answerLength + i].classList.remove("invalid");

      setTimeout(
        () => letters[currentRow * answerLength + i].classList.add("invalid"),
        10
      );
    }
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoading) {
      // do nothing;
      return;
    }

    const action = event.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle("show", isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }
  return obj;
}

play();
