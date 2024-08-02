import { Link } from 'wouter';
import { useState, useEffect } from 'react';


function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full bg-gradient-to-r from-color-lighdew to-color-darkdew shadow-md transition-all duration-300 ${
        isScrolled ? 'text-white' : 'text-gray-800'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-white">G u c c i</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {['Ventas', 'Inventario', 'Compras', 'Clientes'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <span
                className={`text-sm uppercase tracking-wide font-semibold hover:text-color-dullgreen transition-colors cursor-pointer ${
                  isScrolled ? 'text-white' : 'text-gray-300'
                }`}
              >
                {item}
              </span>
            </Link>
          ))}
        </div>
        <button className="md:hidden focus:outline-none">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
