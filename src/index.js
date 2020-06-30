import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Header,
    LinkCard,
    CreateModal,
} from './components';

const App = () => {
    const [links, setLinks] = useState([]);
    const [show, setShow] = useState(false);
    const [mostClicked, setMostClicked ] = useState(true);


    useEffect(() => {
        axios.get('/api/links')
            .then(res => {
            setLinks(res.data.links);
                console.log("Set Links!!!", res.data.links);
            })
            .catch((error) => {
                console.error("Failed to fetch links.", error);
            });
    }, []);

    const updateClickCount = (linkId, currentClickCount) => {
        axios.patch(`/api/links/${linkId}`, {
            count:currentClickCount + 1
        })
            .then(res => {
            console.log("<<<updateClick>>>", linkId)
            setLinks(links.map(link => {                
                if (link.id === res.data.link.id) {
                    return res.data.link;
                } else {
                    return link;
                };
            }))
        }).catch((error) => {
            console.error("Failed to update count", error);
        });
    };

    const createLink = ({name, url, comment, tags, count, date}) => {
        console.log("createLink being called!!!!")
        axios.post(`/api/links` , {
            name, url, comment, tags, count, date
        })
        .then(res => {
            console.log("NEW LINK!!!", res.data);
            setLinks([ ...links, res.data.link ])
        })
            .catch((error) => {
                console.error("Failed to create new link!", error)
            });
    };

    const mostPopular = (links) => {
        links.sort((a, b) => (a.count < b.count) ? 1 : -1);
    };

    const leastPopular = (links) => {
        links.sort((a, b) => (a.count > b.count) ? 1 : -1);
    };

    if (mostClicked) {
        mostPopular(links);
    }  else {
        leastPopular(links);
    }

    return (
        <>
            <Header
            mostClicked={ mostClicked }
            setMostClicked={ setMostClicked }
            setShow={ setShow } />
                {links.map(link =>{
                    return <LinkCard key={link.id} {...link}
                    updateClickCount = { updateClickCount }/>
                })}
            <CreateModal
                show={ show }
                setShow={ setShow }
                createLink={ createLink } />
        </>
    );
};

const app = document.querySelector('#app');

ReactDOM.render(
    <App />, 
    app
);

