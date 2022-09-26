# FAQ

### What is subnode staking?

Masternodes that are locked in for 5 and 10 years should increased rewards of 1.5x and 2x respectively, the subnode staking system was introduced to provide consistent returns. Since each of the subnodes has a unique masternode ID, it therefore allows for multiple hashes in the same interval. Thus, having multiple subnodes is equivalent to having a higher mining hashrate, and therefore proportionally increases chances of mining a block successfully leading to higher returns on average.

- Normal masternodes uses 2 subnodes
- 5 year lockup masternode uses 3 subnodes
- 10 year lockup masternode uses 4 subnodes

### While using composite swaps, are fees applied once or multiple times?

Composite swaps will require the user to fees for every DeX pool that is utilised.

For example, swapping from dLTC to DUSD has the following routing and fees

```
LTC
 ↓ (0.2%)
DFI
 ↓ (0.2%)
DUSD
```

$$
fees = 1 - ((1 \times 0.998) \times 0.998) = 0.003996
$$

Net fees for the swap will be 0.3996% without accounting for slippage.

### How is the number of LP tokens calculated?

The total number of liquidity tokens in a pool is $$min(\text{liquidity of A}, \text{liquidity of B})$$

When new liquidity is added, the amount of tokens returned to the user is

$$
min(liq_a, liq_b)
$$

where

$$
liq_a = \frac{\text{amount of A added} * \text{total liquidity}}{\text{amount of A}}
$$

and

$$
liq_b = \frac{\text{amount of B added} * \text{total liquidity}}{\text{amount of B}}
$$

### What is the current block reward scheme?

The base block reward is distributed to 6 different recipients. Recipients marked with UTXO are the only transactions present in the coinbase transaction.

| Recipient             | Coinbase allocation | Description                                                                                                                |
| --------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Masternode (UTXO)     | 33.33%              | Masternode rewards. Masternode also receives additional income from transaction fees.                                      |
| Community Fund (UTXO) | 4.91%               | Community fund controlled by the Foundation, used to finance DeFiChain initiatives. [ref](https://github.com/DeFiCh/dfips) |
| Anchor                | 0.02%               | Fund to pay the Bitcoin transaction fee for anchoring.                                                                     |
| Liquidity Pools       | 25.45%              | Distributed to crypto-crypto LP providers.                                                                                 |
| Loans                 | 24.68%              | Distributed to dToken-DUSD LP providers.                                                                                    |
| Options               | 9.88%               | Distributed to options holders. Not in use currently.                                                                      |
| Unallocated           | 1.73%               | N/A                                                                                                                        |
