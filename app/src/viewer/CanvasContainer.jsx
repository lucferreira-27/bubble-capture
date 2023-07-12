import React from 'react';
import { Paper, Box, Typography, IconButton,Stack } from '@mui/material';
import {
    AutoAwesome as AutoAwesomeIcon,
    GroupAdd as GroupAddIcon,
    GroupRemove as GroupRemoveIcon,
    DeleteSweep as DeleteSweepIcon,
} from '@mui/icons-material';
import Canvas from './Canvas';

const CanvasContainer = ({ currentPage, handleSelect, handlePageChange, currentBubbles,setBubbles }) => {
    return (
        <Stack direction={`row`}>
            <Paper elevation={3} sx={{ background: '#e3e3e3' }}>
                <Box height="calc(100vh - 82px)" display="flex" flexDirection="column">
                    {currentPage && <Canvas page={currentPage} bubbles={currentBubbles} onSelect={handleSelect} onPageChange={handlePageChange} setBubbles={setBubbles} />}
                </Box>
            </Paper>
            <Paper elevation={5} sx={{ margin: '5px', background: '#f2f2f2' }}>
                <Box sx={{ flexDirection: 'column' }} height="80px" display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <IconButton sx={{ bgcolor: '#f96d00', '&:hover': { bgcolor: '#222831' } }}>
                        <AutoAwesomeIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton sx={{ bgcolor: '#f96d00', '&:hover': { bgcolor: '#222831' } }}>
                        <AutoAwesomeIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            </Paper>
        </Stack>

    );
};

export default CanvasContainer;
