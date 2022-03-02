const definitions = {
  1: {
    env: process.env.NPM_ETHEREUM_STORE,
    next: process.env.NEXT_PUBLIC_ETHEREUM_STORE,
    fallback: undefined
  },
  3: {
    env: process.env.NPM_ROPSTEN_STORE,
    next: process.env.NEXT_PUBLIC_ROPSTEN_STORE,
    fallback: '0x173b94Bb634abE0054Ed6Cc9C25BBf8B01f6f39A'
  },
  42: {
    env: process.env.NPM_KOVAN_STORE,
    next: process.env.NEXT_PUBLIC_KOVAN_STORE,
    fallback: '0x173b94Bb634abE0054Ed6Cc9C25BBf8B01f6f39A'
  },
  97: {
    env: process.env.NPM_BSC_TESTNET_STORE,
    next: process.env.NEXT_PUBLIC_BSC_TESTNET_STORE,
    fallback: '0x4C12AF706A3831Fa23A03733faffED4159842c63'
  },
  80001: {
    env: process.env.NPM_MUMBAI_STORE,
    next: process.env.NEXT_PUBLIC_MUMBAI_STORE,
    fallback: '0x4C12AF706A3831Fa23A03733faffED4159842c63'
  }
}

export { definitions }
