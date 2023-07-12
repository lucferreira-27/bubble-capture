import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Rect, Text } from 'react-konva';
import { Container, Button, Box } from '@mui/material';
import {
    useScaledImage,
    useMergedBlocks,
    getMinMaxCoords,
    getSegmentCoords,
    getScaledCoords,
    speechBubblesPosition,
    filterBySegment,
    blockFitSegment
} from './hooks/canvas'
import useImage from 'use-image';

// A custom hook to load the image from the page url and scale it


const Canvas = ({ page, onSelect, onPageChange, bubbles,setBubbles }) => {
    // A state to store the selected speech bubble index
    const [zoomOut, setZoomOut] = useState(0.28);
    const colors = ['#ff36f4', '#ff4136', '#36ff41', '#36f4ff']
    // Use the custom hook to load and scale the image
    const [scaledImage, status] = useScaledImage(`${page.src}`, zoomOut);
    const [allBlocks, setAllBlocks] = useState([])
    const [mergeBlocks, setMergeBlocks] = useState([])
    const [speechBubblesBlocks, setSpeechBubblesBlocks] = useState([])
    const [segmentsBlocks, setSegmentBlocks] = useState([])
    const [bubblesWithSegments, setBubblesWithSegments] = useState([])

    // Use the custom hook to merge the blocks that overlap as one rect
    const segments = page.segment
    useEffect(() => {
        setAllBlocks(page.blocks)
        setSegmentBlocks(page.segment)
    }, [page])
    useEffect(() => {
        const mergedBlocks = useMergedBlocks(page.blocks, 1);
        setMergeBlocks(mergedBlocks)
        const bubblesWithSegments = mergedBlocks.filter((block) => filterBySegment(block, segments, zoomOut))
        setBubblesWithSegments(bubblesWithSegments)
        const sortedSpeechBubbles = speechBubblesPosition(bubblesWithSegments, page.panels)
        sortedSpeechBubbles.forEach(block => block.index = speechBubblesBlocks.indexOf(block))
        
        setBubbles(sortedSpeechBubbles)
        setSpeechBubblesBlocks(sortedSpeechBubbles)
    }, [allBlocks])

    // A function to handle the click event on a block
    const handleClick = (block) => {
        // Set the selected bubble state to that block and call the onSelect prop with that block
        const blockIndex   = speechBubblesBlocks.indexOf(block);
        if(blockIndex >= 0){
            console.log(blockIndex)
           const spliceBlocks = speechBubblesBlocks.filter(item => item !== block);
           console.log(spliceBlocks)
           const sortedSpeechBubbles = speechBubblesPosition([...spliceBlocks], page.panels)
           setSpeechBubblesBlocks(sortedSpeechBubbles)
           setBubbles(sortedSpeechBubbles)
           return
        }
        const sortedSpeechBubbles = speechBubblesPosition([...speechBubblesBlocks, block], page.panels)
        block.index = sortedSpeechBubbles.indexOf(block)
        onSelect(block);
        setSpeechBubblesBlocks(sortedSpeechBubbles)
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
                                const { x, y, width, height } = getScaledCoords(panel, zoomOut);

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
                            {

                                segments.map((segment, index) => {
                                    // const {minX, minY, maxX, maxY} = getMinMaxCoords(block, zoomOut);
                                    const { minX, minY, maxX, maxY } = getSegmentCoords(segment, zoomOut)
                                    return (
                                        <>
                                            <Rect
                                                key={index}
                                                x={minX}
                                                y={minY}
                                                width={(maxX - minX)}
                                                height={(maxY - minY)}
                                                stroke={'red'}
                                                strokeWidth={2}
                                            >


                                            </Rect>
                                        </>
                                    )
                                })
                            }

                            {/* Loop over the merged blocks and render a Rect component for each one with scaled coordinates */}
                            {mergeBlocks.map((block) => {
                                console.log(`length`,speechBubblesBlocks.length)
                                block.isInsideSegment = speechBubblesBlocks.includes(block)
                                const colors = {
                                   default: '#0082f3', 
                                   selected: "#f3eb00",
                                   preSelected: `#ffa636`
                                }
                                // Use the custom hook to get the min and max coordinates of the block
                                const { minX, minY, maxX, maxY } = getMinMaxCoords(block, zoomOut);
                                const padding = 5;
                                // Check if the block is selected
                                let bubble = bubbles.find(b => b.id == block.id);
                                let bubbleIndex = speechBubblesBlocks.indexOf(block)
                                block.index = bubbleIndex
                                let isPreSelected = block.isInsideSegment
                                let isSelected = bubble
                                // Set the stroke style based on the selection state
                                let stroke = 'white';
                                block.fillColor =  isSelected ? colors.selected : colors.default
                                if(isPreSelected){
                                    // onSelect(block)
                                }
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
                                                e.target.opacity(0.50);
                                                // redraw the layer to apply the change
                                                e.target.getLayer().batchDraw();
                                            }}
                                            fill={block.fillColor}
                                            opacity={0.50}
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
