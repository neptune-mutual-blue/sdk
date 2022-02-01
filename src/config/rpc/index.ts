import { ChainId } from '../../types'
import { UnsupportedBlockchainError } from '../../types/Exceptions'
import { definitions } from './definition'

const getNetworkUrlFromEnvironment = (chainId: ChainId): string => {
  const { env, next, fallback } = definitions[chainId]

  if (env !== undefined) {
    return env
  }

  if (next !== undefined) {
    return next
  }

  if (fallback !== undefined) {
    return fallback
  }

  throw new UnsupportedBlockchainError('Unknown network')
}

export { getNetworkUrlFromEnvironment }
