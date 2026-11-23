"use client";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    image: user?.image || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch("/api/users/profile", form);
      await refreshUser();
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-2xl font-bold text-white">My Profile</h1>
      <div className="flex items-center gap-4">
        <img
          src={form.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover border border-amber-500"
        />
        <div>
          <p className="text-white font-semibold">{user?.email}</p>
          <p className="text-xs text-amber-400">{user?.role}</p>
        </div>
      </div>
      <form onSubmit={handleUpdate} className="space-y-4 text-sm">
        <div>
          <label className="block text-slate-300 mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">Profile Image URL</label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">Address</label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
