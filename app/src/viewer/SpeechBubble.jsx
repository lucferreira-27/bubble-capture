import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Paper,
  Grid,
  ListItemText,
  Card,
  Stack,
} from '@mui/material';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SpeechBubbleCard from './SpeechBubbleCard';

const SpeechBubble = ({ bubble,onHover,index, onTextChange, onTypeChange, onRemove,onDragStart,onDragStop }) => {


  return (
    <Card sx={{ bgcolor: `#DC143C`, margin: `8px` }}>
      <ListItem>
        <ListItemAvatar>
          <Paper sx={{ margin: `8px` }}>
            <Avatar
              sx={{ height: '60px', width: '60px', padding: `5px` }}
              variant="rounded"
              alt="Luffy"
              src="https://cdn.myanimelist.net/images/characters/9/310307.jpg"
            />
          </Paper>
          <Paper sx={{ textAlign: `center`, justifyContent: `space-around`, margin: `3px` }}>
            <Grid container direction={`row`} alignItems={`center`} spacing={0}>
              <Grid item xs={6}>
                <FormatLineSpacingIcon sx={{ marginTop: `5px` }} />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary={index + 1} sx={{ margin: `0px` }} />
              </Grid>
            </Grid>
          </Paper>
        </ListItemAvatar>
        <SpeechBubbleCard bubble={bubble} onHover={onHover} onTextChange={onTextChange} onTypeChange={onTypeChange} />
        <Stack direction={`column`} spacing={2} sx={{ margin: `5px` }}>
          <DragIndicatorIcon
            sx={{ color: `white` }}
            onMouseEnter={onDragStart}
            onMouseLeave={onDragStop}
          />
          <DeleteIcon
            sx={{
              color: 'white',
              cursor: 'pointer',
              '&:hover': {
                color: 'gray',
                opacity: 0.8,
              },
            }}
            onClick={onRemove}
          />
        </Stack>
      </ListItem>
    </Card>
  );
};

export default SpeechBubble;
