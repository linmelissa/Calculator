// basic arithmetics

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            if (num2 === 0) return "Can't divide by zero!!!";
            else return divide(num1, num2);
        default:
            return null;
    }
}

// variables
let num1 = '';
let num2 = '';
let operator = null;
let answer = null;

const currentScreen = document.getElementById("current-screen");
const lastScreen = document.getElementById("last-screen");

let input = "";
let buttonData;
let decimalUsed = false;
let operatorPressed = 0;


// get button data
const buttons = document.getElementById('buttons-container');
buttons.addEventListener('click', getButtonData);

function getButtonData(event) {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    buttonData = event.target.id;
    calculate(buttonData);
}

function calculate(buttonData) {
    // check button data if number or operator
    // if number
    if (currentScreen.textContent === "0") {
        // when empty, do nothing when clear and delete is pressed
        if (buttonData === "clear" || buttonData === "delete") {
            lastScreen.textContent = "";
            return;
        }
        if (buttonData === ".") {
            currentScreen.textContent = "0.";
            decimalUsed = true;
        }
        else {
            currentScreen.textContent = buttonData;
            input += buttonData;
        }
    }
    else {
        figureOutButtons(buttonData);
    }
}

// erases last character of string
function deleteButton() {
    if (currentScreen.textContent.slice(-1) === ".") {
        decimalUsed = false;
    }
    currentScreen.textContent = currentScreen.textContent
    .toString()
    .slice(0, -1)
    input = input.slice(0, -1);
}

// resets calculator/variables
function clearButton() {
    currentScreen.textContent = "0";
    lastScreen.textContent = "";
    input = "";
    decimalUsed = false;
    operatorPressed = 0;
}

// figures out what user inputs and appends to screen
function figureOutButtons(buttonData) {
    switch(buttonData) {
        case "add":
            currentScreen.append("+");
            input += "+";
            operatorPressed += 1;
            break;
        case "subtract":
            currentScreen.append("-");
            input += "-";
            operatorPressed += 1;
            break;
        case "multiply":
            currentScreen.append("x");
            input += "x";
            operatorPressed += 1;
            break;
        case "divide":
            currentScreen.append("/");
            input += "/";
            operatorPressed += 1;
            break;
        case ".":
            if (!decimalUsed) {
                currentScreen.append(".")
                input += ".";
                decimalUsed = true;
            }
            break;
        case "clear":
            clearButton();
            break;
        case "delete":
            // remove last character of string
            deleteButton();
            break;
        case "equals":
            // do operation
            lastScreen.textContent = currentScreen.textContent;
            currentScreen.textContent = "";
            currentScreen.append(evaluateInput(input));
            input = answer.toString();
            operatorPressed = 0;
            decimalUsed = false;
            break;
        default:
        currentScreen.append(buttonData);
        input += buttonData;
        break;
    }
}

// evaluates input, returns solution of equation
function evaluateInput(input) {
    let inputArray = createInputArray(input);
    // gets num1, num2, and operator from input
    // loops through indexes of array and finds operator and then populates variables
    // this method only works for two inputs
    for (i = 0; i < inputArray.length; i++) {
        if (isNaN(Number(inputArray[i]))) { // operator
            num1 = Number(inputArray[i-1]);
            num2 = Number(inputArray[i+1]);
            operator = inputArray[i];
            answer = roundAnswer(operate(operator, num1, num2));
        }
    }
    return answer;
}


// rounds answer
function roundAnswer(number) {
    return Math.round(number * 1000) / 1000
}

// turn input into array separating by numbers and operator
// works with decimal numbers and multi-digit numbers
function createInputArray(input) {
    let inputArray = [];
    let num = "";
    for (i = 0; i < input.length + 1; i++) {
        if (input.charAt(i) == "") { // used to add last digit of equation
            inputArray.push(num); // adds num that's been passed into an array as one number
            num = ""; // resets num to blank string
        }
        else if (isNaN(parseInt(input.charAt(i)))) { // encounters non-number
            if (input.charAt(i) === ".") { // if decimal
                num += input.charAt(i);
            }
            else { // not decimal so it means it's an operator
                inputArray.push(num); // adds num that's been passed into an array as one number
                num = ""; // resets num to blank string
                inputArray.push(input.charAt(i)); // also add operator
            }
            
        } 
        else {
            num += input.charAt(i); // ex. 23 adds 2 and 3 into num into 23
        }
    }
    return inputArray;
}

function isDecimal(number) {
    var result = (number - Math.floor(number)) !== 0; 
   
    if (result) return true; // if decimal return true
    else return false;
}