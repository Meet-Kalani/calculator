// . point value add this functionality
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

display.addEventListener('keypress', function (event) {
    const key = event.key;
    
    if (key === 'Enter') {
        calculate();
    }
});

function clearDisplay() {
    display.value = "";
    display.focus();
}

function calculate() {
    try{
        display.value = eval(display.value);
    } catch(err){
        console.error(err);
        display.value = "Error!";
    }
}

function backspace() {
    display.value = display.value.slice(0, display.value.length - 1);
}

function appendToDisplay(value) {
    if(display.value === "Error!" || display.value === "Infinity"){
        display.value = "";
    } else if (['+', '-', '*', '/'].includes(display.value.slice(-1)) && ['+', '-', '*', '/'].includes(value)) {
        return;
    }
    display.value += value;  
}