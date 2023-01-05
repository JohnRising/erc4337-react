import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import {getSimpleAccount} from "erc-4337-examples/src";

const config = {
  "bundlerUrl": "http://localhost:4337",
  "rpcUrl": "https://rpc-mumbai.maticvigil.com/",
  "signingKey": "0x094ddde528fa30e0ab36eaabc6256a7bc78fb2953d21d31447b9577f855e1795",
  "entryPoint": "0x78d4f01f56b982a3B03C4E127A5D3aFa8EBee686",
  "simpleAccountFactory": "0xe19E9755942BB0bD0cCCCe25B1742596b8A8250b"
}
const helloWorld = () => {
  console.log("Hello World!")
  
  async function main() {
      const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
      // const accountAPI = getSimpleAccount(
      // provider,
      // config.signingKey,
      // config.entryPoint,
      // config.simpleAccountFactory
      // );
      // const address = await accountAPI.getCounterFactualAddress();
  
      // console.log(`SimpleAccount address: ${address}`);
  }
  
  main().catch((error) => {
      console.error(error);
      process.exit(1);
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
