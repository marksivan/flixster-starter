import './MovieList.css'
import data from './data/data.js'
import MovieCard from './MovieCard.jsx'
import {useState, useEffect} from 'react'




function MovieList({pages = 1, searchTerm = ''}){
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

                if (!repose.ok)


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
