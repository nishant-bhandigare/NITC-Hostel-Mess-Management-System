import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function PaymentRecords() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const records = [
    { name: "Aarav Kumar", roll: "NITC2025-001", amount: "₹3,000", status: "Paid" },
    { name: "Riya Shah", roll: "NITC2025-014", amount: "₹3,000", status: "Pending" },
    { name: "Karan Das", roll: "NITC2025-032", amount: "₹3,000", status: "Paid" },
    { name: "Sneha Patil", roll: "NITC2025-045", amount: "₹3,000", status: "Pending" },
  ];

  const filteredRecords =
    filter === "All" ? records : records.filter(r => r.status === filter);

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Payment Status & Records</h1>
          <p className="text-neutral-600 mt-1">
            Monitor student payment completion and maintain billing records.
          </p>
        </header>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          {["All", "Paid", "Pending"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                ${filter === f 
                  ? "bg-blue-700 text-white border-blue-700" 
                  : "border-blue-700 text-blue-700 hover:bg-blue-50"
                }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Student Records List */}
        <section className="space-y-4">
          {filteredRecords.map((student, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200 shadow-sm rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{student.name}</h2>
                <p className="text-neutral-600 text-sm">{student.roll}</p>
                <p className="text-neutral-700 text-sm mt-1">Amount: {student.amount}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    student.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {student.status}
              </span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
