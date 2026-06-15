import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-commerce Redesign',
    category: 'Web Development',
    image: '/images/project1.jpg',
  },
  {
    title: 'Fintech Mobile App',
    category: 'UI/UX Design',
    image: '/images/project2.jpg',
  },
  {
    title: 'Modern Brand Identity',
    category: 'Branding',
    image: '/images/project3.jpg',
  }
];

const Work = () => {
  return (
    <section id="work" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-4">Our Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">Case studies & projects</h3>
          </div>
          <button className="hidden md:block text-indigo-600 font-bold hover:underline">View all projects</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-indigo-400 text-sm font-bold mb-2 uppercase tracking-wider">{project.category}</p>
                <h4 className="text-white text-2xl font-bold">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
