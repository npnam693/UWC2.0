import React from "react";
import { Avatar } from "@mui/material";

function Mesasge({ data }) {
  return (
    <div
      style={{
        display: "flex",
        clear: "both",
        marginLeft: "8px",
        marginBottom: "8px",
      }}
    >
      <Avatar
        style={{}}
        src={data.avatar}
        sx={{ width: "40px", height: "40px" }}
      ></Avatar>
      <div
        style={{
          marginLeft: "4px",
          backgroundColor: "#e4f6f7",
          lineHeight: "1.5",
          fontSize: "16px",
          padding: "8px 12px 8px 12px",
          maxWidth: "70%",
          borderRadius: "2px 24px 24px 24px",
          boxShadow: "0 1px 4px -3px #000",
          textAlign: "justify",
        }}
      >
        {data.message}
      </div>
    </div>
  );
}

export default Mesasge;
