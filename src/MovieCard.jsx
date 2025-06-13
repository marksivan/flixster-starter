import './MovieCard.css'
import Modal from './Modal.jsx'
import {useState} from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';






function MovieCard(props){
    const [showModal, setShowModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;

   const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent opening the modal
    setIsFavorite(!isFavorite);
};

const toggleWatched = (e) => {
    e.stopPropagation(); // Prevent opening the modal
    setIsWatched(!isWatched);
};


   return (
       <div className='movie-card'>
           <div className='card-content' onClick={openModal}>
                <img src={posterUrl} alt={props.movie.title}/>
                <h5>{props.movie.title}</h5>
                <p>⭐ {props.movie.vote_average}</p>

                <div className="card-actions">
                    <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={toggleFavorite}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? '❤️' : '♡'}
                    </button>

                    <button
                        className={`watched-btn ${isWatched ? 'active' : ''}`}
                        onClick={toggleWatched}
                        aria-label={isWatched ? "Mark as unwatched" : "Mark as watched"}
                    >
                        {isWatched ? <FaEye /> : <FaEyeSlash />}

                    </button>
                </div>
           </div>

       {showModal &&(
            <Modal
                movie={props.movie}
                onClose={closeModal}
                />
                )}
       </div>



   );
}




export default MovieCard;
