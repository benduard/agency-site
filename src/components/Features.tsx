import { Brain, Mic, Eye } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const features = [
  {
    icon: <Mic className="w-8 h-8 text-primary-500" />,
    title: "Text-to-speech",
    description: "Simply type in your text and turn it into professional voiceovers in minutes."
  },
  {
    icon: <Brain className="w-8 h-8 text-primary-500" />,
    title: "AI LLM",
    description: "Smart AI solutions powered by large language models for seamless interactions."
  },
  {
    icon: <Eye className="w-8 h-8 text-primary-500" />,
    title: "Computer vision",
    description: "Build and deploy better computer vision applications."
  }
];

export default function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const featureElements = entry.target.querySelectorAll('.feature-card');
          if (entry.isIntersecting) {
            featureElements.forEach((el, index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => [...prev, index]);
              }, index * 200);
            });
          } else {
            setVisibleFeatures([]); // Reset when out of view
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div ref={featuresRef} className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card bg-neutral-900 p-8 rounded-2xl transition-all duration-700 cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 ${
                visibleFeatures.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="bg-neutral-800 p-3 rounded-lg inline-block mb-4 animate-pulse-slow relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer"></div>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}