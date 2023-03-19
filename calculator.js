let displayDigit = function(digit){
    let currentNumber = document.getElementById('display').textContent;
    if (currentNumber == 0){
        currentNumber = String(digit);
    } else {
        currentNumber += String(digit);
    }
    document.getElementById('display').textContent = currentNumber;
}

numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click',() => {
        displayDigit(number.value);
    });
    //displayDigit(this.value);
});