import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {
    SearchBar,
} from './SearchBar';

import './Header.css';

const Header = ({
    links,
    SearchBar,
    setShow
}) => {
    const [filteredLinks, setFilteredLinks] = useState();

    useEffect(() => {

    });

    const mostPopular = () => {
        const popLinks = links.sort((a, b) => (a.count > b.count) ? 1 : -1).reverse();
        setFilteredLinks(popLinks);
    };

    const leastPopular = () => {
        const unpopLinks = links.sort((a, b) => (a.count > b.count) ? 1 : -1);
        setFilteredLinks(unpopLinks);
    };

    const handleShow = () => setShow(true);


    return (
        <header>
            <h1>Welcome to "The Great Linkerator"</h1>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Sort Links: </Form.Label>
                            <Form.Control as="select" custom>
                                <option>[select]</option>
                                <option onChange= { mostPopular } key="popular">Most Popular</option>
                                <option onChange={ leastPopular } key="unpopular" value="unpopular">Least Popular</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                <form>
                    <Button variant="primary" onClick={ handleShow }>
                        Create Link
                    </Button>
                </form>
        </header>
    );
};

export default Header;