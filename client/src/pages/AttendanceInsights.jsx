import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function AttendanceInsights() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Attendance Insights</h1>
          <p className="text-neutral-600 mt-1">
            Track student attendance trends and patterns.
          </p>
        </header>

        {/* Summary KPI Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Avg Monthly Attendance</p>
            <h2 className="text-2xl font-bold mt-1">91.8%</h2>
          </div>
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Highest Attendance Month</p>
            <h2 className="text-2xl font-bold mt-1">August</h2>
          </div>
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Average Absences/Student</p>
            <h2 className="text-2xl font-bold mt-1">3.1 days</h2>
          </div>
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <p className="text-neutral-500 text-sm">Peak Absence Day</p>
            <h2 className="text-2xl font-bold mt-1">Monday</h2>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          {/* Monthly Attendance Trend */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Monthly Attendance Trend</h3>
            <div className="h-56 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
              Chart: Attendance Trend Here
            </div>
          </div>

          {/* Weekday Pattern */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Weekday Attendance Pattern</h3>
            <div className="h-56 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
              Chart: Weekday Pattern Here
            </div>
          </div>

          {/* Absence Reasons Breakdown */}
          <div className="bg-white border rounded-xl p-6 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold mb-3">Absence Reasons Breakdown</h3>
            <div className="h-56 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400">
              Chart: Absence Reasons Here
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
