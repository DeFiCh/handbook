# Blocks and the Blockchain

The DeFiChain blockchain is a collection of intedependent blocks stored on a distributed digital ledger. Each block contains information about the block previous to it and they form a chain - with each additional block reinforcing the ones before it.

Each block consists of a block header and a body. The block header contains metadata about the block and its contents, and the body contains a list of transactions in that block. Blocks and transactions are identified by their SHA256 hashes.

## Block header

The header format of DeFiChain blocks is as follows. The implementation of the block header can be found in the class `CBlockHeader` in file [`src/primitives/block.h`](https://github.com/DeFiCh/ain/blob/master/src/primitives/block.h#L23).

| Name                 | Data Type             | Description                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nVersion             | int32_t               | Used to create and accept soft forks. Usually 536870912. For details on how nVersion is processed and used, read [BIP9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki).                                                                                                                                                         |
| hashPrevBlock        | uint256               | Double SHA256 hash of previous block header.                                                                                                                                                                                                                                                                                                     |
| hashMerkleRoot       | uint256               | Double SHA256 hash of merkle root of transaction merkle tree.                                                                                                                                                                                                                                                                                    |
| nTime                | uint32_t              | Unix time of when the miner started hashing the header (according to the miner). Must be strictly greater than the median time of the previous 11 blocks.                                                                                                                                                                                        |
| nBits                | uint32_t              | Used for PoS mining. An encoded version of the target threshold this block’s header hash must be less than or equal to.                                                                                                                                                                                                                          |
| _deprecatedHeight\*_ | uint64_t              | [**\*No longer in use**] Block height of the current block. Block height is tracked by `CBlockIndex` instead of block headers themselves, this remains in the block header for compatibility with previous versions of the node. Removal of this field would require a [hard fork](<https://en.wikipedia.org/wiki/Fork_(blockchain)#Hard_fork>). |
| mintedBlocks         | uint64_t              | Number of blocks this masternode has mined.                                                                                                                                                                                                                                                                                                      |
| stakeModifier        | uint256               | A stake modifier is a collective source of random entropy for PoS mining. It is equal to `SHA256({previous stake modifier}, {masternode ID}).`                                                                                                                                                                                                   |
| sig                  | vector<unsigned char> | Signed digest block header using miner's public key.                                                                                                                                                                                                                                                                                             |

### Hashing

All DeFiChain hashing implentations follow the Bitcoin hashing implementation. All usage of hashes such as `CHash256` in DeFiChain are double SHA-256 hashes (such as hashing block headers and transactions). RIPEMD-160 is used when a shorter hash is desirable (for example when creating a DeFiChain address).

All DeFiChain hashing implentations follow the Bitcoin hashing implementation. The following are the key hashing functions used across various points:

- [`CHash256(x)`](https://github.com/DeFiCh/ain/blob/master/src/hash.h#L22) = `SHA256(SHA256(x))`

  Example of double-SHA-256 encoding of string "hello":

  ```
  hello
  2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 (first round of sha-256)
  9595c9df90075148eb06860365df33584b75bff782a510c6cd4883a419833d50 (second round of sha-256)
  ```

- [`CHash160(x)`](https://github.com/DeFiCh/ain/blob/master/src/hash.h#L46) = `RIPEMD160(SHA256(x))`

  For bitcoin addresses (RIPEMD-160) this would give:

  ```
  hello
  2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 (first round is sha-256)
  b6a9c8c230722b7c748331a8b450f05566dc7d0f (with ripemd-160)
  ```

Double hashing provides protection against [length extension attacks](https://en.wikipedia.org/wiki/Length_extension_attack) and reduces collision probability.

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

The block body consists of a list of pointers which map to transactions themselves, as well as a local variable `fChecked` (this variable is not shared between nodes) to track if the block has been successfully validated previously. The list of transactions has type `vector<CTransactionRef>`, and each `CTransactionRef` points to a [`CTransaction`](https://github.com/DeFiCh/ain/blob/master/src/primitives/transaction.h#L210).

The contents of each Transaction as well as the different types of Transactions are detailed in the [Transactions document](./transaction.md).

## External Resources

- [Bitcoin Block Reference](https://developer.bitcoin.org/reference/block_chain.html)
- [A Decomposition Of The Bitcoin Block Header](https://www.datadriveninvestor.com/2019/11/21/a-decomposition-of-the-bitcoin-block-header/)
- [SHA-2](https://en.wikipedia.org/wiki/SHA-2)
- [RIPEMD](https://en.wikipedia.org/wiki/RIPEMD)
- [Bitcoin Block Hashing Algorithm](https://en.bitcoin.it/wiki/Block_hashing_algorithm)
- [Bitcoin Protocol Documentation](https://en.bitcoin.it/wiki/Protocol_documentation)
