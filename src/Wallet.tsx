// src/Wallet.tsx
import { ReactNode } from "react";
import { WagmiConfig, createConfig, configureChains, publicClient } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// configure chains
const { chains, publicClient: wagmiPublicClient } = configureChains(
  [mainnet, sepolia],
  [publicClient()]
);

// get connectors
const { connectors } = getDefaultWallets({
  appName: "My Web3 App",
  chains
});

// wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: wagmiPublicClient
});

// react-query client
const queryClient = new QueryClient();

// provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
