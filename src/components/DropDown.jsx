import React, { useState } from "react";

const Dropdown = ({ page, setpage }) => {
  // State to hold the selected value

  // Handler for when the dropdown value changes
  const handleChange = (event) => {
    setpage(event.target.value); // Update the state with the selected value
  };

  return (
    <div>
      <select
        onChange={handleChange}
        style={{
          padding: "8px",
          fontSize: "14px",
          border: "none",
          color: "#999",
          width: "92px",
          height: "38px",
          marginLeft: "8px",
        }}
      >
        <option value="order">الطلبات</option>
        <option value="products">المنتحات</option>
        <option value="clients">العملاء</option>
      </select>
    </div>
  );
};

export default Dropdown;
