import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useNavigate } from "react-router-dom";


export default function Attendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const attendanceHistory = [
    { date: "01 Mar 2025", status: "Present" },
    { date: "02 Mar 2025", status: "Absent" },
    { date: "03 Mar 2025", status: "Present" },
    { date: "04 Mar 2025", status: "Absent" },
  ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-neutral-600 mt-1">Mark absence or check your attendance history.</p>
        </header>

        {/* Mark Absence Button */}
        <div className="mb-6 flex justify-end">
          <PrimaryButton onClick={() => navigate("/mark-absence")}>Mark Absence</PrimaryButton>
        </div>

        {/* History */}
        <section className="space-y-3">
          {attendanceHistory.map((entry, index) => (
            <div key={index} className="bg-white border border-neutral-200 shadow-sm rounded-xl p-4 flex justify-between items-center">
              <span className="text-neutral-800 font-medium">{entry.date}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  entry.status === "Present"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {entry.status}
              </span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
