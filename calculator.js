function number(n) {
    return { exp: function () { return n; }, toString: n.toString() };
}
function plus(a, b) {
    return {
        exp: function () { return a.exp() + b.exp(); },
        toString: "(".concat(a.toString, " + ").concat(b.toString, ")"),
    };
}
function minus(a, b) {
    return {
        exp: function () { return a.exp() - b.exp(); },
        toString: "(".concat(a.toString, " + ").concat(b.toString, ")"),
    };
}
function multiply(a, b) {
    return {
        exp: function () { return a.exp() * b.exp(); },
        toString: "(".concat(a.toString, " * ").concat(b.toString, ")"),
    };
}
function divide(a, b) {
    return {
        exp: function () { return a.exp() / b.exp(); },
        toString: "(".concat(a.toString, " / ").concat(b.toString, ")"),
    };
}
function addNumberButtons() {
    var numbers = document.getElementById("numbers");
    var _loop_1 = function (i) {
        var button = document.createElement("div");
        button.id = i.toString();
        button.textContent = i.toString();
        button.classList.add("number");
        button.classList.add("keypad-button");
        button.addEventListener("click", function () { return doNumber(number(i)); });
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
        operation.addEventListener("click", function () { return listener(); });
        return operation;
    }
    operations.appendChild(makeOperationElement("+", doPlus));
    operations.appendChild(makeOperationElement("-", doMinus));
    operations.appendChild(makeOperationElement("*", doMultiply));
    operations.appendChild(makeOperationElement("/", doDivide));
}
function doNumber(n) {
    function setVars() {
        if (!state.isFirstNumber || !state.isOp) {
            state.firstNumber = n;
            state.isFirstNumber = true;
            return;
        }
        if (state.isOp) {
            state.secondNumber = n;
            state.isSecondNumber = true;
            return;
        }
    }
    setVars();
    setDisplay(n.exp().toString());
}
function canSetOperator() {
    return state.isFirstNumber && !state.isSecondNumber;
}
function setDisplay(s) {
    var display = document.getElementById("screen");
    display.textContent = s;
}
function setOp(opString, func) {
    state.operator = function (x) { return func(state.firstNumber, x); };
    state.isOp = true;
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
function doCalc() {
    if (!state.operator) {
        return;
    }
    var result = state.operator(state.secondNumber);
    setDisplay("".concat(result.toString, " = ").concat(result.exp().toString()));
    state.firstNumber = state.operator(state.secondNumber);
    state.isSecondNumber = false;
    state.isOp = false;
}
function doClear() {
    setDisplay("");
    state = getFreshState();
}
function getFreshState() {
    return {
        isOp: false,
        isFirstNumber: false,
        isSecondNumber: false,
        firstNumber: null,
        secondNumber: null,
        operator: null,
    };
}
addNumberButtons();
addOperationButtons();
var state = getFreshState();
setDisplay("");
