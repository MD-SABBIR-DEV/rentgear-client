"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function MyEquipmentPage() {
  const [items, setItems] = useState([]);

  const loadItems = () =>
    api
      .get("/api/owner/equipment")
      .then((res) => setItems(res.data))
      .catch(() => {});
  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/api/equipment/${id}`);
    toast.success("Equipment deleted");
    loadItems();
  };

  const handleQuickPriceUpdate = async (item) => {
    const newPrice = prompt("Enter new rental price ($):", item.rentalPrice);
    if (!newPrice || isNaN(newPrice)) return;
    await api.patch(`/api/equipment/${item._id}`, {
      rentalPrice: Number(newPrice),
    });
    toast.success("Price updated!");
    loadItems();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">My Equipment</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs uppercase bg-slate-950 text-slate-400">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id} className="border-b border-slate-800">
                <td className="p-3 font-medium text-white">{i.name}</td>
                <td className="p-3">{i.category}</td>
                <td className="p-3 text-amber-400">${i.rentalPrice}</td>
                <td className="p-3">{i.availableQuantity}</td>
                <td className="p-3">{i.status}</td>
                <td className="p-3 flex gap-3">
                  <Link
                    href={`/equipment/${i._id}`}
                    className="text-sky-400 hover:underline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleQuickPriceUpdate(i)}
                    className="text-amber-400 hover:underline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(i._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="text-center py-8 text-slate-500">
            No equipment listed yet.
          </p>
        )}
      </div>
    </div>
  );
}
