import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useNavigate } from "react-router-dom";

export default function ViewBills() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const bills = [
    { month: "January 2025", amount: "₹2,850", status: "Paid" },
    { month: "February 2025", amount: "₹3,120", status: "Paid" },
    { month: "March 2025", amount: "₹2,980", status: "Pending" },
  ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Bills & Payments</h1>
          <p className="text-neutral-600 mt-1">Your monthly mess bills and payment status.</p>
        </header>

        {/* Bills List */}
        <section className="space-y-4">
          {bills.map((bill, index) => (
            <div key={index} className="bg-white border border-neutral-200 shadow-sm rounded-xl p-5 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{bill.month}</h2>
                <p className="text-neutral-600">Amount: {bill.amount}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium 
                ${bill.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
              `}>
                {bill.status}
              </span>
            </div>
          ))}
        </section>

        {/* Pay Now Button if pending exists */}
        {bills.some(bill => bill.status === "Pending") && (
          <div className="mt-8 flex justify-end">
            
            <PrimaryButton onClick={() => navigate("/pay-pending-bills")}>Pay Pending Bills</PrimaryButton>
          </div>
        )}
      </main>
    </div>
  );
}
