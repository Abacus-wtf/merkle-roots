

const filtered_addresses = web3.trace.filter(
  {
    "fromBlock": "STARTING_BLOCK_NUMBER",
    "toAddress": [YOUR_CONTRACT_ADDRESS]
  }
);

console.log("Filtered addresses:", filtered_addresses);