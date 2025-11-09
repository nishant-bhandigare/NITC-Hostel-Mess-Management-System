import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login-illustration.png";
import MyLogo from "../assets/logo.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    registrationNumber: "",
    hostelId: "",
    messId: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", form);
    alert("✅ Account created successfully!");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left: Form */}
        <div className="p-8 sm:p-12 overflow-y-auto">
          {/* Brand */}
          <div className="mb-10 flex items-center gap-3">
            <img src={MyLogo} alt="NITC Mess" className="h-8 w-8 object-contain" />
            <span className="text-lg font-semibold tracking-tight text-neutral-800">
              NITC Mess
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Create Account</h1>
          <p className="text-neutral-600 mt-2">
            Please fill in the details to sign up.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">

            {/* Full Name */}
            <div>
              <label className="text-sm text-neutral-700">Full Name</label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-neutral-700">Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="you@college.edu"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-neutral-700">Password</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Role - Radio Buttons */}
            <div>
              <label className="text-sm text-neutral-700">Select Role</label>
              <div className="flex items-center gap-4 mt-2 text-sm">
                {["Student", "Mess Manager", "Hostel Admin"].map((r) => (
                  <label key={r} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={form.role === r}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-600"
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            {/* Registration Number */}
            <div>
              <label className="text-sm text-neutral-700">Registration Number</label>
              <input
                name="registrationNumber"
                type="text"
                required
                value={form.registrationNumber}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="NITC2025-0001"
              />
            </div>

            {/* Hostel ID */}
            <div>
              <label className="text-sm text-neutral-700">Hostel ID</label>
              <input
                name="hostelId"
                type="text"
                required
                value={form.hostelId}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="H01"
              />
            </div>

            {/* Mess ID */}
            <div>
              <label className="text-sm text-neutral-700">Mess ID</label>
              <input
                name="messId"
                type="text"
                required
                value={form.messId}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="M01"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="text-sm text-neutral-700">Contact Number</label>
              <input
                name="contactNumber"
                type="tel"
                required
                value={form.contactNumber}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="9876543210"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-neutral-600 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-700 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right: Image / Illustration Panel */}
        <div className="hidden lg:block relative">
          <img
            src={loginImg} 
            alt="Sign Up Illustration"
            className="absolute inset-0 w-full h-full object-cover rounded-r-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-indigo-600/15 to-purple-600/15 rounded-r-2xl"></div>
        </div>

      </div>
    </div>
  );
}
