# Blocks and the Blockchain

Each DeFiChain block consists of

- a block header: contains metadata about the block and its contents and links to previous block
- a body: contains a list of transactions in that block.

Blocks are identified by their [SHA256 hashes](./glossary.md#hashing).

## Block header

The header format of DeFiChain blocks is as follows. The implementation of the block header can be found in the class `CBlockHeader` in file [`src/primitives/block.h`](https://github.com/DeFiCh/ain/blob/master/src/primitives/block.h#L23).

| Name                       | Data Type             | Description                                                                                                                                                                                                                                                                                                                                      |
| -------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nVersion                   | int32_t               | Used to create and accept soft forks. Usually 536870912. For details on how nVersion is processed and used, read [BIP9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki).                                                                                                                                                         |
| hashPrevBlock              | uint256               | [Double SHA256 hash](./glossary.md#hashing) of previous block header.                                                                                                                                                                                                                                                                            |
| hashMerkleRoot             | uint256               | [Double SHA256 hash](./glossary.md#hashing) of merkle root of transaction [merkle tree](./glossary.md#merkle-trees).                                                                                                                                                                                                                             |
| nTime                      | uint32_t              | Unix time of when the miner started hashing the header (according to the miner). Must be strictly greater than the median time of the previous 11 blocks.                                                                                                                                                                                        |
| nBits                      | uint32_t              | Used for PoS mining. An encoded version of the target threshold this block’s header hash must be less than or equal to.                                                                                                                                                                                                                          |
| ~~deprecatedHeight~~**\*** | uint64_t              | [**\*No longer in use**] Block height of the current block. Block height is tracked by `CBlockIndex` instead of block headers themselves, this remains in the block header for compatibility with previous versions of the node. Removal of this field would require a [hard fork](<https://en.wikipedia.org/wiki/Fork_(blockchain)#Hard_fork>). |
| mintedBlocks               | uint64_t              | Number of blocks this masternode has mined.                                                                                                                                                                                                                                                                                                      |
| stakeModifier              | uint256               | A stake modifier is a collective source of random entropy for PoS mining. It is equal to `SHA256({previous stake modifier}, {masternode ID}).`                                                                                                                                                                                                   |
| sig                        | vector<unsigned char> | Signed digest block header using miner's public key.                                                                                                                                                                                                                                                                                             |

## Block Body

The block body consists of

- a list of pointers which map to transactions
- a local variable `fChecked` (not shared between nodes) to track if the block has been successfully validated previously

The list of transactions has type `vector<CTransactionRef>`, and each `CTransactionRef` points to a [`CTransaction`](https://github.com/DeFiCh/ain/blob/master/src/primitives/transaction.h#L210). The contents of each Transaction as well as the different types of Transactions are detailed in the [Transactions document](./transaction.md).

## External Resources

- [Bitcoin Block Reference](https://developer.bitcoin.org/reference/block_chain.html)
- [A Decomposition Of The Bitcoin Block Header](https://www.datadriveninvestor.com/2019/11/21/a-decomposition-of-the-bitcoin-block-header/)
- [Bitcoin Protocol Documentation](https://en.bitcoin.it/wiki/Protocol_documentation)
- [Blockchain Forking](<https://en.wikipedia.org/wiki/Fork_(blockchain)>)
