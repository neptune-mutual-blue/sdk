import { ethers } from 'ethers'
import { registry } from '../..'
import { ChainId } from '../../types'
import { stringify } from '../numbers'
import { getPairInfo, getPairFromAddress } from '../uniswap-v2/pair'

const getPrice = async (chainId: ChainId, pairAddress: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<number> => {
  const pair = await getPairFromAddress(chainId, pairAddress, signerOrProvider)
  const [reserve0, reserve1, supply] = await getPairInfo(pair)
  const stablecoin = await registry.Stablecoin.getAddress(chainId, signerOrProvider)
  const token0 = await pair.token0()

  const reserve = token0.toLowerCase() === stablecoin.toLowerCase() ? reserve0 : reserve1
  return reserve.mul('2').mul(stringify(amount)).div(supply)
}

export { getPrice, getPairFromAddress, getPairInfo as getLastKnownPairInfoInternal }
