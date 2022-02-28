import { ethers } from 'ethers'
import { registry } from '../..'
import { ChainId } from '../../types'
import { getPairInfo, getPairFromAddress } from '../uniswap-v2/pair'

const getPrice = async (chainId: ChainId, pairAddress: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<number> => {
  const pair = await getPairFromAddress(chainId, pairAddress, signerOrProvider)
  const [reserve0, reserve1, supply] = await getPairInfo(pair)
  const stablecoin = await registry.Stablecoin.getAddress(chainId, signerOrProvider)

  if (await pair.token0() === stablecoin) {
    return (2 * reserve0 * amount) / supply
  }

  return (2 * reserve1 * amount) / supply
}

export { getPrice, getPairFromAddress, getPairInfo as getLastKnownPairInfoInternal }
