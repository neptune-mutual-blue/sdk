import { base58 } from './dist/index.js'

const hashBytes32 = '0xcc2d976220820d023b7170f520d3490e811ed988ae3d6221474ee97e559b0361'

const a = base58.encode(Uint8Array.from(Buffer.from('1220' + hashBytes32.slice(2), 'hex')))
console.log(a)
