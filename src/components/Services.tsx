import { motion } from 'framer-motion';
import { Layers, Monitor, Share2, Smartphone, Zap, Search } from 'lucide-react';

const services = [
  {
    title: 'Brand Identity',
    description: 'We create memorable brands that stand out and tell a compelling story.',
    icon: <Layers className="w-8 h-8" />,
    color: 'bg-blue-500'
  },
  {
    title: 'Web Experience',
    description: 'High-performance websites designed with a focus on UX and conversion.',
    icon: <Monitor className="w-8 h-8" />,
    color: 'bg-indigo-500'
  },
  {
    title: 'App Design',
    description: 'Beautiful and intuitive mobile applications for iOS and Android platforms.',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'bg-purple-500'
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic growth campaigns that drive engagement and measurable results.',
    icon: <Share2 className="w-8 h-8" />,
    color: 'bg-pink-500'
  },
  {
    title: 'Speed Optimization',
    description: 'Lightning fast performance to ensure your users never have to wait.',
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-orange-500'
  },
  {
    title: 'SEO Strategy',
    description: 'Comprehensive search engine optimization to boost your online visibility.',
    icon: <Search className="w-8 h-8" />,
    color: 'bg-green-500'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-4">What we do</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Innovative services for your business</h3>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 border border-transparent hover:border-indigo-100"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
