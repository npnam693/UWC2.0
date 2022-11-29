import React from "react";

function MyMessage({ data }) {
  return (
    <div
      style={{
        // alignItems: "center",
        marginRight: "8px",
        marginBottom: "8px",
        float: "right",
        clear: "both",
        width: "100%",
      }}
    >
      <div
        style={{
          clear: "both",
          marginLeft: "4px",
          backgroundColor: "#6f92fc",
          lineHeight: "1.5",
          fontSize: "16px",
          padding: "8px 12px 8px 12px",
          borderRadius: "24px 2px 24px 24px",
          boxShadow: "0 1px 4px -3px #000",
          maxWidth: "70%",
          float: "right",
          textAlign: "justify",
        }}
      >
        {data.message}
      </div>
    </div>
  );
}

export default MyMessage;
