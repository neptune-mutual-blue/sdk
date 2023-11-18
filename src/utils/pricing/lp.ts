import { type Signer } from '@ethersproject/abstract-signer'
import { type Provider } from '@ethersproject/providers'

import * as Stablecoin from '../../registry/Stablecoin.js'
import { type ChainId } from '../../types/index.js'
import { stringify } from '../numbers.js'
import {
  getPairFromAddress,
  getPairInfo
} from '../uniswap-v2/pair.js'

const getPrice = async (chainId: ChainId, pairAddress: string, amount: number, signerOrProvider: Provider | Signer): Promise<number> => {
  const pair = await getPairFromAddress(pairAddress, signerOrProvider)
  const [reserve0, reserve1, supply] = await getPairInfo(pair)
  const stablecoin = await Stablecoin.getAddress(chainId, signerOrProvider)
  const token0 = await pair.token0()

  const reserve = token0.toLowerCase() === stablecoin.toLowerCase() ? reserve0 : reserve1
  return reserve.mul('2').mul(stringify(amount)).div(supply)
}

export {
  getPairFromAddress,
  getPairInfo as getLastKnownPairInfoInternal,
  getPrice
}
