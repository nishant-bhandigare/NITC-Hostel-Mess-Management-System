import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";

export default function ManageMenus() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [weeklyMenu, setWeeklyMenu] = useState({
    Monday: { breakfast: "", lunch: "", dinner: "" },
    Tuesday: { breakfast: "", lunch: "", dinner: "" },
    Wednesday: { breakfast: "", lunch: "", dinner: "" },
    Thursday: { breakfast: "", lunch: "", dinner: "" },
    Friday: { breakfast: "", lunch: "", dinner: "" },
    Saturday: { breakfast: "", lunch: "", dinner: "" },
    Sunday: { breakfast: "", lunch: "", dinner: "" },
  });

  const handleChange = (day, meal, value) => {
    setWeeklyMenu({
      ...weeklyMenu,
      [day]: { ...weeklyMenu[day], [meal]: value }
    });
  };

  const handleSave = () => {
    console.log("Updated Menu:", weeklyMenu);
    alert("✅ Weekly Menu Updated Successfully!");
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Weekly Menu Management</h1>
          <p className="text-neutral-600 mt-1">
            Post or update weekly menu plans for students.
          </p>
        </header>

        {/* Editable Weekly Menu */}
        <section className="space-y-6">
          {Object.entries(weeklyMenu).map(([day, meals]) => (
            <div key={day} className="bg-white border border-neutral-200 shadow-sm rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">{day}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-neutral-600">Breakfast</label>
                  <input
                    type="text"
                    className="w-full border border-neutral-300 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter breakfast"
                    value={meals.breakfast}
                    onChange={(e) => handleChange(day, "breakfast", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-neutral-600">Lunch</label>
                  <input
                    type="text"
                    className="w-full border border-neutral-300 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lunch"
                    value={meals.lunch}
                    onChange={(e) => handleChange(day, "lunch", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-neutral-600">Dinner</label>
                  <input
                    type="text"
                    className="w-full border border-neutral-300 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter dinner"
                    value={meals.dinner}
                    onChange={(e) => handleChange(day, "dinner", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <PrimaryButton onClick={handleSave}>Save Menu</PrimaryButton>
        </div>

      </main>
    </div>
  );
}
