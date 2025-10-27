import { useEffect, useState } from "react";
import api from "../api/axios";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Product({ user }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    category: "",
    status: "Active",
    enterprise_id: 1,
  });

  //  Permission checks
  const canCreate = user?.permissions?.product?.create || false;
  const canDelete = user?.permissions?.product?.delete || false;
  const canView = user?.permissions?.product?.read || false;

  // Fetch all products
  const load = async () => {
    if (!canView) return;
    const res = await api.get("/products");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  //  Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canCreate) return;
    await api.post("/products", form);
    setForm({
      name: "",
      sku: "",
      price: "",
      category: "",
      status: "Active",
      enterprise_id: 1,
    });
    load();
  };

  //  Delete product
  const handleDelete = async (id) => {
    if (!canDelete) return;
    await api.delete(`/products/${id}`);
    load();
  };

  //  If user can't view
  if (!canView) {
    return (
      <div className="text-center p-8 text-gray-500">
        You do not have permission to view products.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Products</h2>

      {/*  Only users with CREATE permission can add products */}
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
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <button className="bg-green-600 text-white px-4 rounded hover:bg-green-700">
            Add
          </button>
        </form>
      )}

      {/*  Products Table */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            {canDelete && <th className="border p-2 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.sku}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">{p.status}</td>
              {canDelete && (
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(p.id)}>
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
