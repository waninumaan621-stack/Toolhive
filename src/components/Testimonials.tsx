import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Nexus transformed our digital presence. Their attention to detail and creative approach is unparalleled.",
    author: "Sarah Johnson",
    role: "CEO at TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    quote: "The team at Nexus delivered more than we expected. Our conversion rate increased by 40% after the redesign.",
    author: "Michael Chen",
    role: "Marketing Director at GrowFast",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    quote: "Working with Nexus was a seamless experience. They really understood our brand vision from day one.",
    author: "Elena Rodriguez",
    role: "Founder of Artisan Co.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-4">Testimonials</h2>
          <h3 className="text-4xl font-bold text-gray-900">What our clients say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-indigo-50 relative"
            >
              <Quote className="absolute top-6 right-6 text-indigo-100" size={40} />
              <p className="text-gray-600 italic mb-8 relative z-10">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.author}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
