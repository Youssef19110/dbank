import React, { useEffect, useState } from "react";
import { dbank_backend } from "../../declarations/dbank_backend";
import "./index.scss";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const result = await dbank_backend.checkBalance();
        setBalance(parseFloat(result.toFixed(2)));
      } catch (err) {
        console.error("Failed to fetch balance:", err);
      }
    }

    fetchBalance();
  }, []);


  async function handleTopUp() {
    await dbank_backend.topUp(parseFloat(input));
    await fetchBalance();
  }

  async function handleWithdraw() {
    await dbank_backend.withDraw(parseFloat(input));
    await fetchBalance();
  }

  async function handleCompound() {
    await dbank_backend.compound();
    await fetchBalance();
  }

  return (
    <div className="container">
      <h1>💰 DBank</h1>
      <div className="balance">Balance: ${balance.toFixed(2)}</div>
      <input type="number" placeholder="Enter amount" />
      <div>
        <button onClick={{handleTopUp}}>Top Up</button>
        <button onClick={handleWithdraw}>Withdraw</button>
        <button onClick={handleCompound}>Compound</button>
      </div>
    </div>
  );
}

export default App;
