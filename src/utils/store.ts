import { type Provider as EthersProvider } from '@ethersproject/providers'
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity'

import {
  abis,
  store
} from '../config/index.js'
import { ZERO_BYTES32 } from '../config/constants.js'
import {
  Contract,
  Provider
} from '../packages/ethers-multicall/src/index.js'
import {
  type ChainId,
  type IStoreCandidate
} from '../types/index.js'

const getKey = (signature: string[] | undefined, ...items: string[]): string => {
  let types = signature

  if (items.length === 1) {
    return items[0]
  }

  if (types === undefined) {
    types = items.map(() => 'bytes32')
  }

  return solidityKeccak256(types, items)
}

const getFunc = (type: string): string => {
  switch (type) {
    case 'bool':
      return 'getBool'
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

const readStorage = async (chainId: ChainId, candidates: IStoreCandidate[], provider: EthersProvider): Promise<any> => {
  const result: any = {}

  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  const storeContract = new Contract(store.getStoreAddressFromEnvironment(chainId), abis.IStore)
  const calls = []

  for (const candidate of candidates) {
    const { returns, key, signature, fn, args } = candidate
    let k = ZERO_BYTES32
    let func = getFunc(returns)

    if (key !== undefined) {
      k = getKey(signature, ...key)
    }

    if (fn !== undefined) {
      func = fn
    }

    if (args !== undefined) {
      calls.push(storeContract[func](...args))
    } else {
      calls.push(storeContract[func](k))
    }
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
