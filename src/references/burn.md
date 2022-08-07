# Burns

DFI and dTokens are burnt when interacting with various dApps such as DEX and loans, as well as due to extrinsic actions such as submitting CFPs (10 DFI) and DFIPs (50 DFI).

The amount of DFI and dTokens burnt can be found using the `getburninfo` RPC. A breakdown of the various sources of token burns can be found below.

| Output           | Description                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| amount           | (in DFI) the cumulative amount of transaction fees paid. This is redistributed to DeFiChain masternodes.                                    |
| tokens           | miscellaneous burns (such as CFP/DFIP proposal fee)                                                                                         |
| feeburn          | (in DFI) DFI locked up to create masternodes (20000 DFI + 11 DFI non-refundable creation fee), tokens and vaults (1 DFI + 1 DFI refundable) |
| auctionburn      | (in DFI) 5% auction fee + vault interest paid by auction participants                                                                       |
| paybackburn      | cumulative loan principal and interest paid back                                                                                            |
| dexfeetokens     | cumulative DEX input and output fees burnt. Redistributed to liquidity providers.                                                           |
| dfipaybackfee    | loaned DFI paid back in DFI                                                                                                                 |
| dfipaybacktokens | loaned DFI paid back in DUSD                                                                                                                |
| paybackfees      | cumulative dToken loan payback penalties                                                                                                    |
| paybacktokens    | cumulative dToken loan tokens paid back                                                                                                     |
| emissionburn     | DFI burnt due to unallocated block reward (see [block reward](../faq.md#what-is-the-current-block-reward-scheme))                           |
| dfip2203         | dTokens burnt from DeFiChain Futures                                                                                                        |

<!-- - paybackfees - loan payback penalties (from live economy gov variable)
- paybacktokens - loan tokens paid back (from live economy gov variable)

- paybackFee - fee to payback loan (subintoken = amount \* price / payback penalty price is swapped to DFI and burnt) -->
