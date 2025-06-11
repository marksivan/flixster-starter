import './MovieList.css'
import data from './data/data.js'
import MovieCard from './MovieCard.jsx'




function MovieList(){


   const movies = data.results;
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


