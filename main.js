const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

const words = {
  programming: ['php', 'javascript', 'go', 'scala', 'fortran', 'r', 'mysql', 'python'],
  movies: ['prestige', 'inception', 'parasite', 'interstellar', 'whiplash', 'memento', 'coco', 'up'],
  people: ['albert einstein', 'hitchcock', 'alexander', 'cleopatra', 'mahatma gandhi'],
  countries: ['syria', 'palestine', 'yemen', 'egypt', 'bahrain', 'qatar']
}

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomValueValue);
let ls = lettersAndSpace.sort();

lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});
let ar = [];
let ars = ar.sort();
let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
            ar.push(span.innerHTML);
            ar.sort();

          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }


    if (ars.toString() === ls.toString()) {
      let div = document.createElement("div");
      let divText = document.createTextNode(
        `Well Played! The Word IS "${randomValueValue.toUpperCase()}".`
      );
      div.appendChild(divText);
      div.className = "popup";
      document.body.appendChild(div);
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over. The Word Is "${randomValueValue.toUpperCase()}".`
  );
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}