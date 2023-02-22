function number(n) {
    return { exp: function () { return n; }, toString: n.toString() };
}
function plus(a, b) {
    return { exp: function () { return a.exp() + b.exp(); }, toString: "(".concat(a.toString, " + ").concat(b.toString, ")") };
}
function minus(a, b) {
    return { exp: function () { return a.exp() - b.exp(); }, toString: "(".concat(a.toString, " + ").concat(b.toString, ")") };
}
function multiply(a, b) {
    return { exp: function () { return a.exp() * b.exp(); }, toString: "(".concat(a.toString, " * ").concat(b.toString, ")") };
}
function divide(a, b) {
    return { exp: function () { return a.exp() / b.exp(); }, toString: "(".concat(a.toString, " / ").concat(b.toString, ")") };
}
function addNumberButtons() {
    var numbers = document.getElementById("numbers");
    var _loop_1 = function (i) {
        var button = document.createElement("div");
        button.id = i.toString();
        button.textContent = i.toString();
        button.classList.add("number");
        button.classList.add("keypad-button");
        button.addEventListener("click", function (e) { return doNumber(number(i)); });
        numbers.appendChild(button);
    };
    for (var i = 0; i < 10; i++) {
        _loop_1(i);
    }
}
function addOperationButtons() {
    var operations = document.getElementById("operations");
    function makeOperationElement(id, listener) {
        var operation = document.createElement("div");
        operation.id = id;
        operation.textContent = id;
        operation.classList.add("operation");
        operation.classList.add("keypad-button");
        operation.addEventListener("click", function (e) { return listener(); });
        return operation;
    }
    operations.appendChild(makeOperationElement("+", doPlus));
    operations.appendChild(makeOperationElement("-", doMinus));
    operations.appendChild(makeOperationElement("*", doMultiply));
    operations.appendChild(makeOperationElement("/", doDivide));
}
function doNumber(n) {
    function setVars() {
        if (!isFirstNumber || !isOp) {
            firstNumber = n;
            isFirstNumber = true;
            return;
        }
        if (isOp) {
            secondNumber = n;
            isSecondNumber = true;
            return;
        }
    }
    setVars();
    setDisplay(n.exp().toString());
}
function canSetOperator() {
    return isFirstNumber && !isSecondNumber;
}
function setDisplay(s) {
    var display = document.getElementById("screen");
    display.textContent = s;
}
function setOp(opString, func) {
    op = function (x) { return func(firstNumber, x); };
    isOp = true;
    setDisplay(opString);
}
function doPlus() {
    if (canSetOperator()) {
        setOp("+", plus);
    }
}
function doMinus() {
    if (canSetOperator()) {
        setOp("-", minus);
    }
}
function doMultiply() {
    if (canSetOperator()) {
        setOp("*", multiply);
    }
}
function doDivide() {
    if (canSetOperator()) {
        setOp("/", divide);
    }
}
function doClear() {
    curr = null;
    isOp = false;
    isFirstNumber = false;
    isSecondNumber = false;
    firstNumber = null;
    secondNumber = null;
    op = null;
    setDisplay("");
}
function doCalc() {
    if (!isOp || !isFirstNumber || !isSecondNumber)
        return;
    curr = op(secondNumber);
    setDisplay(curr.toString + " = " + curr.exp().toString());
    firstNumber = curr;
    isSecondNumber = false;
    isOp = false;
}
addNumberButtons();
addOperationButtons();
var curr = null;
var isOp = false;
var isFirstNumber = false;
var isSecondNumber = false;
var firstNumber = null;
var secondNumber = null;
var op = null;
