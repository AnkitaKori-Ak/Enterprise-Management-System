import { useEffect, useState } from "react";
import api from "../api/axios";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Employee({ user }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
    salary: "",
    status: "Active",
    enterprise_id: 1,
  });

  //  Permission checks
  const canCreate = user?.permissions?.employee?.create || false;
  const canDelete = user?.permissions?.employee?.delete || false;
  const canView = user?.permissions?.employee?.read || false;

  //  Load employees
  const load = async () => {
    if (!canView) return;
    const res = await api.get("/employees");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  //  Add employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canCreate) return;
    await api.post("/employees", form);
    setForm({
      name: "",
      department: "",
      role: "",
      salary: "",
      status: "Active",
      enterprise_id: 1,
    });
    load();
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!canDelete) return;
    await api.delete(`/employees/${id}`);
    load();
  };

  //  If user can't view
  if (!canView) {
    return (
      <div className="text-center p-8 text-gray-500">
        You do not have permission to view employees.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Employees</h2>

      {/*  Only users with CREATE permission can add employees */}
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
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
          <button className="bg-green-600 text-white px-4 rounded hover:bg-green-700">
            Add
          </button>
        </form>
      )}

      {/* Employees Table */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Salary</th>
            <th className="border p-2">Status</th>
            {canDelete && <th className="border p-2 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {list.map((emp) => (
            <tr key={emp.id}>
              <td className="border p-2">{emp.id}</td>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.department}</td>
              <td className="border p-2">{emp.role}</td>
              <td className="border p-2">{emp.salary}</td>
              <td className="border p-2">{emp.status}</td>
              {canDelete && (
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(emp.id)}      
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
