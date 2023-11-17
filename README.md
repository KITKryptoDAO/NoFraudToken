# NoFraudToken

An AI-assisted Identifier, Database and Bulk Burner for fraudulent NFTs

![NoFraudToken_Logo](https://github.com/KITKryptoDAO/NoFraudToken/blob/main/assets/img/NoFraudToken.gif "NoFraudToken_Logo")

## 0x00 Inspiration

Because of the limitations of the ethereum protocol with respect to the implementation of accounts (both EOA and contract account) and NFT Token Standards (ERC-721 and ERC-1155), we as ordinary wallet (address/account) owners can't really "reject" an airdrop from a NFT contract, we can only passively receive it, not knowing for what purpose it was minted and by whom. This also gives the ground for phishing attacks that use fraudulent NFT airdrops.

My own hot wallet (ENS: [hannesgao.eth](https://etherscan.io/address/0xd02722722615935330252bD616bF4D0590840563)) has been airdropped hundreds of different fraudulent NFTs on Polygon and Gnosis Chain, which I as a techie and OCD patient cannot tolerate. But if I need to transfer these fraudulent NFTs one by one to the burning address via traditional methods (e.g. front-end interaction on OpenSea using Metamask, signing, authorizing, sending), burning a single fraudulent NFT will take me at least 1-2 minutes, which is a huge waste of time.

## 0x01 What it does

So a great (and simple) product idea came up:

> Why can't we just build a simple front-end application that allows users to link their wallets, read all NFTs on a certain chain in the wallet, present them on the front-end by user-selected sequence, and to filter out all the NFTs they want to burn by keyword (maybe a combination of keywords, or just a simple regex), with simple interactions by checking a box with the mouse or clicking the "Select All" button, and a simple smart contract or two to bulk-sign, authorize, and bulk-transfer these fraudulent NFTs to the burn address in just one single on-chain transaction to save gas!

Doesn't it sound wonderful?

If you are worried about users choosing the wrong valuable NFT and mixing it with fraudulent NFTs that need to be bulk burned, don't be afraid, we will apply the large language model [GPT-4](https://openai.com/gpt-4/) and the image recognition model [DALL·E 3](https://openai.com/dall-e-3) provided by [OpenAI](https://platform.openai.com/docs/introduction), as well as a filter based of audit information databases and APIs from the major NFT marketplaces (e.g. [OpenSea](https://docs.opensea.io/), [Element](https://api.element.market/openapi/), [BLUR](https://blur.io/) and [X2Y2](https://x2y2.readme.io/reference/introduction/)) to help our users to identify whether a NFT and its collection is a fraudulent or not, based on its contract address and metadata! In order to allow the user to make the right judgment in the possible shortest time, we will provide a simple scoring system with color differences on the front-end.

Additionally, based on the contract addresses of fraudulent NFTs burned by users, we will collect all the metadata of these fraudulent NFTs into our database for review, which can also be used to improve the accuracy of the prediction scores mentioned above and used to train our own AI models for more accuracy in determining whether an NFT is a fraud or not.

Don't worry about any privacy issues, the user's wallet address will never be collected, we will only collect the contract address and metadata of the fraudulent NFTs that were burned, and use it for transparent AI model training and for formal purposes to improve Web3 security (e.g. providing our database to [Etherscan](https://etherscan.io/) as an criteria for labeling certain NFT contracts).

## 0x02 How would we build it (Technology Stack)

- **Front-end UI/UX**: [Vue](https://vuejs.org/guide/introduction.html), [Vite](https://vitejs.dev/), [Vuetify](https://vuetifyjs.com/en/) (Component Framework)
- **Wallet-Link**: [Web3Modal](https://docs.walletconnect.com/web3modal/about) v3, [Wagmi](https://wagmi.sh/) (React Hooks for Ethereum)
- **On-Chain Interaction**: [Ethers.js](https://docs.ethers.org/v6/) or [Web3.js](https://web3js.readthedocs.io/en/v1.10.0/)
- **Smart Contract**: [Solidity](https://docs.soliditylang.org/en/v0.8.23/), [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started/) (SDK), [OpenZeppelin](https://docs.openzeppelin.com/) (Upgradable Smart Contract Components)
- **Testing**: [Waffel](https://getwaffle.io/) ([Smart Contract Testing](https://hardhat.org/hardhat-runner/docs/other-guides/waffle-testing)), [Mocha](https://mochajs.org/) (JavaScript Test Framework), [Chai](https://www.chaijs.com/) (BDD/TDD Assertion Library)
- ~~**Back-end**: Python, [Flask](https://flask.palletsprojects.com/en/3.0.x/), [SQLite](https://www.sqlite.org/index.html) (only for nofraud.token database)~~
- **Database**: IPFS, Infura IPFS Endpoint ([Tutorial](https://www.infura.io/blog/post/a-developers-tale-building-a-database-with-ipfs))
- **AI-Assistance**: [GPT-4](https://openai.com/gpt-4/), [DALL·E 3](https://openai.com/dall-e-3)
- **CDN/CAPTCHA**: [Cloudflare Cache](https://developers.cloudflare.com/cache/), [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)

## 0x03 Functional Modules to realize (Tasks)

### 0x030 Front-end

- **UI/UX Frame** (One Page Vue App using Vuetify Components)
- **Connect Wallet Button** (incl. JS-Code for Web3Modal and Wagmi, maybe Web3.js)
- **Fetch all ERC-721 and ERC-1155 Tokens and their Contract Addresses from connected Wallet** (RPC Endpoint from Alchemy/Infura needed and return Data as JSON)
- **List all Collections (Contracts) and Tokens fetched** (Double-layered Lists of left-right Structure with Filters, Sorter and Checkboxes for each Collection and Token using Vuetify Components)
- **Filter as Input Box** (incl. JS-Code for user-defined Keyword Filter using jQuery)
- **Sorters as drop-down Menu** (incl. JS-Code for multiple Sorting Functions using jQuery)
- **API and Front-end Widget for intelligently determining if an NFT is a fraudulent NFT**
- **Data Transfer and on-chain Interaction** (incl. Data of NFTs to burn after Filtering and Sorting and on-chain Interaction with our Batch Burner Contracts using Web3.js)
- **Interaction (Authorization) for NFTs to burn with Wallet-Extension** (Batch Authorization for Tokens from multiple Contracts possible?)

### 0x031 Smart Contract

- Batch Burner Contract for [ERC-721](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721) Tokens (By Calling the `_burn` Function, if fails then try to transfer the NFT to burn to our pre-defined Burn Address)
- Batch Burner Contract for [ERC-1155](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721) Tokens (By Calling the `_burn` or `_batchburn` Function, if fails then try to transfer the NFT to burn to our pre-defined Burn Address)

### 0x032 Database

- IPFS Endpoint Setup (Using Infura Endpoint)
- Database Setup on IPFS
- Database & Front-end Intergration
- Database Interactions from Front-end after successful Burning (Using Web3.js)

### 0x033 Testing & QA

* QA & Testing of Front-end UI/UX
* QA & Testing of Front-end Funtionality
* QA & Testing of Smart Contracts
* QA & Testing of IPFS Database

## 0x04 Challenges we may run into

- **Knowledge and Skills**: Imbalance in basic knowledge and development skills among our team members
- **Project management**: What project management tools and methods are best suited for a project of this size and a team of six?
- **Time management**: All of our team members have their own regular jobs or studies during the weekdays, and they can spare an hour a day during the week at most for self-study and project development, and on two days of the weekend we work together on Live Coding development within the framework of the regular weekly activities of [KITKryptoDAO](https://doc.kitkryptodao.org/)
- **Selection of technology stack and development tools**: Hardhat or Foundary? Vue or React? Wagmi adapter for Vue-based front-end?
- **Chainlink functions**: How to make meaningful use of the functions, features, and SDKs provided by Chainlink in our projects?
- **Upgradeable contract**: Our smart contracts need to be upgradeable at the very beginning, in order to handle the changing functionality requirements and to address new types of fraud NFTs that may appear in the future

## 0x05 Accomplishments that we're proud of

- TBD

## 0x06 What we learned

- TBD

## 0x07 What's next for NoFraud.Token

- Register the handshake domain name ([nofraud.token](https://nofraud.token/)) for our project, host it on our cloud server, and publish it
- Continuously iterate and enhance this project as a product/platform
- To support multiple commonly used public chains and L2 (multi-chain support)
- Using [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337/) standard based gas wallet with account abstraction features for allowing users to choose a specific token on a specific chain to deposit to the wallet (e.g. MATIC on Polygon or USDC.e on Polygon), and provide multi-chain gas-free NFT burning service for users of our gas wallet with our multi-chain gas pools and [Chainlink-CCIP](https://chain.link/cross-chain/)-based or [Circle-CCTP](https://www.circle.com/en/cross-chain-transfer-protocol/)-based cross-chain functionality
- Refine the frout-end UI/UX
- AI-assistant update/upgrade
- Cooperation with [OpenAI](https://platform.openai.com/docs/introduction) and Web3 security companies like [CertiK](https://www.certik.com/en/) and [SlowMist](https://www.slowmist.com/) with our fraud NFT database/datafeed as a service
