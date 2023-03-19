let enterClicked; // = true;
let num1;
let num2;
let lastOperation = '';
// Check to see if a number has been chosen after selecting an operation
let noNewNumber = true;
const displayDigit = function(digit){
    if (noNewNumber){
        document.getElementById('display').textContent = '0';
    }
    let currentNumber = String(document.getElementById('display').textContent);
    // Only allow one decimal at a time
    
    if (digit === '.' && currentNumber.includes(digit)){
        return;
    }
    if (currentNumber === '0' || enterClicked){
        // If '.' selected -> determine if a leading 0 should be added
        if (digit === '.' && currentNumber === '0'){
            currentNumber += String(digit);
        } else if (digit === '.' && enterClicked){
            currentNumber = '0.';
        } else {
            // The selected digit it not a decimal. Add the number
            currentNumber = String(digit);
        }
    } else {
        currentNumber += String(digit);
    }
    enterClicked = false;
    noNewNumber = false;
    document.getElementById('display').textContent = currentNumber;
}

const clearEntry = function(){
    document.getElementById('display').textContent = '0';
    noNewNumber = true;
    num1 = 0;
    num2 = 0;
    lastOperation = '';
}

const divide = function(num1, num2){
    if (num2 === 0){
        let answers = ["Can't do that", "Please No", "Aaaaa!"];
        noNewNumber = true;
        return answers[Math.floor(Math.random()*answers.length)];
    } else {
        return num1/num2;
    }
}

const multiply = function(num1, num2){
    return num1 * num2;
}

const subtract = function(num1, num2){
    return num1 - num2;
}

const add = function(num1, num2){
    return num1 + num2;
}

const operate = function(currentOperation){
    // Check to see if an operation has occured
    let total = 0;
    if (lastOperation === '' || noNewNumber ){
        num1 = Number(document.getElementById('display').textContent);
    } else {
        // Perform the last operation, and update with the new number
        num2 = Number(document.getElementById('display').textContent);
        total = evaluate(num1, num2, lastOperation);
        num1 = total;
        document.getElementById('display').textContent = total;
    }
    lastOperation = currentOperation;
    noNewNumber = true;
}

const evaluate = function(num1, num2, lastOperation){
    if (lastOperation === 'divide'){
        total = divide(num1,num2);
    } else if (lastOperation === 'multiply'){
        total = multiply(num1, num2);
    } else if (lastOperation === 'add'){
        total = add(num1, num2);
    } else if (lastOperation === 'subtract'){
        total = subtract(num1, num2);
    }
    return total;
}

const equals = function(){
    // Check to make sure that there is a number, and an operator
    if (!(noNewNumber || lastOperation === '')){
        num2 = Number(document.getElementById('display').textContent);
        total = evaluate(num1, num2, lastOperation);
        document.getElementById('display').textContent = total;
        num1 = total;
        lastOperation = '';
    }
}

const plusMinus = function(){
    let num = Number(document.getElementById('display').textContent);
    if (!isNaN(num)){
        num1 = num * -1;
        document.getElementById('display').textContent = num1;
    }
}

const sqrt = function(){
    let num = Number(document.getElementById('display').textContent);
    if (!isNaN(num)){
        if (num < 0){
            document.getElementById('display').textContent = 'Why?';
        } else {
            num1 = Math.sqrt(num);
            document.getElementById('display').textContent = num1;
        }
    }
}




// Go through each number button and display on the display
numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click',() => {
        displayDigit(number.value);
    });
});

// Go through the operation buttons /x+- 
operations = document.querySelectorAll('.function');
operations.forEach(operation => {
    operation.addEventListener('click', () => {
        operate(operation.value);
    });
});