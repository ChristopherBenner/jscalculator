let enterClicked = true;

let displayDigit = function(digit){
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
    document.getElementById('display').textContent = currentNumber;
}


// Go through each number button and display on the display
numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click',() => {
        displayDigit(number.value);
    });
});