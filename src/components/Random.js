import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../src/App.css'


export const Random = (props) => {
    const [genres, setGenre] = useState([]);
    const [genrePick, setGenrePick] = useState('');
    const [movieName, setMovieName] = useState('');
    const [movieInfo, setMovieInfo] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState('');
    const [moviePoster, setMoviePoster] = useState('');

    useEffect(() => {
        getMovies();
        getGenres();
    }, [])
    
    const getGenres = async () => {
        let genreRequestEndpoint = '/genre/movie/list';
        let requestParams = `?api_key=${process.env.REACT_APP_TMDB_KEY}`;
        let urlToFetch = `https://api.themoviedb.org/3${genreRequestEndpoint}${requestParams}`
        try{
          const reponse = await fetch(urlToFetch);
          if(reponse.ok){
            const jsonResponse = await reponse.json()
            const genresAPI = jsonResponse.genres;
        
            const genreArray = genresAPI.map(genre => genre.name);
            const nextGenre = [...genres, ...genreArray]
            setGenre(nextGenre);
          }
        } catch(e){
         console.log(e)
        }}

    const getMovies = async () => {
        const discoverMovieEndpoint = '/discover/movie';
        const requestParams = `?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${genrePick}`;
        const urlToFetch = `https://api.themoviedb.org/3${discoverMovieEndpoint}${requestParams}`;
        try {
         const response = await fetch(urlToFetch);
          if(response.ok){
            const jsonResponse = await response.json();
            const movies = jsonResponse.results
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            setMovieName(randomMovie.title)
            setMovieInfo(randomMovie.overview)
            setRating(randomMovie.vote_average)
            setDate(randomMovie.release_date)
            setMoviePoster(randomMovie.poster_path)
            
          };
        } catch(e){
          console.log(e)
        }};
      
        const handleClick = (e) => {
            setGenrePick(genres[Math.floor(Math.random() * genres.length)]);
            console.log(genrePick)
            getMovies();
        }

    return (
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>{movieName}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-around'>
          <div> 
            <h4 className='text-warning'>Rating:{rating}</h4>
            <h5>Release Date: {date}</h5>  
            <p>
              {movieInfo}
            </p>
        </div>
          <img className = 'w-25 p-3'src= {`https://image.tmdb.org/t/p/original/${moviePoster}`} alt ='movie poster'/>
          </div>
          
      </Modal.Body>
      <Modal.Footer>
        <Button variant='warning' onClick={handleClick}>Give me another movie</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}