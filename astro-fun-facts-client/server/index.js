const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const NASA_API_KEY = 'XcnHhYb8lWLMONEuh0ujibesQVYtcjdVl0HbnHNd'; 


app.get('/api/random', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?count=1&api_key=${NASA_API_KEY}`);
    res.json(response.data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch random image' });
  }
});

app.post('/api/favorites', (req, res) => {
  const newFav = req.body;
  let favs = [];
  if (fs.existsSync('./favorites.json')) {
    favs = JSON.parse(fs.readFileSync('./favorites.json'));
  }
  favs.push(newFav);
  fs.writeFileSync('./favorites.json', JSON.stringify(favs, null, 2));
  res.json({ message: 'Favorite saved!' }); // Then the frontend's fetch call will hang forever (waiting for a response).
});

app.get('/api/favorites', (req, res) => {
  if (fs.existsSync('./favorites.json')) {
    const favs = JSON.parse(fs.readFileSync('./favorites.json'));
    res.json(favs);
  } else {
    res.json([]);
  }
});

app.listen(3001, () => console.log('Backend running at http://localhost:3001'));
