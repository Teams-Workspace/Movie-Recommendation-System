import { useState, useEffect } from 'react';

function GenreCategories({ apiKey }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch genres
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
        const genresResponse = await fetch(genresURL);
        if (!genresResponse.ok) {
          throw new Error(`HTTP error! Status: ${genresResponse.status}`);
        }
        const genresData = await genresResponse.json();
        const limitedGenres = genresData.genres.slice(0, 15); // Limit to 15 genres

        // Fetch movies from page 5 for backdrops
        const moviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=5`;
        const moviesResponse = await fetch(moviesURL);
        if (!moviesResponse.ok) {
          throw new Error(`HTTP error! Status: ${moviesResponse.status}`);
        }
        const moviesData = await moviesResponse.json();
        const limitedMovies = moviesData.results.slice(0, 15); // Limit to 15 movies

        // Combine genres with movie backdrops
        const enrichedGenres = limitedGenres.map((genre, index) => ({
          ...genre,
          image: limitedMovies[index]?.backdrop_path
            ? `https://image.tmdb.org/t/p/w1920${limitedMovies[index].backdrop_path}`
            : '/placeholder.svg',
          count: Math.floor(Math.random() * 100) + 50, // Random count between 50 and 150
        }));
        setGenres(enrichedGenres);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, [apiKey]);

  if (!genres.length) return null;

  return (
    <div className="relative py-8">
    

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
        {genres.map((genre, index) => (
          <div
            key={genre.id}
            className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={genre.image}
              alt={genre.name}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                hoveredIndex === index ? 'scale-110 brightness-75' : 'brightness-50'
              }`}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <h3
                className={`text-xl font-bold text-center transition-transform duration-500 text-white ${
                  hoveredIndex === index ? 'scale-110' : ''
                }`}
              >
                {genre.name}
              </h3>
              
            </div>

            {/* Red outline on hover */}
            <div
              className={`absolute inset-0 border-2 border-red-600 rounded-lg transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreCategories;