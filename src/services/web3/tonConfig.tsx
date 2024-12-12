import React, { ReactNode } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://your-app-domain.com/tonconnect-manifest.json';

interface TonConfigProps {
    children: ReactNode; // This defines that 'children' can be any React node
}

export const TonConfig: React.FC<TonConfigProps> = ({ children }) => {
    return (
        <TonConnectUIProvider
            manifestUrl={manifestUrl}
            // uiPreferences={{
            //     theme: "THEME.DARK",
            //     borderRadius: 'm'
            // }}
            actionsConfiguration={{
                twaReturnUrl: 'https://t.me/your_bot_username/your_web_app'
            }}
        >
            {children}
        </TonConnectUIProvider>
    );
};
