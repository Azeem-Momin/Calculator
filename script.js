// Reference the display element
const display = document.getElementById("display");

// Function to insert a value into the display
function insert(value) {
    if (display.innerText === "0" || display.innerText === "Error") {
        display.innerText = value;
    } else {
        display.innerText += value; // Append new input value
    }
}

// Function to clear the display
function clearDisplay() {
    display.innerText = "0";
}

// Function to delete the last character
function deleteLast() {
    const current = display.innerText;
    display.innerText = current.length > 1 ? current.slice(0, -1) : "0";
}

// Function to calculate the result
function calculate() {
    let expression = display.innerText;

    // Parse and handle square root (√) operations
    while (expression.includes("√")) {
        const index = expression.indexOf("√");
        let leftNum = "";
        let rightNum = "";

        // Find the number before root 
        for (let i = index - 1; i >= 0; i--) {
            if (!isNaN(expression[i]) || expression[i] === ".") {
                leftNum = expression[i] + leftNum; // Append the digit or decimal point
            } else {
                break; // Stop when a non-number character is encountered
            }
        }

        // Find the number after root 
        for (let i = index + 1; i < expression.length; i++) {
            if (!isNaN(expression[i]) || expression[i] === ".") {
                rightNum += expression[i]; // Append digit or decimal point
            } else {
                break; // Stop when  non-number character is encountered
            }
        }


        const left = leftNum ? parseFloat(leftNum) : 1; // Default to 1 if no number is before √
        const right = rightNum ? parseFloat(rightNum) : 0;

        const replacement = left * Math.sqrt(right);
        expression = expression.replace(leftNum + "√" + rightNum, replacement.toString());
    }

    // Parse and handle square (x²) operations
    while (expression.includes("x²")) {
        const index = expression.indexOf("x²");
        let leftNum = "";

        // Find the number before x²
        for (let i = index - 1; i >= 0 && !isNaN(expression[i]) && expression[i] !== " "; i--) {
            leftNum = expression[i] + leftNum;
        }

        const left = parseFloat(leftNum);
        const replacement = Math.pow(left, 2);
        expression = expression.replace(leftNum + "x²", replacement.toString());
    }
    // Parse and handle percentage (%) operations
    while (expression.includes("%")) {
        const index = expression.indexOf("%");
        let leftNum = "";

        // Find the number before %
        for (let i = index - 1; i >= 0 && (!isNaN(expression[i]) || expression[i] === "."); i--) {
            leftNum = expression[i] + leftNum; // Construct the number in reverse
        }

        const left = parseFloat(leftNum); // Convert the extracted number to float
        const replacement = left / 100; // Calculate the percentage
        expression = expression.replace(leftNum + "%", replacement.toString()); // Replace in the expression
    }


    // Parse and handle factorial (!) operations
    while (expression.includes("!")) {
        const index = expression.indexOf("!");
        let leftNum = "";

        // Find the number before !
        for (let i = index - 1; i >= 0 && (!isNaN(expression[i]) || expression[i] === "."); i--) {
            leftNum = expression[i] + leftNum; // Construct the number in reverse
        }

        const left = parseFloat(leftNum); // Convert the extracted number to a float
        const replacement = factorial(left); // Calculate factorial
        expression = expression.slice(0, index - leftNum.length) + replacement.toString() + expression.slice(index + 1); // Replace the part
    }

    // Replace symbols with JavaScript-compatible operators
    while (expression.includes("÷") || expression.includes("×")) {
        let divideIndex = expression.indexOf("÷");
        let multiplyIndex = expression.indexOf("×");

        // Handle division (÷)
        if (divideIndex !== -1) {
            expression = expression.slice(0, divideIndex) + "/" + expression.slice(divideIndex + 1);
        }

        // Handle multiplication (×)
        if (multiplyIndex !== -1) {
            expression = expression.slice(0, multiplyIndex) + "*" + expression.slice(multiplyIndex + 1);
        }
    }

    try {
        // Calculate the result using eval
        const result = eval(expression);
        display.innerText = Number.isFinite(result) ? result : "Error"; // Display the result or Error
    } catch (error) {
        console.error("Error evaluating expression:", error);
        display.innerText = "Error"; // Handle invalid expressions
    }
}

// Helper function to compute factorial
function factorial(num) {
    if (num < 0 || !Number.isInteger(num)) return "Error"; // Factorial is only defined for non-negative integers
    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i; // Calculate factorial
    }
    return result;
}


