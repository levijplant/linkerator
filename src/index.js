import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


import {
    Header,
    LinkCard,
} from './components';

const App = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/links')
            .then(res => {
            setLinks(res.data.links);
            console.log('Set Links!!!', res.data.links);
            })
            .then(links.map(link => (
                <LinkCard></LinkCard>
            )))
            .catch((error) => {
            console.error('Failed to fetch links.');
            });
}, []);

    return (
        <div id="App">
            <Header>
            </Header>
            <Card>
            </Card>


        </div>
    );
}

const app = document.querySelector('#app');

ReactDOM.render(
    <App />, 
    app
);

{/* <Card style={{ width: '18rem' }}>
<Card.Header>{ link.name }</Card.Header>
    <ListGroup variant="flush">
        <ListGroup.Item> { link.url }</ListGroup.Item>
        <ListGroup.Item>{ link.comment }</ListGroup.Item>
        <ListGroup.Item>Link has been clicked { link.count } time(s) since { link.date }</ListGroup.Item>
    </ListGroup>
</Card>                         */}
