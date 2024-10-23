import React from "react";

const TypeFilter = ({ types, selectedType, onTypeChange }) => {
  return (
    <div>
      <h2>Filter by Type</h2>

      {/* Dropdown for type selection */}
      <select value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
        <option value="">All Types</option>
        {types
          .filter((type) => type.name !== "unknown") // Exclude 'unknown' type
          .map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;