import { CudosNode } from "./cudos-node";

// jestGlobalTeardown is called once after executing tests
export const jestGlobalTeardown = () => {
  console.log('Cleanup cudos node...');
  CudosNode.instance?.cleanup();
};

module.exports = jestGlobalTeardown;
