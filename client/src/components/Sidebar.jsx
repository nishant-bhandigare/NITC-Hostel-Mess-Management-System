import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";

const NAV = [
  { icon: Home, label: "Dashboard" },
 
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    

    // Redirect to Sign In page
    navigate("/signin", { replace: true });

    
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white/70 backdrop-blur-md border-r border-neutral-200 shadow-soft transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center px-5 border-b border-neutral-200">
          <span className="text-sm font-medium text-primary bg-accent px-2 py-1 rounded-md">NITC Mess</span>
        </div>

        <nav className="p-3">
          <ul className="space-y-1">
            {NAV.map(({ icon: Icon, label }) => (
              <li key={label}>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/70 text-left">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-neutral-200/70">
            
            
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/70 text-left">
              <LogOut className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
