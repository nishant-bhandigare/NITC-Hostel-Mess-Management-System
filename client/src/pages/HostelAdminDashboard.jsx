import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar3.jsx";
import Card from "../components/Card.jsx";
import StatBadge from "../components/StatBadge.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import OutlineButton from "../components/OutlineButton.jsx";
import { useNavigate } from "react-router-dom";


import { 
  ReceiptIndianRupee, 
  CheckCircle, 
  BarChart3, 
  Users, 
  UserCog 
} from "lucide-react";

export default function HostelAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Hostel Administrator Dashboard</h1>
          <p className="text-neutral-600 mt-1">
            Manage hostel billing, payments, system reports, and user access.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatBadge 
            label="Total Students" 
            value="1,120" 
            icon={<Users className="h-5 w-5" />} 
          />
          <StatBadge 
            label="Bills Generated" 
            value="1,120" 
            icon={<ReceiptIndianRupee className="h-5 w-5" />} 
          />
          <StatBadge 
            label="Paid" 
            value="1,045" 
            icon={<CheckCircle className="h-5 w-5" />} 
          />
          <StatBadge 
            label="Pending" 
            value="75" 
            icon={<ReceiptIndianRupee className="h-5 w-5" />} 
          />
        </section>

        {/* Main Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Bills */}
          <Card
            icon={<ReceiptIndianRupee />}
            title="Generate Mess Bills"
            description="Create and distribute monthly bills for all students."
            actions={<PrimaryButton onClick={() => navigate("/generate-bills")}>Generate Bills</PrimaryButton>}
          />

          {/* Track Payments */}
          <Card
            icon={<CheckCircle />}
            title="Payment Status & Records"
            description="Monitor student payment completion and maintain records."
            actions={<PrimaryButton onClick={() => navigate("/payment-records")}>
      View Payments</PrimaryButton>}
          />

          {/* Reports */}
          <Card
            icon={<BarChart3 />}
            title="System Reports & Analytics"
            description="Access overall system insights and performance analytics."
            actions={<PrimaryButton onClick={() => navigate("/system-reports")}>View Reports</PrimaryButton>}    />

          {/* Manage Roles & Permissions */}
          <Card
            icon={<UserCog />}
            title="User Roles & Permissions"
            description="Assign and modify user access roles across the system."
            actions={<PrimaryButton onClick={() => navigate("/user-roles")}>
      Manage Roles</PrimaryButton>}
          />
        </section>

      </main>
    </div>
  );
}
