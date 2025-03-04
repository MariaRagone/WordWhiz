//promise chaining

const wordUrl = "https://words.dev-apis.com/word-of-the-day";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomNumber = getRandomInt(1, 100);

const randomWordUrl = `https://words.dev-apis.com/word-of-the-day?random=${randomNumber}`;
console.log(randomWordUrl);

const res = await fetch(randomWordUrl);
const { word: wordRes } = await res.json();
const word = wordRes.toUpperCase();
const wordParts = word.split("");
console.log(word);

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

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
};

document
  .querySelector(".tester-input")
  .addEventListener("keydown", function (event) {
    if (!isLetter(event.key)) {
      event.preventDefault();
    }
  });
