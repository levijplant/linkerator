import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import {
    SearchBar,
} from './SearchBar';

import './Header.css';

const Header = ({
    SearchBar,
    setShow
}) => {
    const handleShow = () => setShow(true);

    return (
        <header>
            <h1>Welcome to "The Great Linkerator"</h1>
            <form>
            <Button variant="primary" onClick={ handleShow }>
                Create Link
            </Button>


            </form>
        </header>
    );
};

export default Header;