import React, { useState } from 'react';
import { Grid,Box } from '@mui/material';
import Canvas from './Canvas';
import SpeechBubbleList from './SpeechBubbleList';

const EditPanel = ({ page }) => {
    console.log(page)
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

    return (
        
        <Grid container spacing={1}>
            <Grid item xs={6} md={4}>
                <SpeechBubbleList bubbles={selectedBubbles} />
            </Grid>
            <Grid item xs={12} md={8}>
                {page && <Canvas page={page} onSelect={handleSelect} />}
            </Grid>

        </Grid>
    );
};

export default EditPanel;
