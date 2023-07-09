import React, { useState } from 'react';
import { Stage, Layer, Image, Rect, Text } from 'react-konva';
import { Container, Button, Box } from '@mui/material';

import useImage from 'use-image';

// A custom hook to load the image from the page url and scale it
const useScaledImage = (src, zoomOut) => {
    const [image, status] = useImage(src);
    const scaledImage = image
        ? {
            image: image,
            width: image.width * zoomOut,
            height: image.height * zoomOut,
        }
        : null;
    return [scaledImage, status];
};

// A custom hook to get the scaled coordinates of a panel or a block
const useScaledCoords = (item, zoomOut) => {
    let x = item.x * zoomOut;
    let y = item.y * zoomOut;
    let width = item.w * zoomOut;
    let height = item.h * zoomOut;
    return { x, y, width, height };
};

// A custom hook to get the min and max coordinates of a block
const useMinMaxCoords = (block, zoomOut) => {
    let minX = Math.min(...block.words.map((word) => word.minX)) * zoomOut;
    let minY = Math.min(...block.words.map((word) => word.minY)) * zoomOut;
    let maxX = Math.max(...block.words.map((word) => word.maxX)) * zoomOut;
    let maxY = Math.max(...block.words.map((word) => word.maxY)) * zoomOut;
    return { minX, minY, maxX, maxY };
};

// A custom hook to merge the blocks that overlap as one rect
const useMergedBlocks = (blocks, zoomOut) => {
    // Create a copy of the blocks array
    const mergedBlocks = [...blocks];

    // Loop over the blocks and check if they overlap with each other
    for (let i = 0; i < mergedBlocks.length; i++) {
        for (let j = i + 1; j < mergedBlocks.length; j++) {
            // Get the min and max coordinates of the two blocks
            const { minX: minX1, minY: minY1, maxX: maxX1, maxY: maxY1 } =
                useMinMaxCoords(mergedBlocks[i], zoomOut);
            const { minX: minX2, minY: minY2, maxX: maxX2, maxY: maxY2 } =
                useMinMaxCoords(mergedBlocks[j], zoomOut);

            // Check if the two blocks overlap by comparing their coordinates
            const overlapX = Math.min(maxX1, maxX2) - Math.max(minX1, minX2);
            const overlapY = Math.min(maxY1, maxY2) - Math.max(minY1, minY2);
            const overlap = overlapX > 0 && overlapY > 0;

            // If the two blocks overlap, merge them into one
            if (overlap) {
                // Create a new block with the merged words and id
                const newBlock = {
                    id: `${mergedBlocks[i].id}-${mergedBlocks[j].id}`,
                    words: [...mergedBlocks[i].words, ...mergedBlocks[j].words],
                };

                // Remove the two original blocks from the array
                mergedBlocks.splice(j, 1);
                mergedBlocks.splice(i, 1);

                // Add the new block to the array
                mergedBlocks.push(newBlock);

                // Restart the loop from the beginning
                i = -1;
                break;
            }
        }
    }

    return mergedBlocks;
};

const Canvas = ({ page, onSelect, onPageChange, bubbles }) => {
    // A state to store the selected speech bubble index
    const [zoomOut, setZoomOut] = useState(0.28);
    const colors = ['#ff36f4', '#ff4136', '#36ff41', '#36f4ff']
    // Use the custom hook to load and scale the image
    const [scaledImage, status] = useScaledImage(`${page.src}`, zoomOut);

    // Use the custom hook to merge the blocks that overlap as one rect
    const mergedBlocks = useMergedBlocks(page.blocks, zoomOut);

    // A function to handle the click event on a block
    const handleClick = (block) => {
        // Set the selected bubble state to that block and call the onSelect prop with that block
        onSelect(block);
    };

    return (
        <Container>
            <Container sx={{ overflow: 'scroll', width: `500px`, height: `660px` }}>
                <Stage width={scaledImage ? scaledImage.width : 450} height={680}>
                    {scaledImage && (
                        <Layer>
                            {/* Render an Image component with the scaled image */}
                            <Image image={scaledImage.image} scale={{ x: zoomOut, y: zoomOut }} />

                            {/* Loop over the panels and render a Rect component for each one with scaled coordinates */}
                            {page.panels.map((panel, index) => {
                                // Use the custom hook to get the scaled coordinates of the panel
                                const { x, y, width, height } = useScaledCoords(panel, zoomOut);
                                
                                return (
                                    <Rect
                                        key={panel.id}
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={colors[(index + 1) % colors.length]}
                                        opacity={0.5}
                                    />
                                );
                            })}

                            {/* Loop over the merged blocks and render a Rect component for each one with scaled coordinates */}
                            {mergedBlocks.map((block) => {
                                // Use the custom hook to get the min and max coordinates of the block
                                const { minX, minY, maxX, maxY } = useMinMaxCoords(block, zoomOut);
                                const padding = 5;
                                // Check if the block is selected
                                let bubble = bubbles.find(b => b.id == block.id);
                                let bubbleIndex = bubbles.indexOf(bubble)
                                let isSelected = bubble 
                                // Set the stroke style based on the selection state
                                let stroke = 'white';

                                return (
                                    <>
                                        <Rect
                                            key={block.id}
                                            x={minX}
                                            y={minY}
                                            width={(maxX - minX) + padding}
                                            height={(maxY - minY) + padding}
                                            stroke={stroke}
                                            strokeWidth={2}
                                            onClick={() => handleClick(block)}
                                            onMouseEnter={(e) => {
                                                // style stage container:
                                                const container = e.target.getStage().container();
                                                container.style.cursor = 'pointer';
                                                // increase the opacity of the rect
                                                e.target.opacity(0.5);
                                                // redraw the layer to apply the change
                                                e.target.getLayer().batchDraw();
                                            }}
                                            onMouseLeave={(e) => {
                                                const container = e.target.getStage().container();
                                                container.style.cursor = 'default';
                                                // reset the opacity of the rect
                                                e.target.opacity(isSelected ? 0.50 : 0.30);
                                                // redraw the layer to apply the change
                                                e.target.getLayer().batchDraw();
                                            }}
                                            fill={isSelected ? '#f3eb00' : "#0082f3"}
                                            opacity={isSelected ? 0.50 : 0.30}
                                            cornerRadius={5}
                                            offsetX={padding / 2}
                                            offsetY={padding / 2}
                                        />
                                        {isSelected && <Text
                                            x={maxX - 5} // add some offset to position it on the top-left corner
                                            y={minY - 15} // add some offset to position it on the top-left corner
                                            text={bubbleIndex + 1} // set the text content to be the index of the bubble
                                            fontVariant='bold'
                                            fontSize={16} // adjust the font size as needed
                                            fill="black" // set the text color as needed
                                        />}

                                    </>

                                );
                            })}
                        </Layer>
                    )}
                </Stage>
            </Container>
        </Container>
    );
};

export default Canvas;
