import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  GroupAdd as GroupAddIcon,
  GroupRemove as GroupRemoveIcon,
  DeleteSweep as DeleteSweepIcon,
} from '@mui/icons-material';

const TranscriptBubblesMenu = ({ currentBubbles }) => {
  return (
    <Paper elevation={3} sx={{ margin: '5px', background: '#f2f2f2' }}>
      <Box height="80px" display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Paper elevation={3} sx={{ background: '#f96d00', padding: '0px 5px 5px 05px', textAlign: 'center' }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
              {`BUBBLES PICK: `}
            </Typography>
            <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
              {`${currentBubbles.length || 0} `}
            </Typography>
          </Box>
        </Paper>
        <IconButton sx={{ bgcolor: '#f96d00', '&:hover': { bgcolor: '#222831' } }}>
          <AutoAwesomeIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton sx={{ bgcolor: '#f96d00', '&:hover': { bgcolor: '#222831' } }}>
          <GroupAddIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton sx={{ bgcolor: '#f96d00', '&:hover': { bgcolor: '#222831' } }}>
          <GroupRemoveIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton sx={{ bgcolor: '#f96d00', '&:hover': { bgcolor: '#222831' } }}>
          <DeleteSweepIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TranscriptBubblesMenu;
