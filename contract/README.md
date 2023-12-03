# No Fraude Token

## Install

To install dependencies, please run

```
npm install
```

## Configuration

### Set Env

Create a `.env` file and copy the content of `.env.example` to it, set your private key and etherscan api key.

### Add Network

To support a new network, please add the network configuration to `networks` field in `hardhat.config.js`.

```
networks: {
    network_name: {
        url: "rpc url",
        accounts: [private_key]
    }
}
```

## Deploy Contracts
By default, all contracts are deployed through [Transparent Upgradeable Pattern](https://docs.openzeppelin.com/contracts/5.x/api/proxy#TransparentUpgradeableProxy). If you are not familiar with it, please refer to [this](https://docs.openzeppelin.com/contracts/5.x/api/proxy), [this](https://www.youtube.com/watch?v=JgSj7IiE4jA) and [this](https://www.youtube.com/watch?v=kWUDTZhxKZI) to learn.

To deploy a test ERC721 contract named `HuoToken` on Sepolia, please run
```
npx hardhat run scripts/deployHuo.js --network sepolia
```

To verify a contract on Sepolia, please run
```
npx hardhat verify --network sepolia contract_address
```

To deploy NoFraudToken contract, please run
```
npx hardhat run scripts/deployNoFraudToken.js --network sepolia
```

> **Important**
> All the transactions of the deployed contracts on some network such as `sepolia` are saved to the file `.openzeppelin/network_name.json`.
> For upgradeable contracts, the proxyAdmin(`admin`), proxy(`proxies`) and its implemetnation(`impls`) addresses are save there.

## Upgrade Contract

With the help of the file `.openzeppelin/network_name.json`, just run the following command to upgrade ERC721 token
```
npx hardhat run scripts/upgradeHuo.js --network sepolia
```

To upgrade NoFraudToken contract, please run
```
npx hardhat run scripts/upgradeNoFraudeToken.js --network sepolia
```



