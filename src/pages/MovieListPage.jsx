import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Modal from "../components/Modal"; 

export default function MovieListPage() {
    const [search, setSearch] = useState("");
    const [filmes, setFilmes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [modalMessage, setModalMessage] = useState(""); 

    const saveToWatchLater = (movie) => {
        const savedList = JSON.parse(localStorage.getItem('toWatch')) || [];
        if (!savedList.some(item => item.id === movie.id)) {
            savedList.push(movie);
            localStorage.setItem('toWatch', JSON.stringify(savedList));
            setModalMessage("Filme adicionado à lista de 'Para ver depois'");
            setShowModal(true); 
        }
    };

    const saveWatched = (movie) => {
        const savedList = JSON.parse(localStorage.getItem('watched')) || [];
        if (!savedList.some(item => item.id === movie.id)) {
            savedList.push(movie);
            localStorage.setItem('watched', JSON.stringify(savedList));
            setModalMessage("Filme marcado como Assistido"); 
            setShowModal(true);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
            .then(response => response.json())
            .then(data => setFilmes(data.results))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filmesFiltrados = filmes.filter(filme =>
        filme.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Veja o catálogo completo de filmes</h2>
            <div className="mb-6 flex justify-center">
                <input
                    className="text-black p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Pesquisar filmes"
                />
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {
                    isLoading ? <p className="col-span-full text-center">Carregando...</p> :
                        filmesFiltrados.length > 0 ? filmesFiltrados.map(filme => (
                            <div key={filme.id} className="movie-card bg-black-100 p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                                <MovieCard {...filme} />

                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() => saveToWatchLater(filme)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-blue-600"
                                    >
                                        Adicionar a 'Para ver depois'
                                    </button>
                                    <button
                                        onClick={() => saveWatched(filme)}
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-green-600"
                                    >
                                        Adicionar a 'Assistidos'
                                    </button>
                                </div>
                            </div>
                        )) :
                            <p className="col-span-full text-center text-lg text-gray-600">Filme não encontrado</p>
                }
            </section>

            {showModal && (
                <Modal message={modalMessage} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}
