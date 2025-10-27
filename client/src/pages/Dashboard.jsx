
import { useEffect, useState } from "react";
import api from "../api/axios";


export default function Dashboard({ user }) {
  const [counts, setCounts] = useState({
    enterprises: 0,
    employees: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  //  Permission checks
  const canEnterprise = user?.permissions?.enterprise?.read || false;
  const canEmployee = user?.permissions?.employee?.read || false;
  const canProduct = user?.permissions?.product?.read || false;

  //  Load summary counts
  const loadCounts = async () => {
    try {
      const [entRes, empRes, prodRes] = await Promise.all([
        canEnterprise ? api.get("/enterprises") : { data: [] },
        canEmployee ? api.get("/employees") : { data: [] },
        canProduct ? api.get("/products") : { data: [] },
      ]);
      setCounts({
        enterprises: entRes.data.length,
        employees: empRes.data.length,
        products: prodRes.data.length,
      });
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 py-8">Loading dashboard...</div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Enterprises */}
        {canEnterprise && (
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-gray-600 mb-2">Total Enterprises</h3>
            <p className="text-3xl font-bold text-blue-600">
              {counts.enterprises}
            </p>
          </div>
        )}

        {/* Employees */}
        {canEmployee && (
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-gray-600 mb-2">Total Employees</h3>
            <p className="text-3xl font-bold text-green-600">
              {counts.employees}
            </p>
          </div>
        )}

        {/* Products */}
        {canProduct && (
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-gray-600 mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-purple-600">
              {counts.products}
            </p>
          </div>
        )}
      </div>

      {/*  No permissions case */}
      {!canEnterprise && !canEmployee && !canProduct && (
        <div className="text-center text-gray-500 mt-8">
          You do not have permission to view any dashboard data.
        </div>
      )}
    </div>
  );
}

