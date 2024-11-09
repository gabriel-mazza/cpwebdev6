import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);

    const fetchMovies = async () => {
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
            ]);

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json(); 
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results);
            setFilmesTrending(trendingData.results); 
            setFilmesUpcoming(upcomingData.results);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="space-y-16 p-12">
            <CardContainer titulo="Filmes Populares">
                <div className="flex overflow-x-auto space-x-8 py-10 px-6 bg-gray-800 rounded-2xl shadow-lg">
                    {filmesPopulares.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))}
                </div>
            </CardContainer>

            <CardContainer titulo="Em Alta">
                <div className="flex overflow-x-auto space-x-8 py-10 px-6 bg-gray-800 rounded-2xl shadow-lg">
                    {filmesTrending.map(filme => (  
                        <MovieCard key={filme.id} {...filme} />
                    ))}
                </div>
            </CardContainer>

            <CardContainer titulo="Em Breve">
                <div className="flex overflow-x-auto space-x-8 py-10 px-6 bg-gray-800 rounded-2xl shadow-lg">
                    {filmesUpcoming.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))}
                </div>
            </CardContainer>
        </div>
    );
}
