// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import {   Ether, SupportedChainId, Token, WETH9 } from '@uniswap/sdk-core'
// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const QUOTER_CONTRACT_ADDRESS =
  '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'
export const SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
export const WETH_CONTRACT_ADDRESS =
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'



export const ETHER = Ether.onChain(SupportedChainId.ARBITRUM_ONE)
export const WETH_TOKEN = WETH9[SupportedChainId.ARBITRUM_ONE]

export const USDT_TOKEN = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  6,
  'USDT',
  'Tether USD'
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const WETH_ABI = [
  // Wrap ETH
  'function deposit() payable',

  // Unwrap ETH
  'function withdraw(uint wad) public',
]

// Transactions

export const MAX_FEE_PER_GAS = 1000000000
export const MAX_PRIORITY_FEE_PER_GAS = 1000000000
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000
