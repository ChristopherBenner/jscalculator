let enterClicked; // = true;
let specialClicked;
let formatError;
let num1;
let num2;
let lastOperation = '';
let memory = 0;
// Check to see if a number has been chosen after selecting an operation
let noNewNumber = true;
const displayDigit = function(digit){
    if (noNewNumber){
        document.getElementById('display').textContent = '0';
    }
    let currentNumber = String(document.getElementById('display').textContent);
    // Prevent from being able to add too many digits
    if (currentNumber.length >= 10 || currentNumber.includes('-') && currentNumber.length >= 11){
        return;
    }
    // Only allow one decimal at a time
    if (digit === '.' && currentNumber.includes(digit)){
        return;
    }
    if (currentNumber === '0' || enterClicked || specialClicked || formatError){
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
    specialClicked = false;
    formatError = false;
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
    // This might have to change to include keystrokes
    if (lastOperation === 'divide'){
        total = divide(num1,num2);
    } else if (lastOperation === 'multiply'){
        total = multiply(num1, num2);
    } else if (lastOperation === 'add'){
        total = add(num1, num2);
    } else if (lastOperation === 'subtract'){
        total = subtract(num1, num2);
    }
   return format(total);
}

const equals = function(){
    // Check to make sure that there is a number, and an operator
    if (!(noNewNumber || lastOperation === '')){
        num2 = Number(document.getElementById('display').textContent);
        total = evaluate(num1, num2, lastOperation);
        total = format(total);
        document.getElementById('display').textContent = total;
        num1 = total;
        lastOperation = '';
    }
}

const special = function(specialOperation){
    let num = Number(document.getElementById('display').textContent);
    if (!isNaN(num)){
        if (specialOperation === 'plusMinus'){
            num *= -1;
        } else if (specialOperation === 'sqrt' && num > 0){
            num = Math.sqrt(num);
        } else if (specialOperation === 'percent'){
            num = num / 100;
        } else if (specialOperation === 'memMinus'){
            memory -= num;
            return;
        } else if (specialOperation === 'memPlus'){
            memory += num;
            return;
        }
    }
    if (specialOperation === 'recall'){
        num = memory;
        noNewNumber = false;
    }
    num = format(num);
    document.getElementById('display').textContent = num;
    specialClicked = true;
}

const format = function(num){
    // Check if number too many digits big or small
    // If includes decimal -> cut off at 10 digits
    num = String(num);
    if (!num.includes('-')){
        if (num.includes('.')){
            num = num.slice(0,10);
        } else if (num.length > 10){
            num = 'Too Big';
            formatError = true;
        }
    } else if (num.includes('-')){
        if (num.includes('.')){
            num = num.slice(0,11);
        } else if (num.length > 11){
            num = 'Too Small';
            formatError = true;
        }
    }
    if (isNaN(Number(num))){
        return num;
    }
    if (!formatError){
        num = Number(num);
    }
    /*else {
        total = format(total);
        return total;
    }*/
    return num;
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

specialOperations = document.querySelectorAll('.special');
specialOperations.forEach(specialOperation => {
    specialOperation.addEventListener('click', () => {
        special(specialOperation.value);
    });
});