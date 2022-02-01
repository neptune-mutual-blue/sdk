const definitions = {
  1: {
    env: process.env.NPM_ETHEREUM_RPC,
    next: process.env.NEXT_PUBLIC_ETHEREUM_RPC,
    fallback: 'https://mainnet.infura.io/v3/04f673a8619b4e3f89a49232d453f6f2'
  },
  3: {
    env: process.env.NPM_ROPSTEN_RPC,
    next: process.env.NEXT_PUBLIC_ROPSTEN_RPC,
    fallback: 'https://ropsten.infura.io/v3/04f673a8619b4e3f89a49232d453f6f2'
  },
  42: {
    env: process.env.NPM_KOVAN_RPC,
    next: process.env.NEXT_PUBLIC_KOVAN_RPC,
    fallback: 'https://kovan.infura.io/v3/04f673a8619b4e3f89a49232d453f6f2'
  },
  97: {
    env: process.env.NPM_BSC_TESTNET_RPC,
    next: process.env.NEXT_PUBLIC_BSC_TESTNET_RPC,
    fallback: 'https://data-seed-prebsc-1-s1.binance.org:8545'
  },
  80001: {
    env: process.env.NPM_MUMBAI_RPC,
    next: process.env.NEXT_PUBLIC_MUMBAI_RPC,
    fallback: 'https://rpc-mumbai.maticvigil.com'
  }
}

export { definitions }
