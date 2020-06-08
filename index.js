// Note to the instructor: After restarting and erasing multiple times throuought the week, 
// I had to look online for examples (which turned out to be common, repeated methods)
// notes are my attempt to follow how each part works and their function
// I understand this is still rubbish and barley functional
// Once again, I'm not really that intelligent



// The "calculator" itself (list of variables):

const calculator = {
    // the display screen:
    displayValue: '0', 

    // first number you enter: 
    firstOperand: null,
    waitingForSecondOperand: false,

    // class for the operator keys in the HTML:
    operator: null,
};

// self-note: what happens on the display when you press a key:

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;

    } else {

    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    // for console debugging (and testing keys in other areas of the .JS within the console):

// console.log(calculator);
}


// seperate function for the decimal: 

function inputDecimal(dot) {

    if (calculator.waitingForSecondOperand === true) return;

    if (!calculator.displayValue.includes(dot)) {

        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculaton[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    // console.log(calculator);
}

//self-reminder: calculations for each key with the "operator" class in the HTML 

const performCalculaton = {
    "%": (firstOperand, secondOperand) => (firstOperand * secondOperand) / 100,
    // not working


    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand, 
};




// not working (attempt at a square root key):

// function squareRoot() {
//     const display = document.querySelector('.sqrt');
//   calculator.displayValue = Math.squareRoot(calculator.displayValue);
// }



// functions for both clear buttons:

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator)
}

function resetCalculator2() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator)
}


// self-reminder: function to change the display after each new action is performed:

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay()


// const { target } = event;
// const target = event.target;


// self-reminder: button presses for all of the buttons in the html file

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('CE')) {
        resetCalculator2();
        updateDisplay();
        return;
    }

    if (target.classList.contains('√')) {
        squareRoot();
        updateDisplay();
        return;
    }


    // if (target.classList.contains('equal')) {
    //     equalResult();
    //     updateDisplay();
    //     return;
    // }


    inputDigit(target.value);
    updateDisplay();
});

// if (!target.matches('button')) {

//     return;
// }

