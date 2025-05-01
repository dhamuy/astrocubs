import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('random');
  const [image, setImage] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchRandom = async () => {
    const res = await fetch('http://localhost:3001/api/random');
    const data = await res.json();
    setImage(data);
  };

  const fetchFavorites = async () => {
    const res = await fetch('http://localhost:3001/api/favorites');
    const data = await res.json();
    setFavorites(data)
  }

  const saveFavorite = async () => {
    await fetch('http://localhost:3001/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image),
    });
    fetchFavorites();
  };


  useEffect(() => {
    fetchRandom();
    fetchFavorites();
  }, []);

  return (
    <>
      <h1>Astrocubs</h1>
      <button onClick={() => setCurrentTab('random')}>Random</button>
      <button onClick={() => setCurrentTab('favorites')}>Favorites</button>

      {currentTab === 'favorites' && (
        <div>
          <h2>Your Favorites</h2>
          {favorites.length === 0 ? (
            <p>No favorites yet!</p>
          ) : (
            <ul>
              {favorites.map((fav, index) => (
                <li key={index}>
                  <h3>{fav.title}</h3>
                  <img src={fav.url} alt={fav.title} width="300" />
                  <p>{fav.explanation}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {currentTab == 'random' && image && (
        <div>
          <h1>Random Astronomy Fun Fact</h1>
          <h2>{image.title}</h2>
          <img src={image.url} alt={image.title} width="500" />
          <p>{image.explanation}</p>
          <button onClick={saveFavorite}>Save to Favorites</button>
          <button onClick={fetchRandom}>Get Another Random</button>
        </div>
      )}
    </>
  );
}

export default App;
