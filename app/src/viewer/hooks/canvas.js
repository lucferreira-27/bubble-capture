import useImage from 'use-image';

export const useScaledImage = (src, zoomOut) => {
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

export const getScaledCoords = (item, zoomOut) => {
    let x = item.x * zoomOut;
    let y = item.y * zoomOut;
    let width = item.w * zoomOut;
    let height = item.h * zoomOut;
    return { x, y, width, height };
};

export const getMinMaxCoords = (block, zoomOut) => {
    let minX = Math.min(...block.words.map((word) => word.minX)) * zoomOut;
    let minY = Math.min(...block.words.map((word) => word.minY)) * zoomOut;
    let maxX = Math.max(...block.words.map((word) => word.maxX)) * zoomOut;
    let maxY = Math.max(...block.words.map((word) => word.maxY)) * zoomOut;
    return { minX, minY, maxX, maxY };
};

export const getSegmentCoords = (segment, zoomOut) => {
    const xyxy = segment.xyxy;
    let minX = Math.min(xyxy[0], xyxy[2]) * zoomOut;
    let minY = Math.min(xyxy[1], xyxy[3]) * zoomOut;
    let maxX = Math.max(xyxy[0], xyxy[2]) * zoomOut;
    let maxY = Math.max(xyxy[1], xyxy[3]) * zoomOut;
    return { minX, minY, maxX, maxY };
};


export const useMergedBlocks = (blocks, zoomOut) => {
    // Create a copy of the blocks array
    const mergedBlocks = [...blocks];

    // Loop over the blocks and check if they overlap with each other
    for (let i = 0; i < mergedBlocks.length; i++) {
        for (let j = i + 1; j < mergedBlocks.length; j++) {
            // Get the min and max coordinates of the two blocks
            const { minX: minX1, minY: minY1, maxX: maxX1, maxY: maxY1 } =
                getMinMaxCoords(mergedBlocks[i], zoomOut);
            const { minX: minX2, minY: minY2, maxX: maxX2, maxY: maxY2 } =
                getMinMaxCoords(mergedBlocks[j], zoomOut);


            // Check if the two blocks overlap by comparing their coordinates
            const overlapX = Math.min(maxX1, maxX2) - Math.max(minX1, minX2);
            const overlapY = Math.min(maxY1, maxY2) - Math.max(minY1, minY2);
            const overlap = overlapX > 0 && overlapY > 0;

            // If the two blocks overlap, merge them into one
            if (overlap) {
                // Create a new block with the merged words and id
                const newBlock = {
                    cx: (maxX1 + minX1) / 2,
                    cy: (maxY1 + minY1) / 2,
                    id: `${mergedBlocks[i].id}-${mergedBlocks[j].id}`,
                    index: Math.min(mergedBlocks[i].index, mergedBlocks[j].index),
                    isInsideSegment: mergedBlocks[i].isInsideSegment && mergedBlocks[j].isInsideSegment,
                    maxX: Math.max(maxX1, maxX2),
                    maxY: Math.max(maxY1, maxY2),
                    minX: Math.min(minX1, minX2),
                    minY: Math.min(minY1, minY2),
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

export const isBlockInsideSegment = (block, segment, zoomOut, threshold = 0.05) => {
    // Get the min and max coordinates of the block

    const { minX, minY, maxX, maxY } = getMinMaxCoords(block, zoomOut);
    // Get the scaled coordinates of the segment
    const { minX: segMinX, minY: segMinY, maxX: segMaxX, maxY: segMaxY } = getSegmentCoords(segment, zoomOut);

    // Check if the block is completely outside the segment
    if (maxX < segMinX - threshold || minX > segMaxX + threshold || maxY < segMinY - threshold || minY > segMaxY + threshold) {
        return false;
    }

    // Check if the block is completely inside the segment
    if (minX >= segMinX && maxX <= segMaxX && minY >= segMinY && maxY <= segMaxY) {
        return true;
    }

    // Check if the segment is completely inside the block
    if (segMinX >= minX && segMaxX <= maxX && segMinY >= minY && segMaxY <= maxY) {
        return true;
    }

    // Check if any part of the block overlaps with the segment
    if (
        (minX <= segMaxX && maxX >= segMinX) ||
        (minY <= segMaxY && maxY >= segMinY) ||
        (segMinX <= maxX && segMaxX >= minX) ||
        (segMinY <= maxY && segMaxY >= minY)
    ) {
        return true;
    }

    return false;
};



export const filterBySegment = (block, segments, zoomOut) => {
    for (const segment of segments) {
        if (isBlockInsideSegment(block, segment, zoomOut)) {
            block.segment = segment
            return true
        }
    }
    return false
}
export const speechBubblesPosition = (speechBubblesBlocks, panels) => {
    const isInsidePanel = (block, panel) => {

        const threshold = 70
        const { x, y, x2, y2 } = panel;
        if (block.cx == 45.36 && x == 0) {
            console.log(block.cx, { x, y }, block.cx + threshold >= x)
            console.log(block)
            console.log(panel)
            function isMostBlockInside(block, panel) {
                const { x, y, x2, y2, h, w } = panel;
                const { maxX, minX, maxY, minY } = block
                const bH = block.maxX - block.minX;
                const bW = block.maxY - block.minY;
                console.log(block)
                console.log(`Panel: `, { x, y, x2, y2, h, w })
                console.log(`Block: `, { maxX, minX, maxY, minY,h:bH,w:bW })
                console.log(x < minX && x2 > maxX && y > minY && y2 < maxY)
                // Complete the code bellow
                // Calcula a área do bloco e do painel
                const blockArea = (maxX - minX) * (maxY - minY);
                const panelArea = (x2 - x) * (y2 - y);
                // Calcula a área da interseção entre o bloco e o painel
                const intersectionArea = Math.max(0, Math.min(maxX, x2) - Math.max(minX, x)) * Math.max(0, Math.min(maxY, y2) - Math.max(minY, y));
                console.log({ intersectionArea })

                // Retorna verdadeiro se a área da interseção for maior que a metade da área do bloco
                return intersectionArea > blockArea / 2;
            }


            console.log(isMostBlockInside(block, panel))
        }
        return (
            block.cx + threshold >= x &&
            block.cx - threshold <= x2 &&
            block.cy + threshold >= y &&
            block.cy - threshold <= y2
        );
    };



    const getDistance = (block1, block2) => {

        if (block1.cx == 45.36) {
            const dx = block1.cx - block2.cx;
            const dy = block1.cy - block2.cy;
            const distancia = Math.sqrt(dx * dx + dy * dy);
        }

        const dx = block1.cx - block2.cx;
        const dy = block1.cy - block2.cy;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const getFirstBlock = (blocks, panel, threshold = 30) =>
        blocks
            .filter((block) => isInsidePanel(block, panel))
            .sort((a, b) => {
                const xDiff = b.cx - a.cx;
                const yDiff = a.cy - b.cy;
                return Math.abs(xDiff) <= threshold ? yDiff : xDiff || yDiff;
            })[0];

    const sortedBlocks = [];
    for (const panel of panels) {
        const firstBlock = getFirstBlock(speechBubblesBlocks, panel);
        let nextBlock = firstBlock;
        for (const block of speechBubblesBlocks) {

            if (isInsidePanel(block, panel)) {
                sortedBlocks.push({ block, panelIndex: panel.index, distance: getDistance(block, firstBlock) });
                nextBlock = block;
            }
        }
    }
    // console.log(sortedBlocks.map((( block ) => block)))
    // console.log(sortedBlocks.sort((a, b) => a.panelIndex - b.panelIndex || a.distance - b.distance).map((( block ) => block)))
    return sortedBlocks.sort((a, b) => a.panelIndex - b.panelIndex || a.distance - b.distance).map((({ block }) => block));
};

export const blockFitSegment = (block, zoomOut) => {
    const segment = block.segment
    const { minX, minY, maxX, maxY } = getSegmentCoords(segment, 1, zoomOut); // Assuming zoomOut = 1

    // Update the block's coordinates to fit the segment
    block.minX = minX;
    block.minY = minY;
    block.maxX = maxX;
    block.maxY = maxY;

    // Remove words outside the new block coordinates
    block.words = block.words.filter((word) => {
        const { minX: wordMinX, minY: wordMinY, maxX: wordMaxX, maxY: wordMaxY } = word; // Assuming zoomOut = 1
        return (
            wordMinX >= minX &&
            wordMinY >= minY &&
            wordMaxX <= maxX &&
            wordMaxY <= maxY
        );
    });

    // Return the modified block
    return block;
};
