import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";


function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, [filter]);

  const fetchCampaigns = async () => {
    setLoading(true);
    let url = "http://localhost:8000/campaigns";
    if (filter !== "All") url += `?status=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setCampaigns(data);
    setLoading(false);
  };

  // Prepare data for Pie Chart (status distribution)
  const statusCounts = campaigns.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#F44336"];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded shadow px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Campaign Analytics Dashboard</h1>

        {/* Filter */}
        <div className="mb-6 flex flex-row items-center">
          <label className="mr-2 font-semibold">Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart - Clicks by Campaign */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Clicks by Campaign</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaigns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Campaign Status Distribution */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">
              Campaign Status Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-4">Loading campaigns...</div>
        ) : (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2">Campaign Name</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Clicks</th>
                <th className="px-3 py-2">Cost</th>
                <th className="px-3 py-2">Impressions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="text-center">
                  <td className="border px-3 py-2">{c.name}</td>
                  <td className="border px-3 py-2">{c.status}</td>
                  <td className="border px-3 py-2">{c.clicks}</td>
                  <td className="border px-3 py-2">₹{c.cost.toFixed(2)}</td>
                  <td className="border px-3 py-2">{c.impressions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
