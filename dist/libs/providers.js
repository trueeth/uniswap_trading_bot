"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = exports.getWalletAddress = exports.getProvider = exports.getMainnetProvider = exports.TransactionState = void 0;
const ethers_1 = require("ethers");
const config_1 = require("../config");
// Single copies of provider and wallet
const mainnetProvider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.CurrentConfig.rpc.mainnet);
const wallet = createWallet();
// Interfaces
var TransactionState;
(function (TransactionState) {
    TransactionState["Failed"] = "Failed";
    TransactionState["New"] = "New";
    TransactionState["Rejected"] = "Rejected";
    TransactionState["Sending"] = "Sending";
    TransactionState["Sent"] = "Sent";
})(TransactionState || (exports.TransactionState = TransactionState = {}));
// Provider and Wallet Functions
function getMainnetProvider() {
    return mainnetProvider;
}
exports.getMainnetProvider = getMainnetProvider;
function getProvider() {
    return wallet.provider;
}
exports.getProvider = getProvider;
function getWalletAddress() {
    return wallet.address;
}
exports.getWalletAddress = getWalletAddress;
async function sendTransaction(transaction) {
    if (transaction.value) {
        transaction.value = ethers_1.BigNumber.from(transaction.value);
    }
    return sendTransactionViaWallet(transaction);
}
exports.sendTransaction = sendTransaction;
// Internal Functionality
function createWallet() {
    const provider = mainnetProvider;
    return new ethers_1.ethers.Wallet(config_1.CurrentConfig.wallet.privateKey, provider);
}
async function sendTransactionViaWallet(transaction) {
    if (transaction.value) {
        transaction.value = ethers_1.BigNumber.from(transaction.value);
    }
    const txRes = await wallet.sendTransaction(transaction);
    let receipt = null;
    const provider = getProvider();
    if (!provider) {
        return TransactionState.Failed;
    }
    while (receipt === null) {
        try {
            receipt = await provider.getTransactionReceipt(txRes.hash);
            if (receipt === null) {
                continue;
            }
        }
        catch (e) {
            console.log(`Receipt error:`, e);
            break;
        }
    }
    // Transaction was successful if status === 1
    if (receipt) {
        return TransactionState.Sent;
    }
    else {
        return TransactionState.Failed;
    }
}
