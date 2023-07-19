# Run a Local Node in Changi

### Get the binaries

Go to the [official DeFiChain release section](https://github.com/DeFiCh/ain/releases) and look for the latest version of the node.

Then click on the Assets dropdown at the end of each release section. Then select the binaries for your Operating System.

> Currently version v4.0.0-beta5 is the latest release. 

Once you have downloaded the binaries extract them to your desired directory. You should see three files inside the bin folder:

- `defid`: DeFiChain node
- `defi-cli`: Command line interface to interact with the node
- `defi-tx`: utility tool to build and sign transactions on DeFiChain

For the purpose of this guide we will only be using defid and defi-cli.

### Running the node

To run the node just run the `defid` binary with the `-changi` flag

```bash
defid -changi
```

> If you want `defid` to run as a deamon (in the background) add the `-daemon` flag to the command above. Also if you want to have additional debug information about the EVM add `RUST_LOG=debug` to the begining of the command.
>
> `RUST_LOG=debug defid -changi --daemon`

Once the node is running it should start syncing. The process of syncing can a couple of hours depending on your machine so just be patient.

To check if the node is synced you can open a new terminal, run the following command and check if the fields `blocks` and `headers` are equal:

```bash
defi-cli getblockchaininfo | head
```

<img src="./screenshots/getblockchaininfo.png"  width="90%">

### Connect Metamask.

To connect to MetaMask the process is the same as the one described in [Connect Metamask to Changi TestNet](./guide_changi_short.md) you can refer to that guide for more information on it. 
> Do note that the RPC url will need to be pointed to your local node and not http://changi.dfi.team


### Faucet

To get Changi Testnet DFI you can use the faucet provided by the community at [http://tc04.mydefichain.com/faucet/](http://tc04.mydefichain.com/faucet/)







