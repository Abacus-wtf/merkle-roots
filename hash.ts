/* eslint-disable @typescript-eslint/no-var-requires */
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelistAddresses = require("./whitelist.json");

const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const root = tree.getRoot();

console.log("Merkle Tree Root Hash:", root.toString());

const claimingAccount = leafNodes[0];
const hexProof = tree.getHexProof(claimingAccount);
