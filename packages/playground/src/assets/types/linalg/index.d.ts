declare const add: (...args: any[]) => any;

declare const div: (...args: any[]) => any;

declare const hmat: HMatrixTypeType;

declare type HMatrix = any;

declare type HMatrixConstructors = MatrixConstructors & {};

declare type HMatrixMethods = MatrixMethods & {
    r: {};
    s: {};
    t: {};
};

declare type HMatrixType = HMatrixConstructors & HMatrixMethods;

declare type HMatrixTypeConstructors = {
    (m: number, n: number): HMatrixType;
};

declare type HMatrixTypeMethods = {
    toString: (value: HMatrix) => string;
};

declare type HMatrixTypeType = HMatrixTypeConstructors & HMatrixTypeMethods;

declare const hvec: HVectorTypeType;

declare const hvec1: HVectorType;

declare const hvec2: HVectorType;

declare const hvec3: HVectorType;

declare const hvec4: HVectorType;

declare type HVector = any;

declare type HVectorConstructors = VectorConstructors & {};

declare type HVectorMethods = VectorMethods & {
    pos: VectorMethods;
    dir: VectorMethods;
};

declare type HVectorType = HVectorConstructors & HVectorMethods;

declare type HVectorTypeConstructors = {
    (n: number): HVectorType;
};

declare type HVectorTypeMethods = {
    toString: (value: HVector) => string;
};

declare type HVectorTypeType = HVectorTypeConstructors & HVectorTypeMethods;

declare const mat: MatrixTypeType;

declare const mat1: MatrixType;

declare const mat1x1: MatrixType;

declare const mat1x2: MatrixType;

declare const mat1x3: MatrixType;

declare const mat1x4: MatrixType;

declare const mat2: MatrixType;

declare const mat2x1: MatrixType;

declare const mat2x2: MatrixType;

declare const mat2x3: MatrixType;

declare const mat2x4: MatrixType;

declare const mat3: MatrixType;

declare const mat3x1: MatrixType;

declare const mat3x2: MatrixType;

declare const mat3x3: MatrixType;

declare const mat3x4: MatrixType;

declare const mat4: MatrixType;

declare const mat4x1: MatrixType;

declare const mat4x2: MatrixType;

declare const mat4x3: MatrixType;

declare const mat4x4: MatrixType;

declare type Matrix = any;

declare type MatrixConstructors = {
    (...values: number[]): Vector;
};

declare type MatrixMethods = {
    from: (f: (i: number, j: number) => number) => Matrix;
    fromArgs: (...values: number[]) => Matrix;
    fromArray: (values: number[]) => Matrix;
    fromArrayOrArgs: (value: number[] | number, ...values: number[]) => Matrix;
    of: (...values: number[]) => Matrix;
    full: (value: number) => Matrix;
    zeros: () => Matrix;
    ones: () => Matrix;
};

declare type MatrixType = MatrixConstructors & MatrixMethods;

declare type MatrixTypeConstructors = {
    (m: number, n: number): MatrixType;
};

declare type MatrixTypeMethods = {
    toString: (value: Matrix) => string;
};

declare type MatrixTypeType = MatrixTypeConstructors & MatrixTypeMethods;

declare const mul: (...args: any[]) => any;

declare type NumNdArray = any;

declare const show: (x: NumNdArray) => string;

declare const sub: (...args: any[]) => any;

declare const vec: VectorTypeType;

declare const vec1: VectorType;

declare const vec2: VectorType;

declare const vec3: VectorType;

declare const vec4: VectorType;

declare type Vector = any;

declare type VectorConstructors = {
    (...values: number[]): Vector;
};

declare type VectorMethods = {
    from: (f: (i: number) => number) => Vector;
    fromArgs: (...values: number[]) => Vector;
    fromArray: (values: number[]) => Vector;
    fromArrayOrArgs: (value: number[] | number, ...values: number[]) => Vector;
    of: (...values: number[]) => Vector;
    full: (value: number) => Vector;
    zeros: () => Vector;
    ones: () => Vector;
    unit: (i: number) => Vector;
    toArray: (self: Vector) => any[];
};

declare type VectorType = VectorConstructors & VectorMethods;

declare type VectorTypeConstructors = {
    (n: number): VectorType;
};

declare type VectorTypeMethods = {
    toString: (value: Vector) => string;
};

declare type VectorTypeType = VectorTypeConstructors & VectorTypeMethods;

declare const zerosLike: (values: NumNdArray) => NumNdArray;
