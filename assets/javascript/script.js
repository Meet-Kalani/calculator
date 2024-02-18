// . point value add this functionality
const display = document.querySelector('.display-number');
const numberElements = document.querySelectorAll('.number');
const operatorElements = document.querySelectorAll('.operator');
const clearElement = document.querySelector('.clear');
const equalsElement = document.querySelector('.equals');
const backspaceElement = document.querySelector('.backspace');

let total = "";
let operand = "";

numberElements.forEach(numberBtnElement => {
    numberBtnElement.addEventListener('click', () => {
        appendToDisplay(numberBtnElement.value);
    })
})

clearElement.addEventListener('click', clearDisplay)

equalsElement.addEventListener('click', calculate);

backspaceElement.addEventListener('click', backspace);

display.addEventListener('keypress', function (event) {
    const key = event.key;
    
    if (key === 'Enter') {
        calculate();
    }
});

function clearDisplay() {
    display.value = total = "";
    display.focus();
}
// error case: if user does 102+ and then enter handle it ---handled
// error case: 10++++
function calculate() {
    // if (["+", "-", "*", "/"].includes(display.value[display.value.length - 1])) {
    //     display.value = display.value.slice(0,display.value.length-1);
    // }
    display.value = eval(display.value);
}

function backspace() {
    display.value = total = display.value.slice(0, display.value.length - 1);
}

function appendToDisplay(value) {
    if (total == 0) {
        display.value = "";
    }
    total = display.value += value;
}