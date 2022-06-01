# Custom Transactions

Custom Transactions are special transactions to interact with dApps on DeFiChain, such as Vaults and the DeX.

Custom transaction can be identified by the first `vout` of a transaction

- begin with a `OP_RETURN`
- followed by a `DfTx` marker (serialized in UTF as `44665478`)
- followed by one character marker denoting the type of transaction (serialized in UTF), conversion table [here](https://github.com/DeFiCh/ain/blob/9911c9032b33576143e3ce658540978d9393bd05/src/masternodes/mn_checks.h#L37-L107)
- followed by custom transaction data, if required

For example, in the following custom transaction

```json
"vout": [
{
    "value": 0.00000000,
    "n": 0,
    "scriptPubKey": {
    "asm": "OP_RETURN 446654784301d823ad3976574a50001f4ca5a5326a1c1232a0a70000",
    "hex": "6a054466547841",
    "type": "nulldata"
    },
    "tokenId": 0
},
...
]
```

The custom transaction can be broken down to

| asm                                      | Meaning                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 44665478                                 | DfTx marker                                                                                                                                                                                                                                                                                                        |
| 43                                       | `C` in UTF, [corresponds to CreateMasternode message](https://github.com/DeFiCh/ain/blob/9911c9032b33576143e3ce658540978d9393bd05/src/masternodes/mn_checks.h#L43) ([CCreateMasterNodeMessage](https://github.com/DeFiCh/ain/blob/9911c9032b33576143e3ce658540978d9393bd05/src/masternodes/mn_checks.h#L193-L209)) |
| 01                                       | `operatorType` variable                                                                                                                                                                                                                                                                                            |
| d823ad3976574a50001f4ca5a5326a1c1232a0a7 | `operatorAuthAddress` variable                                                                                                                                                                                                                                                                                     |
| 0000                                     | `timelock` variable                                                                                                                                                                                                                                                                                                |

## Transaction Types

### Masternodes

#### CreateMasterNode

Creates a new masternode in the network

_Marker: `C`_

##### Message Format

| Variable            | Data Type | Description                                                          |
| ------------------- | --------- | -------------------------------------------------------------------- |
| operatorType        | char      | 1 for P2PKH, 4 for P2WPKH                                            |
| operatorAuthAddress | CKeyID    | DeFiChain address of masternode operator                             |
| timelock            | uint16_t  | minimum time that masternode must be active, either 0, 5 or 10 years |

#### ResignMasternode

Removes enabled or pre-enabled masternode from network.

_Marker: `R`_

##### Message Format

| Variable | Data Type | Description                |
| -------- | --------- | -------------------------- |
| nodeID   | uint256   | ID of masternode to resign |

#### SetForcedRewardAddress

Sets reward address for masternode.

_Marker: `F`_

| Variable          | Data Type | Description                       |
| ----------------- | --------- | --------------------------------- |
| nodeID            | uint256   | masternode ID                     |
| rewardAddressType | char      | 1 for P2PKH, 4 for P2WPKH         |
| rewardAddress     | CKeyID    | new DeFiChain address for rewards |

#### RemForcedRewardAddress

Removes reward address for masternode if any.

_Marker: `f`_

| Variable | Data Type | Description   |
| -------- | --------- | ------------- |
| nodeID   | uint256   | masternode ID |

#### UpdateMasternode

Updates masternode metadata.

_Marker: `m`_

##### Message Format

| Variable            | Data Type | Description                                                          |
| ------------------- | --------- | -------------------------------------------------------------------- |
| operatorType        | char      | 1 for P2PKH, 4 for P2WPKH                                            |
| operatorAuthAddress | CKeyID    | DeFiChain address of masternode operator                             |
| timelock            | uint16_t  | minimum time that masternode must be active, either 0, 5 or 10 years |

### Custom Tokens

#### CreateToken

Creates new custom token.

_Marker: `T`_

##### Message Format

| Variable | Data Type | Description      |
| -------- | --------- | ---------------- |
| token    | CToken    | token definition |

Class `CToken` has the following structure

| Variable | Data Type | Description                                |
| -------- | --------- | ------------------------------------------ |
| symbol   | string    | token ticker                               |
| name     | string    | name of token                              |
| decimal  | uint8_t   | how divisible a token can be, fixed to `8` |
| limit    | CAmount   | deprecated                                 |
| flags    | uint8_t   | sets options for token                     |

The following flags are available for a token:

| Bit index | Flag                                                      |
| --------- | --------------------------------------------------------- |
| 0         | None                                                      |
| 1         | Mintable                                                  |
| 2         | Tradeable                                                 |
| 3         | DeFi Asset Token (tokens backed by collateral, e.g. dBTC) |
| 4         | Liquidity Pool Share                                      |
| 5         | Finalized                                                 |
| 6         | Loan Token                                                |
| 7         | Unused                                                    |

Tokens are mintable and tradeable by default.

#### MintToken

Mints new custom tokens.

_Marker: `M`_

##### Message Format

| Variable | Data Type | Description                      |
| -------- | --------- | -------------------------------- |
| balances | CBalances | amount and type of token to mint |

#### UpdateToken

Set DAT flag for a token to true or false. **Deprecated.**

_Marker: `N`_

| Variable | Data Type | Description                                |
| -------- | --------- | ------------------------------------------ |
| tokenTx  | uint256   | CreateToken transaction for a custom token |
| isDAT    | bool      | is token a DAT                             |

#### UpdateTokenAny

Update a token, supports all fields in CToken.

_Marker: `n`_

| Variable | Data Type | Description                      |
| -------- | --------- | -------------------------------- |
| balances | CBalances | amount and type of token to mint |

### DeX

#### CreatePoolPair

Create new liquidity pool.

_Marker: `p`_

##### Message Format

| Variable   | Data Type        | Description                                                |
| ---------- | ---------------- | ---------------------------------------------------------- |
| poolPair   | CPoolPairMessage | metadata for liquidity pool                                |
| pairSymbol | string           | name of liquidity pool                                     |
| rewards    | CBalances        | percentage of coinbase liquidity rewards allocated to pool |

`CPoolPairMessage` has the following message structure:

| Variable     | Data Type | Description                     |
| ------------ | --------- | ------------------------------- |
| idTokenA     | DCT_ID    | token ID for first token in LP  |
| idTokenB     | string    | token ID for second token in LP |
| commission   | CAmount   | define fees for swap            |
| ownerAddress | CScript   | owner of DeX pool               |
| status       | bool      | pool status (active/inactive)   |

#### UpdatePoolPair

Update a liquidity pool.

_Marker: `u`_

##### Message Format

| Variable     | Data Type | Description                                                       |
| ------------ | --------- | ----------------------------------------------------------------- |
| poolId       | DCT_ID    | pool ID                                                           |
| status       | bool      | set pool status (active/inactive)                                 |
| commission   | CAmount   | define fees for swap                                              |
| ownerAddress | CScript   | owner of DeX pool                                                 |
| rewards      | CBalances | percentage of coinbase liquidity rewards allocated to pool P2WPKH |

#### PoolSwap

Swap tokens using a liqidity pool. **Deprecated.**

_Marker: `s`_

##### Message Format

| Variable    | Data Type | Description              |
| ----------- | --------- | ------------------------ |
| from        | CScript   | transaction input        |
| to          | CScript   | transaction output       |
| idTokenFrom | DCT_ID    | input token ID           |
| idTokenTo   | DCT_ID    | output token ID          |
| amountFrom  | CAmount   | amount of tokens to swap |
| maxPrice    | PoolPrice | maximum possible price   |

#### PoolSwapV2

Swap tokens using a liqidity pool. Has 16 digits precision instead of 8 in V1.

_Marker: `i`_

##### Message Format

| Variable | Data Type        | Description                            |
| -------- | ---------------- | -------------------------------------- |
| swapInfo | CPoolSwapMessage | swap metadata (contents of V1 message) |
| poolIDs  | vector<DCT_ID>   | IDs of pools to swap with              |

#### AddPoolLiquidity

Mint LP tokens and add liquidity to a liquidity pool.

_Marker: `l`_

##### Message Format

| Variable     | Data Type | Description            |
| ------------ | --------- | ---------------------- |
| from         | CAccounts | dToken input           |
| shareAddress | CScript   | address for LP rewards |

#### RemovePoolLiquidity

Redeem LP tokens and withdraw liquidity from a liquidity pool.

_Marker: `r`_

##### Message Format

| Variable | Data Type    | Description       |
| -------- | ------------ | ----------------- |
| from     | CAccounts    | LP token input    |
| amount   | CTokenAmount | withdrawal amount |

### Accounts

#### UtxosToAccount

Spend UTXOs from a wallet and transfer tokens to to any DeFiChain address.

_Marker: `U`_

##### Message Format

| Variable | Data Type | Description                          |
| -------- | --------- | ------------------------------------ |
| to       | CAccounts | account and amount of tokens to send |

#### AccountToUtxos

Creates UTXO from a wallet account.

_Marker: `b`_

##### Message Format

| Variable            | Data Type | Description                   |
| ------------------- | --------- | ----------------------------- |
| from                | CScript   | UTXOs to spend                |
| balances            | CBalances | amount of DFI to send         |
| mintingOutputsStart | uint32_t  | number of transaction outputs |

#### AccountToAccount

Transfer tokens between a wallet and any DeFiChain address.

_Marker: `B`_

##### Message Format

| Variable | Data Type | Description               |
| -------- | --------- | ------------------------- |
| from     | CScript   | UTXOs to spend            |
| to       | CBalances | account to send tokens to |

#### AnyAccountsToAccounts

Transfer tokens from any DeFiChain address to any DeFiChain address.

_Marker: `a`_

##### Message Format

| Variable | Data Type | Description               |
| -------- | --------- | ------------------------- |
| from     | CScript   | UTXOs to spend            |
| to       | CBalances | account to send tokens to |

#### SmartContract

Interact with DFIP2201 contract.

_Marker: `K`_

##### Message Format

| Variable | Data Type | Description                          |
| -------- | --------- | ------------------------------------ |
| name     | string    | name of the smart contract           |
| accounts | CAccounts | account and amount of tokens to send |

#### DFIP2203

Interact with DFIP2203 (Futures) contract.

_Marker: `Q`_

##### Message Format

| Variable    | Data Type    | Description                                |
| ----------- | ------------ | ------------------------------------------ |
| owner       | CScript      | address to fund contract and recieve token |
| source      | CTokenAmount | amount of tokens to fund future contract   |
| destination | uint32_t     | set underlying asset (if source id DUSD)   |
| withdraw    | bool         | withdraw asset to owner address            |

### Governance

#### SetGovVariable

Update governance variables.

_Marker: `G`_

##### Message Format

| Variable | Data Type                    | Description                            |
| -------- | ---------------------------- | -------------------------------------- |
| govs     | map<shared_ptr<GovVariable>> | list of variables and values to update |

#### SetGovVariableHeight

Set one governance variable at a particular block height.

_Marker: `j`_

##### Message Format

| Variable    | Data Type               | Description                         |
| ----------- | ----------------------- | ----------------------------------- |
| govs        | shared_ptr<GovVariable> | variable name and value to update   |
| startHeight | uint32_t                | height at which change is in effect |

### Authorisation

#### AutoAuthPrep

This is an empty custom transaction.

_Marker: `A`_

### Oracles

#### AppointOracle

Create new oracle at an address.

_Marker: `o`_

#### Message Format

| Variable       | Data Type               | Description                   |
| -------------- | ----------------------- | ----------------------------- |
| oracleAddress  | CScript                 | address of new oracle         |
| weightage      | uint8_t                 | oracle weightage              |
| availablePairs | set<CTokenCurrencyPair> | set of token prices available |

#### RemoveOracleAppoint

Remove existing oracle.

_Marker: `h`_

#### Message Format

| Variable | Data Type | Description |
| -------- | --------- | ----------- |
| oracleId | COracleId | oracle ID   |

#### UpdateOracleAppoint

Update existing oracle.

_Marker: `t`_

#### Message Format

| Variable         | Data Type             | Description                                             |
| ---------------- | --------------------- | ------------------------------------------------------- |
| oracleId         | COracleId             | oracle ID                                               |
| newOracleAppoint | CAppointOracleMessage | new oracle metadata (contents of AppointOracle message) |

#### SetOracleData

Update oracle prices.

_Marker: `y`_

#### Message Format

| Variable  | Data Type    | Description                      |
| --------- | ------------ | -------------------------------- |
| oracleId  | COracleId    | oracle ID                        |
| timestamp | int64_t      | timestamp of oracle data         |
| prices    | CTokenPrices | array of price and token strings |

### Interchain Exchange (ICX)

_ICX is currently disabled on the mainnet._

#### ICXCreateOrder

Create ICX order.

_Marker: `1`_

#### Message Format

| Variable      | Data Type | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| orderType     | uint8_t   | is maker buying or selling DFI                 |
| idToken       | DCT_ID    | token ID on DeFiChain                          |
| ownerAddress  | CScript   | address for funding DeFiChain transaction fees |
| receivePubkey | CPubKey   | public key which can claim external HTLC       |
| amountFrom    | CAmount   | amount of asset to be sold                     |
| amountToFill  | CAmount   | amount of tokens in order available to fill    |
| orderPrice    | CAmount   | quoted price of asset                          |
| expiry        | uint32_t  | block height for order expiry                  |

#### ICXMakeOffer

Make an offer for an ICX order.

_Marker: `2`_

#### Message Format

| Variable      | Data Type | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| orderTx       | uint256   | transaction ID of order                        |
| amount        | CAmount   | amount of asset to swap                        |
| ownerAddress  | CScript   | address for funding DeFiChain transaction fees |
| receivePubkey | CPubKey   | public key which can claim external HTLC       |
| expiry        | uint32_t  | block height for order expiry                  |
| takerFee      | CAmount   | taker fee                                      |

#### ICXSubmitDFCHTLC

Submit a DFI hash time lock contract (HTLC) for offer.

_Marker: `3`_

#### Message Format

| Variable | Data Type | Description                                        |
| -------- | --------- | -------------------------------------------------- |
| offerTx  | uint256   | transaction ID of offer                            |
| amount   | CAmount   | amount to put in HTLC                              |
| hash     | uint256   | hash of seed used for the hash lock                |
| timeout  | uint32_t  | timeout for expiration of HTLC in DeFiChain blocks |

#### ICXSubmitEXTHTLC

Submit a BTC hash time lock contract (HTLC) for offer.

_Marker: `4`_

#### Message Format

| Variable          | Data Type | Description                                        |
| ----------------- | --------- | -------------------------------------------------- |
| offerTx           | uint256   | transaction ID of offer                            |
| amount            | CAmount   | amount to put in HTLC                              |
| hash              | uint256   | hash of seed used for the hash lock                |
| htlcscriptAddress | string    | script address of external htlc                    |
| ownerPubkey       | CPubKey   | refund address in case of HTLC timeout             |
| timeout           | uint32_t  | timeout for expiration of HTLC in DeFiChain blocks |

#### ICXClaimDFCHTLC

Claim a DFI HTLC.

_Marker: `5`_

#### Message Format

| Variable  | Data Type             | Description                      |
| --------- | --------------------- | -------------------------------- |
| dfchtlcTx | uint256               | transaction ID of DeFiChain HTLC |
| seed      | vector<unsigned char> | secret seed for claiming HTLC    |

#### ICXCloseOrder

Close an ICX order.

_Marker: `6`_

#### Message Format

| Variable | Data Type | Description                 |
| -------- | --------- | --------------------------- |
| orderTx  | uint256   | transaction ID of ICX order |

#### ICXCloseOffer

Close an ICX offer.

_Marker: `7`_

#### Message Format

| Variable | Data Type | Description                 |
| -------- | --------- | --------------------------- |
| offerTx  | uint256   | transaction ID of ICX offer |

### Loans

#### SetLoanCollateralToken

Sets what tokens are allowed as collateral.

_Marker: `c`_

##### Message Format

| Variable             | Data Type          | Description                                    |
| -------------------- | ------------------ | ---------------------------------------------- |
| idToken              | DCT_ID             | token ID                                       |
| factor               | CAmount            | minimum collateralization ratio                |
| fixedIntervalPriceId | CTokenCurrencyPair | oracle price for current loan period           |
| activateAfterBlock   | uint32_t           | block number at which change will be activated |

#### SetLoanToken

Sets loan token.

_Marker: `g`_

##### Message Format

| Variable             | Data Type          | Description                                 |
| -------------------- | ------------------ | ------------------------------------------- |
| symbol               | string             | ticker for loan token                       |
| name                 | string             | name of loan token                          |
| fixedIntervalPriceId | CTokenCurrencyPair | oracle price for current loan period        |
| mintable             | bool               | token's mintable property, defaults to true |
| interest             | CAmount            | interest rate for the token                 |

#### UpdateLoanToken

Update loan token.

_Marker: `x`_

##### Message Format

| Variable             | Data Type          | Description                                 |
| -------------------- | ------------------ | ------------------------------------------- |
| tokenTx              | uint256            | token creation tx                           |
| symbol               | string             | ticker for loan token                       |
| name                 | string             | name of loan token                          |
| fixedIntervalPriceId | CTokenCurrencyPair | oracle price for current loan period        |
| mintable             | bool               | token's mintable property, defaults to true |
| interest             | CAmount            | interest rate for the token                 |

#### LoanScheme

Create a loan scheme.

_Marker: `L`_

##### Message Format

| Variable     | Data Type | Description                      |
| ------------ | --------- | -------------------------------- |
| identifier   | string    | loan scheme identifier           |
| updateHeight | uint64_t  | block height to create scheme at |
| ratio        | uint32_t  | minimum collateralization ratio  |
| rate         | CAmount   | interest rate                    |

#### DefaultLoanScheme

Set default loan scheme.

_Marker: `d`_

##### Message Format

| Variable   | Data Type | Description            |
| ---------- | --------- | ---------------------- |
| identifier | string    | loan scheme identifier |

#### DestroyLoanScheme

Delete existing loan scheme.

_Marker: `D`_

##### Message Format

| Variable      | Data Type | Description                       |
| ------------- | --------- | --------------------------------- |
| identifier    | string    | loan scheme identifier            |
| destroyHeight | uint64_t  | block height to destroy scheme at |

#### Vault

Create new vault.

_Marker: `V`_

##### Message Format

| Variable     | Data Type | Description        |
| ------------ | --------- | ------------------ |
| ownerAddress | CScript   | owner of vault     |
| schemeId     | string    | loan scheme to use |

#### CloseVault

Close existing vault.

_Marker: `e`_

##### Message Format

| Variable | Data Type | Description                   |
| -------- | --------- | ----------------------------- |
| vaultId  | CVaultId  | ID of vault                   |
| to       | CScript   | address to send collateral to |

#### UpdateVault

Update existing open vault.

_Marker: `v`_

##### Message Format

| Variable     | Data Type | Description        |
| ------------ | --------- | ------------------ |
| vaultId      | CVaultId  | ID of vault        |
| ownerAddress | CScript   | owner of vault     |
| schemeId     | string    | loan scheme to use |

#### DepositToVault

Deposit collateral in a vault.

_Marker: `S`_

##### Message Format

| Variable | Data Type    | Description                 |
| -------- | ------------ | --------------------------- |
| vaultId  | CVaultId     | ID of vault                 |
| from     | CScript      | address funding the vault   |
| amount   | CTokenAmount | amount of tokens to deposit |

#### WithdrawFromVault

Withdraw collateral in a vault.

_Marker: `J`_

##### Message Format

| Variable | Data Type    | Description                   |
| -------- | ------------ | ----------------------------- |
| vaultId  | CVaultId     | ID of vault                   |
| to       | CScript      | address to send collateral to |
| amount   | CTokenAmount | amount of tokens to deposit   |

#### TakeLoan

Mint loan token against a loan vault.

_Marker: `X`_

##### Message Format

| Variable | Data Type | Description                    |
| -------- | --------- | ------------------------------ |
| vaultId  | CVaultId  | ID of vault                    |
| to       | CScript   | address to send loan tokens to |
| amount   | CBalances | amount of loan token to mint   |

#### PaybackLoan

Repay an existing loan. **Deprecated**.

_Marker: `H`_

##### Message Format

| Variable | Data Type | Description                   |
| -------- | --------- | ----------------------------- |
| vaultId  | CVaultId  | ID of vault                   |
| from     | CScript   | address repaying the loan     |
| amount   | CBalances | amount of loan token to repay |

#### PaybackLoanV2

Repay an existing loan.

_Marker: `k`_

##### Message Format

| Variable | Data Type              | Description                   |
| -------- | ---------------------- | ----------------------------- |
| vaultId  | CVaultId               | ID of vault                   |
| from     | CScript                | address repaying the loan     |
| loans    | map<DCT_ID, CBalances> | amount of loan token to repay |

#### AuctionBid

Bid for an auction on a vault.

_Marker: `I`_

##### Message Format

| Variable | Data Type    | Description                         |
| -------- | ------------ | ----------------------------------- |
| vaultId  | CVaultId     | ID of vault                         |
| index    | uint32_t     | auction index                       |
| from     | CScript      | address to recieve vault collateral |
| amount   | CTokenAmount | bid amount                          |

#### FutureSwapExecution

_Unimplemented_

_Marker: `q`_

#### FutureSwapRefund

_Unimplemented_

_Marker: `w`_
