import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import SpeechBubble from './SpeechBubble';

const DraggableSpeechBubble = ({ targetBubble,onHover ,bubbles, index, position, setBubbles }) => {
    const [isDragEnabled, setIsDragEnabled] = useState(false);
    const handleOnRemove = () => {
        const newBubbles = bubbles.filter((b) => b !== targetBubble);
        setBubbles(newBubbles);
      };
    const handleDragStart = () => {
        setIsDragEnabled(true);
    };

    const handleDragStop = () => {
        setIsDragEnabled(false);
    };
    return (
        <Draggable key={targetBubble.id} draggableId={`${targetBubble.id}`} index={position} isDragDisabled={!isDragEnabled}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <SpeechBubble
                        bubble={targetBubble}
                        index={position}
                        onHover={onHover}
                        onTextChange={(newText) => {
                            const updatedBubbles = [...bubbles];
                            updatedBubbles[index].text = newText;
                            setBubbles(updatedBubbles);
                        }}
                        onTypeChange={(newType) => {
                            const updatedBubbles = [...bubbles];
                            updatedBubbles[index].type = newType;
                            setBubbles(updatedBubbles);
                        }}
                        onRemove={handleOnRemove}
                        onDragStart={handleDragStart}
                        onDragStop={handleDragStop}

                    />
                </div>
            )}
        </Draggable>
    );
};

export default DraggableSpeechBubble;
