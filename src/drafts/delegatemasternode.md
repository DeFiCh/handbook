# Delegate Masternode

## This is a draft about work on delegatemasternode address

A possibility to delegate vote to another address will be added i a future update. Here are the current changes that i needed to do in order to implement this feature:

 - An another field in the masternode stucture (Delegate)
 - A getter was added as well in order to get the masternode from the delegate address
 - A new version of the masternode object 
 - An other field in the message for the masternode creation
 - A new field in the RPC message
 - Fork checks
 - Print the delegate address when requesting the information about the masternode
 - New message for Createmasternode


 ## Things that still need to be done

 - Modify the delegate address when updating the masternode 
 - Functional tests

## Known issue to look at 

- Having this error when calling RPC with curl

  ERROR: Reject messages larger than max deserialization size: (1936672778 > 134217728)


 ## Last update 22 may 2023
