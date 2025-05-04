const API_URL = "http://localhost:3010/api";

export const createAlert = async (alertData) => {
  const res = await fetch(`${API_URL}/alerts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alertData),
  });
  return res.json();
};
