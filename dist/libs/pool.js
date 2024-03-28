"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolInfo = void 0;
const IUniswapV3Pool_json_1 = __importDefault(require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json"));
const v3_sdk_1 = require("@uniswap/v3-sdk");
const ethers_1 = require("ethers");
const config_1 = require("../config");
const constants_1 = require("./constants");
const providers_1 = require("./providers");
async function getPoolInfo() {
    const provider = (0, providers_1.getProvider)();
    if (!provider) {
        throw new Error('No provider');
    }
    const currentPoolAddress = (0, v3_sdk_1.computePoolAddress)({
        factoryAddress: constants_1.POOL_FACTORY_CONTRACT_ADDRESS,
        tokenA: config_1.CurrentConfig.tokens.in,
        tokenB: config_1.CurrentConfig.tokens.out,
        fee: config_1.CurrentConfig.tokens.poolFee,
    });
    console.log(currentPoolAddress, 'current pool address');
    const poolContract = new ethers_1.ethers.Contract(currentPoolAddress, IUniswapV3Pool_json_1.default.abi, provider);
    const [token0, token1, fee, tickSpacing, liquidity, slot0] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
        poolContract.tickSpacing(),
        poolContract.liquidity(),
        poolContract.slot0(),
    ]);
    return {
        token0,
        token1,
        fee,
        tickSpacing,
        liquidity,
        sqrtPriceX96: slot0[0],
        tick: slot0[1],
    };
}
exports.getPoolInfo = getPoolInfo;
