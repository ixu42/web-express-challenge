import React from "react";

const SortOptions = ({ sortOrder, onSort }) => (
  <div className="sort-container flex justify-end mr-8 sm:mr-12 md:mr-16">
    <label htmlFor="sortOrder" className="text-lg font-bold mr-2 text-green-600">
      Sort by:
    </label>
    <select
      id="sortOrder"
      value={sortOrder}
      onChange={(e) => { onSort(e.target.value) }} // Update sort order on change
    >
      <option value="ID-asc">ID (Ascending)</option>
      <option value="ID-desc">ID (Descending)</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  </div>
);

export default SortOptions;