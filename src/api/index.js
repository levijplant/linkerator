import axios from 'axios';

export async function getLinks () {
    try {
        const { data } = await axios.get(`localhost:3000/api/links`);

        links = data.links

        return links;
    } catch (error) {
        throw error;
    };
};

getLinks()
    .then(console.log(links))