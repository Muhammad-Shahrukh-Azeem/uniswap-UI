import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  pulsechain,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'da226b31f5bd19bfa119d33e20689d0b',
  chains: [
    sepolia
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Navbar/> 
          <Component {...pageProps} />
          <Footer />

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
