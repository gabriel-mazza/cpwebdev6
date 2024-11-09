export default function CardContainer({ titulo, children }) {
    return (
        <div className="mb-10"> {}
            <h1 className="text-5xl font-extrabold text-white mb-6">{titulo}</h1> {}
            <div className="flex">
                {children}
            </div>
        </div>
    );
}
