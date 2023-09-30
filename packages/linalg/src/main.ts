//import '.'
import {vec, vec3, hvec, hvec3} from '.'

const v = vec3.full(1337)
console.log(vec.toString(v))

const hv = hvec3.full(1337)
console.log(vec.toString(hv))

const hvd = hvec3.dir.full(1337)
console.log(vec.toString(hvd))

const hvp = hvec3.pos.full(1337)
console.log(vec.toString(hvp))
