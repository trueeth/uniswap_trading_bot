// adapted from https://github.com/Uniswap/interface/src/constants/tokens.ts
import { Currency, NativeCurrency as NativeCurrencyClass, Token } from '@uniswap/sdk-core'

export class NativeCurrency implements NativeCurrencyClass {
  constructor() {

    this.chainId = 42161
    this.decimals = 18
    this.name = 'Arbitrum ETH',
    this.symbol = 'ETH',
    this.isNative = true
    this.isToken = false
    this.address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
  }

  chainId: number
  decimals: number
  name: string
  symbol: string
  isNative: true
  isToken: false
  address: string

  equals(currency: Currency): boolean {
    return currency.isNative && currency.chainId === this.chainId
  }

  public get wrapped(): Token {
    return new Token(
        42161,
        '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        18,
        'WETH',
        'Wrapped Ether'
    )
  }

  public static onChain(): NativeCurrency {
    return (
      new NativeCurrency()
    )
  }
}
