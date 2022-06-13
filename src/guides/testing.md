# Running tests

If you make any changes to the DeFiChain code, you should always update and run tests in order to verify functionality and prevent regressions.

defid tests are located in the following locations

- [`/src/test`](#unit-tests): defid unit tests
- [`/src/wallet/test`](#unit-tests): wallet unit tests
- [`/test/functional`](#functional-tests): test using RPC and P2P interfaces
- [`/test/util`](#util-tests): test the defi utilities
- [`/test/lint`](#lint-tests): static analysis checks

Running tests in requires defid to be compiled locally. Click [here](./compiling.md) to learn more about how to compile locally.

## Unit tests (including wallet unit tests)

Unit tests are compiled unless disabled in `./configure`. After configuring and compiling, tests can be run by running `make check`, or by running the `test_defi` executable in `src/test`.

```bash
make check              # run tests using make
./src/test/test_defi    # run tests using test_defi from project root
```

To run an unit test suite, you can pass the filename (without the path and extension) to the `--run_test` argument in `test_defi`.

```bash
./src/test/test_defi --run_test=blockchain_tests
```

You can also run an individual unit test (denoted by `BOOST_AUTO_TEST_CASE` in test `.cpp` files) by specifying the test name after a `/`. For example, running the `get_difficulty_for_very_low_target` in `blockchain_tests.cpp` with `all` log level.

```bash
./src/test/test_defi --run_test=blockchain_tests/get_difficulty_for_very_low_target --log_level=all
```

`test_defi` has multiple configuration options, which can be listed by running `test_defi --help`.

## Functional tests

The ZMQ functional test requires a python ZMQ library. Install the [`pyzmq`](https://pypi.org/project/pyzmq/) dependency through pip or your system's package manager.

```bash
pip install pyzmq
```

Once you have compiled defid, you can run tests by

- directly running the test's `.py` file

  e.g. to run the `feature_block` tests, we would run

  ```bash
  python test/functional/feature_block.py
  ```

- using `test_runner.py`

  e.g. to run the `feature_block` tests, we would run

  ```bash
  python test/functional/test_runner.py feature_block.py
  ```

  Multiple tests can be run using the test runner.

  ```bash
  python test/functional/test_runner.py <testname1> <testname2> <testname3> ...
  ```

  Wildcard test names can be passed, if the paths are coherent and the test runner is called from a `bash` shell or similar that supports [globbing](<https://en.wikipedia.org/wiki/Glob_(programming)>). For example, to run all the wallet tests

  ```bash
  python test/functional/test_runner.py test/functional/wallet*     # called from project root
  python functional/test_runner.py functional/wallet*               # called from the test/ directory
  python test_runner.py wallet*                                     # called from the test/functional/ directory
  ```

  The paths must be consistent. The following does not work as `wallet*` is not defined at the project root.

  ```bash
  test/functional/test_runner.py wallet*
  ```

  Combinations of wildcards can be passed. For example,

  ```
  test/functional/test_runner.py ./test/functional/tool* test/functional/mempool*
  ```

  ```bash
  test_runner.py tool* mempool*
  ```

  Run the regression test suite with

  ```
  test/functional/test_runner.py
  ```

  Run all possible tests with

  ```
  test/functional/test_runner.py --extended
  ```

  By default, up to 4 tests will be run in parallel by test_runner. To specify how many jobs to run, append `--jobs=n`

  The individual tests and the test_runner harness have many command-line options.

  - `--ansi`: use ANSI colors and dots in output (enabled by default when standard output is a TTY)
  - `--combinedlogslen`: on failure, print a log (of length n lines) to the console, combined from the test framework and all test nodes
  - `--coverage`: generate a basic coverage report
  - `--ci`: run checks and code that are usually only enabled in a continuous integration environment
  - `--exclude`: specify a comma separated list of tests to exclude
  - `--extended`: run the extended test suite in addition to the basic tests
  - `--help`: print help text
  - `--jobs`: how many test scripts to run in parallel, defaults to 4
  - `--keepcache`: retain the cache from the previous testrun
  - `--quiet`: only prints dots, results summary and failure logs
  - `--tmpdirprefix`: directory for datadirs
  - `--failfast`: stop execution after the first test failure
  - `--filter`: run scripts by filtering using regex

## Util tests

Util tests can be run locally by running `test/util/defi-util-test.py`. Use the `-v` option for verbose output.

## Lint tests

Lint tests requires [codespell](https://pypi.org/project/codespell/) and [flake8](https://pypi.org/project/flake8/) dependencies, you can install them using pip or your system's package manager.

```bash
pip install codespell flake8
```

Individual tests can be run by directly calling the test script.

```bash
./test/lint/<filename>.sh
```

You can run all the shell-based lint tests by running `lint-all.sh`.

```bash
./test/lint/lint-all.sh
```
