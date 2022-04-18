# Blocks and the Blockchain

The DeFiChain blockchain is a collection of intedependent blocks stored on a distributed digital ledger. Each block contains information about the block previous to it and they form a chain - with each additional block reinforcing the ones before it.

Each block consists of a block header and a body. The block header contains metadata about the block and its contents, and the body contains a list of transactions in that block. Blocks and transactions are identified by their SHA256 hashes.

## Block header

The header format of DeFiChain blocks is as follows.

| Name             | Data Type             | Description                                                                                                                                                                      |
| ---------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nVersion         | int32_t               | Compute block version per `ComputeBlockVersion`. Usually 536870912.                                                                                                              |
| hashPrevBlock    | uint256               | Double hash of previous block header.                                                                                                                                            |
| hashMerkleRoot   | uint256               | Double hash of merkle root of transaction merkle tree.                                                                                                                           |
| nTime            | uint32_t              | The block time is a Unix epoch time when the miner started hashing the header (according to the miner). Must be strictly greater than the median time of the previous 11 blocks. |
| nBits            | uint32_t              | An encoded version of the target threshold this block’s header hash must be less than or equal to.                                                                               |
| deprecatedHeight | uint64_t              | Block height of the current block.                                                                                                                                               |
| mintedBlocks     | uint64_t              | Number of blocks this masternode has mined.                                                                                                                                      |
| stakeModifier    | uint256               | A stake modifier is a collective source of random entropy for mining. It is equal to `SHA256({previous stake modifier}, {masternode ID}).`                                       |
| sig              | vector<unsigned char> | Signed block header using miner's public key.                                                                                                                                    |

## Block Body
