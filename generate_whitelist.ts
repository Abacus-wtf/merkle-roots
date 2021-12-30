/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
const fs = require("fs");
require('dotenv').config();

const { getTransactionsByAccount: getTransactions } = require("./getTransactions.ts");

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using HTTPS
const web3 = createAlchemyWeb3(`https://eth-mainnet.alchemyapi.io/${process.env.ALCHEMY_API_KEY}`);

// ** Deployed Abacus "PricingSession" Contracts ** //
const abacus_contracts = [
  "0xb07e1a1383f705898ef01e3ba5aba75531ce810c",
  "0xc34fe8aa917716b6c12c7234ee4a7d91b231cbe1",
  "0x06060a6258c84dfcd42c1fb82e0028758808f5ac",
  "0x4bbd138e2ba312754b1d075dedf2f337521dd638",
  "0x92cfcbc96543134823dcb83b71a94465108e56e0",
];

// ** Whitelist ** //
let whitelist = [];

// ** Iterate abacus contracts and generate whitelist ** //
for (let i in abacus_contracts) {
  for (let block = 12762888; block <= 13901588; block+=10000) {
    let fetched_txs = getTransactions(web3, abacus_contracts[i], block, block+10000);
    console.log("txs:", fetched_txs);

    // ** map transactions to their "from address" ** //
    let addresses = fetched_txs.map((tx) => tx.from);
    whitelist = [...whitelist, ...addresses];
  }


  // const filtered_addresses = web3.eth.filter({
  //   // ** July 4th, 2021 ** //
  //   // ** https://etherscan.io/blocks?ps=100&p=11400 ** //
  //   fromBlock: "12762888",
  //   address: contract,
  // });

  // filtered_addresses.get(function(error, log) {
  //   console.log(JSON.stringify(log));
  //   whitelist.push(filtered_addresses);
  // });

  // console.log("Filtered addresses:", filtered_addresses);
}

console.log("Generated whitelist:", whitelist);

// ** JSON Output ** //
const json_whitelist = {
  whitelist: whitelist,
};

// ** Stringify JSON Object ** //
const data = JSON.stringify(json_whitelist);

// ** File Write ** //
fs.writeFile("whitelist.json", data, (err) => {
  if (err) {
    throw err;
  }
  console.log("Successfully saved whitelist to whitelist.json!");
});
