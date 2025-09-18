import { useState } from "react";
import { deleteVaultItem, getVaultItems, updateVaultItem } from "../api";
import { Eye, EyeOff } from "lucide-react"; // install lucide-react if not already

export default function VaultList({ items = [], setItems }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState({}); // track visibility per item

  const refreshItems = async () => {
    try {
      const res = await getVaultItems();
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vault items");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVaultItem(id);
      await refreshItems();
    } catch (err) {
      console.error(err);
      setError("Failed to delete item");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditForm({
      website: item.website || "",
      username: item.username || "",
      password: item.password || "",
      notes: item.notes || "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await updateVaultItem(id, editForm);
      await refreshItems();
      setEditId(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update item");
    }
  };

  const handleCancel = () => setEditId(null);

  const togglePassword = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid gap-4">
      {error && <p className="text-red-500">{error}</p>}

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No vault items yet</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {editId === item._id ? (
              <form
                onSubmit={(e) => handleEditSubmit(e, item._id)}
                className="grid grid-cols-2 gap-3"
              >
                <input
                  name="website"
                  value={editForm.website}
                  onChange={handleEditChange}
                  className="border border-gray-300 p-2 rounded col-span-2"
                />
                <input
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className="border border-gray-300 p-2 rounded"
                />
                <input
                  name="password"
                  type="password"
                  value={editForm.password}
                  onChange={handleEditChange}
                  className="border border-gray-300 p-2 rounded"
                />
                <input
                  name="notes"
                  value={editForm.notes}
                  onChange={handleEditChange}
                  className="border border-gray-300 p-2 rounded col-span-2"
                />
                <div className="col-span-2 flex gap-3 mt-3">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-gray-700">Website:</span>{" "}
                    {item.website}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Username:</span>{" "}
                    {item.username}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Password:</span>{" "}
                    {showPassword[item._id] ? item.password : "••••••••"}
                    <button
                      type="button"
                      onClick={() => togglePassword(item._id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPassword[item._id] ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Notes:</span>{" "}
                    {item.notes}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 rounded-md text-sm border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 rounded-md text-sm border border-red-500 text-red-600 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
