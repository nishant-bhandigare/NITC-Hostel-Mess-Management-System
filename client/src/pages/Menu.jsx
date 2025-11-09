import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Card from "../components/Card.jsx";

export default function Menu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const weeklyMenu = {
    Monday: {
      breakfast: "Idli & Coconut Chutney",
      lunch: "Rajma Chawal",
      dinner: "Paneer Masala with Roti"
    },
    Tuesday: {
      breakfast: "Poha & Banana",
      lunch: "Sambar Rice",
      dinner: "Chicken Curry / Veg Kurma"
    },
    Wednesday: {
      breakfast: "Aloo Paratha & Curd",
      lunch: "Chole Bhature",
      dinner: "Dal Tadka & Jeera Rice"
    },
    Thursday: {
      breakfast: "Upma & Tea",
      lunch: "Curd Rice",
      dinner: "Veg Biryani with Raita"
    },
    Friday: {
      breakfast: "Masala Dosa",
      lunch: "Mix Veg & Chapati",
      dinner: "Chicken Biryani / Veg Pulao"
    },
    Saturday: {
      breakfast: "Bread Omelette",
      lunch: "Paneer Butter Masala & Naan",
      dinner: "Maggi Night"
    },
    Sunday: {
      breakfast: "Poori & Aloo Sabji",
      lunch: "Special Thali",
      dinner: "Pasta & Ice Cream"
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Weekly Menu</h1>
          <p className="text-neutral-600 mt-1">
            The meals planned for the week.
          </p>
        </header>

        {/* Weekly Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(weeklyMenu).map(([day, meals]) => (
            <div key={day} className="bg-white border border-neutral-200 shadow-sm rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-3 text-blue-700">{day}</h2>

              <p><span className="font-medium text-neutral-700">Breakfast:</span> {meals.breakfast}</p>
              <p><span className="font-medium text-neutral-700">Lunch:</span> {meals.lunch}</p>
              <p><span className="font-medium text-neutral-700">Dinner:</span> {meals.dinner}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
