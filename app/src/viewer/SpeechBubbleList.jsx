import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemAvatar, Avatar, Divider, Grid, Card, Paper, Button, Box, ListItemText, Stack } from '@mui/material';
import SpeechBubbleCard from './SpeechBubbleCard';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import DeleteIcon from '@mui/icons-material/Delete'; // import the close icon

const SpeechBubbleList = ({ bubbles, setBubbles }) => {
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  function handleOnRemove(targetBubble) {
    const newBubbles = bubbles.filter((bubble) => bubble !== targetBubble);
    setBubbles(newBubbles);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(bubbles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBubbles(items);
  }

  function handleDragStart() {
    setIsDragEnabled(true);
  }

  function handleDragStop() {
    setIsDragEnabled(false);
  }

  return (
    <List sx={{ overflowY: 'auto', overflowX: 'hidden', marginRight: `20px`, maxHeight: 650,maxWidth: 550,width: 550,height: 650 }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bubbles">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {bubbles.map((bubble, index) => (
                <Draggable key={bubble.id} draggableId={`${bubble.id}`} index={index} isDragDisabled={!isDragEnabled}>
                  {(provided) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ bgcolor: `#DC143C`, margin: `8px` }}>
                      <ListItem>
                        <ListItemAvatar>
                          <Paper sx={{ margin: `8px` }}>
                            <Avatar sx={{ height: '60px', width: '60px', padding: `5px` }} variant="rounded" alt="Luffy" src="https://cdn.myanimelist.net/images/characters/9/310307.jpg" />
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
                        <SpeechBubbleCard bubble={bubble} onTextChange={(newText) => {
                          const updatedBubbles = [...bubbles];
                          updatedBubbles[index].text = newText;
                          setBubbles(updatedBubbles);
                        }}
                        onTypeChange={(newType) =>{
                            console.log(newType)
                            const updatedBubbles = [...bubbles];
                            updatedBubbles[index].type = newType;
                            setBubbles(updatedBubbles);
                        }} />
                        <Stack direction={`column`} spacing={2} sx={{ margin: `5px` }}>
                          <DragIndicatorIcon sx={{ color: `white` }} onMouseEnter={handleDragStart} onMouseLeave={handleDragStop} />
                          <DeleteIcon
                            sx={{
                              color: 'white',
                              cursor: 'pointer',
                              '&:hover': {
                                color: 'gray',
                                opacity: 0.8,
                              },
                            }}
                            onClick={() => handleOnRemove(bubble)}
                          />
                        </Stack>
                      </ListItem>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </List>
  );
};

export default SpeechBubbleList;
