const fs = require('fs');
const { createCanvas, loadImage, registerFont } = require('canvas');
const { buildBlocks } = require('./textBlocks')

function readJsonData(filePath) {
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

const calculateCenter = vertices => {
  const sum = vertices.reduce((acc, vertex) => ({
    x: acc.x + vertex.x,
    y: acc.y + vertex.y,
    maxY: Math.max(acc.maxY, vertex.y),
    maxX: Math.max(acc.maxX, vertex.x),
    minY: Math.min(acc.minY, vertex.y),
    minX: Math.min(acc.minX, vertex.x)
  }), { x: 0, y: 0, maxY: -Infinity, maxX: -Infinity, minY: Infinity, minX: Infinity });
  return {
    cx: sum.x / vertices.length,
    cy: sum.y / vertices.length,
    ...sum
  };
}


function extractWords(texts) {
  return texts.slice(1).map(extract_text => {
    const { vertices, text } = extract_text;
    const { cx, cy, maxY, maxX, minY, minX } = calculateCenter(vertices);
    return { vertices, cx, cy, text, maxY, maxX, minY, minX };
  });
}


function drawPanels(ctx, panels) {
  const colors = ['#0074D9', '#2ECC40', '#FF4136', '#7FDBFF', 'green', 'purple'];

  panels.forEach(({ x, y, w, h, index: i }, index) => {
    // Draw a rectangle around each panel with a different color
    var cx = x + w / 2;
    var cy = y + h / 2;
    const colorPick = index % colors.length
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 5;
    ctx.strokeRect(x, y, w, h);

    // Fill the shapes with low visibility with a different color
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = colors[i];
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "white"; // Set fillStyle to yellow for fillText
    ctx.font = '160px Arial';
    ctx.globalAlpha = 1;
    ctx.fillText((i + 1).toString(), cx, cy);
  });

}

function drawBlocks(ctx, blocksList) {
  ctx.strokeStyle = 'yellow';
  ctx.fillStyle = 'yellow';
  ctx.font = '64px Arial';
  ctx.globalAlpha = 1
  blocksList.forEach((block, index) => {
    ctx.beginPath();
    ctx.rect(block.minX, block.minY, block.maxX - block.minX, block.maxY - block.minY);
    ctx.stroke();
    ctx.fillText((index + 1).toString(), block.cx, block.cy);
  });
}

function saveImage(canvas, filePath) {
  const outStream = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  stream.pipe(outStream);
  outStream.on('finish', () => {
    console.log(`Image saved to ${filePath}`);
  });
}

function getPagePanels(panelsResponse) {
  return panelsResponse.map(({ bbox }) => {
    const [y1, x1, y2, x2] = bbox
    return { x: x1, y: y1, w: x2 - x1, h: y2 - y1, x2, y2 }
  })
}

// Sort the blocks by reading order in manga page
// Sort the blocks by reading order in manga page
function sortBlocksByReadingOrder(blocks, panels) {
  const DISTANCE_THRESHOLD = 200;
  const sortedPanels = sortPanelsByRows(panels, DISTANCE_THRESHOLD);
  const sortedBlocks = sortBlocksByPanels(blocks, sortedPanels);
  const sortedOnlyBlocks = sortedBlocks.map(({ block }, index) => ({ ...block, index }));
  return { sortedOnlyBlocks, sortedPanels };
}

function sortPanelsByRows(panels, threshold) {
  const getFirstPanel = () => panels
    .sort((a, b) => a.y - b.y || b.x - a.x)[0];

  const isSameRow = (panel, firstPanel) => panel.y - firstPanel.y < threshold;

  const sortRowsByXCoordinate = (rows) => {
    for (const row of rows) {
      row.sort((a, b) => b.x - a.x);
    }
  };

  const flattenRows = (rows) => rows.flat();

  const rows = [];
  let currentRow = [getFirstPanel()];

  for (let i = 1; i < panels.length; i++) {
    const panel = panels[i];
    if (isSameRow(panel, currentRow[0], threshold)) {
      currentRow.push(panel);
    } else {
      rows.push(currentRow);
      currentRow = [panel];
    }
  }
  rows.push(currentRow);

  sortRowsByXCoordinate(rows);

  return flattenRows(rows)
    .map((panel, index) => ({ ...panel, index }));
}


function sortBlocksByPanels(blocks, sortedPanels) {
  const isInsidePanel = (block, panel) => {
    const { x, y, x2, y2 } = panel;
    return block.cx >= x && block.cx <= x2 && block.cy >= y && block.cy <= y2;
  };

  const getDistance = (block1, block2) => {
    const dx = block1.cx - block2.cx;
    const dy = block1.cy - block2.cy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getFirstBlock = (blocks, panel, threshold = 30) => blocks
    .filter(block => isInsidePanel(block, panel))
    .sort((a, b) => {
      const xDiff = b.cx - a.cx;
      const yDiff = a.cy - b.cy;
      return Math.abs(xDiff) <= threshold ? yDiff : xDiff || yDiff;
    })[0];


  const sortedBlocks = [];
  for (const panel of sortedPanels) {
    const firstBlock = getFirstBlock(blocks, panel);
    let nextBlock = firstBlock
    for (const block of blocks) {
      if (isInsidePanel(block, panel)) {
        sortedBlocks.push({ block, panelIndex: panel.index, distance: getDistance(block, firstBlock) });
        nextBlock = block
      }
    }
  }
  return sortedBlocks.sort((a, b) => a.panelIndex - b.panelIndex || a.distance - b.distance)
}



function parseString(str) {
  // create an empty object to store the results
  let obj = {};
  // use regular expressions to match the parts of the string
  let chapterMatch = str.match(/c(\d+)/);
  let volumeMatch = str.match(/v(\d+)/);
  let pageMatch = str.match(/p(\d+)/);
  let fileTypeMatch = str.match(/\.(\w+)/);
  // assign the matched values to the object
  if (chapterMatch) obj.chapter = chapterMatch[1];
  if (volumeMatch) obj.volume = volumeMatch[1];
  if (pageMatch) obj.page = pageMatch[1];
  if (fileTypeMatch) obj.fileType = fileTypeMatch[1];
  // return the object
  return obj;
}


// This function takes an array of segments and returns an array of chapters
function handleSegments(segments) {

  let chapters = {};
  for (let segment of segments) {
    let fileName = segment.image.file;
    let parsed = parseString(fileName);
    segment.pageNumber = parsed.page
    let chapter = parsed.chapter;
    if (chapters[chapter]) {
      chapters[chapter].pages.push(segment);
      continue
    }
    chapters[chapter] = {
      number: chapter,
      pages: [segment]
    }
  }
  return Object.values(chapters);
}


// This function creates a canvas, loads an image, draws panels and blocks on it, and saves it as a file
const createAndSaveImage = async (image, outputFolderPath, i, orderedPanels, sortedOnlyBlocks) => {
  // create a canvas and get its context
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  // register the font family
  registerFont('arial.ttf', { family: 'Arial' });
  // load the image from the file path
  // set the canvas size to match the image size
  canvas.width = image.width;
  canvas.height = image.height;
  // draw the image on the canvas
  ctx.drawImage(image, 0, 0);
  // draw the panels on the canvas
  drawPanels(ctx, orderedPanels);
  // draw the blocks on the canvas
  drawBlocks(ctx, sortedOnlyBlocks);
  // create the output file name and path
  const outputFileName = `output_${i}.png`;
  const outputFilePath = `${outputFolderPath}/${outputFileName}`;
  // save the canvas as an image file
  saveImage(canvas, outputFilePath);
};


async function main() {
  const imageFolderPath = './resources/images';
  const panelsFolderPath = './resources/panels';
  const ocrFolderPath = './resources/blocks';
  const outputFolderPath = './output';
  const DISTANCE_THRESHOLD = 20;

  const imageFiles = fs.readdirSync(imageFolderPath);
  const panelFiles = fs.readdirSync(panelsFolderPath);
  const ocrFiles = fs.readdirSync(ocrFolderPath);
  const segments = []
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const panelFile = panelFiles[i];
    const ocrFile = ocrFiles[i];

    const imageFilePath = `${imageFolderPath}/${imageFile}`;
    const panelFilePath = `${panelsFolderPath}/${panelFile}`;
    const ocrFilePath = `${ocrFolderPath}/${ocrFile}`;

    const ocrResponse = readJsonData(ocrFilePath);
    const panelsResponse = readJsonData(panelFilePath);
    const texts = ocrResponse.text_blocks;
    const panels = getPagePanels(panelsResponse);

    const words = extractWords(texts);
    const blocksList = buildBlocks(words, panels, DISTANCE_THRESHOLD);
    const { sortedOnlyBlocks, sortedPanels: orderedPanels } = sortBlocksByReadingOrder(blocksList, panels);

    const image = await loadImage(imageFilePath);
    // createAndSaveImage(image, outputFolderPath, i, orderedPanels, sortedOnlyBlocks) 
    segments.push({
      image: { file: imageFile, width: image.width, height: image.height },
      panels: orderedPanels,
      blocks: sortedOnlyBlocks
    })
  }
  const chapters = handleSegments(segments)
  fs.writeFileSync(`${outputFolderPath}/chapters.json`, JSON.stringify(chapters, null, 2))
}



main();