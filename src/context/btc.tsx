import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchBitcoinRates } from '../api';

const defaultContext = {
  btcRate: 0,
};

interface IBtcContext {
  /**
   * TODO: We should be more clear about how this "rate" is denominated.
   * And it should be the invserse of a "satoshi rate".
   *
   * (See: https://github.com/geyserfund/geyser-app/pull/361#discussion_r999694992)
   */
  btcRate: number;
}

export const BtcContext = createContext<IBtcContext>(defaultContext);

export const BtcProvider = ({ children }: { children: React.ReactNode }) => {
  const [btcRate, setBtcRate] = useState(0);

  useEffect(() => {
    const getBitcoinRates = async () => {
      const usdRate = await fetchBitcoinRates();
      const satoshirate = usdRate * 0.00000001;

      setBtcRate(satoshirate);
    };

    getBitcoinRates();
  }, []);

  return (
    <BtcContext.Provider value={{ btcRate }}>{children}</BtcContext.Provider>
  );
};

export const useBtcContext = () => useContext(BtcContext);
