import React from "react";

function BrowserExtension({ setSignerAddress }) {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.enable();

        // set the first account as the signerAddress
        setSignerAddress(window.ethereum.selectedAddress);
      } catch (error) {
        console.error("User denied account access");
      }
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect with Browser Extension</button>
    </div>
  );
}

export default BrowserExtension;
