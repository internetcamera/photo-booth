import React from "react";

import { useWallet } from "@gimmixorg/use-wallet";
import { ENSName } from "react-ens-name";

import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "31cab49b254143188fc112a0c332ad86", // required
    },
  },
};

const Header = () => {
  const { account, connect } = useWallet();

  return (
    <div className="header">
      {account ? (
        <ENSName address={account}></ENSName>
      ) : (
        <button onClick={() => connect({ providerOptions: providerOptions })}>
          Connect Wallet
        </button>
      )}

      <style jsx>{`
        .header {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Header;
