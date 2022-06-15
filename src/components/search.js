import React from "react";
import "../styles/search.css"
export default function Search({ query, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
      type='text'
        name="searchTerm"
        placeholder="Search for movie......"
        value={query}
        onChange={handleChange}
        className="search_box Text-Style-24"
      />
    </form>
  );
}