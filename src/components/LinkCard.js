import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import './LinkCard.css';

const LinkCard = ({
    name,
    id,
    url,
    comment,
    tags,
    date,
    count,
    updateClickCount,
}) => {

    date = new Date(date);

    return (
        <Card style={{ width: '50rem', margin: '5px 0' }}>
            <Card.Header className="link-header">{ name }</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className="link-list-item"> <a href={ `https://${ url }` } target="_blank" rel="noopener noreferrer"  onClick = {() => updateClickCount(id, count)}>{ url }</a></ListGroup.Item>
                    <ListGroup.Item className="link-list-item">{ comment }</ListGroup.Item>
                    <ListGroup.Item className="link-list-item">Tags: { tags ? 
                        tags.map(tag => {
                            return tag.name;
                        }).join(", ") 
                        : 
                        ""
                    }
                    </ListGroup.Item>                    
                    <ListGroup.Item className="link-list-item">Link has been clicked { count } time(s) since { `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }` }
                    <Button className="update-button" variant="primary" 
                    // onClick={}
                    >
                        Update
                    </Button>
                    </ListGroup.Item>
                </ListGroup>
        </Card>
    )
};

export default LinkCard;