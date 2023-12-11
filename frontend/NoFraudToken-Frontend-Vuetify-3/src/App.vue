<template>
  <router-view />
  <app-bar></app-bar>
</template>

<script setup>
import AppBar from '@/components/AppBar.vue'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { polygonMumbai } from 'viem/chains'

// Get projectId at https://cloud.walletconnect.com
const projectId = '98b476fa6c6e545c330cfd899fc67a38'

// Create wagmiConfig
const metadata = {
  name: 'NoFraudToken',
  description: 'An AI-assisted Identifier, Database and Bulk Burner for fraudulent NFTs',
  url: 'https://burner.kitkryptodao.org/',
  icons: ['']
}

const chains = [polygonMumbai]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

// Get Connected Wallet Address
import { getAccount } from '@wagmi/core'

const account = getAccount()

// Alchemy SDK & API Setup
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "xSgGAD4PG4DrziFVVaBB9heCq6fuwFIQ",
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

// Get all the NFTs owned by an address
// const nfts = alchemy.nft.getNftsForOwner(account.address);

// Print all NFTs in Console
// console.log(account.address)
// console.log(nfts)

const main = async () => {
  //Call the method to get the nfts owned by this address
  let response = await alchemy.nft.getNftsForOwner(account.address)

  //Logging the response to the console
  console.log("this is response:")
  console.log(response)
};

main();

</script>
