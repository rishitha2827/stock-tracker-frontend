import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3010/api/alerts";
//const API_URL = "https://stock-tracker-ruby.vercel.app/api/alerts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched Alerts:", data);
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Stock Tracker Dashboard</h1>

      <button
        onClick={() => navigate("/add-alert")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
      >
        + Add Alert
      </button>

      <div className="mt-6 w-full max-w-2xl">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading alerts...</p>
        ) : alerts.length === 0 ? (
          <p className="text-center text-gray-600">No alerts set.</p>
        ) : (
          <ul className="bg-white shadow-md rounded-lg p-4">
            {alerts.map((alert) => (
              <li
                key={alert._id}
                className="p-3 border-b last:border-none flex justify-between items-center"
              >
                <span className="text-lg font-semibold">{alert.symbol}</span>
                <span className="text-gray-600">${alert.targetPrice}</span>
                <span className={`px-2 py-1 text-sm rounded-lg ${alert.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {alert.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;