import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="form-outline" data-mbd-input-init>
      <input
        type="search"
        id='form1'
        placeholder="Search products..."
        className='form-control'
        aria-label='Search'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};


export default SearchBar;