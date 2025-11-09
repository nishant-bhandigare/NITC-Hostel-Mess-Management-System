import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";


export default function PayPendingBills() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Payment Done
  const bills = [
    { month: "January 2025", amount: 2850, status: "Paid" },
    { month: "February 2025", amount: 3120, status: "Paid" },
    { month: "March 2025", amount: 2980, status: "Pending" },
    { month: "April 2025", amount: 3050, status: "Pending" },
  ];

  const pendingBills = bills.filter((b) => b.status === "Pending");

  const [selected, setSelected] = useState([]);

  const toggleSelect = (month) => {
    setSelected((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const totalAmount = pendingBills
    .filter((b) => selected.includes(b.month))
    .reduce((total, b) => total + b.amount, 0);

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Pay Pending Bills</h1>
          <p className="text-neutral-600 mt-1">
            Select the pending bills you want to pay and proceed with a secure payment.
          </p>
        </header>

        {/* Pending Bills List */}
        <section className="space-y-4">
          {pendingBills.map((bill) => (
            <div
              key={bill.month}
              className={`flex items-center justify-between p-5 rounded-xl border shadow-sm cursor-pointer transition ${
                selected.includes(bill.month) ? "bg-blue-50 border-blue-400" : "bg-white"
              }`}
              onClick={() => toggleSelect(bill.month)}
            >
              <div>
                <h3 className="font-semibold text-lg">{bill.month}</h3>
                <p className="text-neutral-600 text-sm">Amount: ₹{bill.amount}</p>
              </div>

              <input
                type="checkbox"
                checked={selected.includes(bill.month)}
                onChange={() => toggleSelect(bill.month)}
                className="h-5 w-5 accent-blue-600 cursor-pointer"
              />
            </div>
          ))}
        </section>

        {/* Payment Footer */}
        {pendingBills.length > 0 ? (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-lg font-semibold">
              Total:{" "}
              <span className="text-blue-700">
                {totalAmount > 0 ? `₹${totalAmount}` : "₹0"}
              </span>
            </div>

            <button
              disabled={selected.length === 0}
              onClick={() => selected.length > 0 && navigate("/pay-now")}
              className={`px-6 py-3 rounded-lg text-white text-sm font-medium transition ${
                selected.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              Pay Now
            </button>
          </div>
        ) : (
          <p className="mt-8 text-green-600 font-medium text-center">
            ✅ All bills are paid! No pending payments.
          </p>
        )}
      </main>
    </div>
  );
}
