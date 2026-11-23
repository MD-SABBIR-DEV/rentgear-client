"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Menu, X, Wrench, LogOut, LayoutDashboard } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <div className="p-2 bg-amber-500 rounded-lg text-slate-950">
            <Wrench className="w-5 h-5" />
          </div>
          <span>
            Rent<span className="text-amber-500">Gear</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <Link href="/equipment" className="hover:text-amber-400 transition">
            All Equipment
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 hover:text-amber-400 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-300"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 text-sm">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block hover:text-amber-400"
          >
            Home
          </Link>
          <Link
            href="/equipment"
            onClick={() => setOpen(false)}
            className="block hover:text-amber-400"
          >
            All Equipment
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block text-amber-400"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block text-amber-400 font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
