import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAlert = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [symbol, setSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3010/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, symbol, targetPrice }),
      });

      if (res.ok) {
        toast.success("Stock alert added successfully!", {
          autoClose: 2000, // Close after 2 seconds
          onClose: () => navigate("/"),
        });
      } else {
        toast.error("Failed to create alert.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add Stock Alert</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Stock Symbol (e.g. AAPL)"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="Target Price"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-md transition"
          >
            Create Alert
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAlert;
