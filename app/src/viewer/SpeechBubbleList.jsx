import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { List } from '@mui/material';
import DraggableSpeechBubble from './DraggableSpeechBubble';

const SpeechBubbleList = ({ bubbles, setBubbles }) => {

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(bubbles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBubbles(items);
  };

  const onHover = (bubble,isHover) =>{
    if(isHover){
      console.log(bubble)
      return
    }
  }


  return (
    <List sx={{ overflowY: 'auto', overflowX: 'hidden', marginRight: `20px`, maxHeight: 650, maxWidth: 550, width: 550, height: 650 }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bubbles">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {bubbles.sort((a,b) => a.index - b.index).map((bubble,index) => (
                <DraggableSpeechBubble
                  onHover={onHover}
                  key={bubble.id}
                  bubbles={bubbles}
                  targetBubble={bubble}
                  index={index}
                  position={bubble.index}
                  setBubbles={setBubbles}
                />
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
