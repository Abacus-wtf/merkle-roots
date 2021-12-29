import web3 from "web3"; // require("web3");
import fs = require("fs");

// ** Deployed Abacus "PricingSession" Contracts ** //
const abacus_contracts = [
  "0xb07e1a1383f705898ef01e3ba5aba75531ce810c",
  "0xc34fe8aa917716b6c12c7234ee4a7d91b231cbe1",
  "0x06060a6258c84dfcd42c1fb82e0028758808f5ac",
  "0x4bbd138e2ba312754b1d075dedf2f337521dd638",
  "0x92cfcbc96543134823dcb83b71a94465108e56e0",
];

// ** Whitelist ** //
const whitelist = [];

// ** Iterate abacus contracts and generate whitelist ** //
for (const contract in abacus_contracts) {
  const filtered_addresses = web3.trace.filter({
    fromBlock: "STARTING_BLOCK_NUMBER",
    toAddress: [contract],
  });

  console.log("Filtered addresses:", filtered_addresses);
  whitelist.push(filtered_addresses);
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
