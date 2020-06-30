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
    setShow,
    mostClicked,
    setMostClicked
}) => {
    const [filteredLinks, setFilteredLinks] = useState();

    useEffect(() => {

    });



    const handleShow = () => setShow(true);


    return (
        <header>
            <h1>Welcome to "The Great Linkerator"</h1>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Sort Links: </Form.Label>
                            <Form.Control as="select" custom value= { mostClicked ? "most" : "least" } onChange= { (event) => { 
                                console.log("<<< SORT>>>>>>", event.target.value)
                                if (event.target.value === "most"){
                                    setMostClicked(true)
                                }  else {
                                     setMostClicked(false)
                                }
                              }
                            }>
                                <option value="most" key="popular">Most Popular</option>
                                <option value="least" key="unpopular">Least Popular</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                <form>
                    <Button className="create-link-button" variant="primary" onClick={ handleShow }>
                        Create Link
                    </Button>
                </form>
        </header>
    );
};

export default Header;