import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechCorp",
    content: "NeoLeaf's AI solutions have transformed our workflow. The accuracy and speed are unmatched.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    content: "The integration was seamless, and the results exceeded our expectations. Highly recommended!",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    content: "Their language models have significantly improved our customer service automation.",
    rating: 5
  }
];

export default function Testimonials() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([]);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const testimonialElements = entry.target.querySelectorAll('.testimonial-card');
          if (entry.isIntersecting) {
            testimonialElements.forEach((_, index) => {
              setTimeout(() => {
                setVisibleTestimonials(prev => [...prev, index]);
              }, index * 200);
            });
          } else {
            setVisibleTestimonials([]); // Reset when out of view
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  return (
    <div ref={testimonialsRef} className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card bg-neutral-900 p-8 rounded-2xl transition-all duration-700 transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 ${
                visibleTestimonials.includes(index)
                  ? 'opacity-100 translate-x-0'
                  : `opacity-0 ${index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'}`
              }`}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
                ))}
              </div>
              <p className="text-neutral-300 mb-6">{testimonial.content}</p>
              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-neutral-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}