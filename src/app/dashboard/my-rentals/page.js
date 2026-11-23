"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function MyRentalsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/api/bookings/customer")
      .then((res) => setBookings(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">My Rentals</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs uppercase bg-slate-950 text-slate-400">
            <tr>
              <th className="p-3">Equipment</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b border-slate-800">
                <td className="p-3 font-medium text-white">
                  {b.equipmentName}
                </td>
                <td className="p-3">{b.startDate}</td>
                <td className="p-3">{b.endDate}</td>
                <td className="p-3">
                  {new Date(b.bookingDate).toLocaleDateString()}
                </td>
                <td className="p-3 font-semibold text-amber-400">
                  ${b.totalAmount}
                </td>
                <td className="p-3">{b.paymentStatus}</td>
                <td className="p-3">{b.bookingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="text-center py-8 text-slate-500">No rentals found.</p>
        )}
      </div>
    </div>
  );
}
