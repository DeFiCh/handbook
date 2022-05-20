# Glossary

## Hashing

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

#### External Resources

- [SHA-2](https://en.wikipedia.org/wiki/SHA-2)
- [RIPEMD](https://en.wikipedia.org/wiki/RIPEMD)
- [Bitcoin Block Hashing Algorithm](https://en.bitcoin.it/wiki/Block_hashing_algorithm)

## Merkle Trees

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

#### External References
