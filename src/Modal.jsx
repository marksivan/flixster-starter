import './Modal.css'
import { useState, useEffect } from 'react'

function Modal({ movie, onClose }) {
   const [movieDetails, setMovieDetails] = useState(null);
   const [trailer, setTrailer] = useState(null);
   const [loading, setLoading] = useState(true);

   const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

   useEffect(() => {
      // Function to fetch movie details (including runtime)
      const fetchMovieDetails = async () => {
         try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await fetch(
               `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
            );

            if (!response.ok) {
               throw new Error('Failed to fetch movie details');
            }

            const data = await response.json();
            setMovieDetails(data);
         } catch (error) {
            console.error('Error fetching movie details:', error);
         }
      };

      // Function to fetch movie videos (trailers)
      const fetchMovieTrailer = async () => {
         try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await fetch(
               `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
            );

            if (!response.ok) {
               throw new Error('Failed to fetch movie videos');
            }

            const data = await response.json();

            // Find the official trailer
            const officialTrailer = data.results.find(
               video => video.type === 'Trailer' && video.site === 'YouTube'
            );

            setTrailer(officialTrailer || null);
            setLoading(false);
         } catch (error) {
            console.error('Error fetching movie trailer:', error);
            setLoading(false);
         }
      };

      // Call both fetch functions
      fetchMovieDetails();
      fetchMovieTrailer();
   }, [movie.id]);

   // Format runtime from minutes to hours and minutes
   const formatRuntime = (minutes) => {
      if (!minutes) return 'Runtime not available';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
   };

   return (
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>×</button>

            <div className="modal-backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
               <div className="modal-backdrop-overlay"></div>
            </div>

            <div className="modal-body">
               <h2>{movie.title}</h2>

               {loading ? (
                  <p>Loading details...</p>
               ) : (
                  <>
                     <div className="modal-info">
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        {movieDetails && (
                           <p><strong>Runtime:</strong> {formatRuntime(movieDetails.runtime)}</p>
                        )}
                        <p><strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}/10</p>
                        {movieDetails && movieDetails.genres && (
                           <p><strong>Genres:</strong> {movieDetails.genres.map(g => g.name).join(', ')}</p>
                        )}
                     </div>

                     <div className="modal-overview">
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                     </div>

                     {trailer && (
                        <div className="modal-trailer">
                           <h3>Trailer</h3>
                           <div className="trailer-container">
                              <iframe
                                 src={`https://www.youtube.com/embed/${trailer.key}`}
                                 title={`${movie.title} Trailer`}
                                 frameBorder="0"
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                 allowFullScreen
                              ></iframe>
                           </div>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default Modal;
