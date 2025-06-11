import './MovieCard.css'




function MovieCard(props){
   const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;


   return (
       <div className='movie-card'>
           <img src={posterUrl} alt={props.movie.title}/>
           <p>{props.movie.title}</p>
           <p>⭐ {props.movie.vote_average}</p>
           <p>{props.movie.release_date.substring(0,4)}</p>
       </div>
   );
}




export default MovieCard;
