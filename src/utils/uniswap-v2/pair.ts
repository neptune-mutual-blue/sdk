import { ethers } from 'ethers'
import { registry } from '../..'
import { ChainId } from '../../types/ChainId'

const getPairFromAddress = async (pairAddress: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<ethers.Contract> => {
  // eslint-disable-next-line
  return registry.IUniswapV2PairLike.getInstance(pairAddress, signerOrProvider)
}

const getPairFromFactory = async (chainId: ChainId, token0: string, token1: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<ethers.Contract> => {
  const factory = await registry.IUniswapV2FactoryLike.getInstance(chainId, signerOrProvider)
  const pairAddress = await factory.getPair(token0, token1)

  // eslint-disable-next-line
  return getPairFromAddress(pairAddress, signerOrProvider)
}

const getPairInfo = async (pair: ethers.Contract): Promise<any[]> => {
  const { reserve0, reserve1 } = await pair.getReserves()
  const supply = await pair.totalSupply()

  return [reserve0, reserve1, supply]
}

export { getPairFromAddress, getPairFromFactory, getPairInfo }
