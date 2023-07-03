import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

// A custom theme object for the colors and contrasts
const theme = {
    palette: {
        primary: {
            main: '#0d47a1', // dark blue
            contrastText: '#ffffff', // white
        },
        secondary: {
            main: '#ffffff', // white
            contrastText: '#0d47a1', // dark blue
        },
    },
};

const Settings = ({directory,setDirectory, series,setSeries, chapter,setChapter,setShowViewer}) => {

    // A function to handle the change of the directory input
    const handleDirectoryChange = (event) => {
        // Set the directory state to the input value
        setDirectory(event.target.value);
    };

    // A function to handle the change of the series input
    const handleSeriesChange = (event) => {
        // Set the series state to the input value
        setSeries(event.target.value);
    };

    // A function to handle the change of the chapter input
    const handleChapterChange = (event) => {
        // Set the chapter state to the input value
        setChapter(event.target.value);
    };

    // A function to handle the click of the view button
    const handleViewClick = () => {
        // Set the show viewer state to true
        setShowViewer(true);
    };

    return (

    <div>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* Render a text field for the directory input with custom colors */}
            <TextField
                label="Directory"
                value={directory}
                onChange={handleDirectoryChange}
                sx={{
                    margin: 2,
                    '& .MuiInputBase-root': {
                        color: theme.palette.primary.contrastText,
                    },
                    '& .MuiFormLabel-root': {
                        color: theme.palette.primary.contrastText,
                    },
                    '& .MuiOutlinedInput-root': {
                        borderColor: theme.palette.primary.contrastText,
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.secondary.main,
                        },
                    },
                }}
            />

            {/* Render a text field for the series input with custom colors */}
            <TextField
                label="Series"
                value={series}
                onChange={handleSeriesChange}
                sx={{
                    margin: 2,
                    '& .MuiInputBase-root': {
                        color: theme.palette.primary.contrastText,
                    },
                    '& .MuiFormLabel-root': {
                        color: theme.palette.primary.contrastText,
                    },
                    '& .MuiOutlinedInput-root': {
                        borderColor: theme.palette.primary.contrastText,
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.secondary.main,
                        },
                    },
                }}
            />

            {/* Render a text field for the chapter input with custom colors */}
            <TextField
                label="Chapter"
                value={chapter}
                onChange={handleChapterChange}
                sx={{
                    margin: 2,
                    '& .MuiInputBase-root': {
                        color: theme.palette.primary.contrastText,
                    },
                    '& .MuiFormLabel-root': {
                        color: theme.palette.primary.contrastText,
                    },
                    '& .MuiOutlinedInput-root': {
                        borderColor: theme.palette.primary.contrastText,
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.secondary.main,
                        },
                    },
                }}
            />

        </Box>
        <Box>
            {/* Render a button to view the manga with custom colors */}
            <Button
                variant="contained"
                onClick={handleViewClick}
                sx={{
                    margin: 2,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&.MuiButton-contained:hover': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                    },
                }}
            >
                View
            </Button>
        </Box>
    </div>
    );
};

export default Settings;
