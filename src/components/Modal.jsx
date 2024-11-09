export default function Modal({ message, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <p className="text-lg font-semibold text-gray-800">{message}</p>
          <button 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" 
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }
  