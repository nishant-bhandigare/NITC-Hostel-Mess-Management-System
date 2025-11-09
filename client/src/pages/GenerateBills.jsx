import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";

export default function GenerateBills() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    month: "",
    foodCost: "",
    extras: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const total =
    (Number(formData.foodCost) || 0) + (Number(formData.extras) || 0);

  const handleGenerate = () => {
    if (!formData.month || !formData.foodCost) {
      alert("⚠️ Please fill required fields.");
      return;
    }

    console.log("Generated Bills:", formData);
    alert(`✅ Bills generated for ${formData.month}!`);
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Generate Mess Bills</h1>
          <p className="text-neutral-600 mt-1">
            Create and distribute monthly bills for all students.
          </p>
        </header>

        {/* Form */}
        <section className="bg-white border border-neutral-200 shadow-sm rounded-xl p-6 space-y-6">

          {/* Month */}
          <div>
            <label className="text-sm text-neutral-600">Select Month *</label>
            <input
              type="month"
              className="w-full border border-neutral-300 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-600"
              value={formData.month}
              onChange={(e) => handleChange("month", e.target.value)}
            />
          </div>

          {/* Food Cost */}
          <div>
            <label className="text-sm text-neutral-600">Food Cost (per student) *</label>
            <input
              type="number"
              className="w-full border border-neutral-300 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-600"
              placeholder="Example: 3000"
              value={formData.foodCost}
              onChange={(e) => handleChange("foodCost", e.target.value)}
            />
          </div>

          {/* Extra Charges */}
          <div>
            <label className="text-sm text-neutral-600">Extra Charges (optional)</label>
            <input
              type="number"
              className="w-full border border-neutral-300 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-600"
              placeholder="Example: 150"
              value={formData.extras}
              onChange={(e) => handleChange("extras", e.target.value)}
            />
          </div>

          {/* Total */}
          <div className="text-lg font-semibold text-blue-700">
            Total Bill Per Student: ₹{total}
          </div>
        </section>

        {/* Generate Button */}
        <div className="mt-8 flex justify-end">
          <PrimaryButton onClick={handleGenerate}>Generate Bills</PrimaryButton>
        </div>

      </main>
    </div>
  );
}
