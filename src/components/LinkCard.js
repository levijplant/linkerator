import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

import './LinkCard.css';


const LinkCard = ({
    name,
    id,
    url,
    comment,
    date,
    count,
    updateClickCount,
}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>{ name }</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item onClick = {() => updateClickCount(id, count)}> { url }</ListGroup.Item>
                    <ListGroup.Item>{ comment }</ListGroup.Item>
                    <ListGroup.Item>Link has been clicked { count } time(s) since { date }</ListGroup.Item>
                </ListGroup>
            </Card>
    );
};

export default LinkCard;