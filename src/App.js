import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState({}); // State to hold the JSON data

  // Load data dynamically from the JSON file
  const loadLocalData = async () => {
    try {
      const response  = await fetch("/peripheral.json"); // Fetch from the public folder
      const localData = await response.json();
      setData(localData); // Update state with the JSON data
    } catch (error) {
      console.error("Error loading local data:", error);
    }
  };

  // Use effect to load data on mount
  useEffect(() => {
    loadLocalData();

    // Optional: Polling mechanism for updates
    const interval = setInterval(() => {
      loadLocalData();
    }, 1); // Reload every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      {Object.keys(data).length > 0 ? (
        Object.keys(data).map((key) => (
          <Card key={key} title={key} value={data[key]} />
        ))
      ) : (
        <p>Loading...</p> // Show a loading state if data is empty
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "200px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
