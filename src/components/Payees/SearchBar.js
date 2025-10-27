import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type='text'
                value={query}
                onChange={handleChange}
                placeholder='Search payees...'
                className='search-input'
            />
            <button type='submit' className='search-button'>Search</button>
        </form>
    );
};

export default SearchBar;
