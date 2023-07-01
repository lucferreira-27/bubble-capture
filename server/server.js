// Import express and fs modules
const express = require('express');
const fs = require('fs');

// Create an express app
const app = express();

// Use express.static to serve images from the public folder
app.use(express.static('public'));

// Use express.json to parse JSON requests
app.use(express.json());

// Define a route to get the list of images
app.get('/images', (req, res) => {
  // Read the images.json file
  fs.readFile('images.json', 'utf8', (err, data) => {
    // Handle errors
    if (err) {
      res.status(500).send('Error reading images.json');
    } else {
      // Parse the JSON data
      const images = JSON.parse(data);
      // Send the images array as a response
      res.json(images);
    }
  });
});

// Define a route to edit and save an image
app.put('/images/:id', (req, res) => {
  // Get the image id from the params
  const id = req.params.id;
  // Get the image data from the body
  const image = req.body;
  // Read the images.json file
  fs.readFile('images.json', 'utf8', (err, data) => {
    // Handle errors
    if (err) {
      res.status(500).send('Error reading images.json');
    } else {
      // Parse the JSON data
      const images = JSON.parse(data);
      // Find the index of the image with the given id
      const index = images.findIndex(img => img.id === id);
      // If the image is not found, send a 404 response
      if (index === -1) {
        res.status(404).send('Image not found');
      } else {
        // Otherwise, update the image with the new data
        images[index] = image;
        // Stringify the updated images array
        const newData = JSON.stringify(images, null, 2);
        // Write the new data to the images.json file
        fs.writeFile('images.json', newData, 'utf8', (err) => {
          // Handle errors
          if (err) {
            res.status(500).send('Error writing images.json');
          } else {
            // Send a success message as a response
            res.send('Image updated successfully');
          }
        });
      }
    }
  });
});

// Define a port to listen on
const port = process.env.PORT || 3000;

// Start the server and log a message
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
