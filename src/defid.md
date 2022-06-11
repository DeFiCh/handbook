# Blockchain Node - defid

DeFiChain is a distributed network of computers running software (known as nodes).
DeFiChain nodes are able to

- Store all blockchain data
- Serve data to lightweight clients
- Validate and propogate blocks and transactions

Every DeFiChain node runs an implementation of the DeFiChain protocol, and can be run on local and cloud machines. The recommended requirements for running the reference `defid` node are

- Desktop or laptop hardware running recent versions of Windows, Mac OS X, or Linux.
- Atleast 30 GB of disk space (Minimum: ~8GB)
- Atleast 8 gigabytes of physical memory (RAM) (Minimum: ~1GB, but isn't recommended and sufficient swap is required)
- 4 GB of swap space (Minimum: None, but highly recommended to give room for memory fragmentation spikes)

There are two ways start using the node - using the compiled releases or compiling the souce code on your own.

## Using compiled releases

Download the latest available release from [Github](https://github.com/DeFiCh/ain/releases). Extract the archive by using an archive manager, or running the following command in a terminal

```bash
tar xzf <filename>.tar.gz # replace <filename> with the filename downloaded file
```

You can run the following install command to globally install the DeFiChain binaries.

```bash
sudo install -m 0755 -o root -g root -t /usr/local/bin <defichain-path>/bin/* # replace <defichain-path> with the path to the root of the extracted folder
```

Proceed to [Initial Block Download](#initial-block-download).

## Compiling from source

### Using `make.sh` (Debian/Ubuntu only)

By running `./make.sh build` will download install required dependencies and run the complete compilation process. Run `make install` at the end of the process to make the compiled binaries available globally.

### Compiling manually

Install `gcc` and `boost` and other dependecies from your distribution's package manager.

Arch Linux: `sudo pacman -S gcc boost libevent python`.

Debian/Ubuntu: `sudo apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 curl ibssl-dev libevent-dev libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-test-dev libboost-thread-dev`

Clone the latest version of `ain` from GitHub.

```bash
git clone https://github.com/DeFiCh/ain.git
cd ain
```

Install Berekely DB.

```bash
./contrib/install_db4.sh `pwd`
```

Once installation is complete, take note of the commands provided at the end of the build log.

```bash
db4 build complete.

When compiling defid, run `./configure` in the following way:

  export BDB_PREFIX='/home/DeFiCha/ain/contrib/db4'
  ./configure BDB_LIBS="-L${BDB_PREFIX}/lib -ldb_cxx-4.8" BDB_CFLAGS="-I${BDB_PREFIX}/include" ...
```

Now, run the export command from the DB compilation, then run `autogen.sh` and finally run the configure command from above.

```bash
export BDB_PREFIX='/home/DeFiCha/ain/contrib/db4'
./autogen.sh
./configure BDB_LIBS="-L${BDB_PREFIX}/lib -ldb_cxx-4.8" BDB_CFLAGS="-I${BDB_PREFIX}/include"
```

We can now compile the node. Run `make` in the `ain` root directory.

```bash
make #
make -j "$(($(nproc)))" # for multicore CPUs
```

`defi-d` and other DeFiChain executable will now be in the `src/` directory. You can run `make install` to access the compiled binaries globally.

Proceed to [Initial Block Download](#initial-block-download).

## Initial Block Download

Once you have the required binaries available, you can start the node by running the following commands in the folder with the executables.

Linux and macOS: `./defid`
Windows: `defid.exe`

This will start the node and the software will begin syncing blockchain data. Your wallets and transaction history will not be visible until the blockchain has been completely synced and up to date with the rest of the nodes. Currently the blockchain takes up **around 4GB** of disk space.

In order to speed up the process, you can download a snapshot from AWS.

1. Stop the `defid` process.
2. Go to an AWS bucket and copy the filename of the latest (bottom most) snapshot.

- [America](https://defi-snapshots-us.s3.amazonaws.com/index.txt)
- [Asia](https://defi-snapshots.s3.ap-southeast-1.amazonaws.com/index.txt)
- [Australia](https://defi-snapshots-sydney.s3.ap-southeast-2.amazonaws.com/index.txt)
- [Europe](https://defi-snapshots-europe.s3.eu-central-1.amazonaws.com/index.txt)

3. Replace `index.txt` in the URL with the filename from the previous step.
4. Extract the contents of the downloaded `.zip` file.
5. Copy the extracted contents into the `.defi` folder.
   - Windows: `C:\Users\<username>\AppData\Roaming\DeFi Blockchain`
   - Linux and macOS: `~/.defi/`
6. Now restart the `defi` process. There will be a short syncing process to get the node up to date with the rest of the network.

## Interacting with the node

Once `defid` is running, you interact with the node on a different terminal using the `defi-cli` application. You can run `./defi-cli help` to see a list of available commands.

Proceed to [Using a wallet](./node/wallet.md) to learn how to get started with using the node.
