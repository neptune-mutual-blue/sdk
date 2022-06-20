export const getDefinition = (): any => {
  return {
    1: {
      env: process.env.NPM_ETHEREUM_STORE,
      next: process.env.NEXT_PUBLIC_ETHEREUM_STORE,
      fallback: undefined
    },
    3: {
      env: process.env.NPM_ROPSTEN_STORE,
      next: process.env.NEXT_PUBLIC_ROPSTEN_STORE,
      fallback: ''
    },
    42: {
      env: process.env.NPM_KOVAN_STORE,
      next: process.env.NEXT_PUBLIC_KOVAN_STORE,
      fallback: ''
    },
    97: {
      env: process.env.NPM_BSC_TESTNET_STORE,
      next: process.env.NEXT_PUBLIC_BSC_TESTNET_STORE,
      fallback: ''
    },
    80001: {
      env: process.env.NPM_MUMBAI_STORE,
      next: process.env.NEXT_PUBLIC_MUMBAI_STORE,
      fallback: ''
    },
    43113: {
      env: process.env.NPM_FUJI_STORE,
      next: process.env.NEXT_PUBLIC_FUJI_STORE,
      fallback: ''
    }
  }
}
