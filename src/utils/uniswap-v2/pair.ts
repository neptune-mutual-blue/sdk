import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import {
  IUniswapV2PairLike,
  IUniswapV2FactoryLike
} from '../../registry'
import { ChainId } from '../../types/ChainId'

const getPairFromAddress = async (pairAddress: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  // eslint-disable-next-line
  return IUniswapV2PairLike.getInstance(pairAddress, signerOrProvider)
}

const getPairFromFactory = async (chainId: ChainId, token0: string, token1: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  const factory = await IUniswapV2FactoryLike.getInstance(chainId, signerOrProvider)
  const pairAddress = await factory.getPair(token0, token1)

  // eslint-disable-next-line
  return getPairFromAddress(pairAddress, signerOrProvider)
}

const getPairInfo = async (pair: Contract): Promise<any[]> => {
  const { reserve0, reserve1 } = await pair.getReserves()
  const supply = await pair.totalSupply()

  return [reserve0, reserve1, supply]
}

export { getPairFromAddress, getPairFromFactory, getPairInfo }
