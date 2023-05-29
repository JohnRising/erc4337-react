import React, { useState } from "react";
import BrowserExtension from "./components/Authentication/BrowserExtension";
import SimpleAccount from "./components/SmartWallets/simpleAccount";

function App() {
  const [signerAddress, setSignerAddress] = useState(null);

  console.log("Signer in App:", signerAddress);

  return (
    <div className="App">
      <BrowserExtension setSignerAddress={setSignerAddress} />
      {signerAddress && <SimpleAccount signerAddress={signerAddress} />}
    </div>
  );
}

export default App;
