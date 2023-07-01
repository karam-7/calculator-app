// Theme Change

const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");
const lightdark = document.querySelector(".lightdark");
const body = document.body;

let touchStartX = 0;
let touchEndX = 0;

theme1.addEventListener("change", () => {
  lightdark.classList.replace("light", "lightdark");
  lightdark.classList.replace("dark", "lightdark");
  theme1.checked = true;
});

theme2.addEventListener("change", () => {
  lightdark.classList.replace("lightdark", "light");
  lightdark.classList.replace("dark", "light");
  theme2.checked = true;
});

theme3.addEventListener("change", () => {
  lightdark.classList.replace("lightdark", "dark");
  lightdark.classList.replace("light", "dark");
  theme3.checked = true;
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      changeToPreviousTheme();
      break;
    case "ArrowRight":
      changeToNextTheme();
      break;
    default:
      break;
  }
});

document.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});

function changeToPreviousTheme() {
  if (body.className === "lightdark") {
    body.className = "dark";
    theme3.checked = true;
  } else if (body.className === "light") {
    body.className = "lightdark";
    theme1.checked = true;
  } else if (body.className === "dark") {
    body.className = "light";
    theme2.checked = true;
  }
}

function changeToNextTheme() {
  if (body.className === "lightdark") {
    body.className = "light";
    theme2.checked = true;
  } else if (body.className === "light") {
    body.className = "dark";
    theme3.checked = true;
  } else if (body.className === "dark") {
    body.className = "lightdark";
    theme1.checked = true;
  }
}

function handleSwipe() {
  const swipeThreshold = 100;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    // Swipe right
    changeToPreviousTheme();
  } else if (swipeDistance < -swipeThreshold) {
    // Swipe left
    changeToNextTheme();
  }
}

// Calulater

const output = document.querySelector(".output");
const input = document.querySelector(".input");
const deleteBtn = document.querySelector("#del");
const resultBtn = document.querySelector("#equals");
const resetBtn = document.querySelector("#clear");
const operands = document.querySelectorAll(".num");
const operatorBtn = document.querySelectorAll(".operator");
let outputText = "";
let inputText = "";
let operation;

function reset() {
  outputText = "";
  inputText = "";
  operation = undefined;
}

function deleteOperand() {
  inputText = inputText.toString().slice(0, -1);
}

function addNumber(number) {
  if (number === "." && inputText.includes(".")) return;
  inputText = inputText.toString() + number.toString();
}

function operationSelection(operate) {
  if (inputText === "") return;
  if (outputText !== "") {
    calculatorOperation();
  }
  operation = operate;
  outputText = inputText;
  inputText = "";
}

function calculatorOperation() {
  let result;
  let prev = parseFloat(outputText);
  let current = parseFloat(inputText);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "x":
      result = prev * current;
      break;

    case "/":
      result = prev / current;
      break;

    default:
      return;
  }
  inputText = result;
  operation = undefined;
  outputText = "";
  output.innerText = "";
}

function displayNum() {
  input.innerText = inputText.toLocaleString("en");
  if (operation !== undefined) {
    output.innerText = `${outputText} ${operation}`;
  } else {
    output.innerText = outputText;
  }
}

function handleKeyboardInput(event) {
  const key = event.key;

  switch (key) {
    case "Enter":
      event.preventDefault();
      calculatorOperation();
      displayNum();
      break;

    case "Backspace":
      event.preventDefault();
      deleteOperand();
      displayNum();
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      event.preventDefault();
      operationSelection(key);
      displayNum();
      break;

    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      event.preventDefault();
      addNumber(key);
      displayNum();
      break;

    case "Delete":
      event.preventDefault();
      reset();
      displayNum();
      break;

    default:
      break;
  }
}

document.addEventListener("keydown", handleKeyboardInput);

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNumber(operand.innerText);
    displayNum();
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.innerText);
    displayNum();
  });
});

resultBtn.addEventListener("click", () => {
  calculatorOperation();
  displayNum();
});
