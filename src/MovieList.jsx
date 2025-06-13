import './MovieList.css'
import MovieCard from './MovieCard.jsx'
import {useState, useEffect} from 'react'

function MovieList({page = 1, searchTerm = '', sortBy = '', filters = {}}){
    // state to stores the movies fetched from the API
    const [movies, setMovies] = useState([]);
    // state to track if data is currently being loaded
    const [isLoading, setIsLoading] = useState(true);
    // state to store any error that might occur during the API fetch
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;

                // Base URL depends on whether we're searching or not
                let apiURL = searchTerm
                    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${page}`
                    : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

                // Add genre filter if specified
                if (filters.genre) {
                    apiURL += `&with_genres=${filters.genre}`;
                }

                // Add year filter if specified
                if (filters.year) {
                    apiURL += `&primary_release_year=${filters.year}`;
                }

                const response = await fetch(apiURL);

                if (!response.ok){
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                let results = data.results;

                // Apply client-side sorting if sortBy is specified
                if (sortBy) {
                    results = [...results].sort((a, b) => {
                        switch (sortBy) {
                            case 'vote_average':
                                return b.vote_average - a.vote_average;
                            case 'release_date':
                                return new Date(b.release_date) - new Date(a.release_date);
                            case 'title':
                                return a.title.localeCompare(b.title);
                            default:
                                return 0;
                        }
                    });
                }

                if (page === 1){
                    setMovies(results);
                } else {
                    // When loading more pages, we need to sort the combined results
                    const combinedMovies = [...movies, ...results];

                    if (sortBy) {
                        combinedMovies.sort((a, b) => {
                            switch (sortBy) {
                                case 'vote_average':
                                    return b.vote_average - a.vote_average;
                                case 'release_date':
                                    return new Date(b.release_date) - new Date(a.release_date);
                                case 'title':
                                    return a.title.localeCompare(b.title);
                                default:
                                    return 0;
                            }
                        });
                    }

                    setMovies(combinedMovies);
                }

                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [page, searchTerm, sortBy, filters]); // Re-run when any of these change

    if (isLoading && page === 1){
        return <div className='loading'>Loading...</div>;
    }

    if (error){
        return <div className='error'>An error occurred: {error}</div>;
    }

    return (
        <div className='movie-list'>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))
            ) : (
                <div className="no-results">No movies found matching your criteria</div>
            )}
        </div>
    );
}

export default MovieList;
