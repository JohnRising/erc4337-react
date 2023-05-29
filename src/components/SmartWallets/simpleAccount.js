import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Client, Presets } from "userop";

function SimpleAccount({ signerAddress }) {
  const [simpleAccountAddress, setSimpleAccountAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(null);
  const [client, setClient] = useState(null);
  const [simpleAccount, setSimpleAccount] = useState(null); // New state

  useEffect(() => {
    const initializeSimpleAccount = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner(signerAddress);

        const simpleAccount = await Presets.Builder.SimpleAccount.init(
          signer,
          process.env.REACT_APP_RPC_URL,
          process.env.REACT_APP_ENTRY_POINT,
          process.env.REACT_APP_SIMPLE_ACCOUNT_FACTORY
        );
        setSimpleAccount(simpleAccount);

        if (simpleAccount) {
          setSimpleAccountAddress(simpleAccount.getSender());
          const client = await Client.init(
            process.env.REACT_APP_RPC_URL,
            process.env.REACT_APP_ENTRY_POINT
          );
          setClient(client);

          // Get account balance
          console.log(simpleAccount.getSender());
          const balance = await provider.getBalance(simpleAccount.getSender());
          console.log(balance);
          setBalance(ethers.utils.formatEther(balance));
        } else {
          console.error("simpleAccount or simpleAccount.address is undefined");
        }
      }
    };

    if (signerAddress) {
      initializeSimpleAccount();
    }
  }, [signerAddress]);

  const handleTransfer = async () => {
    const value = ethers.utils.parseEther(amount.toString()); // Convert to wei

    const res = await client.sendUserOperation(
      simpleAccount.execute(recipient, value, "0x"),
      { onBuild: (op) => console.log("Signed UserOperation:", op) }
    );
    console.log(`UserOpHash: ${res.userOpHash}`);

    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

    // Update balance
    const balance = await provider.getBalance(simpleAccountAddress);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div>
      {simpleAccountAddress ? (
        <>
          <h1>Simple Account</h1>
          <p>Simple Account Address: {simpleAccountAddress}</p>
          <p>Balance: {balance} Native Tokens</p>

          <div>
            <h1>Transfer</h1>
          </div>
          <div>
            Recipient:
            <input
              type="text"
              placeholder="Recipient"
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div>
            Amount:
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button onClick={handleTransfer}>Transfer</button>
        </>
      ) : (
        <p>Connect wallet to view Simple Account Address</p>
      )}
    </div>
  );
}

export default SimpleAccount;
