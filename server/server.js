const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors package
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const ROOT_DIRECTORY = `E:/One Piece - Manga v1 - v102/`;

function parseString(str) {
  const obj = {};
  const chapterMatch = str.match(/c(\d+)/);
  const volumeMatch = str.match(/v(\d+)/);
  const pageMatch = str.match(/p(\d+)/);
  const fileTypeMatch = str.match(/\.(\w+)/);

  if (chapterMatch) obj.chapter = chapterMatch[1];
  if (volumeMatch) obj.volume = volumeMatch[1];
  if (pageMatch) obj.page = pageMatch[1];
  if (fileTypeMatch) obj.fileType = fileTypeMatch[1];

  return obj;
}

function findImageFile(files, page) {
  for (const file of files) {
    const fileInfo = parseString(file);
    const isFileType =
      fileInfo.fileType === 'jpg' || fileInfo.fileType === 'jpeg' || fileInfo.fileType === 'png';
    const isPage = parseInt(fileInfo.page) === page;

    if (isFileType && isPage) {
      return file;
    }
  }

  return null;
}

app.get('/api/images/:series/:chapter/:page', (req, res) => {
  const { series, chapter, page } = req.params;
  const directoryPath = path.join(ROOT_DIRECTORY, 'images', series, `Chapter ${chapter}`);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read directory.' });
    }

    const imageFile = findImageFile(files, parseInt(page));

    if (imageFile) {
      const imagePath = path.join(directoryPath, imageFile);
      return res.sendFile(imagePath);
    }

    return res.status(404).json({ error: 'No image file found.' });
  });
});

app.get('/api/images/:series/:chapter', (req, res) => {
  const { series, chapter } = req.params;
  const directoryPath = path.join(ROOT_DIRECTORY, 'images', series, `Chapter ${chapter}`);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read directory.' });
    }

    const pageEndpoints = files.reduce((endpoints, file) => {
      const fileInfo = parseString(file);
      if (fileInfo.page) {
        const page = parseInt(fileInfo.page);
        const endpoint = `/api/images/${series}/${chapter}/${page}`;
        endpoints.push({ name: fileInfo.page, src: endpoint, fileType: page.fileType });
      }
      return endpoints;
    }, []);

    return res.json({ pages: pageEndpoints });
  });
});


app.get('/api/data/:series/:chapterNumber', (req, res) => {
  const { series, chapterNumber } = req.params;
  const directory = path.join(ROOT_DIRECTORY, 'data');
  const rawData = fs.readFileSync(path.join(directory, 'chapters.json'), 'utf8');

  try {
    const jsonData = JSON.parse(rawData);
    const chapterData = jsonData.find((chapter) => parseInt(chapter.number) === parseInt(chapterNumber));
    chapterData.pages.forEach((page) => {
      let blocks = page.blocks
      page.blocks = blocks.map((b, index) => ({ ...b, id: index }))
    })
    if (chapterData) {
      return res.json(chapterData);
    }

    return res.status(404).json({ error: `Chapter ${chapterNumber} not found.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to parse chapter data.' });
  }
});

app.get('/api/images', (req, res) => {
  const series = req.query.series;
  const directoryPath = path.join(ROOT_DIRECTORY, 'images', series);
  console.log(directoryPath)
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read directory.' });
    }

    const imageFiles = files.filter((file) => {
      const fileInfo = parseString(file);
      return (
        (fileInfo.fileType === 'jpg' || fileInfo.fileType === 'jpeg' || fileInfo.fileType === 'png') &&
        fileInfo.chapter &&
        fileInfo.page
      );
    });

    return res.json({ images: imageFiles });
  });
});

app.get('/api/data', (req, res) => {
  const series = req.query.series;
  const directory = path.join(ROOT_DIRECTORY, 'data');
  const rawData = fs.readFileSync(path.join(directory, 'chapters.json'), 'utf8');

  try {
    const jsonData = JSON.parse(rawData);
    const seriesData = jsonData.filter((chapter) => chapter.series === series);

    if (seriesData.length > 0) {
      return res.json({ series: series, chapters: seriesData });
    }

    return res.status(404).json({ error: `Series ${series} not found.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to parse chapter data.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
