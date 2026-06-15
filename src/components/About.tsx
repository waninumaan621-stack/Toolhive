import { motion } from 'framer-motion';

const stats = [
  { label: 'Years Experience', value: '12+' },
  { label: 'Projects Completed', value: '250+' },
  { label: 'Happy Clients', value: '180+' },
  { label: 'Design Awards', value: '15+' },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                alt="Our Team" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply" />
            </div>
            
            <div className="absolute -bottom-10 -right-10 bg-indigo-600 p-8 rounded-3xl text-white hidden md:block">
              <p className="text-4xl font-bold mb-1">98%</p>
              <p className="text-indigo-100 text-sm">Client Satisfaction</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-4">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              We are a team of creators, thinkers and explorers.
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Founded in 2012, Nexus has been at the forefront of digital innovation. We believe that great design is about more than just aesthetics—it's about creating meaningful connections between brands and their audiences.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
