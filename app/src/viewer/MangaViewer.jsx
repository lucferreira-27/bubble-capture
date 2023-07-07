import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPanel from './EditPanel';
import { Box, TextField, Button } from '@mui/material';

const MangaViewer = ({ directory, series, chapter }) => {
    // A state to store the json content of the pages
    const [pages, setPages] = useState([]);

    // A state to store the current page index

    // A function to fetch the json content of the pages from the api
    const fetchPages = async () => {
        try {
            // Make a get request to the api endpoint with the directory, series and chapter parameters
            const responseImage = await axios.get(
                `http://localhost:3000/api/images/${series}/${chapter}`
            );
            const responseData = await axios.get(
                `http://localhost:3000/api/data/${series}/${chapter}`
            );

            // If the response is successful, set the pages state to the response data
            if (responseImage.status === 200 && responseData.status === 200) {

                const images = responseImage.data.pages.map(({ src }) => `http://localhost:3000${src}`);
                const pages = responseData.data.pages.map((data, index) => {
                    return { ...data, src: images[index] }
                });
                setPages(pages);
            }

        } catch (error) {
            // If there is an error, log it to the console
            console.error(error);
        }
    };

    // Use an effect hook to fetch the pages when the component mounts or updates
    useEffect(() => {
        fetchPages();
    }, [directory, series, chapter]);



    return (
        <div>

            <EditPanel pages={pages} />

        </div>
    );
};

export default MangaViewer;
