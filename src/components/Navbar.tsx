import { Droplets } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="fixed w-full bg-black/50 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center animate-slide-in">
            <Droplets className="h-8 w-8 text-primary-500 animate-pulse-slow" />
            <span className="ml-2 text-xl font-bold text-white">NeoLeaf</span>
          </Link>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {['Technology', 'Products', 'Expertise', 'Key features'].map((item, index) => (
                <Link
                  key={item}
                  to="/"
                  className="text-neutral-300 hover:text-white transition-colors transform hover:scale-105 transition-transform duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/contact"
                className={`bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 ${
                  location.pathname === '/contact' ? 'bg-primary-700' : ''
                }`}
              >
                Let's Talk!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}