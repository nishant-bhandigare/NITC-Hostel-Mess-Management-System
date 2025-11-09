import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import StatBadge from "../components/StatBadge.jsx";

import { Star, TrendingUp, Users } from "lucide-react";

export default function FeedbackAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy analytics data (can replace with API later)
  const analytics = {
    avgRating: 4.3,
    totalFeedback: 482,
    highestRatedMeal: "Dinner",
    mealRatings: {
      Breakfast: 4.1,
      Lunch: 4.0,
      Dinner: 4.6,
    },
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Feedback Analytics</h1>
          <p className="text-neutral-600 mt-1">
            View consolidated feedback trends and meal-wise ratings.
          </p>
        </header>

        {/* Top Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatBadge 
            label="Avg Rating" 
            value={analytics.avgRating} 
            icon={<Star className="h-5 w-5" />} 
          />
          <StatBadge 
            label="Total Feedback" 
            value={analytics.totalFeedback} 
            icon={<Users className="h-5 w-5" />} 
          />
          <StatBadge 
            label="Top Rated Meal" 
            value={analytics.highestRatedMeal} 
            icon={<TrendingUp className="h-5 w-5" />} 
          />
        </section>

        {/* Meal Wise Ratings */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Meal-wise Ratings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Object.entries(analytics.mealRatings).map(([meal, rating]) => (
              <div key={meal} className="bg-white border border-neutral-200 shadow-sm rounded-xl p-5">
                <h3 className="text-lg font-medium text-blue-700">{meal}</h3>
                <p className="mt-2 text-neutral-700 flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> 
                  {rating} / 5
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Placeholder for charts */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Rating Trend </h2>
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-8 text-neutral-500 text-center">
            📊 Chart visualizations will appear here
          </div>
        </section>

      </main>
    </div>
  );
}
