import { useEffect, useState } from "react";
import GenreCard from "../components/GenreCard"; 

export default function GenreListPage() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br')
            .then(response => response.json())
            .then(data => setGenres(data.genres))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="min-h-screen bg-black p-6">
            <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">Escolha um Gênero</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {genres.length > 0 ? (
                    genres.map((genre) => (
                        <GenreCard key={genre.id} genre={genre} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-lg text-gray-400">Carregando gêneros...</p>
                )}
            </div>
        </div>
    );
}
