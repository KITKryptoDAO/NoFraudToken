// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const initOwner = "0xcD7e175dcE25e27a89e9954C1218FAb2A5955a1d"
 
  const huo = await hre.ethers.deployContract("HuoToken", [initOwner]);

  await huo.waitForDeployment();

  console.log(
    `Deployed to ${huo.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
