# Transactions

Transactions

- are used to transfer DFI and dTokens
- have inputs and outputs
- difference between inputs and outputs is considered a _transaction fee_
- **not** encrypted
- identified by their [SHA256 hashes](./glossary.md#hashing)

[Custom Transactions](./customtx.md) also exist to interact with dApps such as the DeX and Loans.

## Transaction Format

Block bodies contain [`CTransaction`](https://github.com/DeFiCh/ain/blob/master/src/primitives/transaction.h#L210) which have the following structure:

| Name           | Data Type      | Description                                         |
| -------------- | -------------- | --------------------------------------------------- |
| nVersion       | int32_t        | Currently `4`.                                      |
| vin            | vector<CTxIn>  | List of input transactions.                         |
| vout           | vector<CTxOut> | List of output transactions.                        |
| nLockTime      | uint32_t       | Block height or timestamp when transaction is final |
| hash           | uint256        | Hash of transaction without witness data.           |
| m_witness_hash | uint256        | Hash of transaction with witness data.              |

`CTxIn` is an input transaction, and has the following structure:

| Name          | Data Type      | Description                                                |
| ------------- | -------------- | ---------------------------------------------------------- |
| prevout       | COutPoint      | Hash and index of transaction holding the output to spend. |
| scriptSig     | CScript        | Transaction unlocking script.                              |
| nSequence     | uint32_t       | Sequence number. Defaults to 0xFFFFFFFE.                   |
| scriptWitness | CScriptWitness | Witness data for this input transaction.                   |

Similar to Bitcoin's script system, a `scriptPubKey` must be able to unlock the respective `scriptSig`.

Each non-coinbase input spends an outpoint (`COutPoint`) from a previous transaction. Coinbase transactions set `prevout` to `null`, and encode the block height in `scriptSig`.

`CTxOut` is the output of the current transaction, and has the following structure:

| Name         | Data Type | Description                                                          |
| ------------ | --------- | -------------------------------------------------------------------- |
| nValue       | CAmount   | Amount of DFI to spend.                                              |
| scriptPubKey | CScript   | Defines the conditions which must be satisfied to spend this output. |
| nTokenId     | DCT_ID    | ID of token transferred. DFI has ID 0.                               |

## Coinbase Transaction

Coinbase transactions have the following properties

- it is the first transaction in a block
- there can only be one coinbase transaction per block
- creates new DFI in mining masternode's wallet

The base block reward is split into 6 different recipients. Recipients marked with UTXO are the only outputs present in the coinbase transaction.

| Recipient             | Coinbase allocation | Description                                                                                                                |
| --------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Masternode (UTXO)     | 33.33%              | Masternode rewards. Masternode also receives additional income from transaction fees.                                      |
| Community Fund (UTXO) | 4.91%               | Community fund controlled by the Foundation, used to finance DeFiChain initiatives. [ref](https://github.com/DeFiCh/dfips) |
| Anchor                | 0.02%               | Fund to pay the Bitcoin transaction fee for anchoring.                                                                     |
| Liquidity Pools       | 25.45%              | Distributed to LP providers as incentive.                                                                                  |
| Loans                 | 24.68%              | Incentives for atomic swap and DeFiChain futures.                                                                          |
| Options               | 9.88%               | Distributed to options holders. Not in use currently.                                                                      |
| Unallocated           | 1.73%               | N/A                                                                                                                        |

## External Resources

- [Bitcoin Script](https://en.bitcoin.it/wiki/Script)
- [scriptPubKey & scriptSig Explained](https://www.mycryptopedia.com/scriptpubkey-scriptsig/)
