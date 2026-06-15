import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-6 tracking-wider uppercase">
            Future of Digital Experience
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
            We build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">extraordinary</span> digital products.
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            Nexus is a creative agency that merges design and technology to create products people love. 
            We help brands innovate and grow in the digital age.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:pr-12">
              <span className="relative z-10">Start a Project</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            <button className="flex items-center gap-3 text-white font-semibold hover:text-indigo-400 transition-colors">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 hover:border-indigo-500 transition-colors">
                <Play size={18} fill="currentColor" />
              </div>
              Watch Showreel
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
