import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Enterprise from "./pages/Enterprise";
import Employee from "./pages/Employee";
import Product from "./pages/Product";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user) return <Login setUser={setUser} />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={() => setUser(null)}
      />
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && <Dashboard user={user} />}
        {activeTab === "enterprise" && <Enterprise user={user} />}
        {activeTab === "employee" && <Employee user={user} />}
        {activeTab === "product" && <Product user={user} />}
      </div>
    </div>
  );
}
