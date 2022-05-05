# Transactions

Transactions are cryptographically signed records that transfer ownership of DFI and dTokens to different addresses. Transactions have inputs, which reference the funds from previous transactions, and outputs, which determine the new owner of the transferred tokens. Each transaction can be referenced as an input in future transactions as those funds are spent. Transactions are not encrypted, so it is possible to browse and view every transaction ever collected into a block. Once transactions have enough confirmations, they can be considered irreversible.

Each input in a transaction must have a cryptographic digital signature that unlocks the tokens from the prior transaction. Only the person possessing the appropriate private key is able to create a satisfactory signature. This ensures that funds can only be spent by their owners. Each output determines the address of the recipient of the funds.

In a transaction, the sum of all inputs must be equal to or greater than the sum of all outputs. If the inputs exceed the outputs, the difference is considered a _transaction fee_, and is redeemable by the masternode which includes the transaction into a block.

## Coinbase Transaction

A special kind of transaction exists in every block called a coinbase transaction. The coinbase transaction creates new tokens and has no inputs. It is created by the masternode, and there is one coinbase transaction per block. The coinbase transaction is the first transaction in every block. In addition to the newly created DFI, the coinbase transaction is also used for assigning the recipient of any transaction fees that were paid within the other transactions being included in the same block. Coinbase transactions always contain outputs totalling the sum of the block reward plus all transaction fees collected from the other transactions in the same block.

The base block reward is split into 6 different recipients. Recipients marked with UTXO are the only transactions present in the coinbase transaction.

| Recipient             | Coinbase allocation | Description                                                                                                                |
| --------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Masternode (UTXO)     | 33.33%              | Masternode rewards. Masternode also receives additional income from transaction fees.                                      |
| Community Fund (UTXO) | 4.91%               | Community fund controlled by the Foundation, used to finance DeFiChain initiatives. [ref](https://github.com/DeFiCh/dfips) |
| Anchor                | 0.02%               | Fund to pay the Bitcoin transaction fee for anchoring.                                                                     |
| Liquidity Pools       | 25.45%              | Distributed to LP providers as incentive.                                                                                  |
| Loans                 | 24.68%              | Incentives for atomic swap and DeFiChain futures.                                                                          |
| Options               | 9.88%               | Distributed to options holders. Not in use currently.                                                                      |
| Unallocated           | 1.73%               | N/A                                                                                                                        |

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

| Name          | Data Type      | Description                                                                                      |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| prevout       | COutPoint      | Hash and index of transaction holding the output to spend.                                       |
| scriptSig     | CScript        | Transaction unlocking script. A `scriptPubKey` must be able to make scriptSig return `true`/`1`. |
| nSequence     | uint32_t       | Sequence number. Defaults to 0xFFFFFFFE.                                                         |
| scriptWitness | CScriptWitness | Witness data for this input transaction.                                                         |

Each non-coinbase input spends an outpoint (`COutPoint`) from a previous transaction. Coinbase transactions set `prevout` to `null`, and encode the block height in `scriptSig`.

`CTxOut` is the output of the current transaction, and has the following structure:

| Name         | Data Type | Description                                                          |
| ------------ | --------- | -------------------------------------------------------------------- |
| nValue       | CAmount   | Amount of DFI to spend.                                              |
| scriptPubKey | CScript   | Defines the conditions which must be satisfied to spend this output. |
| nTokenId     | DCT_ID    | ID of token transferred. DFI has ID 0.                               |
