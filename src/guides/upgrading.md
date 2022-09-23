# Upgrading the node

Masternode operators and other users who want to upgrade their nodes to the latest release to access the latest features and guarantee compatibility with the latest version of the DeFi Blockchain.

> **NOTE**
>
> DeFiChain Wallet users do not need to manually update the node as the wallet will handle the update for you.

There are two types of releases:

- **Mandatory**: contain breaking changes. You must upgrade before the upgrade block height for your node to remain in sync.
- **Optional**: optional but _highly reccomended_, usually include performance improvements.

Mandatory upgrades are marked in the release notes on Github along with the block height before which you should upgrade.

![](../images/release.png)

<center><i>Mandatory upgrade note</i></center>

`defid` updates are usually drop in. Users can simply download and extract the latest `.zip` files from [Github](https://github.com/DeFiCh/ain/releases/latest) and run them instead of the older binaries.

If you upgrade your node, have a wallet, and use a snapshot to reduce sync time, you should run a `-rescan` (and `-spv_resync` if you hold BTC) when running for the first time to update wallet balances.

Some releases might require additional parameters to be run on the first time with the new version, these will be stated in the release notes.

- Reindex required: run with `-reindex` flag
- Rescan required: run with `-rescan` flag
- Fresh sync: delete all files in and directories in the `.defi` folder except `wallets` and relaunch