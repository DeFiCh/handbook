# Decentralised Exchange

# Table of contents

1. [Introduction](#introduction)
2. [Performing swaps](#performing-swaps)
   - [Single swaps](#single-swaps)
   - [Composite swaps](#composite-swaps)
3. [Adding liquidity](#adding-liquidity)
4. [Removing liquidity](#removing-liquidity)

## Introduction

The DeFiChain Decentralised Exchange is a marketplace where users can exchange their tokens for other on chain tokens. The DeFiChain DEX uses the [automated market maker](https://academy.binance.com/en/articles/what-is-an-automated-market-maker-amm) model where asset prices are defined by the ratio of available liquidity in the liquidity pool.

Each DeX pair (colloquially called pool pair) has the following properties:

| Name       | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| Token A ID | Token ID of the first asset in the pool                          |
| Token B ID | Token ID of the second asset in the pool (generally `0` for DFI) |
| A reserves | Amount of Token A available in pool pair                         |
| B reserves | Amount of Token B available in pool pair                         |
| Commission | Swap fees for pool pair                                          |

The price of an asset can be determined by the ratio between the reserves of the two assets in the pool pair.

> In the DeFiChain DEX, liquidity is distributed uniformly.
>
> The DEX uses the `x * y = k` formula. Learn more about how it works in the [Uniswap paper](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf) on the model and [this article](https://medium.com/phoenix-finance/understanding-the-xyk-model-of-pooled-liquidity-7340fdc20d9c).

$$
price_A = \frac{reserve_B}{reserve_A}
$$

$$
price_B = \frac{reserve_A}{reserve_B}
$$

The formula used for calculating output amount when swapping from A to B is

$$
output = reserve_B - \frac{reserve_B * reserve_A}{reserve_A + input}
$$

Swaps are executed with the following steps:

1. Check if pool pair is activated
2. Check if minimum liquidity is available in the pool pair
3. Check if price is under maximum price
4. Subtract swap fees from input amount
5. Subtract DeX input fees from input amount (set using governance variables)
6. Add input amount to reserves and extract output from reserves

There are two possible types of swaps, single and composite. Single swaps are swaps where the swap route has just one pool pair, whereas composite swaps can go through up to 3 pool pairs.

For example, swapping from ETH to DFI is a single swap since it only uses the ETH-DFI pool. However swapping from DUSD to ETH is a composite swap since the DUSD is first swapped to DFI using the DUSD-DFI pool, and then the DFI is swapped to ETH using the ETH-DFI pool.

> When using composite swaps, every pool pair used will apply their own fees. See [FAQ](../faq.md#while-using-composite-swaps-are-fees-applied-once-or-multiple-times).

See how the amount of LP tokens are caluclated [here](../faq.md#how-is-the-number-of-lp-tokens-calculated).

## Performing swaps

Swapping tokens can be performed using the `poolswap` RPC for single swaps and `compositeswap` RPC for composite swaps.

> The `testpoolswap` RPC can be used to simulate the results of the pool swap. Use the path argument to force simple or composite swaps.

### Single swaps

To perform single swaps, the following metadata must be provided to the RPC endpoint

- from: address which sends input tokens
- tokenFrom: ID or symbol of input token
- amountFrom: amount of tokens to swap
- to: address to send output to
- tokenTo: ID or symbol of output token
- maxPrice: maximum acceptable price

Optionally, users can specify UTXOs to spend for the swap.

The metadata and UTXO data is passed as a JSON object to the RPC.

```bash
defi-cli poolswap {"from":"str","tokenFrom":"str","amountFrom":n,"to":"str","tokenTo":"str","maxPrice":n} ( [{"txid":"hex","vout":n},...] )
defi-cli poolswap '{"from": "MyAddress", "tokenFrom": "MyToken1", "amountFrom": "0.001", "to": "MyAddress", "tokenTo": "Token2", "maxPrice": "0.01"}' '[{"txid": "id", "vout": 0}]'
```

e.g. Swapping 1 ETH to DFI, the command would be

```bash
# using symbols
defi-cli poolswap '{"from": "tnLRVU32vCfGD6...", "tokenFrom": "ETH", "amountFrom": "1", "to": "tnLRVU32vCfGD6...", "tokenTo": "DFI", "maxPrice": "0.01"}'
# using token ID
defi-cli poolswap '{"from": "tnLRVU32vCfGD6...", "tokenFrom": "1", "amountFrom": "1", "to": "tnLRVU32vCfGD6...", "tokenTo": "0", "maxPrice": "0.01"}'
```

### Composite swaps

Composite swaps have the same RPC structure as single swaps.

```bash
defi-cli compositeswap {"from":"str","tokenFrom":"str","amountFrom":n,"to":"str","tokenTo":"str","maxPrice":n} ( [{"txid":"hex","vout":n},...] )
defi-cli compositeswap '{"from": "MyAddress", "tokenFrom": "MyToken1", "amountFrom": "0.001", "to": "MyAddress", "tokenTo": "Token2", "maxPrice": "0.01"}' '[{"txid": "id", "vout": 0}]'
```

e.g. Swapping 1 ETH to DUSD, the command would be

```bash
# using symbols
defi-cli poolswap '{"from": "tnLRVU32vCfGD6...", "tokenFrom": "ETH", "amountFrom": "1", "to": "tnLRVU32vCfGD6...", "tokenTo": "DUSD", "maxPrice": "0.0001"}' '[]'
# using token ID
defi-cli poolswap '{"from": "tnLRVU32vCfGD6...", "tokenFrom": "1", "amountFrom": "1", "to": "tnLRVU32vCfGD6...", "tokenTo": "17", "maxPrice": "0.0001"}' '[]'
```

## Adding liquidity

To enter an LP position, the `addpoolliquidity` RPC can be used. Equal value of assets must be provided when entering an LP. The RPC will reject the request if the price impact of adding liquidity is more than 3%. The arguments for the RPC are

- from: addresses and tokens to add to LP
- shareAddress: address to credit LP tokens to
- inputs: _(optional)_ UTXOs to spend

```bash
defi-cli addpoolliquidity {"address":"str"} "shareAddress" ( [{"txid":"hex","vout":n},...] )
defi-cli addpoolliquidity '{"address1": "1.0@DFI", "address2": "1.0@ETH"}' share_address '[]'
```

e.g. adding 0.1 ETH and 1 DFI of liquidity and credit LP tokens to address `tnLRVU32vCfGD6...`

```bash
# add liquidity from different addresses
defi-cli addpoolliquidity '{"tnLRVU32vCfGD6...":"1.0@DFI","df1q8e3ce1j51m...":"0.1@ETH"}' tnLRVU32vCfGD6... '[]'
# add liquidity from same address
defi-cli addpoolliquidity '{"tnLRVU32vCfGD6...": ["1.0@DFI", "0.1@ETH"]}' tnLRVU32vCfGD6... '[]'
# auto select accounts to add liquidity with
defi-cli addpoolliquidity '{"*": ["1.0@DFI", "0.1@ETH"]}' tnLRVU32vCfGD6... '[]'
```

## Removing liquidity

To exit an LP position, the `removepoolliquidity` RPC can be used. The RPC will redeem LP tokens for equal values of both pool assets.

The arguments are

- from: address to redeem LP from
- amount: amount of LP tokens to redeem
- inputs: _(optional)_ UTXOs to spend

```bash
defi-cli removepoolliquidity "from" "amount" ( [{"txid":"hex","vout":n},...] )
defi-cli removepoolliquidity from_address 1.0@LpSymbol
```

e.g. redeeming 1 ETH-DFI LP token from address `tnLRVU32vCfGD6...`

```bash
defi-cli removepoolliquidity tnLRVU32vCfGD6... 1.0@ETH-DFI
```
