<template>
  <router-view />
</template>

<script setup>
  import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
  import { polygon, polygonMumbai, polygonZkEvm, polygonZkEvmTestnet } from 'viem/chains'

  // 1. Get projectId at https://cloud.walletconnect.com
  const projectId = '98b476fa6c6e545c330cfd899fc67a38'

  // 2. Create wagmiConfig
  const metadata = {
    name: 'NoFraudToken',
    description: 'An AI-assisted Identifier, Database and Bulk Burner for fraudulent NFTs',
    url: 'https://burner.kitkryptodao.org/',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

  const chains = [polygon, polygonMumbai, polygonZkEvm, polygonZkEvmTestnet]
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

  // 3. Create modal
  createWeb3Modal({ wagmiConfig, projectId, chains })
</script>
