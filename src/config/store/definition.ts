export const getDefinition = (): any => {
  return {
    1: {
      env: process.env.NPM_ETHEREUM_STORE,
      next: process.env.NEXT_PUBLIC_ETHEREUM_STORE,
      fallback: undefined
    },
    42161: {
      env: process.env.NPM_ARBITRUM_STORE,
      next: process.env.NEXT_PUBLIC_ARBITRUM_STORE,
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
