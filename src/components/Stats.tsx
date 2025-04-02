import { useEffect, useRef, useState } from 'react';
import { LineChart, ArrowUpRight, Users } from 'lucide-react';

const stats = [
  {
    icon: <LineChart className="w-8 h-8 text-primary-500" />,
    value: "98%",
    label: "Accuracy Rate",
    suffix: "+"
  },
  {
    icon: <Users className="w-8 h-8 text-primary-500" />,
    value: "50K",
    label: "Active Users",
    suffix: "+"
  },
  {
    icon: <ArrowUpRight className="w-8 h-8 text-primary-500" />,
    value: "24/7",
    label: "Support",
    suffix: ""
  }
];

export default function Stats() {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const statElements = entry.target.querySelectorAll('.stat-card');
          if (entry.isIntersecting) {
            statElements.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats(prev => [...prev, index]);
              }, index * 200);
            });
          } else {
            setVisibleStats([]); // Reset when out of view
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div ref={statsRef} className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Impact in Numbers</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Delivering exceptional results through innovative AI solutions
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card bg-black p-8 rounded-2xl transition-all duration-700 transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 ${
                visibleStats.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-neutral-800 p-3 rounded-lg inline-block">
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                  <span className="text-primary-500">{stat.suffix}</span>
                </span>
              </div>
              <p className="text-neutral-400 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}