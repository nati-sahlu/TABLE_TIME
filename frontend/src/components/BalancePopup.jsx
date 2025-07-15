import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../apiConfig";

export function BalancePopup({ userId, userRole, onClose }) {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/balance/${userId}`);
        const data = await res.json();
        setBalance(Number(data.balance || 0));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        toast.error("Could not fetch balance.");
      }
    }

    if (userRole === "owner") {
      setIsDeposit(false); // owners can only withdraw
    }

    fetchBalance();
  }, [userId, userRole]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (numericAmount <= 0) {
      toast.warn("Amount must be greater than zero.");
      return;
    }

    const endpoint = isDeposit
      ? `${API_BASE_URL}/api/balance/${userId}/deposit`
      : `${API_BASE_URL}/api/balance/${userId}/withdraw`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericAmount }),
      });

      const data = await res.json();
      console.log("BALANCE ACTION RESPONSE:", data);

      if (data.status === "success") {
        toast.success(isDeposit ? "Deposit successful!" : "Withdrawal successful!");
        setBalance((prev) => prev + (isDeposit ? numericAmount : -numericAmount));
        setAmount(0);
      } else {
        toast.error(data.message || "Operation failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="balance-popup">
      <div className="balance-popup-content">
        <h2>Account Balance: {balance.toFixed(2)} ETB</h2>

        <div style={{ marginBottom: "1rem", fontWeight: "bold" }}>
          {isDeposit ? "Depositing Funds" : "Withdrawing Funds"}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder={`Amount to ${isDeposit ? "Deposit" : "Withdraw"}`}
            value={amount}
            onChange={handleAmountChange}
            required
          />
          <button type="submit">{isDeposit ? "Deposit" : "Withdraw"}</button>
        </form>

        <button onClick={onClose} style={{ marginTop: "0.5rem" }}>
          Close
        </button>
      </div>
    </div>
  );
}
