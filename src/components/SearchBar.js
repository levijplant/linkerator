import React, { useState } from 'react';

// import {
//     fetchLinks,
// } from '../api/index.js';

const SearchBar = ({ setResults }) => {
    const [search, setSearch ] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        // const links = await fetchLinks ({
        //     search
        // });

        // setResults(links);
    };


    // return (
    
    // );
};

export default SearchBar;