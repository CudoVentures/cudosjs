import { Coin, GasPrice } from '@cosmjs/stargate';
import { CudosNode } from './cudos-node';

// types for globalThis
export declare global {
  var node: CudosNode | undefined;
  var gasPrice: GasPrice;
}
