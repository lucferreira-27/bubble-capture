import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Container, Stack,Button } from '@mui/material';
import Canvas from './Canvas';
import SpeechBubbleList from './SpeechBubbleList';

const EditPanel = ({ page,handleChangePage }) => {
    // A state to store the selected speech bubbles
    const [selectedBubbles, setSelectedBubbles] = useState([]);

    // A function to handle the selection of a speech bubble
    const handleSelect = (bubble) => {
        // Check if the bubble is already selected
        let isSelected = selectedBubbles.includes(bubble);

        // If yes, remove it from the state array
        if (isSelected) {
            setSelectedBubbles((prev) => prev.filter((b) => b !== bubble));
        } else {
            // If no, add it to the state array
            setSelectedBubbles((prev) => [...prev, bubble]);
        }
    };

    // A function to handle the keydown event
    const handleKeyDown = (event) => {
        // Check the keyCode of the event object
        if (event.keyCode === 37) {
            handleChangePage(-1);
        } else if (event.keyCode === 39) {
            handleChangePage(1);
        }
    };

    // A useEffect hook to add and remove the event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [page]);


    return (
        <Container direction="row">
            <Grid container spacing={0.5}>
                <Grid item xs={6} md={6}>
                    <SpeechBubbleList bubbles={selectedBubbles} />
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box direction="column">
                        {page && <Canvas page={page} onSelect={handleSelect} />}
                        <Box sx={{margin:'5px'}}>
                            <Button  onClick={() => handleChangePage(-1)}>Previous</Button>
                            <Button  onClick={() => handleChangePage(1)}>Next</Button>
                        </Box>
                    </Box>

                </Grid>
            </Grid>
        </Container>
    );
};

export default EditPanel;
