import typescript from 'rollup-plugin-typescript2'

import json from '@rollup/plugin-json'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: './src/index.ts',
  output: [
    isProduction && {
      file: './dist/index.cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: './dist/index.js',
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: [
    '@ethersproject/constants',
    '@ethersproject/contracts',
    '@ethersproject/solidity',
    '@ethersproject/strings',
    'axios',
    'uuid',
    '@ethersproject/abi',
    '@ethersproject/keccak256'
  ],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true
    }),
    json()
  ]
}
