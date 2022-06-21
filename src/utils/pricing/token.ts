import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { IUniswapV2RouterLike, Stablecoin } from '../../registry'
import { ChainId } from '../../types'
import { stringify } from '../numbers'
import { getPairFromFactory } from '../uniswap-v2/pair'

const getPrice = async (chainId: ChainId, token: string, amount: number, signerOrProvider: Provider | Signer): Promise<string> => {
  const stablecoin = await Stablecoin.getAddress(chainId, signerOrProvider)

  if (token.toLowerCase() === stablecoin.toLowerCase()) {
    return stringify(amount)
  }

  const router = await IUniswapV2RouterLike.getInstance(chainId, signerOrProvider)
  const [stablecoinNeeded, _tokenNeeded] = await router.getAmountsIn(stringify(amount), [stablecoin, token]) // eslint-disable-line

  return stablecoinNeeded
}

const getPriceUsingPair = async (chainId: ChainId, token: string, amount: number, signerOrProvider: Provider | Signer): Promise<string> => {
  const stablecoin = await Stablecoin.getAddress(chainId, signerOrProvider)
  const value = stringify(amount)

  if (token.toLowerCase() === stablecoin.toLowerCase()) {
    return value
  }

  const pair = await getPairFromFactory(chainId, token, stablecoin, signerOrProvider)
  const { reserve0, reserve1 } = await pair.getReserves()

  const token1 = await pair.token1()

  return token1.toLowerCase() === stablecoin.toLowerCase() ? reserve1.mul(value).div(reserve0) : reserve0.mul(value).div(reserve1)
}

export { getPrice, getPriceUsingPair }
