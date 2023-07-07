import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Container, Stack, Button, Paper, IconButton, Typography } from '@mui/material';
import Canvas from './Canvas';
import SpeechBubbleList from './SpeechBubbleList';
import RestoreIcon from '@mui/icons-material/Restore';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const EditPanel = ({ pages }) => {
    // A state to store the selected speech bubbles
    const [page, setPage] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedBubbles, setSelectedBubbles] = useState([]);
    const [allSelectedBubbles, setAllSelectedBubbles] = useState({});

    // When the page changes, update the state with the current page and selected bubbles
    useEffect(() => {
        if (pages) {
            setPage(pages[0]);
        }
    }, [pages]);

    useEffect(() => {
        if (!page) {
            return;
        }
        setSelectedBubbles(allSelectedBubbles[page.pageNumber] || []);
    }, [page]);

    const handleChangePage = (delta) => {
        // Calculate the new page index by adding the delta value
        let newIndex = pages.indexOf(page) + delta;

        // Check if the new index is within the range of the pages array
        if (newIndex >= 0 && newIndex < pages.length) {
            // If yes, set the page index state to the new index
            setSelectedBubbles([]);
            setPage(pages[newIndex]);
        }
    };

    const onPageChange = (action) => {
        setAllSelectedBubbles((prev) => ({
            ...prev,
            [page.pageNumber]: selectedBubbles,
        }));
        handleChangePage(action);
    };

    // When you want to retrieve the selected bubbles for a specific page, you can use the object property access

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
            onPageChange(-1);
        } else if (event.keyCode === 39) {
            onPageChange(1);
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
        <Grid container spacing={1.5}>
            <Grid item xs={6} md={6}>
                <Paper elevation={3} sx={{ background: `#222831` }}>
                    <Box height="calc(100vh - 172px)" display="flex" flexDirection="column">
                        {selectedBubbles && <SpeechBubbleList bubbles={selectedBubbles} setBubbles={setSelectedBubbles} />}
                    </Box>
                    <Paper elevation={3} sx={{ margin: `5px`, background: `#f2f2f2` }}>
                        <Box height="80px" display="flex" justifyContent="center" alignItems="center" gap={2}>
                            <Paper elevation={3} sx={{ background: `#f96d00`, padding: '0px 5px 5px 05px', textAlign: 'center' }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
                                        {`BUBBLES PICK: `}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
                                        {`${0} `}
                                    </Typography>

                                </Box>

                            </Paper>
                            <IconButton
                                sx={{
                                    bgcolor: '#f96d00',
                                    '&:hover': {
                                        bgcolor: '#222831',
                                    },
                                }}
                            >
                                <AutoAwesomeIcon sx={{ color: 'white' }} />
                            </IconButton>

                            <IconButton
                                sx={{
                                    bgcolor: '#f96d00',
                                    '&:hover': {
                                        bgcolor: '#222831',
                                    },
                                }}
                            >
                                <GroupAddIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    bgcolor: '#f96d00',
                                    '&:hover': {
                                        bgcolor: '#222831',
                                    },
                                }}
                            >
                                <GroupRemoveIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    bgcolor: '#f96d00',
                                    '&:hover': {
                                        bgcolor: '#222831',
                                    },
                                }}
                            >
                                <DeleteSweepIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Box>


                    </Paper>
                </Paper>
            </Grid>
            <Grid item xs={6} md={6}>
                <Paper elevation={3} sx={{ background: `#e3e3e3` }}>
                    <Box height="calc(100vh - 82px)" display="flex" flexDirection="column">
                        {page && <Canvas page={page} onSelect={handleSelect} onPageChange={onPageChange} />}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default EditPanel;
