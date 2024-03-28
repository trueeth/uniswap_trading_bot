"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeCurrency = void 0;
// adapted from https://github.com/Uniswap/interface/src/constants/tokens.ts
const sdk_core_1 = require("@uniswap/sdk-core");
class NativeCurrency {
    constructor() {
        this.chainId = 42161;
        this.decimals = 18;
        this.name = 'Arbitrum ETH',
            this.symbol = 'ETH',
            this.isNative = true;
        this.isToken = false;
        this.address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    }
    equals(currency) {
        return currency.isNative && currency.chainId === this.chainId;
    }
    get wrapped() {
        return new sdk_core_1.Token(42161, '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', 18, 'WETH', 'Wrapped Ether');
    }
    static onChain() {
        return (new NativeCurrency());
    }
}
exports.NativeCurrency = NativeCurrency;
