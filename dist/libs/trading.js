"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenTransferApproval = exports.executeTrade = exports.createTrade = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const ethers_1 = require("ethers");
const jsbi_1 = __importDefault(require("jsbi"));
const config_1 = require("../config");
const constants_1 = require("./constants");
const constants_2 = require("./constants");
const pool_1 = require("./pool");
const providers_1 = require("./providers");
const utils_1 = require("./utils");
// Trading Functions
async function createTrade() {
    const poolInfo = await (0, pool_1.getPoolInfo)();
    const pool = new v3_sdk_1.Pool(config_1.CurrentConfig.tokens.in, config_1.CurrentConfig.tokens.out, config_1.CurrentConfig.tokens.poolFee, poolInfo.sqrtPriceX96.toString(), poolInfo.liquidity.toString(), poolInfo.tick);
    const swapRoute = new v3_sdk_1.Route([pool], config_1.CurrentConfig.tokens.in, sdk_core_1.Ether.onChain(sdk_core_1.SupportedChainId.ARBITRUM_ONE));
    const amountOut = await getOutputQuote(swapRoute);
    console.log(amountOut, 'amount out');
    const uncheckedTrade = v3_sdk_1.Trade.createUncheckedTrade({
        route: swapRoute,
        inputAmount: sdk_core_1.CurrencyAmount.fromRawAmount(config_1.CurrentConfig.tokens.in, (0, utils_1.fromReadableAmount)(config_1.CurrentConfig.tokens.amountIn, config_1.CurrentConfig.tokens.in.decimals).toString()),
        outputAmount: sdk_core_1.CurrencyAmount.fromRawAmount(constants_1.ETHER, jsbi_1.default.BigInt(amountOut)),
        tradeType: sdk_core_1.TradeType.EXACT_INPUT,
    });
    return uncheckedTrade;
}
exports.createTrade = createTrade;
async function executeTrade(trade) {
    const walletAddress = (0, providers_1.getWalletAddress)();
    const provider = (0, providers_1.getProvider)();
    if (!walletAddress || !provider) {
        throw new Error('Cannot execute a trade without a connected wallet');
    }
    // Give approval to the router to spend the token
    // const tokenApproval = await getTokenTransferApproval(CurrentConfig.tokens.in) 
    // Fail if transfer approvals do not go through
    // if (tokenApproval !== TransactionState.Sent) {
    //   return TransactionState.Failed
    // }
    const options = {
        slippageTolerance: new sdk_core_1.Percent(50, 10000), // 50 bips, or 0.50%
        deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
        recipient: walletAddress,
    };
    const methodParameters = v3_sdk_1.SwapRouter.swapCallParameters([trade], options);
    const tx = {
        data: methodParameters.calldata,
        to: constants_1.SWAP_ROUTER_ADDRESS,
        value: methodParameters.value,
        from: walletAddress,
        gasLimit: 3000000,
        maxFeePerGas: constants_2.MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: constants_2.MAX_PRIORITY_FEE_PER_GAS,
    };
    const res = await (0, providers_1.sendTransaction)(Object.assign(Object.assign({}, tx), { from: walletAddress }));
    return res;
}
exports.executeTrade = executeTrade;
// Helper Quoting and Pool Functions
async function getOutputQuote(route) {
    const provider = (0, providers_1.getProvider)();
    if (!provider) {
        throw new Error('Provider required to get pool state');
    }
    const { calldata } = await v3_sdk_1.SwapQuoter.quoteCallParameters(route, sdk_core_1.CurrencyAmount.fromRawAmount(config_1.CurrentConfig.tokens.in, (0, utils_1.fromReadableAmount)(config_1.CurrentConfig.tokens.amountIn, config_1.CurrentConfig.tokens.in.decimals).toString()), sdk_core_1.TradeType.EXACT_INPUT, {
        useQuoterV2: true,
    });
    const quoteCallReturnData = await provider.call({
        to: constants_1.QUOTER_CONTRACT_ADDRESS,
        data: calldata,
    });
    return ethers_1.ethers.utils.defaultAbiCoder.decode(['uint256'], quoteCallReturnData);
}
async function getTokenTransferApproval(token) {
    const provider = (0, providers_1.getProvider)();
    const address = (0, providers_1.getWalletAddress)();
    if (!provider || !address) {
        console.log('No Provider Found');
        return providers_1.TransactionState.Failed;
    }
    try {
        const tokenContract = new ethers_1.ethers.Contract(token.address, constants_1.ERC20_ABI, provider);
        const transaction = await tokenContract.populateTransaction['approve'](constants_1.SWAP_ROUTER_ADDRESS, (0, utils_1.fromReadableAmount)(constants_1.TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER, token.decimals).toString());
        return (0, providers_1.sendTransaction)(Object.assign(Object.assign({}, transaction), { from: address }));
    }
    catch (e) {
        console.error(e);
        return providers_1.TransactionState.Failed;
    }
}
exports.getTokenTransferApproval = getTokenTransferApproval;
