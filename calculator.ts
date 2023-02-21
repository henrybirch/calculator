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
