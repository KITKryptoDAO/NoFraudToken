const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-ethers")
require("dotenv").config();
// require("./tasks");

task("mint", "Mints a token")
  .addParam("to", "The address of the recipient")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    let tokenAddress = ""
    if (hre.network.name === "mumbai") {
      tokenAddress = "0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002"
    } else if (hre.network.name === "sepolia") {
      tokenAddress = "0xb5364607B81E4AD9a13B1104975914b1E35CD891"
    }
    const huo = await hre.ethers.getContractAt("HuoToken", tokenAddress);
    const tx = await huo.mint(taskArgs.to, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`minted ${taskArgs.tokenId} to ${taskArgs.to}`)
  });

task ("approve-all", "Approves all tokens")
  .addParam("to", "The address of the recipient")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    console.log(await ethers.provider.getTransactionCount(signer[0].address))
    let tokenAddress = ""
    if (hre.network.name === "mumbai") {
      tokenAddress = "0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002"
    } else if (hre.network.name === "sepolia") {
      tokenAddress = "0xb5364607B81E4AD9a13B1104975914b1E35CD891"
    }
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
    let tokenAddress = ""
    if (hre.network.name === "mumbai") {
      tokenAddress = "0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002"
    } else if (hre.network.name === "sepolia") {
      tokenAddress = "0xb5364607B81E4AD9a13B1104975914b1E35CD891"
    }
    const huo = await hre.ethers.getContractAt("HuoToken", tokenAddress);
    const tx = await huo.approve(taskArgs.to, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`approved ${taskArgs.tokenId} for ${taskArgs.to}`)
  });

task("send", "Gives a token to the NoFraudToken contract")
  .addParam("nft", "The address of the NFT")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    let nftAddress = ""
    if (hre.network.name === "mumbai") {
      nftAddress = "0x3BfFbf7328A7370E52532f99f2ee348CFAFf190C"
    } else if (hre.network.name === "sepolia") {
      nftAddress = "0x2794219fdE28c973B08509eFeBf0401F058a6543"
    }
    const nft = await hre.ethers.getContractAt("NoFraudToken", nftAddress);
    const tx = await nft.sendToBurn(taskArgs.nft, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`gave ${taskArgs.tokenId} on ${taskArgs.nft} to ${nftAddress}`)
  })

task("back", "Ask a token back")
  .addParam("nft", "The address of the NFT")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    let nftAddress = ""
    if (hre.network.name === "mumbai") {
      nftAddress = "0x3BfFbf7328A7370E52532f99f2ee348CFAFf190C"
    } else if (hre.network.name === "sepolia") {
      nftAddress = "0x2794219fdE28c973B08509eFeBf0401F058a6543"
    }
    const nft = await hre.ethers.getContractAt("NoFraudToken", nftAddress);
    const tx = await nft.getBack(taskArgs.nft, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`gave ${taskArgs.tokenId} on ${taskArgs.nft} to ${nftAddress}`)
  })


task("transfer", "Transfers a token")
  .addParam("to", "The address of the recipient")
  .addParam("tokenId", "The ID of the token")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.getSigners();
    let tokenAddress = ""
    if (hre.network.name === "mumbai") {
      tokenAddress = "0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002"
    } else if (hre.network.name === "sepolia") {
      tokenAddress = "0xb5364607B81E4AD9a13B1104975914b1E35CD891"
    }
    const huo = await hre.ethers.getContractAt("HuoToken", tokenAddress)
    const tx = await huo.safeTransferFrom(signer[0].address, taskArgs.to, taskArgs.tokenId)
    console.log(tx.hash)
    console.log(`transferred ${taskArgs.tokenId} from ${signer[0].address} to ${taskArgs.to}`)
  });


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

