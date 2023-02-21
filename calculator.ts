type Exp = {
    exp: () => number,
    toString: string
}

function number(n: number): Exp {
    return {exp: () => n, toString: n.toString()}
}

function plus(a: Exp, b: Exp): Exp {
    return {exp: () => a.exp() + b.exp(), toString: `(${a.toString} + ${b.toString})`}
}

function multiply(a: Exp, b: Exp): Exp {
    return {exp: () => a.exp() * b.exp(), toString: `(${a.toString} * ${b.toString})`}
}

function divide(a: Exp, b: Exp): Exp {
    return {exp: () => a.exp() / b.exp(), toString: `(${a.toString} / ${b.toString})`}
}

function addNumberButtons() {
    const numbers = document.getElementById("numbers")
    for (let i = 0; i < 10; i++) {
        const button = document.createElement("div")
        button.id = i.toString()
        button.classList.add("number")
        button.classList.add("keypad-button")
        numbers.appendChild(button)
    }
}
function doNumber(n: number) {
}

function doPlus() {
}

function doMinus() {
}

function doMultiply() {
}

function doDivide() {
}

function addOperationButtons() {
    const operations = document.getElementById("operations")

    function makeOperationElement(id: string, listener: () => void) {
        const operation = document.createElement("div")
        operation.id = id
        operation.classList.add("operation")
        operation.classList.add("keypad-button")
        operation.addEventListener("click", (e) => listener)
        return operation
    }

    operations.appendChild(makeOperationElement("+", doPlus))
    operations.appendChild(makeOperationElement("-", doMinus))
    operations.appendChild(makeOperationElement("*", doMultiply))
    operations.appendChild(makeOperationElement("/", doDivide))
}

addNumberButtons()
addOperationButtons()