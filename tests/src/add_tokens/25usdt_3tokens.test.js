import { nano_models, processTest, populateTransaction } from "../test.fixture";

const contractName = "NestedFactory";
const contractAddr = "0xfd896db057f260adce7fd1fd48c6623e023406cd";
const testNetwork = "polygon";

const testLabel = "add tokens 25usdt 3tokens"; // <= Name of the test
const testDirSuffix = testLabel.toLowerCase().replace(/\s+/g, '_');

// https://polygonscan.com/tx/0xa41fb1c6ec2166a19902b4a245769b6f5076c94a886a22344e45e733af902107
const inputData = "0x90e1aa690000000000000000000000000000000000000000000000000000000000004ac8000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f00000000000000000000000000000000000000000000000000000000017d7840000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000940466c617400000000000000000000000000000000000000000000000000000000000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f00000000000000000000000000000000000000000000000000000000007ca96f5a65726f457800000000000000000000000000000000000000000000000000000000000000000000000000002c89bbc92bd86f8075d1decc58c7f4e0107f286b000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000007a0000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000002c89bbc92bd86f8075d1decc58c7f4e0107f286b00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000708415565b0000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000002c89bbc92bd86f8075d1decc58c7f4e0107f286b00000000000000000000000000000000000000000000000000000000007dffcf000000000000000000000000000000000000000000000000016405c8d2f74cd700000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000004c000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000002c89bbc92bd86f8075d1decc58c7f4e0107f286b000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000000003a000000000000000000000000000000000000000000000000000000000007dffcf00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000253757368695377617000000000000000000000000000000000000000000000000000000000000000000000000009b138000000000000000000000000000000000000000000000000001bb1ece953b9f5000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000001b02da8cb0d097eb8d57a175b88c7d8b4799750600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000002c89bbc92bd86f8075d1decc58c7f4e0107f286b0000000000000000000000000000001142616c616e63657256320000000000000000000000000000000000000000000000000000000000000000000000744e98000000000000000000000000000000000000000000000000014853debc4fb8d500000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c8d9b84f68af362159da621473ef0f979709734db60001000000000000000000710000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd00000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000d8c4cb6ce46256f5110000000000000000000000000000000000000000000000005a65726f45780000000000000000000000000000000000000000000000000000000000000000000000000000a649325aa7c5093d12d6f98eb4378deae68ce23f00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000a20000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000a649325aa7c5093d12d6f98eb4378deae68ce23f00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000988415565b0000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000a649325aa7c5093d12d6f98eb4378deae68ce23f00000000000000000000000000000000000000000000000000000000007efe7100000000000000000000000000000000000000000000000000441479a9ca38ad00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000072000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000007efe7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000012556e697377617056330000000000000000000000000000000000000000000000000000000000000000000000007efe710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002bc2132d05d31c914a87c6611c10748aeb04b58e8f0001f40d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000a649325aa7c5093d12d6f98eb4378deae68ce23f000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000002a0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000241706553776170000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000441479a9ca38ad000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0788a3ad43d79aa53b09c2eacc313a787d1d607000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000a649325aa7c5093d12d6f98eb4378deae68ce23f000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000003000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd000000000000000000000000100000000000000000000000000000000000001100000000000000000000000000000000000000000000005e27b133616256f51100000000000000000000000000000000000000000000000000000000000000000000000000000001";

const models = [
	{
		name: 'nanos',
		steps: 6
	},
	// {
	// 	name: 'nanox',
	// 	steps: 0
	// },
]

// populate unsignedTx from genericTx and get network chain id
const unsignedTx = populateTransaction(contractAddr, inputData, testNetwork);
// Process tests for each nano models
models.forEach((model) => {
	const nano_model = nano_models.find((model) => model.name == model.name)
	processTest(nano_model, model.steps, contractName, testLabel, testDirSuffix, unsignedTx, testNetwork)
})