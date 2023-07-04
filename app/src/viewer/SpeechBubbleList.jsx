import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemAvatar, Avatar, Divider, Card, Paper,Button, Box } from '@mui/material';
import SpeechBubbleCard from './SpeechBubbleCard';

const SpeechBubbleList = ({ bubbles }) => {
    const [characters, updateCharacters] = useState(bubbles);

    useEffect(() => {
        console.log(bubbles.length)
        updateCharacters(bubbles);
    }, [bubbles])

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }

    return (
        <List sx={{ overflow: 'auto', maxHeight: 650 }}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="bubbles">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {characters.map((bubble, index) => (
                                <Draggable key={bubble.id} draggableId={`${bubble.id}`} index={index}>
                                    {(provided) => (
                                        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ bgcolor: `#DC143C`, margin: `8px` }}>
                                            <ListItem >
                                                <ListItemAvatar>
                                                    <Paper sx={{ margin: `8px` }}>
                                                        <Avatar sx={{ height: '60px', width: '60px', padding: `5px` }} eleva variant="rounded" alt="Luffy" src="https://cdn.myanimelist.net/images/characters/9/310307.jpg" />
                                                    </Paper>
                                                </ListItemAvatar>
                                                <SpeechBubbleCard bubble={bubble} />
                                                <Box flexDirection={`column`} sx={{margin: `5px` }}>
                                                    <Button>
                                                        REMOVE
                                                    </Button>
                                                </Box>
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
