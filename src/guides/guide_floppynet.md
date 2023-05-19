# Run a Local Node in Floppynet

> ⚠️ **ATENTION
FloppyNet is an ALPHA stage test network, which means it may be subject to changes. The network may experience execution failures and data persistence issues. Rollbacks are likely to happen periodically.**

### 1. Get the source code

The main development regarding MetaChain is being merged into the branch `feature/evm` of the [official DeFiChain node repository](https://github.com/defich/ain/tree/feature/evm). For the ease of this guide we will clone the branch directly:

```bash
git clone -b feature/evm https://github.com/defich/ain
cd ain
```

### 2. Compile the node

Considering this development introduces additional dependencies, notably Rust, it is strongly suggested to utilize the make.sh script for the efficient compilation of the node. This helper script will take care of compiling and linking all of the dependencies of the DeFiChain node.

Before running the scripts make sure you have installed the following:


#### MacOS
```bash
brew install autoconf atomake wget gnu-tar libtool coreutils
```

#### Ubuntu/Debian
```bash
apt install -y \
    software-properties-common build-essential git libtool autotools-dev automake \
    pkg-config bsdmainutils python3 python3-pip wget \
    curl cmake unzip libc6-dev
```

Also you will need to instal Rust using the method provided in the [Official website](https://www.rust-lang.org/tools/install) or run the following command:
```bash
./make.sh pkg_install_rust
```

Now that the environment is ready we can build the node by running:
```bash
./make.sh build
```

This command will compile the node dependencies and the node itself. Beware that this will take some time in the first run as it will download all the source code of the libraries needed.

### 3. Running the node

Once the build succeeds you will find the binaries in the `./buld/src/` folder. To run the node and connect it to floppynet run the following command:

```bash
./build/src/defid -devnet -connect=35.187.53.161 --daemon
```
With the `-connect=35.187.53.161` your local node will connect to the developers maintained node. This way the it will start synchronising and finding new nodes running in FloppyNet.

Note that if you are not using a snapshot the synchronisation will take some time.

An easy way to see the progress of the syncing is to run:
```bash
./build/src/defi-cli -devnet getblockchaininfo | head
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

### 4. [Connect Metamask to Floppynet](./guide_floppynet_short.md)

