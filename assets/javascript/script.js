const display = document.querySelector('.display-number');
const numberElements = document.querySelectorAll('.number');
const operatorElements = document.querySelectorAll('.operator');
const clearElement = document.querySelector('.clear');
const equalsElement = document.querySelector('.equals');
const backspaceElement = document.querySelector('.backspace');

numberElements.forEach(numberBtnElement => {
    numberBtnElement.addEventListener('click', () => {
        appendToDisplay(numberBtnElement.value);
    })
})

clearElement.addEventListener('click', clearDisplay)

equalsElement.addEventListener('click', calculate);

backspaceElement.addEventListener('click', backspace);

// check this case 102.30.2
display.addEventListener('keypress', function (event) {
    const key = event.key;
    let isPointUsed = false;
    if(key === ".") {
        isPointUsed = true;
    }

    let allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/','.'];

    console.log(isPointUsed && key === '.');
    console.log(!allowedKeys.includes(key) || isPointUsed && key === '.') 
    if (!allowedKeys.includes(key)) {
        // Prevent the input if the key is not allowed
        event.preventDefault();
    }

    if (allowedKeys.includes(key) && (display.value === "Error!" || display.value === "Infinity")) {
        display.value = "";
    }

    if (key === 'Enter') {
        calculate();
    }
});

function clearDisplay() {
    display.value = "";
    display.focus();
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (err) {
        // check thiscase it should not be log error to console but handle it properly
        console.error(err);
        display.value = "Error!";
    }
}

function backspace() {
    display.value = display.value.slice(0, display.value.length - 1);
}

function appendToDisplay(value) {
    if (display.value === "Error!" || display.value === "Infinity") {
        display.value = "";
    } else if (['+', '-', '*', '/'].includes(display.value.slice(-1)) && ['+', '-', '*', '/'].includes(value)) {
        return;
    }
    display.value += value;
}