import React from 'react';
import { motion } from 'framer-motion';
import btc_img from '../../assets/images/btc.svg'
import ton_img from '../../assets/images/ton.svg'
import eth_img from '../../assets/images/eth.svg'
import etm_img from '../../assets/images/EVM_connect_logos.png'
import usdt_img from '../../assets/images/usdt.svg'
import bnb_img from '../../assets/images/bnb.svg'
import sol_img from '../../assets/images/sol.svg'
import bitget_img from '../../assets/images/bitget.svg'
import doge_img from '../../assets/images/doge.svg'

const symbols: string[] = [
    btc_img, ton_img, 
    eth_img, usdt_img, 
    etm_img, bnb_img,
    sol_img, bitget_img,
    doge_img
];

interface CryptoSymbolProps {
  symbol: string;
}

interface Position {
  x: number;
  y: number;
}

const CryptoSymbol: React.FC<CryptoSymbolProps> = ({ symbol }) => {
  const randomPosition = (): Position => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });

  const { x, y } = randomPosition(); // Get a random position for initial and animated position

  return (
    <motion.img
      initial={{ x, y }} // Use an object with x and y properties
      animate={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        transition: {
          duration: Math.random() * 10 + 5,
          repeat: Infinity,
        },
      }}
      src={symbol}
      width='64'
      alt="crypto"
      className="absolute text-white opacity-20 text-xl font-bold"
    />
    
  );
};

export const CryptoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, index) => (
        <CryptoSymbol key={index} symbol={symbol} />
      ))}
    </div>
  );
};
