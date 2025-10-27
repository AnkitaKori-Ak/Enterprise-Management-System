import { useEffect, useState } from "react";
import api from "../api/axios";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Enterprise({ user }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    contact_info: "",
  });

  //  Permission checks
  const canCreate = user?.permissions?.enterprise?.create || false;
  const canDelete = user?.permissions?.enterprise?.delete || false;
  const canView = user?.permissions?.enterprise?.read || false;

  //  Fetch all enterprises
  const load = async () => {
    if (!canView) return;
    const res = await api.get("/enterprises");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  //  Add enterprise
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canCreate) return;
    await api.post("/enterprises", form);
    setForm({ name: "", location: "", contact_info: "" });
    load();
  };

  //  Delete enterprise
  const handleDelete = async (id) => {
    if (!canDelete) return;
    await api.delete(`/enterprises/${id}`);
    load();
  };

  //  If user can't view
  if (!canView) {
    return (
      <div className="text-center p-8 text-gray-500">
        You do not have permission to view enterprises.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Enterprises</h2>

      {canCreate && (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-2">
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Contact Info"
            value={form.contact_info}
            onChange={(e) =>
              setForm({ ...form, contact_info: e.target.value })
            }
          />
          <button className="bg-green-600 text-white px-4 rounded hover:bg-green-700">
            Add
          </button>
        </form>
      )}

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Contact Info</th>
            {canDelete && <th className="border p-2 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <tr key={e.id}>
              <td className="border p-2">{e.id}</td>
              <td className="border p-2">{e.name}</td>
              <td className="border p-2">{e.location}</td>
              <td className="border p-2">{e.contact_info}</td>
              {canDelete && (
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(e.id)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
