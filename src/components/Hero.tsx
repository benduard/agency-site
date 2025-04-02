import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        heroRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center relative overflow-hidden">
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center transform hover:scale-105 transition-transform duration-[3s]" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 
            className="text-primary-500 font-semibold mb-4 animate-slide-in relative overflow-hidden"
            style={{ animationDelay: '200ms' }}
          >
            <span className="relative z-10">FAST, SECURE AND SCALABLE</span>
            <div className="absolute inset-0 animate-shimmer"></div>
          </h2>
          <h1 className="text-6xl font-bold text-white mb-8">
            <div className="animate-slide-in" style={{ animationDelay: '400ms' }}>We're building</div>
            <div className="animate-slide-in" style={{ animationDelay: '600ms' }}>the future of</div>
            <div className="animate-slide-in" style={{ animationDelay: '800ms' }}>
              <span className="text-gradient">language AI</span>
            </div>
          </h1>
          <p 
            className="text-neutral-400 text-xl max-w-2xl mb-12 animate-fade-in"
            style={{ animationDelay: '1000ms' }}
          >
            Leading AI research drives our products, bringing the latest
            advancements in language technology.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={handleContactClick}
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 animate-scale-in relative overflow-hidden group"
              style={{ animationDelay: '1200ms' }}
            >
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer"></div>
            </button>
            <button 
              onClick={handleContactClick}
              className="border-2 border-primary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 animate-scale-in relative overflow-hidden group"
              style={{ animationDelay: '1400ms' }}
            >
              <span className="relative z-10">Initialize</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}