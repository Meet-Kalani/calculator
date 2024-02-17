const display = document.querySelector('.display');
const numberElements = document.querySelectorAll('.number');
const operatorElements = document.querySelectorAll('.operator');
const clearElement = document.querySelector('.clear');
const equalsElement = document.querySelector('.equals');
const backspaceElement = document.querySelector('.backspace');

let total = "";

numberElements.forEach(numberBtnElement => {
    numberBtnElement.addEventListener('click', () => {
        display.textContent += numberBtnElement.value;
        total += numberBtnElement.value;
        console.log(total)
    })
})

operatorElements.forEach(operatorElement => {
    operatorElement.addEventListener('click', () => {
        
    })
})

clearElement.addEventListener('click', () => {
    display.textContent = 0;
    total = 0;
})

equalsElement.addEventListener('click', () => {

})

backspaceElement.addEventListener('click', () => {
    display.textContent = total = display.textContent.slice(0,display.textContent.length - 1);
})