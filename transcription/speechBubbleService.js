

const createSpeechBubbles = (chapters) => {
    const formatText = (str) => {
        let sentences = str.split(/(?<=[.?!])\s+/);
        let result = [];
        for (let sentence of sentences) {
            sentence = sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
            sentence = sentence.replace(/\s+(?=[.,:;?!])/g, "");
            sentence = sentence.replace(/\bi\b/g, "I");
            result.push(sentence);
        }
        return result.join(" ");
    };
    const joinTextBlock = (textBlock) => {
        return formatText(textBlock.map(w => w.text).join(' '))
    }

    const sortByCoordinates = (a, b) => {
        if (a.y < b.y) {
            return -1;
        } else if (a.y > b.y) {
            return 1;
        } else {
            return a.x - b.x;
        }
    };

    const sortTextBlocksByReadOrder = (textBlock, panel) => {
        const itemsInsidePanel = textBlock.filter((block) => block.find((word => word.panel == panel)));
        return itemsInsidePanel.sort(sortByCoordinates);
    };

    const sortPanelsByReadOrder = (panels) => {
        return panels.sort(sortByCoordinates);
    };

    const getTextBlockCoords = (textBlock) => {
        return {
            x1: Math.min(...textBlock.map(w => w.x1)),
            y1: Math.min(...textBlock.map(w => w.y1)),
            x2: Math.max(...textBlock.map(w => w.x2)),
            y2: Math.max(...textBlock.map(w => w.y2)),
        };
    };

    const isInsideAnySegment = (textBlock, segments) => {
        if (!segments) return false
        for (let segment of segments) {
            if (isInsideSegment(textBlock, segment)) {
                return true;
            }
        }
        return false;
    };
    const getTextBlockSegments = (textBlock, segments) => {
        if (!segments) return false
        const foundSegments = []
        for (let segment of segments) {
            if (isInsideSegment(textBlock, segment)) {
                foundSegments.push(segment)
            }
        }
        return foundSegments;
    };
    const isInsideAnyTextBlock = (segment, textBlocks) => {
        if (!textBlocks) return false
        for (let textBlock of textBlocks) {
            if (isInsideTextBlock(textBlock, segment)) {
                return true;
            }
        }
        return false;
    };
    const isInsideSegment = (textBlock, segment) => {
        // get the coordinates of the textBlock and the segment
        const { x1, y1, x2, y2 } = textBlock;
        const { x1: sx1, y1: sy1, x2: sx2, y2: sy2 } = segment;
        // calculate the width and height of the textBlock
        const width = x2 - x1;
        const height = y2 - y1;
        // define the percentage of textBlock that should be inside the segment
        const percentage = 0.8;
        // calculate the threshold based on the percentage and the dimensions of the textBlock
        const thrholdX = width * percentage;
        const thrholdY = height * percentage;
        // check if the textBlock is inside the segment using the threshold
        if (x1 + thrholdX >= sx1 && x2 - thrholdX <= sx2 && y1 + thrholdY >= sy1 && y2 - thrholdY <= sy2) {
            // return true if the textBlock is inside the segment
            return true;
        } else {
            // return false otherwise
            return false;
        }
    };
    const isInsideTextBlock = (textBlock, segment) => {
        // get the coordinates of the textBlock and the segment
        const { x1, y1, x2, y2 } = segment;
        const { x1: sx1, y1: sy1, x2: sx2, y2: sy2 } = textBlock;

        // define the percentage of textBlock that should be inside the segment
        // calculate the threshold based on the percentage and the dimensions of the textBlock
        const thrholdX = 100;
        const thrholdY = 100;
        // check if the textBlock is inside the segment using the threshold
        // use Math.abs to get the positive distance between the edges of the textBlock and the segment
        if (Math.abs(x1 - sx1) < thrholdX && Math.abs(x2 - sx2) < thrholdX && Math.abs(y1 - sy1) < thrholdY && Math.abs(y2 - sy2) < thrholdY) {
            // return true if the textBlock is inside the segment
            return true;
        } else {
            // return false otherwise
            return false;
        }
    };

    const getTextBlocksInsideSegment = (segments, textBlock) => {
        return segments.filter(segment => isInsideTextBlock(textBlock, segment))
    }
    const getSegmentInsideTextBlock = (textBlocks, segment) => {
        return textBlocks.filter(textBlock => isInsideSegment(textBlock, segment))
    }
    const groupTextBlocksBySegment = (filteredTextBlocks, seg) => {

    }
    const segmentTextBlocks = (textBlocks, segments) => {
        if (!segments) {
            return
        }
        for (const text of textBlocks) {
            if(joinTextBlock(text.block).toLowerCase().includes(`sorry`)){
             //   console.log()
            }
            const newSegments = segments.map(segment => {
                if (text.segments && text.segments.includes(segment)) {
                    return { ...segment, textBlocks: segment.textBlocks ? [...segment.textBlocks,text] : [text]}
                }
                return segment

            })
        }

        for(const text of textBlocks){
            const sameSegments = newSegments.filter(seg => seg.textBlocks && seg.textBlocks.includes(text))
            if(sameSegments.length > 0){
                console.log(sameSegments.length)
            }
        }

    }

    for (const chapter of chapters) {
        for (const page of chapter.pages) {
            const textBlocks = page.textBlocks
            const panels = page.panels
            const segments = page.segments

            const sortedPanels = sortPanelsByReadOrder(panels);
            const sortedTextBlocks = sortedPanels.flatMap((panel) =>
                sortTextBlocksByReadOrder(textBlocks, panel)
            ).map(textBlock => {
                const coordinates = getTextBlockCoords(textBlock)
                const foundSegments = getTextBlockSegments(coordinates, segments)
                return { block: textBlock, segments: foundSegments, coordinates }
            })



            page.panels = sortedPanels.map((p, index) => ({ ...p, readOrder: index }))
        // segmentTextBlocks(sortedTextBlocks, segments)
            const speechBubbles = sortedTextBlocks.map(({ block, coordinates, segments }, index) => ({
                textBlock: block,
                panel: block[0].panel,
                speechContent: joinTextBlock(block), // Extracted and formatted text
                position: index,
                found: segments,
                coordinates
            }));
            page.speechBubbles = speechBubbles
        }

    }
    return chapters

};


module.exports = createSpeechBubbles