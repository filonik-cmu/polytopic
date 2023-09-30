export declare type Scalar = any
export declare type Vector = any
export declare type Matrix = any

export declare type HVector = any
export declare type HMatrix = any

export declare type VectorConstructors = {
  //(values: number[]): Vector
  (...values: number[]): Vector
}

export declare type VectorMethods = {
  //from: (value: number[] | ((i: number) => number)) => Vector
  from: (f: (i: number) => number) => Vector
  fromArgs: (...values: number[]) => Vector 
  fromArray: (values: number[]) => Vector
  fromArrayOrArgs: (value: number[]|number, ...values: number[]) => Vector
  of: (...values: number[]) => Vector
  full: (value: number) => Vector
  zeros: () => Vector
  ones: () => Vector
  unit: (i: number) => Vector
  toArray: (self: Vector) => any[]
}

export declare type VectorType = VectorConstructors & VectorMethods

export declare type VectorTypeConstructors = {
  (n: number): VectorType
}

export declare type VectorTypeMethods = {
  toString: (value: Vector) => string
}

export declare type VectorTypeType = VectorTypeConstructors & VectorTypeMethods

export declare type MatrixConstructors = {
  //(values: number[]): Vector
  (...values: number[]): Vector
}

export declare type MatrixMethods = {
  from: (f: (i: number, j: number) => number) => Matrix
  fromArgs: (...values: number[]) => Matrix 
  fromArray: (values: number[]) => Matrix
  fromArrayOrArgs: (value: number[]|number, ...values: number[]) => Matrix
  of: (...values: number[]) => Matrix
  full: (value: number) => Matrix
  zeros: () => Matrix
  ones: () => Matrix
}

export declare type MatrixType = MatrixConstructors & MatrixMethods

export declare type MatrixTypeConstructors = {
  (m: number, n: number): MatrixType
}

export declare type MatrixTypeMethods = {
  toString: (value: Matrix) => string
}

export declare type MatrixTypeType = MatrixTypeConstructors & MatrixTypeMethods

export declare type HVectorConstructors = VectorConstructors & {}
export declare type HVectorMethods = VectorMethods & {
  pos: VectorMethods,
  dir: VectorMethods,
}

export declare type HVectorType = HVectorConstructors & HVectorMethods

export declare type HVectorTypeConstructors = {
  (n: number): HVectorType
}

export declare type HVectorTypeMethods = {
  toString: (value: HVector) => string
}

export declare type HVectorTypeType = HVectorTypeConstructors & HVectorTypeMethods

export declare type HMatrixConstructors = MatrixConstructors & {}
export declare type HMatrixMethods = MatrixMethods & {
  r: {},
  s: {}, // VectorMethods,
  t: {}, // VectorMethods,
}

export declare type HMatrixType = HMatrixConstructors & HMatrixMethods

export declare type HMatrixTypeConstructors = {
  (m: number, n: number): HMatrixType
}

export declare type HMatrixTypeMethods = {
  toString: (value: HMatrix) => string
}

export declare type HMatrixTypeType = HMatrixTypeConstructors & HMatrixTypeMethods


/*
export declare const vec: VectorTypeType
export declare const vec1: VectorType
export declare const vec2: VectorType
export declare const vec3: VectorType
export declare const vec4: VectorType
*/