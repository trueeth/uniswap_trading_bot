"use strict";
// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = exports.MAX_PRIORITY_FEE_PER_GAS = exports.MAX_FEE_PER_GAS = exports.WETH_ABI = exports.ERC20_ABI = exports.USDT_TOKEN = exports.WETH_TOKEN = exports.ETHER = exports.WETH_CONTRACT_ADDRESS = exports.SWAP_ROUTER_ADDRESS = exports.QUOTER_CONTRACT_ADDRESS = exports.POOL_FACTORY_CONTRACT_ADDRESS = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
// Addresses
exports.POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
exports.QUOTER_CONTRACT_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e';
exports.SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564';
exports.WETH_CONTRACT_ADDRESS = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1';
exports.ETHER = sdk_core_1.Ether.onChain(sdk_core_1.SupportedChainId.ARBITRUM_ONE);
exports.WETH_TOKEN = sdk_core_1.WETH9[sdk_core_1.SupportedChainId.ARBITRUM_ONE];
exports.USDT_TOKEN = new sdk_core_1.Token(sdk_core_1.SupportedChainId.ARBITRUM_ONE, '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', 6, 'USDT', 'Tether USD');
// ABI's
exports.ERC20_ABI = [
    // Read-Only Functions
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    // Authenticated Functions
    'function transfer(address to, uint amount) returns (bool)',
    'function approve(address _spender, uint256 _value) returns (bool)',
    // Events
    'event Transfer(address indexed from, address indexed to, uint amount)',
];
exports.WETH_ABI = [
    // Wrap ETH
    'function deposit() payable',
    // Unwrap ETH
    'function withdraw(uint wad) public',
];
// Transactions
exports.MAX_FEE_PER_GAS = 1000000000;
exports.MAX_PRIORITY_FEE_PER_GAS = 1000000000;
exports.TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000;
