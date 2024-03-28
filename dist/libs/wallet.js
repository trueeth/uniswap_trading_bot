"use strict";
// This file contains code to easily connect to and get information from a wallet on chain
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapETH = exports.wrapETH = exports.getCurrencyBalance = void 0;
const ethers_1 = require("ethers");
const jsbi_1 = __importDefault(require("jsbi"));
const constants_1 = require("./constants");
const providers_1 = require("./providers");
const utils_1 = require("./utils");
async function getCurrencyBalance(provider, address, token) {
    // Handle ETH directly
    if (token.isNative) {
        return ethers_1.ethers.utils.formatEther(await provider.getBalance(address));
    }
    // Get currency otherwise
    const ERC20Contract = new ethers_1.ethers.Contract(token.address, constants_1.ERC20_ABI, provider);
    const balance = await ERC20Contract['balanceOf'](address);
    const decimals = await ERC20Contract['decimals']();
    // Format with proper units (approximate)
    return (0, utils_1.toReadableAmount)(balance, decimals);
}
exports.getCurrencyBalance = getCurrencyBalance;
// wraps ETH (rounding up to the nearest ETH for decimal places)
async function wrapETH(eth) {
    const provider = (0, providers_1.getProvider)();
    const address = (0, providers_1.getWalletAddress)();
    if (!provider || !address) {
        throw new Error('Cannot wrap ETH without a provider and wallet address');
    }
    const wethContract = new ethers_1.ethers.Contract(constants_1.WETH_CONTRACT_ADDRESS, constants_1.WETH_ABI, provider);
    const transaction = {
        data: wethContract.interface.encodeFunctionData('deposit'),
        value: ethers_1.BigNumber.from(Math.ceil(eth))
            .mul(jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(18)).toString())
            .toString(),
        from: address,
        to: constants_1.WETH_CONTRACT_ADDRESS,
        maxFeePerGas: constants_1.MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: constants_1.MAX_PRIORITY_FEE_PER_GAS,
    };
    await (0, providers_1.sendTransaction)(transaction);
}
exports.wrapETH = wrapETH;
// unwraps ETH (rounding up to the nearest ETH for decimal places)
async function unwrapETH(eth) {
    const provider = (0, providers_1.getProvider)();
    const address = (0, providers_1.getWalletAddress)();
    if (!provider || !address) {
        throw new Error('Cannot unwrap ETH without a provider and wallet address');
    }
    const wethContract = new ethers_1.ethers.Contract(constants_1.WETH_CONTRACT_ADDRESS, constants_1.WETH_ABI, provider);
    const transaction = {
        data: wethContract.interface.encodeFunctionData('withdraw', [
            ethers_1.BigNumber.from(Math.ceil(eth))
                .mul(jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(18)).toString())
                .toString(),
        ]),
        from: address,
        to: constants_1.WETH_CONTRACT_ADDRESS,
        maxFeePerGas: constants_1.MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: constants_1.MAX_PRIORITY_FEE_PER_GAS,
    };
    await (0, providers_1.sendTransaction)(transaction);
}
exports.unwrapETH = unwrapETH;
