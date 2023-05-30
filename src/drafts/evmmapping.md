# Evm Mapping

## This draft is about work on the EVM mapping. 
The goal of this is to be able to retrieve the equivalent of inforation from DVM or EVM side.

## The work on addresses
In order to convert addresses EVM <=> DVM, the first approach is to get the public key from the address given and generate the equivalent of the address with the public key. This method is not meeting the full requirement because the user will only be able to map addresses that they own.

## Last update on 30 may 2023