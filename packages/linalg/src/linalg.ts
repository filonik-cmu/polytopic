import type { 
  VectorTypeConstructors,
  VectorTypeMethods, 
  VectorTypeType, 
  VectorConstructors, 
  VectorMethods,
  VectorType, 
  Vector,
  MatrixTypeConstructors,
  MatrixTypeMethods,
  MatrixTypeType,
  MatrixConstructors,
  MatrixMethods,
  MatrixType,
  Matrix,
  HVectorTypeConstructors,
  HVectorTypeMethods, 
  HVectorTypeType, 
  HVectorConstructors, 
  HVectorMethods,
  HVectorType, 
  HVector,
  HMatrixTypeConstructors,
  HMatrixTypeMethods, 
  HMatrixTypeType, 
  HMatrixConstructors, 
  HMatrixMethods,
  HMatrixType, 
  HMatrix,
} from './types'

import { arrays as A, functions as F } from '@filonik-cmu/core'
import { constant, indices, zeros, padded } from './core'

import ndarray from 'ndarray'
import ndarrayOps from 'ndarray-ops'
import ndarrayShow from 'ndarray-show'

// Keep ndarray an implementation detail
type NumNdArray = any // ndarray.NdArray<number[]>

const makeType: <TConstructors,TMethods,TResult>(c: TConstructors, m: TMethods) => TResult = Object.assign

const op = (f: any) => (g: any) => (...args: any[]) => {
  const u = f(...args)
  g(u, ...args)
  return u
}

export const zerosLike: (values: NumNdArray) => NumNdArray = (values) => ndarray(zeros(values.shape), values.shape)

export const add = op(zerosLike)(ndarrayOps.add)
export const sub = op(zerosLike)(ndarrayOps.sub)
export const mul = op(zerosLike)(ndarrayOps.mul)
export const div = op(zerosLike)(ndarrayOps.div)

export const show: (x: NumNdArray) => string = ndarrayShow

export const vec: VectorTypeType = makeType<VectorTypeConstructors, VectorTypeMethods, VectorTypeType>((n) => {
  const _shape = [n]
  const _indices = indices(_shape) as [number][]
  const vm: VectorMethods = {
    from: (f) => {
      return ndarray(A.mapWith(F.unpack(f))(_indices), _shape)
    },
    fromArgs: (...values) => {
      return vt.from(padded(values, 0))
    },
    fromArray: (values) => {
      return vt.from(padded(values, 0))
    },
    fromArrayOrArgs: (value, ...values) => {
      return Array.isArray(value)? vt.fromArray(value): vt.fromArgs(value, ...values)
    },
    of: (...values) => {
      return vt.fromArgs(...values)
    },
    toArray: (value) => {
      return (value as ndarray.NdArray<any[]>).data
    },
    full: (value) => {
      return vt.from(F.constant(value))
    },
    zeros: () => {
      return vt.full(0)
    },
    ones: () => {
      return vt.full(1)
    },
    unit: (i) => {
      return vt.from((j) => i==j? 1: 0)
    }
  }
  const vt: VectorType = makeType(vm.fromArgs, vm)
  return vt
}, {
  toString: show
})

export const mat: MatrixTypeType = makeType<MatrixTypeConstructors, MatrixTypeMethods, MatrixTypeType>((m, n) => {
  const _shape = [m, n]
  const _indices = indices(_shape) as [number,number][]
  const mm: MatrixMethods = {
    from: (f) => {
      return ndarray(A.mapWith(F.unpack(f))(_indices), _shape)
    },
    fromArgs: (...values) => {
      return mt.from(padded(values, 0))
    },
    fromArray: (values) => {
      return mt.from(padded(values, 0))
    },
    fromArrayOrArgs: (value, ...values) => {
      return Array.isArray(value)? mt.fromArray(value): mt.fromArgs(value, ...values)
    },
    of: (...values) => {
      return mt.fromArgs(...values)
    },
    full: (value) => {
      return mt.from(constant(value))
    },
    zeros: () => {
      return mt.full(0)
    },
    ones: () => {
      return mt.full(1)
    },
  }
  const mt: MatrixType = makeType(mm.fromArgs, mm)
  return mt
}, {
  toString: show
})

const funshift = <T>(f: (i: number) => T, value: T) => (i: number) => i==0? value: f(i-1)

export const hvec: HVectorTypeType = makeType<HVectorTypeConstructors, HVectorTypeMethods, HVectorTypeType>((n) => {
  const dvm: VectorMethods = vec(n)
  Object.assign(dvm, {
    from: (f: (i: number) => number) => {
      return hvt.from(funshift(f, 0))
    },
  })
  const pvm: VectorMethods = vec(n)
  Object.assign(pvm, {
    from: (f: (i: number) => number) => {
      return hvt.from(funshift(f, 1))
    },
  })
  const hvm: VectorMethods = vec(n+1)
  const hvt: HVectorType = makeType(hvm.fromArgs, Object.assign(hvm, {
    dir: dvm,
    pos: pvm,
  }))
  return hvt
}, {
  toString: show
})

export const hmat: HMatrixTypeType = makeType<HMatrixTypeConstructors, HMatrixTypeMethods, HMatrixTypeType>((m, n) => {
  const hmm: MatrixMethods = mat(m+1, n+1)
  const hmt: HMatrixType = makeType(hmm.fromArgs, Object.assign(hmm, {
    r: {},
    s: {},
    t: {},
  }))
  return hmt
},{
  toString: show
})

export const vec1 = vec(1)
export const vec2 = vec(2)
export const vec3 = vec(3)
export const vec4 = vec(4)

export const mat1x1 = mat(1,1)
export const mat1x2 = mat(1,2)
export const mat1x3 = mat(1,3)
export const mat1x4 = mat(1,4)

export const mat2x1 = mat(2,1)
export const mat2x2 = mat(2,2)
export const mat2x3 = mat(2,3)
export const mat2x4 = mat(2,4)

export const mat3x1 = mat(3,3)
export const mat3x2 = mat(3,3)
export const mat3x3 = mat(3,3)
export const mat3x4 = mat(3,3)

export const mat4x1 = mat(4,4)
export const mat4x2 = mat(4,4)
export const mat4x3 = mat(4,4)
export const mat4x4 = mat(4,4)

export const mat1 = mat1x1
export const mat2 = mat2x2
export const mat3 = mat3x3
export const mat4 = mat4x4

export const hvec1 = hvec(1)
export const hvec2 = hvec(2)
export const hvec3 = hvec(3)
export const hvec4 = hvec(4)

/*
export var vec1 = vec(1)
export var vec2 = vec(2)
export var vec3 = vec(3)
export var vec4 = vec(4)

global.vec1 = vec(1)
global.vec2 = vec(2)
global.vec3 = vec(3)
global.vec4 = vec(4)
*/