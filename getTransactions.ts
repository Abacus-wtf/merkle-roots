/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
// const Web3 = require('web3');
// const web3 = new Web3();

const getTransactionsByAccount = (web3, myaccount, startBlockNumber, endBlockNumber) => {
  if (endBlockNumber == null) {
    endBlockNumber = web3.eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  const all_txs = [];
  for (let i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      console.log("Searching block " + i);
    }
    const block = web3.eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
          const tx = {
            "hash": e.hash,
            "nonce": e.nonce,
            "blockHash": e.blockHash,
            "blockNumber": e.blockNumber,
            "transactionIndex": e.transactionIndex,
            "from": e.from,
            "to": e.to,
            "value": e.value,
            "time": block.timestamp + " " + new Date(block.timestamp * 1000).toUTCString(),
            "gasPrice": e.gasPrice,
            "gas": e.gas,
            "input": e.input
          };
          all_txs.push(tx);
          console.log("\nGOT TX\n");
          console.log(tx);
        }
      })
    }
  }
  return all_txs;
}

module.exports = {
  getTransactionsByAccount: getTransactionsByAccount
}
// export default getTransactionsByAccount;
