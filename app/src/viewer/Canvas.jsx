import React, { useState } from 'react';
import { Stage, Layer, Image, Rect } from 'react-konva';
import { Container } from '@mui/material';

import useImage from 'use-image';

const Canvas = ({ page, onSelect }) => {
    // A state to store the selected speech bubble index
    const [zoomOut, setZoomOut] = useState(0.30);
    const [selectedBubble, setSelectedBubble] = useState(null);

    // A custom hook to load the image from the page url
    const [image, status] = useImage(`${page.src}`);

    // A function to handle the click event on a block
    const handleClick = (block) => {
        // Set the selected bubble state to that block and call the onSelect prop with that block
        setSelectedBubble(block);
        onSelect(block);
    };

    return (
        <Container sx={{ overflow: 'auto', width: `500px` }}>
            <Stage width={image ? (image.width * 0.30) : 450} height={670}>
                {image && <Layer>
                    {/* Render an Image component with the loaded image and scale it to 25% */}
                    <Image image={image} scale={{ x: zoomOut, y: zoomOut }} />

                    {/* Loop over the panels and render a Rect component for each one with scaled coordinates */}
                    {page.panels.map((panel) => (
                        <Rect
                            key={panel.id}
                            x={panel.x * zoomOut}
                            y={panel.y * zoomOut}
                            width={panel.w * zoomOut}
                            height={panel.h * zoomOut}
                            stroke="cyan"
                            strokeWidth={5}
                        />
                    ))}

                    {/* Loop over the blocks and render a Rect component for each one with scaled coordinates */}
                    {page.blocks.map((block) => {
                        // Get the min and max coordinates of the block
                        let minX = Math.min(...block.words.map((word) => word.minX)) * zoomOut;
                        let minY = Math.min(...block.words.map((word) => word.minY)) * zoomOut;
                        let maxX = Math.max(...block.words.map((word) => word.maxX)) * zoomOut;
                        let maxY = Math.max(...block.words.map((word) => word.maxY)) * zoomOut;

                        // Check if the block is selected
                        let isSelected = selectedBubble === block;

                        // Set the stroke style based on the selection state
                        let stroke = isSelected ? 'green' : 'yellow';

                        return (
                            <Rect
                                key={block.id}
                                x={minX}
                                y={minY}
                                width={maxX - minX}
                                height={maxY - minY}
                                stroke={stroke}
                                strokeWidth={2}
                                onClick={() => handleClick(block)}
                            />
                        );
                    })}
                </Layer>}

            </Stage>

        </Container>

    );
};

export default Canvas;
