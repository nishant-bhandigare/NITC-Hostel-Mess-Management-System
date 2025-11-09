import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import OutlineButton from "../components/OutlineButton.jsx";
import { Star } from "lucide-react";

export default function Feedback() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const meals = ["Breakfast", "Lunch", "Dinner"];

  const [feedbackData, setFeedbackData] = useState({
    Breakfast: { rating: 0, comment: "" },
    Lunch: { rating: 0, comment: "" },
    Dinner: { rating: 0, comment: "" },
  });

  const handleRating = (meal, rating) => {
    setFeedbackData({
      ...feedbackData,
      [meal]: { ...feedbackData[meal], rating },
    });
  };

  const handleComment = (meal, comment) => {
    setFeedbackData({
      ...feedbackData,
      [meal]: { ...feedbackData[meal], comment },
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Feedback:", feedbackData);
    alert("Thank you! Your feedback has been submitted ✅");
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Give Feedback</h1>
          <p className="text-neutral-600 mt-1">
            Rate and share your experience for each meal today.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div key={meal} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
              <h2 className="text-xl font-semibold mb-3">{meal}</h2>

              {/* Rating */}
              <div className="flex gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition ${
                      feedbackData[meal].rating >= star
                        ? "text-blue-600 fill-blue-600"
                        : "text-neutral-400"
                    }`}
                    onClick={() => handleRating(meal, star)}
                  />
                ))}
              </div>

              {/* Comment */}
              <textarea
                className="w-full rounded-lg border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder={`Any comments for ${meal}?`}
                value={feedbackData[meal].comment}
                onChange={(e) => handleComment(meal, e.target.value)}
              />

            </div>
          ))}
        </section>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <PrimaryButton onClick={handleSubmit}>Submit Feedback</PrimaryButton>
        </div>
      </main>
    </div>
  );
}
