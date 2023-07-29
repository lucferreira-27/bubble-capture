const konva = require('konva');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')
const path = require('path')
const createBlockArea = require('./blockAreaService')
const createSpeechBubbles = require('./speechBubbleService')
const splitPanels = require('./panelService')
const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

const getWikipediaContent = () => {
    const characters = [{
        full_name: "Monkey D. Luffy",
        picture_url: "https://cdn.myanimelist.net/images/characters/9/310307.jpg",
        color: "red",
        nickname: "Straw Hat Luffy"
    }]
    return { characters }
}


const createViewImage = async (chapters) => {

    for (const page of chapters[0].pages) {
        if (page.pageNumber != `013`) {
            continue
        }
        output = `./image-${page.pageNumber}.png`
        const { panels, textBlocks, speechBubbles, segments } = page
        const stage = new konva.Stage({
            width: page.image.width,
            height: page.image.height
        });

        // Draw panels

        const imageLayer = new konva.Layer();
        stage.add(imageLayer);

        // Load the image from the file specified in `inputFile`

        const image = await loadImage(`E:/One Piece - Manga v1 - v102/One Piece v001 (2003) (Digital) (1r0n) (f)/${page.image.file}`);

        // Create a Konva image from the loaded image
        const konvaImage = new konva.Image({
            image: image,
            width: page.image.width,
            height: page.image.height
        });

        // Add the image to the layer
        imageLayer.add(konvaImage);

        const panelLayer = new konva.Layer();
        panels.forEach((panel, index) => {
            // Use the vertices array to create a polygon shape

            const colors = [
                '#ff36f4',
                '#ff4136',
                '#36ff41',
                '#36f4ff',
                '#f436ff',
                '#ff36c8',
                '#4136ff',
                '#ffcf36',
                '#f4ff36',
                '#a936ff'
            ];       // Use the vertices array to create a polygon shape
            /*
          const polygon = new konva.Line({
              points: panel.vertices.flat(), // Flatten the array of [x,y] pairs
              closed: true, // Close the shape
              fill: `black`,
              opacity: 0.05
          });
          */
            const rect = new konva.Rect({
                x: panel.x1,
                y: panel.y1,
                width: panel.x2 - panel.x1,
                height: panel.y2 - panel.y1,
                fill: colors[(index + 1) % colors.length],
                opacity: 0.75,
                stroke: `white`,// add this line
                strokeWidth: 5 // add this line
            });


            panelLayer.add(rect);
            // panelLayer.add(polygon);


            const textX = rect.x() + rect.width() / 2;
            const textY = rect.y() + rect.height() / 2;

            // Create text 
            const text = new konva.Text({
                x: textX,
                y: textY,
                text: panel.readOrder + 1,
                fontSize: 48,
                fontFamily: 'Arial',
                fill: 'white'
            });
            panelLayer.add(text);

        });

        // Draw text blocks
        const segmentLayer = new konva.Layer();

        segments.forEach(segment => {
            const rect = new konva.Rect({
                x: segment.x1,
                y: segment.y1,
                width: segment.x2 - segment.x1,
                height: segment.y2 - segment.y1,
                stroke: `white`,// add this line
                strokeWidth: 6, // add this line
                radius: 5
            });
            segmentLayer.add(rect);
        });

        // Draw speech bubbles
        const bubbleLayer = new konva.Layer();
        speechBubbles.forEach(({ textBlock, found }) => {
            const { x1, x2, y1, y2 } = textBlock
            const rect = new konva.Rect({
                x: x1,
                y: y1,
                width: x2 - x1,
                height: y2 - y1,
                opacity: 0.50,
                fill: found ? `green` : `red`,
                strokeWidth: 5 // add this line
            });
            bubbleLayer.add(rect);
        });

        stage.add(panelLayer);
        stage.add(segmentLayer);
        stage.add(bubbleLayer);

        const width = stage.width();
        const height = stage.height();
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        const buffer = await stage.toCanvas({ canvas, context });

        // Save the image as a file
        const out = fs.createWriteStream(output);
        const stream = buffer.createPNGStream();
        stream.pipe(out);
        new Promise((resolve, reject) => {
            out.on('finish', resolve);
            out.on('error', reject);
        });
    }



}

const createTranscriptions = (chapters) => {

    const getChapterInfo = (chapter) => {
        const content = getWikipediaContent(chapter)
        return { characters: content.characters || [] }
    }

    const getChapterCharacters = (chapter) => {
        const { characters } = getChapterInfo(chapter)
        return characters
    }

    for (const chapter of chapters) {
        const characters = getChapterCharacters(chapter)
        const pages = chapter.pages
        for (const page of pages) {
            const speechBubbles = page.speechBubbles
            const transcriptions = speechBubbles.map(speechBubble => ({
                character: characters[0],
                speechBubble,
                content: speechBubble.speechContent,
                transcriptionType: 'normal',
                readingOrder: speechBubble.position
            }))
            page.transcriptions = transcriptions
        }
    }
    return chapters

}



const saveTranscriptionsToFile = (chapters, fileName) => {
    let transcriptionText = '';

    for (const { pages } of chapters) {
        for (const page of pages) {
            const transcriptions = page.transcriptions;
            transcriptionText += `Page: ${page.pageNumber}\n`;
            for (const { character, content } of transcriptions.sort((a, b) => a.readingOrder - b.readingOrder)) {
                transcriptionText += ` > ?: ${content}\n`;
            }
            transcriptionText += '\n'; // Add a newline between pages for better readability
        }
    }

    fs.writeFile(fileName, transcriptionText, 'utf8', (err) => {
        if (err) {
            console.error('Error saving transcriptions to file:', err);
        } else {
            console.log('Transcriptions saved successfully!');
        }
    });
};

const chaptersData = jsonData


const getPanelsFrom = (directory) => {
    try {
        // Get the full path of the directory and read its contents synchronously
        const dirPath = path.join(__dirname, directory);
        const files = fs.readdirSync(dirPath);

        // Parse each file as JSON and return an array of panels
        const allPanels = files.map((file) => {
            const filePath = path.join(dirPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const panels = JSON.parse(fileContent);
            return { file, panels: panels }
        });
        return [...allPanels].splice(5);
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error while reading directory:', error.message);
        return [];
    }
};



const normalizeData = (chaptersData) => {
    const panelsFrom = getPanelsFrom(`panels`)
    chaptersData.forEach((chapterData) => {
        chapterData.pages.forEach((page) => {
            const { panels } = panelsFrom.find(panel => panel.file.includes(page.image.file))
            // page.panels = page.panels.map((panel, index) => ({ ...panel, vertices: panels[index].vertices }))
            page.panels = page.panels.map(({ h, index, w, x, x2, y, y2, vertices, ...rest }) => ({
                x1: x,
                y1: y,
                x2,
                y2,
                ...rest
            }));
            if (page.segment) {
                page.segments = page.segment.map(({ xyxy, ...rest }) => ({
                    x1: xyxy[0],
                    y1: xyxy[1],
                    x2: xyxy[2],
                    y2: xyxy[3],
                    ...rest
                }));
            }

            page.blocks.forEach((block) => {
                block.words = block.words.map(({ cx, cy, maxX, maxY, minX, minY, ...rest }) => ({
                    x1: minX,
                    y1: minY,
                    x2: maxX,
                    y2: maxY,
                    ...rest
                }));
            });
        });
    });
};



normalizeData(chaptersData)
const config = {
    blockAreaConfig: {
        wordAreaConfig: {
            padding: 15
        },
        fontConfig: {
            maxFontExtra: 30,
            minFontExtra: 30,
            defaultMinFontSize: 10
        }
    }
}


const saveChaptersJson = (chapters) => {
    // Convert the chapters data to a JSON string
    const saveChapters = chapters.map(chapter => {
        const pages = chapter.pages.map(({ segment,speechBubbles ,textBlocks, blocks, ...rest }) => {
            return { ...rest }
        })
        return {...chapter,pages}
    })
    const jsonData = JSON.stringify(saveChapters, null, 2); // The 'null, 2' arguments make the JSON pretty-printed with indentation.
    console.log(jsonData.length)
    // Write the JSON data to a file
    fs.writeFile('transcription-chapters.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('Chapters data saved to chapters.json');
        }
    });
};

const { blockAreaConfig } = config
let chapters = createBlockArea(chaptersData, blockAreaConfig)
// chapters = splitPanels(chapters)
chapters = createSpeechBubbles(chapters)
chapters = createTranscriptions(chapters)
// saveTranscriptionsToFile(chapters, './transcriptions.txt')
// createViewImage(chapters, './image.png')
// showTranscriptionsOnConsole(transcriptions)
saveChaptersJson(chapters)








