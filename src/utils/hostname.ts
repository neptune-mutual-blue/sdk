import { ChainId } from '../types'
import { networks } from '../config'

const getHostName = (chainId: ChainId) => {
  return networks.isTestChainId(chainId) ? 'test.neptunemutual.com' : 'app.neptunemutual.com'
}

export {
  getHostName
}
