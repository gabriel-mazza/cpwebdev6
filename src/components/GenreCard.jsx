export default function GenreCard({ genre }) {
    return (
      <div className="max-w-xs w-full bg-gray-800 text-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-200">{genre.name}</h3>
        </div>
        <div className="p-4 bg-gray-700 text-white text-center rounded-b-lg">
          <a
            href={`/genre/${genre.id}`}
            className="inline-block text-sm font-semibold text-white hover:text-yellow-300"
          >
            Ver Filmes
          </a>
        </div>
      </div>
    );
  }
  