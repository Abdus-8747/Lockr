import { useState } from "react";
import { addVaultItem, getVaultItems } from "../api";

export default function VaultForm({ setItems }) {
  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addVaultItem(form);
    const res = await getVaultItems();
    setItems(res.data);
    setForm({ website: "", username: "", password: "", notes: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website"
          className="px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md 
                     focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md 
                     focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md 
                     focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        />
        <input
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md 
                     focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-sky-500 to-indigo-500 
                   shadow-md hover:shadow-lg hover:scale-[1.02] 
                   transition duration-300"
      >
        + Add Entry
      </button>
    </form>
  );
}
