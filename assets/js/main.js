// DOM elements
const displayElement = document.querySelector('.display-number');
const numberElements = document.querySelectorAll('.number');
const operatorElements = document.querySelectorAll('.operator');
const clearElement = document.querySelector('.clear');
const equalsElement = document.querySelector('.equals');
const backspaceElement = document.querySelector('.backspace');
const btnContainer = document.querySelector('.btn-container');

// variable for tracking period use
let isPeriodUsed = false;

btnContainer.addEventListener('click',(event)=>{
    appendToDisplay(event.target.value);
})

clearElement.addEventListener('click', clearDisplay)

equalsElement.addEventListener('click', calculate);

backspaceElement.addEventListener('click', backspace);

function clearDisplay() {
    displayElement.value = "";
    isPeriodUsed = false;
    displayElement.focus();
}

function calculate() {
    try {
        displayElement.value = eval(displayElement.value);
        // for tracking the period on result
        if(displayElement.value.includes('.')){
            isPeriodUsed = true;
        }
    } catch (err) {
        console.error(err);
        displayElement.value = "Syntax Error!";
    }
}

function backspace() {
    const lastCharacter = displayElement.value.slice(-1);
    // tracking period on backspace
    if(['+', '-', '*', '/'].includes(lastCharacter) && isPeriodUsed){
        isPeriodUsed = true;
    }
    displayElement.value = displayElement.value.slice(0, displayElement.value.length - 1);
}

function appendToDisplay(value) {
    const doesLastCharacterHaveOperator = ['+', '-', '*', '/','.'].includes(displayElement.value.slice(-1));
    const doesCurrentValueHaveOperator = ['+', '-', '*', '/','.'].includes(value);

    // error handling
    if (displayElement.value === "Error!" || displayElement.value === "Infinity") {
        displayElement.value = "";
    } else if (doesLastCharacterHaveOperator && doesCurrentValueHaveOperator) {
        return;
    }

    if(['+', '-', '*', '/'].includes(value)){
        isPeriodUsed = false;
    }

    if(isPeriodUsed && value === '.'){
        return;
    }

    if(value === '.'){
        isPeriodUsed = true;
    }

    displayElement.value += value;
}