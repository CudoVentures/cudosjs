import NodeEnvironment from 'jest-environment-node';
import { CudosNode } from './cudos-node';
import { GasPrice } from '@cosmjs/stargate';

export default class CudosEnvironment extends NodeEnvironment {
  // setup() is called once before each test file
  override async setup() {
    await super.setup();
    await CudosNode.instance?.start();

    this.global.node = CudosNode.instance;
    this.global.gasPrice = GasPrice.fromString(CudosNode.instance?.env['GAS_PRICE']!);
  }

  // teardown() is called once after each test file
  override async teardown() {
    await super.teardown();
    await CudosNode.instance?.reset();
  }
}
