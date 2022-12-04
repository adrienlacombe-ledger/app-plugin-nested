import { nano_models, populateTransaction, processTest } from "../test.fixture";

const contractName = "NestedFactory";
const contractAddr = "0xfd896db057f260adce7fd1fd48c6623e023406cd";
const testNetwork = "polygon";

const testLabel = "2023 propo withdraw"; // <= Name of the test
const testDirSuffix = testLabel.toLowerCase().replace(/\s+/g, "_");

// https://polygonscan.com/tx/0x4e2f29ab20ab0eb4f99a338bde126ea665821f661c021f5862f422db60c1827c
const inputData =
  "0x51227094000000000000000000000000000000000000000000000000000000000000ce450000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000004aa0000000000000000000000000000000000000000000000000001d74fff072d8c500000000000000000000000000000000000000000000000000000414deb6e5d8000000000000000000000000000000000000000000000000003ea7fc6b40eef2000000000000000000000000000000000000000000000000000f5bb58554c8f70000000000000000000000000000000000000000000000000000000000012cf6000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000d40000000000000000000000000000000000000000000000000000000000000128000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001d8050617261737761700000000000000000000000000000000000000000000000000000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000004c00000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000042454e3f31b00000000000000000000000000000000000000000000000000000000000000200000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000004aa00000000000000000000000000000000000000000000000000047b8318df198870000000000000000000000000000000000000000000000000049f008dc3b0c1800000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006e65737465642e6669010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000638a6e894f01e5dbb47a4d72bf32379d9f1bdbd2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f3938337f7294fef84e9b2c6d548a93f956cc28100000000000000000000000000000000000000000000000000000000000000e491a32b690000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000004aa00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004e0d907b6202dcee1ae5d3a9ccd929f736e5857a94be000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005a65726f4578000000000000000000000000000000000000000000000000000000000000000000000000000053e0bca35ec356bd5dddfebbd1fc0fd03fabad39000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000006c000000000000000000000000053e0bca35ec356bd5dddfebbd1fc0fd03fabad390000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000628415565b000000000000000000000000053e0bca35ec356bd5dddfebbd1fc0fd03fabad390000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000001d74fff072d8c500000000000000000000000000000000000000000000000000eda9209486451f00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000053e0bca35ec356bd5dddfebbd1fc0fd03fabad390000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000000000000000000000000000001d74fff072d8c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000253757368695377617000000000000000000000000000000000000000000000000000000000000000001d74fff072d8c500000000000000000000000000000000000000000000000000eda9209486451f000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000001b02da8cb0d097eb8d57a175b88c7d8b479975060000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000053e0bca35ec356bd5dddfebbd1fc0fd03fabad390000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000053e0bca35ec356bd5dddfebbd1fc0fd03fabad39000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd00000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000412bf672c4638a1a2900000000000000000000000000000000000000000000000050617261737761700000000000000000000000000000000000000000000000000000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000004c00000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000042454e3f31b00000000000000000000000000000000000000000000000000000000000000200000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000414deb6e5d800000000000000000000000000000000000000000000000000158e368a357f5d000000000000000000000000000000000000000000000000001638e12246fcb500000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006e65737465642e6669010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000638a6e8909891403e83e46b9a3ece0d4ad92586d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f3938337f7294fef84e9b2c6d548a93f956cc28100000000000000000000000000000000000000000000000000000000000000e491a32b690000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f61900000000000000000000000000000000000000000000000000000414deb6e5d80000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004de543505c441992e381bdac8a648e4104e9cd07a842000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050617261737761700000000000000000000000000000000000000000000000000000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a063000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000005000000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a0630000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000046454e3f31b00000000000000000000000000000000000000000000000000000000000000200000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a0630000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000003ea7fc6b40eef20000000000000000000000000000000000000000000000000042bcb9f2fc22540000000000000000000000000000000000000000000000000044cd1eb5e19f6f00000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006e65737465642e66690100000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000638a6e89cb1c4a2818b340698271a878434eef88000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000124c04b8d59000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee5700000000000000000000000000000000000000000000000000000000638a2838000000000000000000000000000000000000000000000000003ea7fc6b40eef20000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002b8f3cf7ad23cd3cadbd9735aff958023239c6a0630000640d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000124000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005061726173776170000000000000000000000000000000000000000000000000000000000000000000000000b7b31a6bc18e48888545ce79e83e06003be7093000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000500000000000000000000000000b7b31a6bc18e48888545ce79e83e06003be709300000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000046454e3f31b0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b7b31a6bc18e48888545ce79e83e06003be709300000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000000f5bb58554c8f7000000000000000000000000000000000000000000000000003ffc86a2c201cd0000000000000000000000000000000000000000000000000041f723df36da4500000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006e65737465642e66690100000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000638a6e8b29c197f92f1a4e27a41a2c193433b12a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000124c04b8d59000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee5700000000000000000000000000000000000000000000000000000000638a283a000000000000000000000000000000000000000000000000000f5bb58554c8f70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002bb7b31a6bc18e48888545ce79e83e06003be70930000bb80d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000124000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005a65726f45780000000000000000000000000000000000000000000000000000000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000006c0000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000628415565b0000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000012cf600000000000000000000000000000000000000000000000001217338830d895b00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002c00000000000000000000000000000000000000000000000000000000000012cf60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000025761756c7453776170000000000000000000000000000000000000000000000000000000000000000000000000012cf600000000000000000000000000000000000000000000000001217338830d895b000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000003a1d87f206d12415f5b0a33e786967680aab4f6d00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd000000000000000000000000100000000000000000000000000000000000001100000000000000000000000000000000000000000000003af4e6ccb9638a1a2a00000000000000000000000000000000000000000000000000000000000000000000000000000008";

const models = [
  {
    name: "nanos",
    steps: 6,
  },
  // {
  // 	name: 'nanox',
  // 	steps: 0
  // },
];

// populate unsignedTx from genericTx and get network chain id
const unsignedTx = populateTransaction(contractAddr, inputData, testNetwork);
// Process tests for each nano models
models.forEach((model) => {
  const nano_model = nano_models.find((nano_model) =>
    nano_model.name === model.name
  );
  processTest(
    nano_model,
    model.steps,
    contractName,
    testLabel,
    testDirSuffix,
    unsignedTx,
    testNetwork,
  );
});
