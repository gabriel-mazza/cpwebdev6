import { useState, useEffect } from 'react';

export default function MovieListsPage() {
    const [toWatchList, setToWatchList] = useState([]);
    const [watchedList, setWatchedList] = useState([]);

    useEffect(() => {
        const toWatch = JSON.parse(localStorage.getItem('toWatch')) || [];
        const watched = JSON.parse(localStorage.getItem('watched')) || [];
        setToWatchList(toWatch);
        setWatchedList(watched);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">Minhas Listas</h1>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Para Ver Depois</h2>
                {toWatchList.length > 0 ? (
                    <ul className="list-disc pl-6">
                        {toWatchList.map(movie => (
                            <li key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Você ainda não adicionou filmes à lista de "Para ver depois".</p>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Assistidos</h2>
                {watchedList.length > 0 ? (
                    <ul className="list-disc pl-6">
                        {watchedList.map(movie => (
                            <li key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Você ainda não marcou nenhum filme como assistido.</p>
                )}
            </div>
        </div>
    );
}
