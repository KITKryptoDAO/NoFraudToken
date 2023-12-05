// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require("hardhat");

async function main() {

  const Nft = await ethers.getContractFactory("NoFraudToken");
  // const nftProxy = "0x2794219fdE28c973B08509eFeBf0401F058a6543" // for sepolia
  const nftProxy = "0x3BfFbf7328A7370E52532f99f2ee348CFAFf190C"
  const upgraded = await upgrades.upgradeProxy(nftProxy, Nft)

  const receipt = await upgraded.waitForDeployment();
  console.log(receipt)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
