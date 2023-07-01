function isInsidePanel(word, panel) {
    const { cx, cy } = word;
    const { x, y, w, h } = panel;
    return cx >= x && cx <= x + w && cy >= y && cy <= y + h;
  }
  
  function isCloseTo(word1, word2) {
    const distanceThresholdX = 20;
    const distanceThresholdY = 50;

    const pixelYDistance = Math.abs(word1.minY - word2.minY);
    const pixelXDistance = pixelYDistance < distanceThresholdY ? Math.abs(word1.maxX - word2.minX) : -1;
  
    if (pixelXDistance === -1) {
      return false;
    }

    return pixelXDistance < distanceThresholdX;
  }
  
  function findParent(parents, i) {
    if (i !== parents[i]) {
      parents[i] = findParent(parents, parents[i]);
    }
    return parents[i];
  }
  
  function union(parents, ranks, i, j) {
    const iRoot = findParent(parents, i);
    const jRoot = findParent(parents, j);
  
    if (iRoot !== jRoot) {
      if (ranks[iRoot] < ranks[jRoot]) {
        parents[iRoot] = jRoot;
      } else if (ranks[iRoot] > ranks[jRoot]) {
        parents[jRoot] = iRoot;
      } else {
        parents[jRoot] = iRoot;
        ranks[iRoot] += 1;
      }
    }
  }
  
  function buildBlocks(words, panels) {
    const parents = Array.from({ length: words.length }, (_, i) => i);
    const ranks = Array.from({ length: words.length }, () => 0);
  
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words.length; j++) {
        const word1 = words[i];
        const word2 = words[j];
        if (!panels.some(panel => isInsidePanel(word1, panel) && isInsidePanel(word2, panel))) {
          continue;
        }
        if (isCloseTo(word1, word2)) {
          union(parents, ranks, i, j);
        }
      }
    }
  
    const blocksDict = {};
    for (let i = 0; i < words.length; i++) {
      const parent = findParent(parents, i);
      if (!(parent in blocksDict)) {
        blocksDict[parent] = [];
      }
      blocksDict[parent].push(words[i]);
    }
  
    const blocksList = Object.values(blocksDict).map(words => {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
  
      for (const word of words) {
        for (const vertex of word.vertices) {
          minX = Math.min(minX, vertex.x);
          minY = Math.min(minY, vertex.y);
          maxX = Math.max(maxX, vertex.x);
          maxY = Math.max(maxY, vertex.y);
        }
      }
  
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
  
      return { words, minX, minY, maxX, maxY, cx, cy };
    });
    const mergedBlocks = mergeAllBlocks(blocksList, 10);
    mergedBlocks.forEach((block) =>{
        // console.log(block.words.map((w,index) => w.text).map((text,index) => `"${text}"`))
    })
    return mergedBlocks
  }
  
  function mergeAllBlocks(blocksList, numIterations) {
    let mergedBlocks = blocksList;
  
    for (let i = 0; i < numIterations; i++) {
      mergedBlocks = mergeBlocks(mergedBlocks);
    }
  
    return mergedBlocks;
  }
  
  function mergeBlocks(blockList) {
    const mergedBlocks = [];
    const visited = new Set();
  
    for (let i = 0; i < blockList.length; i++) {
      if (visited.has(i)) {
        continue;
      }
  
      const currentBlock = blockList[i];
      let mergedBlock = { ...currentBlock };
      visited.add(i);
  
      for (let j = 0; j < blockList.length; j++) {
        if (visited.has(j)) {
          continue;
        }
  
        const nextBlock = blockList[j];
        const cyDistance = Math.abs(currentBlock.maxY - nextBlock.minY);
        const cxDistance = Math.abs(currentBlock.cx - nextBlock.cx);
  
        if (cyDistance < 50 && cxDistance < 50) {
          mergedBlock = mergeTwoBlocks(mergedBlock, nextBlock);
          visited.add(j);
        }
      }
  
      mergedBlocks.push(mergedBlock);
    }
  
    return mergedBlocks;
  }
  
  function mergeTwoBlocks(block1, block2) {
    const mergedWords = [...block1.words, ...block2.words];
    const minX = Math.min(block1.minX, block2.minX);
    const minY = Math.min(block1.minY, block2.minY);
    const maxX = Math.max(block1.maxX, block2.maxX);
    const maxY = Math.max(block1.maxY, block2.maxY);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
  
    return { words: mergedWords, minX, minY, maxX, maxY, cx, cy };
  }
  
  module.exports = { buildBlocks };
  