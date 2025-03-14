import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div style={{
      backgroundColor: "#141414", color: "#F4C430", minHeight: "100vh",
      fontFamily: "Arial, sans-serif", padding: "20px", overflowY: "scroll"
    }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>PrintMe Dashboard</h1>
        <button style={{ background: "#F4C430", color: "#141414", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>Logout</button>
      </div>

      {/* Overview Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {["Total Users: 1,235", "Vendors: 58", "Active Print Jobs: 178"].map((stat, index) => (
          <div key={index} style={{
            background: "#1E1E1E", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)"
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{stat}</h2>
          </div>
        ))}
      </div>

      {/* Order Tracking Section */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Real-time Order Tracking</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {["Pending Orders: 76", "In Progress: 45", "Completed: 200"].map((order, index) => (
            <div key={index} style={{
              background: "#1E1E1E", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{order}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Print Analytics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {["Daily Orders: 220", "Weekly Orders: 1,540", "Monthly Orders: 6,300"].map((data, index) => (
            <div key={index} style={{
              background: "#1E1E1E", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{data}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary Section */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Financial Summary</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {["Total Earnings: $23,580", "Transactions: 9,230", "Pending Payments: $1,120"].map((finance, index) => (
            <div key={index} style={{
              background: "#1E1E1E", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{finance}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* System Monitoring */}
      <div style={{ marginTop: "30px", marginBottom: "50px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>System Monitoring</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {["Server Status: Active", "Printers Available: 12"].map((system, index) => (
            <div key={index} style={{
              background: "#1E1E1E", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{system}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
