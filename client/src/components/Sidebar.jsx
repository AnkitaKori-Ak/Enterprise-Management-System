export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "enterprise", label: "Enterprises", module: "enterprise" },
    { key: "employee", label: "Employees", module: "employee" },
    { key: "product", label: "Products", module: "product" },
  ];

  const canRead = (mod) =>
    user.role === "Admin" || user.permissions?.[mod]?.read;

  return (
    <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Welcome, {user.name}</h2>

      {tabs.map((tab) => {
        if (tab.key === "dashboard") {
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left mb-2 p-2 rounded ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          );
        }

        if (!tab.module || canRead(tab.module)) {
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left mb-2 p-2 rounded ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          );
        }

        return null;
      })}

      <button
        onClick={onLogout}
        className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
