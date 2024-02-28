"use strict";
// DOM elements
const displayElement = document.querySelector(".display-number");
const clearElement = document.querySelector(".clear");
const equalsElement = document.querySelector(".equals");
const backspaceElement = document.querySelector(".backspace");
const btnContainer = document.querySelector(".btn-container");

// variable for tracking period use
let isPeriodUsed = false;

// event listener for pressing key and operators and validating it
btnContainer.addEventListener("click", (event) => {
  const clickedKey = event.target.value;

  if (!inputValidator(event, clickedKey)) {
    return;
  }

  displayElement.value += clickedKey;
});

// event listener for clearing display(CE) funtionality
clearElement.addEventListener("click", () => {
  displayElement.value = "";
  isPeriodUsed = false;
  displayElement.focus();
});

// event listener for equals(=) funtionality
equalsElement.addEventListener("click", () => {
  try {
    if (!displayElement.value) {
      return;
    }
    const result = parseFloat(eval(displayElement.value).toFixed(10));

    if (result === Infinity) {
      displayElement.value = "Cannot divide by zero";
    } else {
      displayElement.value = result;
    }

    // for tracking the period on result
    if (displayElement.value.includes(".")) {
      isPeriodUsed = true;
    }
  } catch (err) {
    displayElement.value = "Syntax Error!";
  }
});

// event listener for backspace funtionality
backspaceElement.addEventListener("click", () => {
  const lastCharacter = displayElement.value.slice(-1);
  // tracking period on backspace
  if (["+", "-", "*", "/"].includes(lastCharacter) && isPeriodUsed) {
    isPeriodUsed = true;
  }
  displayElement.value = displayElement.value.slice(
    0,
    displayElement.value.length - 1
  );
});

function inputValidator(event, clickedKey) {
  // array of allowed keys
  const allowedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "/",
    "*",
    ".",
  ];
  // validating the input and sanitising it for safeguarding eval() function use
  if (
    event.target.classList.contains("btn-container") ||
    // checking if the operator is entered consecutively
    !checkConsecutiveOperators(clickedKey) ||
    // for skipping operator that are pressed before any operand
    (displayElement.value === "" &&
      ["+", "-", "*", "/"].includes(clickedKey)) ||
    // validating the input
    !allowedKeys.includes(clickedKey) ||
    // for skipping double periods in one operand i.e. 1.0.1
    (isPeriodUsed && clickedKey === ".") ||
    // for skipping any unnecessary 0 after an operator i.e. 575/0000000
    (["+", "-", "*", "/"].includes(displayElement.value.slice(-2, -1)) &&
      displayElement.value.slice(-1) === "0" &&
      clickedKey === "0")
  ) {
    return false;
  }

  // for clearing the error message so user can directly starts entering values instead of clearing the screen
  if (
    displayElement.value === "Syntax Error!" ||
    displayElement.value === "Cannot divide by zero"
  ) {
    displayElement.value = "";
  }

  // Setting the isPeriodUsed variable for further checking of if period is used
  if (["+", "-", "*", "/"].includes(clickedKey)) {
    isPeriodUsed = false;
  } else if (clickedKey === ".") {
    isPeriodUsed = true;
  }
  return true;
}

// function for checking if the operator is entered consecutively
function checkConsecutiveOperators(clickedKey) {
  const doesLastCharacterHaveOperator = ["+", "-", "*", "/", "."].includes(
    displayElement.value.slice(-1)
  );
  const doesCurrentValueHaveOperator = ["+", "-", "*", "/", "."].includes(
    clickedKey
  );

  if (doesLastCharacterHaveOperator && doesCurrentValueHaveOperator) {
    return false;
  }
  return true;
}
