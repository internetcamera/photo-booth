import React from "react";

import { useWallet } from "@gimmixorg/use-wallet";
import { ENSName } from "react-ens-name";

const Header = () => {
  const { account, connect } = useWallet();

  return (
    <div className="header">
      {account ? (
        <ENSName address={account}></ENSName>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
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
