"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const [favs, setFavs] = useState([]);

  const loadFavs = () =>
    api
      .get("/api/favorites")
      .then((res) => setFavs(res.data))
      .catch(() => {});
  useEffect(() => {
    loadFavs();
  }, []);

  const handleRemove = async (id) => {
    await api.delete(`/api/favorites/${id}`);
    toast.success("Removed from favorites");
    loadFavs();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">My Favorites</h1>
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="text-xs uppercase bg-slate-950 text-slate-400">
          <tr>
            <th className="p-3">Equipment</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favs.map((f) => (
            <tr key={f._id} className="border-b border-slate-800">
              <td className="p-3 font-medium text-white">{f.equipmentName}</td>
              <td className="p-3">{f.category}</td>
              <td className="p-3 text-amber-400">${f.rentalPrice}</td>
              <td className="p-3 flex gap-3">
                <Link
                  href={`/equipment/${f.equipmentId}`}
                  className="text-amber-400 hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemove(f._id)}
                  className="text-red-400 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {favs.length === 0 && (
        <p className="text-center py-8 text-slate-500">
          No favorite items yet.
        </p>
      )}
    </div>
  );
}
