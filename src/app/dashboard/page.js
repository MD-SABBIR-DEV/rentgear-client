"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import api from "@/lib/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user?.role === "Admin") {
      api
        .get("/api/analytics/admin")
        .then((res) => setStats(res.data))
        .catch(() => {});
    } else if (user?.role === "Owner") {
      api
        .get("/api/analytics/owner")
        .then((res) => setStats(res.data))
        .catch(() => {});
    }
  }, [user]);

  if (user?.role === "Admin" && stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Admin Analytics</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Total Users", val: stats.totalUsers },
            { label: "Total Equipment", val: stats.totalEquipment },
            { label: "Pending Approvals", val: stats.pendingApprovals },
            { label: "Total Bookings", val: stats.totalBookings },
            { label: "Completed Rentals", val: stats.completedRentals },
            { label: "Total Revenue", val: `$${stats.totalRevenue}` },
          ].map((c) => (
            <div
              key={c.label}
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl"
            >
              <p className="text-xs text-slate-400">{c.label}</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{c.val}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            Monthly Revenue ($)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                  }}
                />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === "Owner" && stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Owner Analytics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <p className="text-xs text-slate-400">Listed Equipment</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">
              {stats.totalListed}
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <p className="text-xs text-slate-400">Completed Rentals</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {stats.completedRentals}
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <p className="text-xs text-slate-400">Total Earnings</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${stats.totalEarnings}
            </p>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            Monthly Earnings ($)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                  }}
                />
                <Bar dataKey="earnings" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold text-white">Welcome, {user?.name}!</h1>
      <p className="text-slate-400 text-sm">
        Use the sidebar to manage your rentals, favorites, and profile settings.
      </p>
    </div>
  );
}
