"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function AllEquipmentAdminPage() {
  const [items, setItems] = useState([]);

  const loadItems = () =>
    api
      .get("/api/admin/equipment")
      .then((res) => setItems(res.data))
      .catch(() => {});
  useEffect(() => {
    loadItems();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/api/admin/equipment/status/${id}`, { status });
    toast.success(`Equipment ${status}`);
    loadItems();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/equipment/${id}`);
    toast.success("Equipment deleted");
    loadItems();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Manage All Equipment</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs uppercase bg-slate-950 text-slate-400">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id} className="border-b border-slate-800">
                <td className="p-3 font-medium text-white">{i.name}</td>
                <td className="p-3 text-xs">{i.ownerEmail}</td>
                <td className="p-3 text-amber-400">${i.rentalPrice}</td>
                <td className="p-3">{i.status}</td>
                <td className="p-3 flex gap-2 text-xs">
                  <button
                    onClick={() => updateStatus(i._id, "Approved")}
                    className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(i._id, "Rejected")}
                    className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(i._id)}
                    className="px-2 py-1 bg-red-500/20 text-red-400 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
