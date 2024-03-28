"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentConfig = exports.Environment = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const constants_1 = require("./libs/constants");
// Sets if the example should run locally or on chain
var Environment;
(function (Environment) {
    Environment[Environment["LOCAL"] = 0] = "LOCAL";
    Environment[Environment["MAINNET"] = 1] = "MAINNET";
    Environment[Environment["WALLET_EXTENSION"] = 2] = "WALLET_EXTENSION";
})(Environment || (exports.Environment = Environment = {}));
// Example Configuration
exports.CurrentConfig = {
    env: Environment.MAINNET,
    rpc: {
        local: 'http://localhost:8545',
        mainnet: 'https://rpc.tornadoeth.cash/arbitrum',
    },
    wallet: {
        address: '0x32873B1dbDD0CD249Fa9b1b64E4af2681eE81226',
        privateKey: '44f97a3798bd027333a38baceb9f6251c101f3215e9ab374549689b30e06491b',
    },
    tokens: {
        in: constants_1.USDT_TOKEN,
        amountIn: 1,
        out: sdk_core_1.WETH9[sdk_core_1.SupportedChainId.ARBITRUM_ONE],
        poolFee: v3_sdk_1.FeeAmount.MEDIUM,
    },
};
