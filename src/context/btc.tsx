import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchBitcoinRates } from '../api';
import { BTC_IN_SATOSHI } from '../constants';

const defaultContext = {
  btcRate: 0,
};

interface IBtcContext {
  /**
   * TODO: We should be more clear about how this "rate" is denominated.
   * And it should be the inverse of a "satoshi rate". (Currently, it's being
   * set to match the "satoshi rate")
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
      const satoshirate = usdRate * BTC_IN_SATOSHI;

      setBtcRate(satoshirate);
    };

    getBitcoinRates();
  }, []);

  return (
    <BtcContext.Provider value={{ btcRate }}>{children}</BtcContext.Provider>
  );
};

export const useBtcContext = () => useContext(BtcContext);
