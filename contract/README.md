# No Fraude Token

## Contracts on Mumbai
| name  | address  | info  |
|---|---|---|
| admin  | `0x5E3CE6324E753A3C9F60907c24D3946312EED2AF`  | [scanlink](https://mumbai.polygonscan.com/address/0x5E3CE6324E753A3C9F60907c24D3946312EED2AF)  |
| 721Token  | `0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002`  | [scanlink](https://mumbai.polygonscan.com/address/0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002)  |
| NoFraudToken  |  `0x3BfFbf7328A7370E52532f99f2ee348CFAFf190C` | [scanlink](https://mumbai.polygonscan.com/address/0x3BfFbf7328A7370E52532f99f2ee348CFAFf190C)  |

## Contracts on Sepolia

| name  | address  | info  |
|---|---|---|
| admin  | `0x0CE692C5D27A6Ab5E41C2cB4E3EdC7b3a55c34a1`  | [scanlink](https://sepolia.etherscan.io/address/0x0CE692C5D27A6Ab5E41C2cB4E3EdC7b3a55c34a1)  |
| 721Token  | `0xb5364607B81E4AD9a13B1104975914b1E35CD891`  | [scanlink](https://sepolia.etherscan.io/address/0xb5364607B81E4AD9a13B1104975914b1E35CD891)  |
| NoFraudToken  |  `0x2794219fdE28c973B08509eFeBf0401F058a6543` | [scanlink](https://sepolia.etherscan.io/address/0x2794219fdE28c973B08509eFeBf0401F058a6543)  |
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

## Run Tasks

### Mint HuoToken 
```
npx hardhat mint --network <network_name> --to <receiver_address> --token-id <token_id>
```
* `network_name` could be `mumbai` or `sepolia`

### Transfer HuoToken
```
 npx hardhat transfer --network <network_name> --to <receiver_address> --token-id <token_id>
```

### Set Approval All
```
✗ npx hardhat approve-all --network <network_name> --to <receiver_address>
```

### Send HuoToken to NoFraudToken for Burn
```
npx hardhat send --network <network_name> --nft <nft_address> --token-id <token_id>
```
* `nft_address` is the address of HuoToken contract, on mumbai it is `0x7BB751f3090f9E42984B441ceCB8C6Ed21Ea4002`, on sepolia it is `0xb5364607B81E4AD9a13B1104975914b1E35CD891`

### Ask NoFraudToken to Burn HuoToken
```
npx hardhat back --network <network_name> --nft <nft_address> --token-id <token_id>
```



