# Using a wallet

This document will go over how to create a wallet and addresses in order to send and recieve DFI and dTokens.

## Using testnet

In this tutorial we will use the testnet network in order to prevent any possibility of financial loss. Testnet is a separate network from mainnet for the purpose of testing. To use the testnet, stop the `defid` process, if any, and re-run it with the `-testnet` flag.

Linux and macOS: `./defid -testnet`

Windows: `defid.exe -testnet`

To verify that you are on the testnet, run `./defi-cli -testnet getblockchaininfo`. You should see an output similar to the following

```
{
  "chain": "test",
  "blocks": 919519,
  "headers": 934011,
....
  },
  "warnings": ""
}
```

If you see `"chain": "test"`, you are on the testnet!

## Creating an address

To create an address, run

```bash
./defi-cli -testnet getnewaddress
```

This will return a new DeFiChain address that you can use to recieve DFI and dTokens.

```
tnLRVU32vCfGD6...
```

You will also require the private keys to this address in order to access your funds. Use the `dumpprivkey` command to retrieve the private key.

```bash
./defi-cli -testnet dumpprivkey
```

This will return the corresponding private key to the input address.

```
cRomqYvttzcXHq...
```

**Do not share your private keys with anyone.**

You can run the `listreceivedbyaddress` command to see available addresses and the amount of DFI available to each address.

```
./defi-cli -testnet listreceivedbyaddress 1 true
```

Here the first parameter sets the minimum number of confirmations required to include the transaction, and the second parameters enables/disables addresses if they have 0 tokens. After running the command, you should be able to see the following output.

```
[
  {
    "address": "tnLRVU32vCfGD6...",
    "amount": 0.00000000,
    "confirmations": 0,
    "label": "",
    "txids": [
    ]
  }
]
```

You can also use the `getwalletinfo` command to see aggregate information if you have generated multiple addresses.

```
./defi-cli -testnet getwalletinfo
```

```
{
  "walletname": "",
  "walletversion": 169900,
  "balance": 0.00000000,
  "unconfirmed_balance": 0.00000000,
  "immature_balance": 0.00000000,
  "txcount": 4,
  "keypoololdest": 1646714869,
  "keypoolsize": 999,
  "keypoolsize_hd_internal": 1000,
  "paytxfee": 0.00000000,
  "hdseedid": "c43d012bb7c93cd9129dfc42b6643de774b2502f",
  "private_keys_enabled": true,
  "avoid_reuse": false,
  "scanning": false
}
```

## Getting some testnet DFI

## Creating a transaction

Once you have some DFI in your wallet, you use it to create a vault and mint dTokens, or send it to other addresses. There are two options to create a transaction, writing a raw transaction or using the P2PKH template. We will go over sending DFI to another address using the P2PKH template.

Verify your wallet balance using the `getbalance` command.

```
./defi-cli -testnet getbalance
```

```
39999.99999160
```

You can now use the `sendtoaddress` command to send DFI.

```
./defi-cli -testnet sendtoaddress tiiUqg4TqGR7ja... 1
```

The value after the address sets the amount of DFI to transfer. The command will output the new transaction ID.

```
23ee92302e166daf540d358fa726d52ff391f9f3058636ca45d887c747cd8610
```

You can inspect the transaction using the `gettransaction` or `getrawtransaction` command.

```
./defi-cli -testnet gettransaction 23ee92302e166daf540d358fa726d52ff391f9f3058636ca45d887c747cd8610
./defi-cli -testnet getrawtransaction 23ee92302e166daf540d358fa726d52ff391f9f3058636ca45d887c747cd8610 true dbbe9b1e4f116d9316a9d1dc024fd4301b72e1f18ed1706fb59711315844a7ff
                                        ^transaction hash                                               ^verbosity          ^block hash
```

Sample output for `gettransaction`

```
{
  "amount": 0.00000000,
  "fee": -0.00000840,
  "confirmations": 4,
  "blockhash": "dbbe9b1e4f116d9316a9d1dc024fd4301b72e1f18ed1706fb59711315844a7ff",
  "blockindex": 1,
  "blocktime": 1647880878,
  "txid": "23ee92302e166daf540d358fa726d52ff391f9f3058636ca45d887c747cd8610",
  "walletconflicts": [
  ],
  "time": 1647880831,
  "timereceived": 1647880831,
  "bip125-replaceable": "no",
  "details": [
    {
      "address": "tnLRVU32vCfGD6BB5TywSBgHwre84WrZK8",
      "category": "send",
      "amount": -1.00000000,
      "label": "",
      "vout": 0,
      "fee": -0.00000840,
      "abandoned": false
    },
    {
      "address": "tnLRVU32vCfGD6BB5TywSBgHwre84WrZK8",
      "category": "receive",
      "amount": 1.00000000,
      "label": "",
      "vout": 0
    }
  ],
  "hex": "04000000000101a421ebc69f999ea8db7e0322994965518a28e0ed109880bfd9b51a080242586a0000000017160014bf34bd468bc453c1bcce04445bdcd9e1a9838d11feffffff0200e1f5050000000017a914b04e136a8b1618588d89fc7cb8a473059f152fe587007028afcee800000017a9140d935d41bb352dc51b3cf74cf4b74fa322870bf087000247304402204e597c4f7bb4345291dc8aa279015bc878a0da47f1f6886015d78bd69a9def8902202a6db23424d34a303643c8246901febe45adc8c2d261e8c029c49d9a090c12070121020f01f4b43f304835d9860fe1ab874962c9dc4093a5264547b708b6b174a1627aaf400e00"
}
```

The other address should recieve the tokens as soon as the transaction is included in a block!

## Security

Your wallet is **not encrypted by default**. This means that anyone with physical access to your computer or wallet file will be able to access your funds. For any wallets with real DFI or dTokens, make use of the `encryptwallet` command to encrypt your wallet, and use `walletlock` lock your wallet with a password and prevent hackers from accessing your funds.
