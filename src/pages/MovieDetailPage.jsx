import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';  

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState('');
  const [cast, setCast] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
          .then(response => response.json())
          .then(videoData => {
            const trailerKey = videoData.results.find(video => video.type === "Trailer")?.key;
            setTrailer(trailerKey);
          })
          .catch(error => console.error('Erro ao buscar trailer:', error));

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
          .then(response => response.json())
          .then(creditData => setCast(creditData.cast))
          .catch(error => console.error('Erro ao buscar elenco:', error));
      })
      .catch(error => console.error('Erro ao buscar filme:', error));
  }, [id]);

  if (!movie.title) return <div>Carregando...</div>;

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedCast = isExpanded ? cast : cast.slice(0, 5);

  const saveToWatchLater = () => {
    const savedList = JSON.parse(localStorage.getItem('toWatch')) || [];
    if (!savedList.some(item => item.id === movie.id)) {
      savedList.push(movie);
      localStorage.setItem('toWatch', JSON.stringify(savedList));
      setModalMessage('Filme adicionado à lista de "Para ver depois"');
      setShowModal(true); 
    }
  };

  const saveWatched = () => {
    const savedList = JSON.parse(localStorage.getItem('watched')) || [];
    if (!savedList.some(item => item.id === movie.id)) {
      savedList.push(movie);
      localStorage.setItem('watched', JSON.stringify(savedList));
      setModalMessage('Filme marcado como Assistido');
      setShowModal(true); 
    }
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="mt-4 text-lg">{movie.overview}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Avaliação:</h2>
        <p>{movie.vote_average} / 10</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Data de Lançamento:</h2>
        <p>{new Date(movie.release_date).toLocaleDateString()}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Elenco:</h2>
        <ul className="list-disc pl-6">
          {displayedCast.map(actor => (
            <li key={actor.id}>{actor.name} como {actor.character}</li>
          ))}
        </ul>
        {cast.length > 5 && (
          <button
            onClick={handleExpandClick}
            className="text-blue-500 mt-2"
          >
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>

      {trailer && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Trailer:</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="mt-8">
        <button onClick={saveToWatchLater} className="bg-blue-500 text-white py-2 px-4 rounded mr-4">Adicionar a 'Para ver depois'</button>
        <button onClick={saveWatched} className="bg-green-500 text-white py-2 px-4 rounded">Adicionar a 'Assistidos'</button>
      </div>

      {showModal && <Modal message={modalMessage} onClose={closeModal} />} 
    </div>
  );
}
