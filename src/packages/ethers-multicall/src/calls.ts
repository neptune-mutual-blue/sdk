import { multicallAbi } from './abi/multicall.js';
import { Contract } from './contract.js';

export function getEthBalance(address: string, multicallAddress: string) {
  const multicall = new Contract(multicallAddress, multicallAbi);
  return multicall.getEthBalance(address);
}
