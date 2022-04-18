# Blocks and the Blockchain

The DeFiChain blockchain is a collection of intedependent blocks stored on a distributed digital ledger. Each block contains information about the block previous to it and they form a chain - with each additional block reinforcing the ones before it.

Each block consists of a block header and a body. The block header contains metadata about the block and its contents, and the body contains a list of transactions in that block. Blocks and transactions are identified by their SHA256 hashes.

## Block header

The header format of DeFiChain blocks is as follows. The implementation of the block header can be found in the class `CBlockHeader` in file [`src/primitives/block.h`](https://github.com/DeFiCh/ain/blob/master/src/primitives/block.h#L23).

| Name             | Data Type             | Description                                                                                                                                                                      |
| ---------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nVersion         | int32_t               | Used to resolve soft forks. Usually 536870912. For details on how nVersion is processed and used, read [BIP9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki).   |
| hashPrevBlock    | uint256               | Double SHA256 hash of previous block header.                                                                                                                                     |
| hashMerkleRoot   | uint256               | Double SHA256 hash of merkle root of transaction merkle tree.                                                                                                                    |
| nTime            | uint32_t              | The block time is a Unix epoch time when the miner started hashing the header (according to the miner). Must be strictly greater than the median time of the previous 11 blocks. |
| nBits            | uint32_t              | An encoded version of the target threshold this block’s header hash must be less than or equal to.                                                                               |
| deprecatedHeight | uint64_t              | [Deprecated] Block height of the current block.                                                                                                                                  |
| mintedBlocks     | uint64_t              | Number of blocks this masternode has mined.                                                                                                                                      |
| stakeModifier    | uint256               | A stake modifier is a collective source of random entropy for mining. It is equal to `SHA256({previous stake modifier}, {masternode ID}).`                                       |
| sig              | vector<unsigned char> | Signed block header using miner's public key.                                                                                                                                    |

### Merkle Trees

Merkle trees are binary trees of hashes. Merkle trees in DeFiChain use a double SHA-256. Merkle trees allow us to efficiently if check a transaction is part of the block - in `O(log n)` time.
If, when forming a row in the tree (other than the root of the tree), it would have an odd number of elements, the final double-hash is duplicated to ensure that the row has an even number of hashes.

First form the bottom row of the tree with the ordered double-SHA-256 hashes of the byte streams of the transactions in the block.

Then the row above it consists of half that number of hashes. Each entry is the double-SHA-256 of the 64-byte concatenation of the corresponding two hashes below it in the tree.

This procedure repeats until we reach a row consisting of just a single double-hash. This is the Merkle root of the tree.

For example, imagine a block with three transactions a, b and c. The Merkle tree is:

```
d1 = dhash(a)
d2 = dhash(b)
d3 = dhash(c)
d4 = dhash(c) # a, b, c are 3. that's an odd number, so we take the c twice

d5 = dhash(d1 concat d2)
d6 = dhash(d3 concat d4)

d7 = dhash(d5 concat d6)
```

where

```
dhash(a) = sha256(sha256(a))
```

`d7` is the Merkle root of the 3 transactions in this block.

The implementation of Merkle trees can be found at [`src/consensus/merkle.cpp`](https://github.com/DeFiCh/ain/blob/master/src/consensus/merkle.cpp).

Note: Hashes in Merkle Tree displayed in the Block Explorer are of little-endian notation. For some implementations and calculations, the bytes need to be reversed before they are hashed, and again after the hashing operation.

## Block Body

The block body consists of a list of transaction pointers, which is has type `vector<CTransactionRef>`. The contents of each Transaction as well as the different types of Transactions are detailed in the [Transactions document](./transaction.md).
