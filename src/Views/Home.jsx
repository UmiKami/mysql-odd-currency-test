import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/cars`)
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mx-24 max-w-7xl">
            <h1 className="text-3xl font-bold mb-4">Car List ({cars.length})</h1> 
            <Link to="/post/car" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">Post a Car</Link>
            <div className="grid grid-cols-3 gap-4">
                {cars.map(car => (
                    <div key={car.id} className="bg-white p-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                        <h2 className="text-xl font-bold">{car.make} {car.model}</h2>
                        <p className="text-gray-500">{car.year}</p>
                        <p className="text-gray-500">{car.price} {car.currency}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;