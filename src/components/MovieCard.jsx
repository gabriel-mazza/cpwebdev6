import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path }) {
    return (
        <div className="flex-none w-40 mb-4">
            <img 
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}  
                alt={title} 
                className="rounded-lg shadow-md mb-2 object-cover h-72 w-48"  
            />
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            <Link to={`/movies/${id}`} className="text-white text-sm py-1 rounded hover:bg-blue-600">
                Saber mais
            </Link>
        </div>
    );
}
