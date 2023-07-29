const createBlockArea = (chapters,config) => {
    
    const {wordAreaConfig,fontConfig} = config

    const findWordPanel = (word, panels) => {
        const cx = (word.x1 + word.x2) / 2;
        const cy = (word.y1 + word.y2) / 2;

        for (const panel of panels) {
            if (isInsidePanel({ x: cx, y: cy }, panel)) {
                return panel;
            }
        }
        return null;
    };

    const isInsidePanel = ({ x, y }, panel) => {
        const { x1, x2, y1, y2 } = panel;
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    };

    const isWordsInSamePanel = (word1, word2) => {
        if (!word1 || !word2) {
            return false;
        }
        return word1.panel === word2.panel;
    };

    const getIntersectionBetweenArea = (a, b, padding = 0) => {
        
        const bboxA = {
            x1: a.x1 - padding,
            x2: a.x2 + padding,
            y1: a.y1 - padding,
            y2: a.y2 + padding,
        };
        const bboxB = {
            x1: b.x1 - padding,
            x2: b.x2 + padding,
            y1: b.y1 - padding,
            y2: b.y2 + padding,
        };

        const xOverlap = bboxA.x1 <= bboxB.x2 && bboxA.x2 >= bboxB.x1;
        const yOverlap = bboxA.y1 <= bboxB.y2 && bboxA.y2 >= bboxB.y1;

        let percentageOverlap = { overlap: 0 };

        if (xOverlap && yOverlap) {
            const xOverlapWidth = Math.min(bboxA.x2, bboxB.x2) - Math.max(bboxA.x1, bboxB.x1);
            const yOverlapHeight = Math.min(bboxA.y2, bboxB.y2) - Math.max(bboxA.y1, bboxB.y1);
            let intersection = xOverlapWidth * yOverlapHeight;

            const totalArea = (bboxA.x2 - bboxA.x1) * (bboxA.y2 - bboxA.y1);
            percentageOverlap = {
                xOverlap: xOverlapWidth,
                yOverlap: yOverlapHeight,
                overlap: intersection / totalArea,
            };
        }

        return percentageOverlap;
    };

    const getWordDistanceFromGroup = (word, group) => {
        const padding = wordAreaConfig.padding
        const wordDistances = [];
        for (const wordInGroup of group) {
            const intersection = getIntersectionBetweenArea(wordInGroup, word,padding);
            wordDistances.push({
                overlap: intersection.overlap,
                word: wordInGroup,
            });
        }

        if (wordDistances.length === 0) {
            return null;
        }
        return wordDistances.sort((a, b) => b?.overlap - a?.overlap)[0];
    };

    const findClosestWordInGroup = (word, groups) => {
        const closeGroups = [];
        for (const group of groups) {
            const { overlap, word: wordInGroup } = getWordDistanceFromGroup(word, group);
            if (!overlap || word === wordInGroup || !isWordsInSamePanel(word, wordInGroup)) {
                continue;
            }
            closeGroups.push(group);
        }
        return closeGroups;
    };

    const getWordFontSize = (word) => Math.abs(word.y2 - word.y1);

    const getGroupFontSize = (group) => {
        const {maxFontExtra,minFontExtra,defaultMinFontSize} = fontConfig
        const fontSizes = group.map(getWordFontSize);
        const average = fontSizes.reduce((sum, num) => sum + num, 0) / fontSizes.length;
        const maxSize = Math.max(...fontSizes) + maxFontExtra;
        const minSize = Math.min(...fontSizes) - minFontExtra;
        return { average, maxSize, minSize: minSize > defaultMinFontSize ? minSize : defaultMinFontSize };
    };

    const isWordFontSizeGroup = (word, group) => {
        if (group.length === 0) return true;
        const { maxSize, minSize } = getGroupFontSize(group);
        const fontSize = getWordFontSize(word);
        word.fontSize = fontSize
        return fontSize >= minSize && fontSize <= maxSize;
    };

    const groupWords = (allPageWords, panels) => {
        const groups = [];

        for (const word of allPageWords) {
            word.panel = findWordPanel(word, panels);
            const closeGroups = findClosestWordInGroup(word, groups) || [];

            if (closeGroups.length === 0) {
                groups.push([word]);
                continue;
            }
            const mergeGroup = closeGroups.flatMap((closeGroup) => {
                const index = groups.indexOf(closeGroup);
                if (index > -1) groups.splice(index, 1);
                return closeGroup;
            });

            if (isWordFontSizeGroup(word, mergeGroup)) {
                mergeGroup.push(word);
            }else{
              //  groups.push([word])
            }
        
            groups.push(mergeGroup);
        }

        return groups;
    };
    for(const chapter of chapters){
        const pages = chapter.pages;
    
        pages.forEach((page) => {
            const panels = page.panels;
            const allPageWords = page.blocks.flatMap((block) => block.words);
            const wordGroup = groupWords(allPageWords, panels);
            page.textBlocks = (wordGroup)
        });
    
    }
    return chapters;


};

module.exports = createBlockArea