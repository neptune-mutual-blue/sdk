import { ethers } from 'ethers'
import { registry } from '../..'
import { ChainId } from '../../types'
import { getPairFromFactory } from '../uniswap-v2/pair'

const getPrice = async (chainId: ChainId, token: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<number> => {
  const stablecoin = await registry.Stablecoin.getAddress(chainId, signerOrProvider)
  const router = await registry.IUniswapV2RouterLike.getInstance(chainId, signerOrProvider)
  const [stablecoinNeeded, _tokenNeeded] = await router.getAmountsIn(amount, [stablecoin, token]) // eslint-disable-line

  return stablecoinNeeded
}

const getPriceUsingPair = async (chainId: ChainId, token: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<number> => {
  const stablecoin = await registry.Stablecoin.getAddress(chainId, signerOrProvider)

  const pair = await getPairFromFactory(chainId, token, stablecoin, signerOrProvider)

  const { reserve0, reserve1 } = await pair.getReserves()
  const token1 = await pair.token1()

  let unitValue = (reserve0 * amount) / reserve1

  if (token1 === stablecoin) {
    unitValue = (reserve1 * amount) / reserve0
  }

  return unitValue
}

export { getPrice, getPriceUsingPair }
