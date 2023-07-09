import React from 'react';
import { Paper, Box } from '@mui/material';
import Canvas from './Canvas';

const CanvasContainer = ({ currentPage, handleSelect, handlePageChange, currentBubbles }) => {
  return (
    <Paper elevation={3} sx={{ background: '#e3e3e3' }}>
      <Box height="calc(100vh - 82px)" display="flex" flexDirection="column">
        {currentPage && <Canvas page={currentPage} bubbles={currentBubbles} onSelect={handleSelect} onPageChange={handlePageChange} />}
      </Box>
    </Paper>
  );
};

export default CanvasContainer;
