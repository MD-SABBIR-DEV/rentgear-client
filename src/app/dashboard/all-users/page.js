"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = () =>
    api
      .get("/api/users")
      .then((res) => setUsers(res.data))
      .catch(() => {});
  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    await api.patch(`/api/users/role/${id}`, { role });
    toast.success(`Role updated to ${role}`);
    loadUsers();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">All Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs uppercase bg-slate-950 text-slate-400">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Registered</th>
              <th className="p-3">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-slate-800">
                <td className="p-3 font-medium text-white">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-amber-400">{u.role}</td>
                <td className="p-3">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
