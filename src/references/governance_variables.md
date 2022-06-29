# Governance Variables

Governance variables are used to track key stats and set key parameters for key blockchain utilities.

| Name                       | Explanation                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| LP_LOAN_TOKEN_SPLITS\*     | sets block reward distribution for dToken liquidity providers                |
| LP_SPLITS\*                | sets block reward distribution for crypto liquidity providers                |
| ICX_TAKERFEE_PER_BTC       | defines taker fee rate for ICX                                               |
| LP_DAILY_LOAN_TOKEN_REWARD | total amount of DFI paid to loaned token holders per day                     |
| LP_DAILY_DFI_REWARD        | total amount of DFI paid to liquidity providers per day                      |
| LOAN_LIQUIDATION_PENALTY   | liquidation penalty percentage (as percentage)                               |
| ORACLE_BLOCK_INTERVAL      | oracle update rate                                                           |
| ORACLE_DEVIATION           | maximum permissible deviation between reported oracle values (as percentage) |

_\*split between dToken and crypto LPs is defined in the [coinbase reward scheme](../faq.md#what-is-the-current-block-reward-scheme)._

## Loans

Variable path is `ATTRIBUTES/v0/params/dfip2203/{attribute name}`.

| Name         | Explanation                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| block_period | futures contract expiration time                                                                                                                                        |
| reward_pct   | premium/discount on expiry based on price difference between DEX price and oracle price (as percentage) (see [dfip#2203-A](https://github.com/DeFiCh/dfips/issues/127)) |
| active       | are futures enabled                                                                                                                                                     |

## Economy stats

Variable path is `ATTRIBUTES/v0/live/economy/{attribute name}`.

| Name               | Explanation                                                          |
| ------------------ | -------------------------------------------------------------------- |
| dfip2203_minted    | amount of tokens minted in futures                                   |
| dfip2203_burned    | amount of collateral burned in futures                               |
| dfip2203_current   | amount of tokens minted + amount currently in active contracts       |
| dfi_payback_tokens | amount of tokens loans are paid back in by token type (DFI and DUSD) |

## Token attributes

Variable path is `ATTRIBUTES/v0/token/{Token ID}/{attribute name}`.

| Name                    | Explanation                                                   |
| ----------------------- | ------------------------------------------------------------- |
| loan_collateral_factor  | collateral factor percentage for token                        |
| fixed_interval_price_id | oracle price feed for token                                   |
| dex_in_fee_pct          | DEX fee for swapping from                                     |
| dex_out_fee_pct         | DEX fee for swapping to                                       |
| loan_minting_enabled    | allowed to mint token for loans (boolean)                     |
| loan_minting_interest   | rate interest per block on minted tokens\* (usually set to 0) |

_\*this interest is in addition to the vault scheme's interest rate_
