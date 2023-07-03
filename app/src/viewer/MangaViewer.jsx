import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPanel from './EditPanel';
import { Box, TextField, Button } from '@mui/material';

const MangaViewer = ({ directory, series, chapter }) => {
    // A state to store the json content of the pages
    const [pages, setPages] = useState([]);

    // A state to store the current page index
    const [pageIndex, setPageIndex] = useState(0);

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
                console.log(responseData.data.pages[0])
                console.log(responseImage.data.pages[0])

                const images = responseImage.data.pages.map(({ src }) => `http://localhost:3000${src}`);
                const pages = responseData.data.pages.map((data, index) => {
                    console.log(data)
                    return { ...data, src: images[index] }
                });

                console.log(pages)
                setPages(pages);
            }

        } catch (error) {
            // If there is an error, log it to the console
            console.error(error);
        }
    };

    // Use an effect hook to fetch the pages when the component mounts or updates
    useEffect(() => {
        console.log(`hi`)
        fetchPages();
    }, [directory, series, chapter]);

    // A function to handle the change of the page index
    const handleChangePage = (delta) => {
        // Calculate the new page index by adding the delta value
        let newIndex = pageIndex + delta;

        // Check if the new index is within the range of the pages array
        if (newIndex >= 0 && newIndex < pages.length) {
            // If yes, set the page index state to the new index
            setPageIndex(newIndex);
        }
    };

    return (
        <div>

            {/* Render a PageViewer component with the current page as a prop */}
            <EditPanel page={pages[pageIndex]} />
            <Box>
                <Button onClick={() => handleChangePage(-1)}>Previous</Button>
                <Button onClick={() => handleChangePage(1)}>Next</Button>
            </Box>
        </div>
    );
};

export default MangaViewer;
