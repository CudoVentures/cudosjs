import { CudosNode } from './cudos-node';

// jestGlobalSetup is called once before executing tests
export const jestGlobalSetup = () => {
  console.log('Setup local cudos node...');
  CudosNode.init();
};

module.exports = jestGlobalSetup;
