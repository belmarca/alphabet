// app.js

import { words, emojis, emoji } from './words.js';

const keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const alphabet = "abcdefghijklmnopqrstuvwxyz";

const letterBox = (l) => {
  let e = document.createElement("div");
  e.id = l;
  e.className = "lettre";
  e.innerHTML = l;
  e.onclick = (e) => { selectLetter(e.srcElement.id) };
  return e
}

const answerBox = (i) => {
  let e = document.createElement("div");
  e.id = i;
  e.className = "case";
  e.innerHTML = " ";
  return e
}

const clearKeyboard = () => {
  for (let r of keyboard) {
    for (let l of r) {
      let e = document.getElementById(l);
      e.className = "lettre";
    }
  }
}

// Event handler when clicking a letter
const selectLetter = (l) => {
  // Clicked letter
  let p = gameState.pos;

  let el = document.getElementById(p);          // Answer element
  let kl = document.getElementById(l);          // Keyboard element
  let _sp = document.getElementById(`w-${p}`);  // Current letter span
  let sp = document.getElementById(`w-${p+1}`); // Next letter span

  // Correct letter & position
  if (gameState.word.includes(l)) {
    if (gameState.word[p] == l) {
      // Remove "miss" if required
      if (kl.classList.length > 1) {
        kl.classList.remove("miss");
      }
      kl.classList.add("good");   // Highlight key
      el.classList.add("good");   // Highlight answer field
      el.innerHTML = l;           // Populate answer field
      _sp.className = "";         // Remove underline from current letter

      // Done?
      if (gameState.wl === p+1) {
        gameState.g = true;
        return newGame();
      }

      sp.className = "underline"; // Underline next letter
      gameState.pos++;
    } else {
      kl.classList.add("miss");
    }
  } else {
      kl.classList.add("bad");
  }
}

const chooseWord = (() => {
  // Save words in closure
  var _words = words.slice(0);
  return function() {
    // If words are exhausted, re-copy array
    if (_words.length < 1) { _words = words.slice(0); }
    let i = Math.floor(Math.random() * _words.length);
    let w = _words[i];
    // Remove word from closure copy
    _words.splice(i, 1);
    return w;
  };
})();

let gameState = {
  word: "",
  wl: 0,    // word length
  pos: 0,   // current position in word
  g: false, // has already played a game?
}

const newGame = () => {
  const q = document.getElementById("question");
  const m = document.getElementById("message");
  const s = document.getElementById("solution");
  const a = document.getElementById("alphabet");

  if (gameState.g) {
    // Remove previous answer boxes
    s.innerHTML = "";
    clearKeyboard();
  }

  // Select random word
  let word = chooseWord();

  gameState.word = word;
  gameState.wl = word.length;
  gameState.pos = 0;

  q.innerHTML = `${emoji(word)}<br />`;

  // Populate the question div
  for (let i in word) {
    let sp = document.createElement("span");
    sp.innerHTML = word[i];
    sp.id = `w-${i}`;
    q.appendChild(sp);
    s.append(answerBox(i));
  }

  // Underline first letter
  document.getElementById(`w-0`).className = "underline";

  // Draw the keyboard (only once)
  if (!gameState.g) {
    for (let s of keyboard) {
      let r = document.createElement("div");
      for (let l of s) {
        r.appendChild(letterBox(l));
      }
      a.appendChild(r);
    }
  }
}

const app = async () => {
  newGame();

  document.addEventListener('keydown', (e) => {
    if (alphabet.includes(e.key)) {
      selectLetter(e.key);
    }
  });
}

document.addEventListener("DOMContentLoaded", app);
