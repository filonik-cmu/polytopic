export const identity: <T>(value: T) => T = (value) => value
export const constant: <T>(value: T) => () => T = (value) => () => value

export const unpack: <T extends unknown[], U>(f: (...args: T) => U) => (args: [...T]) => U = (f) => (args) => f(...args)
export const pack: <T extends unknown[], U>(f: (args: [...T]) => U) => (...args: T) => U = (f) => (...args) => f(args)

export const args: <T extends unknown[]>(...args: T) => [...T] = (...args) => args

//export const indices: <T extends unknown[]>(...shape: T) => T[] = (...shape) => [shape]
