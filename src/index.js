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
        axios.get('/api/links')
            .then(res => {
            setLinks(res.data.links);
            console.log("<<<<DATA>>>>>", res.data)
            console.log('Set Links!!!', res.data.links);
            })
            .catch((error) => {
            console.error('Failed to fetch links.');
            });
}, []);

    const updateClickCount = (linkId, currentClickCount) => {
        axios.patch(`/api/links/${linkId}`, {
            count:currentClickCount + 1
        }).then(res => {
            console.log('<<<updateClick>>>', linkId)
            setLinks(links.map(link => {
                if (link.id === res.data.link.id) {
                    return res.data.link;
                } else {
                    return link;
                }
            }))
        }) .catch((error) => {
            console.error('Failed to update count')
        })
    }

    return (
        <div id="App">
            <Header>
            </Header>
           {links.map(link =>{
               return <LinkCard key={link.id} {...link} updateClickCount = {updateClickCount}/>
           })}

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
