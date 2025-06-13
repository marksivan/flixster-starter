import './MovieCard.css'
import Modal from './Modal.jsx'
import {useState} from 'react'




function MovieCard(props){
    const [showModal, setShowModal] = useState(false);
   const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;

   const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

   return (
       <div className='movie-card'>
           <div className='card-content' onClick={openModal}>
                <img src={posterUrl} alt={props.movie.title}/>
                <h5>{props.movie.title}</h5>
                <p>⭐ {props.movie.vote_average}</p>
                 <p>{props.movie.release_date.substring(0,4)}</p> 
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
