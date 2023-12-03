const { ethers, upgrades } = require("hardhat");

async function main() {
  
  const Nft = await ethers.getContractFactory("NoFraudToken");
  const nftProxy = await upgrades.deployProxy(Nft)
  await nftProxy.waitForDeployment();

  console.log(
    "Huo Token deployed to ", await nftProxy.getAddress()
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
