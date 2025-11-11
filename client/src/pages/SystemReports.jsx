import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar3.jsx";

export default function SystemReports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">System Reports & Analytics</h1>
          <p className="text-neutral-600 mt-1">
            Access overall system insights and performance analytics.
          </p>
        </header>

        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Total Students</p>
            <h2 className="text-2xl font-bold mt-1">1,120</h2>
          </div>
          <div className="bg-white border p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Average Meal Rating</p>
            <h2 className="text-2xl font-bold mt-1">4.1 ★</h2>
          </div>
          <div className="bg-white border p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Monthly Revenue</p>
            <h2 className="text-2xl font-bold mt-1">₹13.5 Lakh</h2>
          </div>
          <div className="bg-white border p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Attendance This Month</p>
            <h2 className="text-2xl font-bold mt-1">92%</h2>
          </div>
        </section>

        {/* Charts Placeholder */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Meal Rating Trend</h3>
            <div className="h-56 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
              Chart Goes Here
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Monthly Revenue Trend</h3>
            <div className="h-56 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
              Chart Goes Here
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold mb-3">Attendance & Absence Pattern</h3>
            <div className="h-56 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
              Chart Goes Here
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
