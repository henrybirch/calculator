type Exp = {
  exp: () => number;
  toString: string;
};

function number(n: number): Exp {
  return { exp: () => n, toString: n.toString() };
}

function plus(a: Exp, b: Exp): Exp {
  return {
    exp: () => a.exp() + b.exp(),
    toString: `(${a.toString} + ${b.toString})`,
  };
}

function minus(a: Exp, b: Exp): Exp {
  return {
    exp: () => a.exp() - b.exp(),
    toString: `(${a.toString} + ${b.toString})`,
  };
}

function multiply(a: Exp, b: Exp): Exp {
  return {
    exp: () => a.exp() * b.exp(),
    toString: `(${a.toString} * ${b.toString})`,
  };
}

function divide(a: Exp, b: Exp): Exp {
  return {
    exp: () => a.exp() / b.exp(),
    toString: `(${a.toString} / ${b.toString})`,
  };
}

function addNumberButtons() {
  const numbers = document.getElementById("numbers");
  for (let i = 0; i < 10; i++) {
    const button = document.createElement("div");
    button.id = i.toString();
    button.textContent = i.toString();
    button.classList.add("number");
    button.classList.add("keypad-button");
    button.addEventListener("click", () => doNumber(number(i)));
    numbers.appendChild(button);
  }
}

function addOperationButtons() {
  const operations = document.getElementById("operations");

  function makeOperationElement(id: string, listener: () => void) {
    const operation = document.createElement("div");
    operation.id = id;
    operation.textContent = id;
    operation.classList.add("operation");
    operation.classList.add("keypad-button");
    operation.addEventListener("click", () => listener());
    return operation;
  }

  operations.appendChild(makeOperationElement("+", doPlus));
  operations.appendChild(makeOperationElement("-", doMinus));
  operations.appendChild(makeOperationElement("*", doMultiply));
  operations.appendChild(makeOperationElement("/", doDivide));
}

function doNumber(n: Exp) {
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

function setDisplay(s: string) {
  const display = document.getElementById("screen");
  display.textContent = s;
}

function setOp(opString: string, func: (a: Exp, b: Exp) => Exp) {
  state.operator = (x: Exp) => func(state.firstNumber, x);
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
  const result = state.operator(state.secondNumber);
  setDisplay(`${result.toString} = ${result.exp().toString()}`);
  state.firstNumber = state.operator(state.secondNumber);
  state.isSecondNumber = false;
  state.isOp = false;
}

function doClear() {
  setDisplay("");
  state = getFreshState();
}

type Operator = (x: Exp) => Exp | null;
type State = {
  isOp: boolean;
  isFirstNumber: boolean;
  isSecondNumber: boolean;
  firstNumber: null | Exp;
  secondNumber: null | Exp;
  operator: Operator;
};

function getFreshState(): State {
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

let state = getFreshState();
setDisplay("");
