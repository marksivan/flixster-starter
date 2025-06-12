import './MovieList.css'
import data from './data/data.js'
import MovieCard from './MovieCard.jsx'
import {useState, useEffect} from 'react'




function MovieList({page = 1, searchTerm = ''}){
    // state to stores the movies fetched from the API
    const [movies, setMovies] = useState([])

    // state to track if data is currently being loaded
    const [isLoading, setIsLoading] = useState(true)

    // state to store any error that might occur during the API fetch
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const apiURL = searchTerm
                ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${page}`
                : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

                const response = await fetch(apiURL);

                if (!response.ok){
                    throw new Error('Failed to fetch movies');
            }
            const data = await response.json();

            if (page === 1){
                setMovies(data.results);
            }else{
                setMovies(prevMovies => [...prevMovies, ...data.results]);
            }

            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
       };
       fetchMovies();
    }, [page, searchTerm]); // re-reun when page or searchTerm changes

    if (isLoading && page === 1){
        return <div className='loading'>Loading...</div>;
    }

    if (error){
        return <div className='error'>An error occurred: {error}</div>;
    }

   return (
       <div className='movie-list'>
           {movies.map((movie) =>(
               <MovieCard key={movie.id} movie={movie}/>
           ))


           }


       </div>
   );
}




export default MovieList;
