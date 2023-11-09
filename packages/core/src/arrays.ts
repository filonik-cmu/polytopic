import * as F from "./functions"

export const length: <T>(values: T[]) => number = (values) => values.length

export const empty: <T>(length: number) => T[] = (length) => Array.from({ length })

export const from:  <T>(f: (i: number) => T) => (length: number) => T[] = (f) => (length) => Array.from({ length }, (_, i) => f(i))

export const full:  <T>(value: T) => (length: number) => T[] = (value) => from(F.constant(value))

export const zeros: (length: number) => number[] = full(0)
export const ones: (length: number) => number[] = full(1)

export const pushR = <T>(values: T[], value: T) => [...values, value]
export const pushL = <T>(values: T[], value: T) => [value, ...values]

export const mapWith: <T,U>(f: (value: T) => U) => (values: T[]) => U[] = (f) => (values) => values.map(f)

//type Map<F, T extends unknown[]> = { [K in keyof T]: F<T[K]> };

//type MapArray<T extends unknown[]> = { [K in keyof T]: Array<T[K]> };
//type MapGenerator<T extends unknown[],  TReturn = any, TNext = unknown> = { [K in keyof T]: Generator<T[K], TReturn, TNext> };

//const mapN: <T extends unknown[], U>(f: (...args: T) => U) => (...args: MapArray<T>) => Array<U> = (f) => (...argss) => []
//
//const x = mapN((x: number, y: number) => x+y)
