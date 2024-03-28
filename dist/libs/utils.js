"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayTrade = exports.toReadableAmount = exports.fromReadableAmount = void 0;
const ethers_1 = require("ethers");
const MAX_DECIMALS = 4;
function fromReadableAmount(amount, decimals) {
    return ethers_1.ethers.utils.parseUnits(amount.toString(), decimals);
}
exports.fromReadableAmount = fromReadableAmount;
function toReadableAmount(rawAmount, decimals) {
    return ethers_1.ethers.utils.formatUnits(rawAmount, decimals).slice(0, MAX_DECIMALS);
}
exports.toReadableAmount = toReadableAmount;
function displayTrade(trade) {
    return `${trade.inputAmount.toExact()} ${trade.inputAmount.currency.symbol} for ${trade.outputAmount.toExact()} ${trade.outputAmount.currency.symbol}`;
}
exports.displayTrade = displayTrade;
