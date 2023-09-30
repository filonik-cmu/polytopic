// Functions

export const identity: <T>(value: T) => T = (value) => value
export const constant: <T>(value: T) => () => T = (value) => () => value

export const unpack: <S,T>(f: (...args: S[]) => T) => (args: S[]) => T = (f) => (args) => f(...args)
export const pack: <S,T>(f: (args: S[]) => T) => (...args: S[]) => T = (f) => (...args) => f(args)

export const args: <T>(...values: T[]) => T[] = (...values) => values
export const arg: (i: number) => <T>(...values: T[]) => T = (i) => (...values) => values[i]

// Monoids

type Monoid<T, S> = {
  append: (x: T, y: S) => T,
  empty: () => T,
}

export const push = <T>(values: T[], value: T) => {
  values.push(value)
  return values
}

export const unshift = <T>(values: T[], value: T) => {
  values.unshift(value)
  return values
}

export const pushR = push
export const pushL = unshift

export const mPushR: <T>() => Monoid<T[], T> = () => ({ append: pushR, empty: () => [] })
export const mPushL: <T>() => Monoid<T[], T> = () => ({ append: pushL, empty: () => [] })

export const mMul: <T>() => Monoid<T[][], T[]> = () => ({
  append: (b, c) => b.flatMap(d => c.map(e => [...d, e])),
  empty: () => [[]]
})

export const reduceL = <T,S>(m: Monoid<T, S>) => (values: S[]) => values.reduce(m.append, m.empty())
export const reduceR = <T,S>(m: Monoid<T, S>) => (values: S[]) => values.reduceRight(m.append, m.empty())

// Arrays

//const materialize

const arrayOrArgs: <T>(value: T[]|T, ...values: T[]) => T[] = (value, ...values) => Array.isArray(value)? value: [value, ...values]

const from: (length: number) => <T>(f: (i: number) => T) => T[] = (length) => (f) => Array.from({ length }, (_, i) => f(i))
//const full: (length: number) => <T>(value: T) => T[] = (length) => (value) => from(length)(constant(value))
const range: (lower: number, upper: number) => number[] = (lower, upper) => from(upper - lower)((i) => lower + i)

export const padded: <T>(values: T[], defaultValue: T) => (i: number) => T = (values, defaultValue) => (i) => i<values.length? values[i]: defaultValue

export const mapWith: <S,T>(f: (value: S) => T) => (values: S[]) => T[] = (f) => (values) => values.map(f)

const mul = <T>(...a: T[][]) => reduceL(mMul<T>())(a)

export const indices: (shape: number[]) => number[][] = (shape) => mul(...shape.map(upper => range(0, upper)))

export const materialize: <T>(f:  (...indices: number[]) => T) => (shape: number[]) => T[] = (f) => (shape) => mapWith(unpack(f))(indices(shape))

export const full:  <T>(value: T) => (shape: number[]) => T[] =  (value) => materialize(constant(value))

export const zeros: (shape: number[]) => number[] = full(0)
export const ones: (shape: number[]) => number[] = full(1)
