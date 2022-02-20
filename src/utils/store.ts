import { ethers } from 'ethers'
import { store, abis } from '../config'
import { Contract, Provider } from 'ethers-multicall'
import { ChainId, IStoreCandidate } from '../types'
import { ZERO_BYTES32 } from '../config/constants'

const getKey = (signature: string[]|undefined, ...items: string[]): string => {
  let types = signature

  if (items.length === 1) {
    return items[0]
  }

  if (types === undefined) {
    types = items.map(() => 'bytes32')
  }

  return ethers.utils.solidityKeccak256(types, items)
}

const getFunc = (type: string): string => {
  switch (type) {
    case 'string':
      return 'getString'
    case 'bytes32':
      return 'getBytes32'
    case 'address':
      return 'getAddress'
    case 'uint256':
    case 'uint':
      return 'getUint'
    default:
      throw new Error('Unsupported data type')
  }
}

const readStorage = async (chainId: ChainId, candidates: IStoreCandidate[], provider: ethers.providers.Provider): Promise<object[]> => {
  const result: any = {}

  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  const storeContract = new Contract(store.getStoreAddressFromEnvironment(chainId), abis.IStore)
  const calls = []

  for (const candidate of candidates) {
    const { returns, key, signature } = candidate
    let k = ZERO_BYTES32

    if (key !== undefined) {
      k = getKey(signature, ...key)
    }

    console.info('key', k)
    const func = getFunc(returns)
    calls.push(storeContract[func](k))
  }

  const members = await ethcallProvider.all(calls)

  for (const i of members.keys()) {
    const { property, compute } = candidates[i]
    let value = members[i]

    if (compute !== undefined) {
      value = await compute({ value, result })
    }

    result[property] = value
  }

  return result
}

export { readStorage }
