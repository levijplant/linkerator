import React, { useState } from 'react';

import {
    getAllLinks,
} from '../db/links.js'

const SearchBar = ({ setResults }) => {
    const [search, setSearch ] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const links = await fetchLinks ({
            search
        });

        setResults(links);
    };


    return (
        <h1>Welcome to The Great Linkerator</h1>
    
    );
};

export default SearchBar;