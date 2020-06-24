import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/links')
            .then(res => {
            setLinks(res.data.links);
            console.log('Set Links!!!');
            })
            .catch((error) => {
            console.error('Failed to fetch links.');
            throw error;
            });
}, []);

    return (
        <h1> Hello World!!!!! </h1>
    );
}

const app = document.querySelector('#app');

ReactDOM.render(
    <App />, 
    app
);