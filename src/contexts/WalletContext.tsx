import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTonConnect } from '../hooks/useTonConnect'

// Define the shape of your wallet context
interface WalletContextType {
    wallet: any; // Replace 'any' with the actual type of your wallet if known
    connected: boolean;
    
}

// Create the WalletContext with a default value
const WalletContext = createContext<WalletContextType | null>(null);

// Define props for the WalletProvider
interface WalletProviderProps {
    children: ReactNode; // This defines that 'children' can be any React node
}

// WalletProvider component
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [wallet, setWallet] = useState<any>(null); // Replace 'any' with the actual type of your wallet
    const {connected, account}= useTonConnect();

    useEffect(() => {
        setWallet(account)
        console.log("ACCOUNT:> ", account)
    }, [connected, account])

    

    return (
        <WalletContext.Provider value={{ wallet, connected }}>
            {children}
        </WalletContext.Provider>
    );
};

// Custom hook to use the WalletContext
export const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
