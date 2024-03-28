import { SupportedChainId, Token, WETH9, Ether, NativeCurrency } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'

import {  USDT_TOKEN } from './libs/constants'

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  MAINNET,
  WALLET_EXTENSION,
}

// Inputs that configure this example to run
export interface IConfig {
  env: Environment
  rpc: {
    local: string
    mainnet: string
  }
  wallet: {
    address: string
    privateKey: string
  }
  tokens: {
    in: Token 
    amountIn: number
    out: Token 
    poolFee: number
  }
}

// Example Configuration

export const CurrentConfig: IConfig = {
  env: Environment.MAINNET,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://rpc.tornadoeth.cash/arbitrum',
  },
  wallet: {
    address: '0x32873B1dbDD0CD249Fa9b1b64E4af2681eE81226',
    privateKey:
      '44f97a3798bd027333a38baceb9f6251c101f3215e9ab374549689b30e06491b',
  },
  tokens: {
    in: USDT_TOKEN,
    amountIn: 1,
    out: WETH9[SupportedChainId.ARBITRUM_ONE],
    poolFee: FeeAmount.MEDIUM,
  },
}
