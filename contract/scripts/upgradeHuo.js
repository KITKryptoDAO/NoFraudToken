// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require("hardhat");

async function main() {

  const Huo = await ethers.getContractFactory("HuoToken");
  // const huoProxy = "0xb5364607B81E4AD9a13B1104975914b1E35CD891" // for sepolia
  const huoProxy = "0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002"
  const upgraded = await upgrades.upgradeProxy(huoProxy, Huo)

  const receipt = await upgraded.waitForDeployment();
  console.log(receipt)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
