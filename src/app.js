import { success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

defaultModules.set(PNotifyMobile, {});

const keys = ["a", "s", "d", "f", "j", "k", "l", "q", "w", "e"];

let currentKeyIndex = 0;

const keyEl = document.getElementById("key");
const newGameBtn = document.getElementById("new-game");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

function setCurrentKey() {
  keyEl.textContent = keys[currentKeyIndex];
}

shuffle(keys);
setCurrentKey();

document.addEventListener("keydown", event => {
  const pressedKey = event.key.toLowerCase();
  const correctKey = keys[currentKeyIndex];

  if (pressedKey === correctKey) {
    success({
      text: "Правильно!",
      delay: 1000,
    });

    currentKeyIndex += 1;

    if (currentKeyIndex === keys.length) {
      success({
        text: "Вітаємо! Ви виграли гру!",
      });
      currentKeyIndex = 0;
    }

    setCurrentKey();
  } else {
    error({
      text: `Помилка! Очікувалась клавіша "${correctKey}"`,
      delay: 1500,
    });
  }
});

document.addEventListener("keypress", event => {
  event.preventDefault();
});

newGameBtn.addEventListener("click", () => {
shuffle(keys);
currentKeyIndex = 0;
setCurrentKey();

  success({
    text: "Нова гра розпочата!",
    delay: 1200,
  });
});