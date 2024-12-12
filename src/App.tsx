// import React,{ useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import BottomNavigation from './components/layout/BottomNavigation';
// import Home from './pages/Home';
// import Courses from './pages/courses/Course';
// import Store from './pages/store/Store';
// import Profile from './pages/profile/Profile';
// import config from "../config.json";

// const App: React.FC = () => {
  

//   useEffect(() => {
//     const env = config["ENV"]
//     const api = config["VITE_APP_API_URL"]
//     console.log("Config", env)
//     console.log("API", api)

//   }, [])

//   return (
//     <Router>
      
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/course" element={<Courses />} />
//           <Route path="/store" element={<Store />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
      
//       <BottomNavigation />
//     </Router>
//   );
// };

// export default App;


import { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Button } from '@telegram-apps/telegram-ui';
import { CryptoBackground } from './components/bg/CryptoBg';
import { useTonConnect } from './hooks/useTonConnect';
import {TonConfig} from './services/web3/tonConfig'
import { useTonWallet } from '@tonconnect/ui-react'
import OnboardingScreen from './components/onboarding/Onboarding';
import MainApp from './components/layout/MainApp';

const categories:string[] = [
  'Basics', 'DeFi', 'NFTs', 'Trading', 'Security'
];

const App = () => {
  const { connected } = useTonConnect();
  const wallet  = useTonWallet();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    localStorage.getItem('hasCompletedOnboarding') === 'true'
  );
  const [isConnected, setConnected] = useState(false)

  useEffect(() => {
    const store = localStorage.getItem("ton-connect-ui_wallet-info")
    if (wallet) {
      setConnected(true)
      console.log("CONN:> ", connected)
      console.log("WALLET:> ", wallet)
    }
      
  }, [wallet])

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setHasCompletedOnboarding(true);
  };

  return (
    <TonConfig>
      {!hasCompletedOnboarding ? (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        ) : (

          <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <CryptoBackground />
            
            <div className="relative z-10">
              {/* Header */}
              <header className="p-4 flex justify-between items-center">
                <TonConnectButton />
                
              </header>

              {/* Categories */}
              {/* <div className="px-4 py-2 flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    className="whitespace-nowrap px-4 py-2 bg-gray-800 rounded-full text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div> */}

              {/* Main Content */}
              <main className="p-4">
                {isConnected ? (
                  // Your course content here
                  // <div className="grid grid-cols-2 gap-4">
                  //   <h1>Connected</h1>
                  // </div>
                  <MainApp />
                ) : (
                  <div className="text-center py-20">
                    <h2 className="text-xl text-white mb-4">
                      Connect your wallet to start learning
                    </h2>
                    <TonConnectButton />
                  </div>
                )}
              </main>
            </div>

            {/* Your bottom navbar component goes here */}
          </div>
        )
      }
    </TonConfig>
  );
};

export default App
