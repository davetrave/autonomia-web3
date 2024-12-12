import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WalletProvider } from './contexts/WalletContext';
import { TonConfig } from './services/web3/tonConfig.tsx'
import { AppRoot } from '@telegram-apps/telegram-ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot>
      <TonConfig>
        <WalletProvider>
          <App />
        </WalletProvider>
      </TonConfig>
    </AppRoot>
  </StrictMode>,
)
