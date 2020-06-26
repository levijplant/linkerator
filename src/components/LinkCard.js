import React from 'react';
import Card from 'react-bootstrap/Card';

import './LinkCard.css';

const LinkCard = ({
    name,
    url,
    comment,
    date,
    count
}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>{ name }</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item> { url }</ListGroup.Item>
                    <ListGroup.Item>{ comment }</ListGroup.Item>
                    <ListGroup.Item>Link has been clicked { count } time(s) since { date }</ListGroup.Item>
                </ListGroup>
            </Card>
    );
};

export default LinkCard;