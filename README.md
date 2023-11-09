# NoFraudToken
An AI-assisted Identifier, Database and Bulk Burner for Fraud NFTs

## 0x00 Inspiration
Because of the limitations of the ethereum protocol with respect to the implementation of accounts (both EOA and contract account) and NFT Token Standards (ERC-721 and ERC-1155), we as ordinary wallet (address) owners can't really "reject" an airdrop from an NFT contract, we can only passively receive it, not knowing for what purpose it was forged by whom. This also gives the ground for phishing attacks that use fraudulent NFT airdrops. 

My own hot wallet (ENS: [https://etherscan.io/address/0xd02722722615935330252bD616bF4D0590840563](hannesgao.eth)) has been airdropped hundreds of different scam NFTs on Polygon and Gnosis Chain, which I as a techie and OCD patient cannot tolerate. But if I need to transfer these scam NFTs one by one to the burning address via traditional methods (e.g. front-end interaction in OpenSea using Metamask, signing, authorizing, sending), burning a single scam NFT will take me at least 1-2 minutes, which is a huge waste of time. 

## 0x01 What it does
So a great (and simple) product idea came up: 
why can't we just build a simple front-end application that allows users to link their wallets, read all NFTs on a certain chain in the wallet, present them on the front-end by user-selected sequence, and to filter out all the NFTs they want to burn by keyword (maybe a combination of keywords, or just a simple regex), with simple interactions by checking a box with the mouse or clicking the "Select All" button, and a simple smart contract or two to bulk-sign, authorize, and bulk-transfer these fraudulent NFTs to the burn address in just one single on-chain transaction to save gas! Doesn't it sound wonderful? 

If you are worried about users choosing the wrong valuable NFT and mixing it with fraudulent NFTs that need to be packaged and destroyed, don't be afraid, we will apply the large language model GPT-4 and the image recognition model DALL-E 3 provided by OpenAI, as well as a filter based of audit information databases and APIs from the major NFT marketplaces (e.g. OpenSea, Element, BLUR and X2Y2) to help our users to identify whether a NFT collection is a fraudulent or not, based on its contract address and metadata! In order to allow the user to make the right judgment in the shortest possible time, we will provide a simple scoring system with color differences on the front end.

Additionally, based on the contract addresses of scam NFTs burned off by users, we will collect all the metadata related to these scam NFTs into our database for review, which can also be used to improve the accuracy of the prediction scores mentioned above and used to train our own AI models to more accurately determine whether an NFT is a scam or not. 

Don't worry about any privacy issues, the user's wallet address will not be collected, we will only collect the contract address and metadata of the fraud NFTs that were burned off, and use it for transparent and open model training and for formal purposes of improving Web3 security (e.g., providing our database to Etherscan as an criteria for labeling certain NFT contracts).

## 0x02 How we built it (Technology Stack)
- Front-end UI/UX: Vue, Vuetify (Component Framework)
- Wallet-Link: Wagmi (React Hooks for Ethereum)
- On-Chain interaction: Ethers.js
- Smart Contract: Solidity, Hardhat (SDK), OpenZeppelin (Upgradable Smart Contract Components)
- Testing: Waffel, Mocha, Chai
- Back-end (for nofraud.token database): Python, Flask, SQLite
- AI-Assistance: GPT-4, DALL-E 3

## 0x03 Challenges we ran into
- Imbalance in basic knowledge and development skills among our team members
- Project management (What project management tools and methods are best suited for a project of this size and a team of six?)
- Time management (Our team members basically have their own regular jobs or studies during the week, and at most they can spare an hour a day during the week for self-study and project development, and on two days of the weekend we work together on Live Coding development within the framework of the regular weekly activities of KITKryptoDAO.)
- Selection of project technology stack and development tools (Hardhat or Foundary? Vue or React? Wagmi adapter for Vue-based front-end?)
- Our smart contracts need to be upgradeable at the very beginning, in order to handle the changing functionality requirements and to address new types of fraud NFTs that may appear in the future

## 0x04 Accomplishments that we're proud of
- TBD

## 0x05 What we learned
- TBD

## 0x06 What's next for NoFraud.Token
- Refine the frout-end UI/UX
- AI-assistant update/upgrade
- Cooperation with OpenAI and famous Web3 security companies like CertiK and SlowMist with our fraud NFT database/datafeed service

