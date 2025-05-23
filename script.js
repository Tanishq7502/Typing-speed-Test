const quotes = {
  easy: [
    "Hello world.",
    "Typing is fun.",
    "Practice makes perfect."
  ],
  medium: [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript makes web pages interactive and dynamic.",
    "Typing is a skill that improves with practice."
  ],
  hard: [
    "Success is the sum of small efforts repeated day in and day out.",
    "A journey of a thousand miles begins with a single step.",
    "Consistency is what transforms average into excellence."
  ]
};

let quoteText = "";
let startTime;
let timerInterval;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("inputArea");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

function startTest() {
  const difficulty = document.getElementById("difficulty").value;
  const quoteSet = quotes[difficulty];
  quoteText = quoteSet[Math.floor(Math.random() * quoteSet.length)];
  quoteEl.textContent = quoteText;

  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();

  startTime = new Date().getTime();
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  inputEl.removeEventListener("input", handleTyping);
  inputEl.addEventListener("input", handleTyping);
}

function updateTimer() {
  const elapsed = Math.floor((new Date().getTime() - startTime) / 1000);
  timerEl.textContent = elapsed;
}

function handleTyping() {
  const enteredText = inputEl.value;
  const correctChars = countCorrectChars(enteredText, quoteText);
  const totalChars = enteredText.length;

  const timeElapsed = (new Date().getTime() - startTime) / 60000;
  const wordCount = enteredText.trim().split(/\s+/).filter(Boolean).length;
  const wpm = Math.round(wordCount / timeElapsed);

  const accuracy = totalChars === 0
    ? 100
    : Math.round((correctChars / totalChars) * 100);

  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyEl.textContent = accuracy + "%";

  if (enteredText === quoteText) {
    clearInterval(timerInterval);
    inputEl.disabled = true;
  }
}

function countCorrectChars(input, target) {
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === target[i]) correct++;
  }
  return correct;
}

  
