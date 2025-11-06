import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { getMyAttendance, registerLeave } from "../api/attendanceAPI.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Attendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Leave form state
  const [leaveForm, setLeaveForm] = useState({
    startDate: new Date(),
    endDate: new Date(),
    leaveReason: "other",
    leaveDescription: "",
  });

  // ✅ Fetch attendance history from backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();

        const { data } = await getMyAttendance(start, end);
        setAttendanceHistory(data.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // ✅ Handle leave form submission
  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        reason: leaveForm.leaveReason,
        description: leaveForm.leaveDescription,
      };
      await registerLeave(payload);
      alert("Leave registered successfully!");
      setShowModal(false);
      window.location.reload(); // reload attendance
    } catch (error) {
      console.error("Error registering leave:", error);
      alert(error.response?.data?.message || "Failed to register leave");
    }
  };

  if (loading) return <p className="text-center py-10">Loading attendance...</p>;

  return (
    <div className="min-h-screen font-sans">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container-narrow py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-neutral-600 mt-1">
            Mark leave or view your daily attendance records.
          </p>
        </header>

        {/* Mark Leave Button */}
        <div className="mb-6 flex justify-end">
          <PrimaryButton onClick={() => setShowModal(true)}>
            Apply for Leave
          </PrimaryButton>
        </div>

        {/* Attendance History */}
        <section className="space-y-3">
          {attendanceHistory.length === 0 ? (
            <p className="text-center text-gray-500">No attendance records found.</p>
          ) : (
            attendanceHistory.map((entry, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-200 shadow-sm rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <span className="text-neutral-800 font-medium block">
                    {new Date(entry.date).toDateString()}
                  </span>
                  {entry.isOnLeave && (
                    <small className="text-gray-500 text-sm">
                      Reason: {entry.leaveReason?.replace("_", " ")}
                    </small>
                  )}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    entry.isOnLeave
                      ? "bg-yellow-100 text-yellow-800"
                      : entry.totalMealsPresent > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {entry.isOnLeave
                    ? "On Leave"
                    : entry.totalMealsPresent > 0
                    ? "Present"
                    : "Absent"}
                </span>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Apply for Leave</h2>

            <form onSubmit={handleSubmitLeave} className="space-y-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Start Date
                </label>
                <DatePicker
                  selected={leaveForm.startDate}
                  onChange={(date) => setLeaveForm({ ...leaveForm, startDate: date })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  dateFormat="dd MMM yyyy"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  End Date
                </label>
                <DatePicker
                  selected={leaveForm.endDate}
                  onChange={(date) => setLeaveForm({ ...leaveForm, endDate: date })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  dateFormat="dd MMM yyyy"
                />
              </div>

              {/* Reason (enum values from schema) */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Leave Reason
                </label>
                <select
                  value={leaveForm.leaveReason}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, leaveReason: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="vacation">Vacation</option>
                  <option value="sick_leave">Sick Leave</option>
                  <option value="home_visit">Home Visit</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Describe reason (optional)..."
                  value={leaveForm.leaveDescription}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, leaveDescription: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                  maxLength={500}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
