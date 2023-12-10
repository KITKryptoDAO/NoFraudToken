const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-ethers")
require("dotenv").config();
// require("./tasks");

const address = {
  "mumbai": {
    "HuoToken": "0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002",
    "NoFraudToken": "0x3BfFbf7328A7370E52532f99f2ee348CFAFf190C",

  },
  "sepolia": {
    "HuoToken": "0xb5364607B81E4AD9a13B1104975914b1E35CD891",
    "NoFraudToken": "0x2794219fdE28c973B08509eFeBf0401F058a6543",
  }
}

task("mint", "Mints a token")
  .addParam("to", "The address of the recipient")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    const tokenAddress = address[hre.network.name]["HuoToken"]
    const huo = await hre.ethers.getContractAt("HuoToken", tokenAddress);
    const tx = await huo.mint(taskArgs.to, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`minted ${taskArgs.tokenId} to ${taskArgs.to}`)
  });

task ("approve-all", "Approves all tokens")
  .addParam("to", "The address of the recipient")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    const tokenAddress = address[hre.network.name]["HuoToken"]
    const huo = await hre.ethers.getContractAt("HuoToken", tokenAddress);
    const tx = await huo.setApprovalForAll(taskArgs.to, true)
    console.log(tx.hash)
    console.log(`approved all tokens for ${taskArgs.to}`)
  });

task("approve", "Approves a token")
  .addParam("to", "The address of the recipient")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    const tokenAddress = address[hre.network.name]["HuoToken"]
    const huo = await hre.ethers.getContractAt("HuoToken", tokenAddress);
    const tx = await huo.approve(taskArgs.to, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`approved ${taskArgs.tokenId} for ${taskArgs.to}`)
  });

task("burn", "Send a token to the NoFraudToken contract to burn it")
  .addParam("nft", "The address of the NFT")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    const nftAddress = address[hre.network.name]["NoFraudToken"]
    const nft = await hre.ethers.getContractAt("NoFraudToken", nftAddress);
    const tx = await nft.sendToBurn(taskArgs.nft, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`gave ${taskArgs.tokenId} on ${taskArgs.nft} to ${nftAddress}`)
  })

task("bulk-burn", "Send a list of tokens to the NoFraudToken contract to burn them")
  .addParam("nft", "The address of the NFT")
  .addParam("tokenIds", "The IDs of the tokens")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    const nftAddress = address[hre.network.name]["NoFraudToken"]
    const nft = await hre.ethers.getContractAt("NoFraudToken", nftAddress);
    const tokenIds = taskArgs.tokenIds.split(",")
    console.log(tokenIds)
    const tx = await nft.bulkBurn(taskArgs.nft, [2,3])
    console.log(tx.hash)
    console.log(`gave ${taskArgs.tokenIds} on ${taskArgs.nft} to ${nftAddress}`)
  })

task("back", "Ask a token back")
  .addParam("nft", "The address of the NFT")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    const nftAddress = address[hre.network.name]["NoFraudToken"]
    const nft = await hre.ethers.getContractAt("NoFraudToken", nftAddress);
    const tx = await nft.getBack(taskArgs.nft, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`Ask ${taskArgs.tokenId} on ${taskArgs.nft} from ${nftAddress}`)
  })

task("bulk-back", "Ask a list of tokens back")
.addParam("nft", "The address of the NFT")
.addParam("tokenIds", "The ID of the token")
.setAction(async (taskArgs, hre) => {
  const signer = await hre.ethers.getSigners();
    const nftAddress = address[hre.network.name]["NoFraudToken"]
    const nft = await hre.ethers.getContractAt("NoFraudToken", nftAddress);
    const tokenIds = taskArgs.tokenIds.split(",")
    console.log(tokenIds)
    const tx = await nft.bulkBack(taskArgs.nft, [2,3])
    console.log(tx.hash)
    console.log(`Ask ${taskArgs.tokenIds} on ${taskArgs.nft} to from ${nftAddress}`)
})





task("transfer", "Transfers a token")
  .addParam("to", "The address of the recipient")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    const tokenAddress = address[hre.network.name]["HuoToken"]
    const huo = await hre.ethers.getContractAt("HuoToken", tokenAddress)
    const tx = await huo.safeTransferFrom(signer[0].address, taskArgs.to, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`transferred ${taskArgs.tokenId} from ${signer[0].address} to ${taskArgs.to}`)
  });

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();
//   console.log(accounts);
// });


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia.publicnode.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: "https://polygon-mumbai-bor.publicnode.com",
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

