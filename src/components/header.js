import '../styles/header.css';
import React from 'react';
import Search from './search';

export default function Header({searchTerm, handleChange, handleSubmit}) {


  return (
    <div className="black">
      <Search 
      query={searchTerm}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      />
    </div>
  );
}

