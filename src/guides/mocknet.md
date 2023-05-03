
# Creating a masternode on mocknet

1. Compile it from source

	Follow the step of this [tutorial](https://defich.github.io/handbook/guides/compiling.html) to compile the project directly from the source


2. Import snapshot

	In order to make the synchronisation of the chain faster use a snapshot of the chain like [this](https://defich.github.io/handbook/guides/defid.html#initial-block-download)


3. Start the Defichain  

	```bash
	src/defid -daemon
	```
  

4. Create your own wallet

	```bash
	src/defi-cli createwallet 'name_of_your_wallet'
	```
  

5. Now stop and restart the defi-cli in order to setup your wallet as the default one. While doing that add two parameter while launch the defiChain: 
	1. `-mocknet` to enable the mocknet network
	2. `-gen=1` that will allow to mine blocks.

	```bash
	src/defi-cli stop
	src/defid -mocknet -gen=1
	```


6. After your wallet creation you need to get a new address in order to be able to make operation on the blockchain

	```bash
	src/defi-cli getnewaddress
	```


7. Now import the privatekey of the MN owner for mocknet in order to be able to receive the reward.

	```bash
	src/defi-cli importprivkey L5DhrVPhA2FbJ1ezpN3JijHVnnH1sVcbdcAcp3nE373ooGH6LEz6
	```


8. After waiting for a while you should be able to create your own masternode

	```bash
	src/defi-cli createmasternode 'your_address'
	```