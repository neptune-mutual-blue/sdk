import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Stablecoin } from '../../registry'
import { ChainId } from '../../types'
import { stringify } from '../numbers'
import { getPairInfo, getPairFromAddress } from '../uniswap-v2/pair'

const getPrice = async (chainId: ChainId, pairAddress: string, amount: number, signerOrProvider: Provider | Signer): Promise<number> => {
  const pair = await getPairFromAddress(pairAddress, signerOrProvider)
  const [reserve0, reserve1, supply] = await getPairInfo(pair)
  const stablecoin = await Stablecoin.getAddress(chainId, signerOrProvider)
  const token0 = await pair.token0()

  const reserve = token0.toLowerCase() === stablecoin.toLowerCase() ? reserve0 : reserve1
  return reserve.mul('2').mul(stringify(amount)).div(supply)
}

export { getPrice, getPairFromAddress, getPairInfo as getLastKnownPairInfoInternal }
