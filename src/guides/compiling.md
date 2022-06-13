# Compiling from source

## Using `make.sh` (Debian/Ubuntu only)

By running `./make.sh build` will download install required dependencies and run the complete compilation process. Run `make install` at the end of the process to make the compiled binaries available globally.

## Compiling manually

1. Install `gcc` and `boost` and other [dependecies](https://github.com/DeFiCh/ain/blob/master/doc/dependencies.md) from your distribution's package manager.

   _Arch Linux_

   ```bash
   sudo pacman -S gcc boost libevent python
   ```

   _Debian/Ubuntu_

   ```bash
   sudo apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 curl ibssl-dev libevent-dev libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-test-dev libboost-thread-dev
   ```

2. Clone the latest version of `ain` from GitHub.

   ```bash
   git clone https://github.com/DeFiCh/ain.git
   cd ain
   ```

3. Install Berekely DB.

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

4. Now, run the export command from the DB compilation, then run `autogen.sh` and finally run the configure command from above.

   ```bash
   export BDB_PREFIX='/home/DeFiCha/ain/contrib/db4'
   ./autogen.sh
   ./configure BDB_LIBS="-L${BDB_PREFIX}/lib -ldb_cxx-4.8" BDB_CFLAGS="-I${BDB_PREFIX}/include"
   ```

5. We can now compile the node. Run `make` in the `ain` root directory.

   ```bash
   make #
   make -j "$(($(nproc)))" # for multicore CPUs
   ```

`defid` and other DeFiChain executables will now be in the `src/` directory. You can run `make install` to access the compiled binaries globally.
