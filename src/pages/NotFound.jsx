import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center text-center">
      <div className="p-8 max-w-md">
        <h1 className="text-6xl font-bold text-white mb-6">404</h1>
        <p className="text-xl mb-4">Кешіріңіз, бұл бет табылмады.</p>
        <p className="text-lg mb-8">Сіз іздеген бет қазір жоқ немесе қате сілтеме бойынша өтіп кеттіңіз.</p>
        <Link to="/"className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-cyan-300 transition duration-300">Басты бетке қайту</Link>
      </div>
    </div>
  );
}
