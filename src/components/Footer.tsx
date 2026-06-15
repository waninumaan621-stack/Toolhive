import { Rocket, Mail, MessageSquare, Share2, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-20 pb-10 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <Rocket className="h-8 w-8 text-indigo-500" />
              <span className="text-2xl font-bold tracking-tight">NEXUS</span>
            </div>
            <p className="mb-6 leading-relaxed">
              We are a team of passionate designers and developers dedicated to crafting world-class digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><MessageSquare size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Share2 size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><ExternalLink size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Branding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marketing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Agency</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Subscribe</h4>
            <p className="mb-4">Stay updated with our latest insights and news.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-gray-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 text-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
                <Rocket size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 Nexus Creative Agency. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
