# Run a Local Node

> ✏️ **Note:**
>
> Floppynet is an ALPHA stage test network, which means it may be subject to changes. The network may experience execution failures and data persistence issues. Rollbacks are likely to happen periodically.**

### 1. Get the source code

The main development regarding MetaChain is being merged into the branch `feature/evm` of the [official DeFiChain node repository](https://github.com/defich/ain/tree/feature/evm). Beware that this branch will be eventually merged into the master branch and this is only a temporal development work in progress branch. For the ease of this guide we will clone the branch directly:

```bash
git clone -b feature/evm https://github.com/defich/ain
cd ain
```

### 2. Compile the node

> ✏️ **Note:**
>
> This build process is currently operational on Linux. We are actively working on the build processes for MacOS and Windows. Once complete, they should exhibit the same behavior as the Linux version.

Considering this development introduces additional dependencies, notably Rust, it is strongly suggested to utilize the make.sh script for the efficient compilation of the node. This helper script will take care of compiling and linking all of the dependencies of the DeFiChain node.

Before running the script make sure you have docker installed and running. You can follow [the official guide](https://docs.docker.com/engine/install/) to install, configure and run docker in yoour machine.

```bash
./make.sh docker_release
```

This command will compile the node dependencies and the node itself inside a docker container. Beware that this will take some time in the first run as it will download all the source code of the libraries needed and the docker images.

### 3. Running the node

Once the build succeeds you will find the binaries in `./buld/defichain-latest/bin/`. To run the node and connect it to floppynet run the following command:

```bash
./build/defichain-latest/bin/defid -devnet -connect=35.187.53.161 --daemon
```
With the `-connect=35.187.53.161` your local node will connect to the  public node which is maintained by the core developers. This way it will start synchronising and finding new nodes running in Floppynet.

Note that if you are not using a snapshot the synchronisation will take some time.

An easy way to see the progress of the syncing is to run:
```bash
./build/defichain-latest/bin/defi-cli -devnet getblockchaininfo | head
```

This will return something like:
```bash
{
  "chain": "devnet",
  "blocks": 1590154,
  "headers": 1590154,
  "bestblockhash": "0fcfca2fc40ce21ce8051b1c4cfca0ecba24d44a7b9edc4338596e5cca020685",
  "difficulty": 10057949.89351971,
  "mediantime": 1684309761,
  "verificationprogress": 1,
  "initialblockdownload": false,
  "chainwork": "000000000000000000000000000000000000000000007f7505aaaf5fa8b5ad7b",
```
If `blocks` and `headers` are equal and `verificationprogress` is 1 then your node is synced.

#### Node Logs
To check the logs go to the data folder:

- Windows: C:\Users\\%username%\AppData\Roaming\DeFi Blockchain
- Mac: /Users/%username%/Library/Application Support/DeFi
- Linux: /home/%username%/.defi

Open the `debug.log` inside the `devnet/` folder with your preferred text editor

#### Rust debug logs

To display the Rust debug logs first stop the node:

```bash
./build/defichain-latest/bin/defi-cli -devnet stop
```

Then start the node with `RUST_LOG=debug`:

```bash
RUST_LOG=debug ./build/defichain-latest/bin/defid -devnet --daemon
```



### 4. [Connect Metamask to Floppynet](./guide_floppynet_short.md)

