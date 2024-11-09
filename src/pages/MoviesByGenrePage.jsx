import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function MoviesByGenrePage() {
    const { id } = useParams(); 
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&with_genres=${id}&language=pt-br`)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, [id]); 

    return (
        <div>
            <h2>Filmes do Gênero</h2>
            {isLoading ? (
                <p>Carregando filmes...</p>
            ) : (
                <section className="flex flex-wrap gap-4">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))
                    ) : (
                        <p>Nenhum filme encontrado para este gênero.</p>
                    )}
                </section>
            )}
        </div>
    );
}
