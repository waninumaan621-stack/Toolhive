import { Link } from 'react-router-dom';
import { Wrench, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'All Categories', path: '/categories' },
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
    ],
    'Resources': [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    'Popular Tools': [
      { name: 'PDF to JPG', path: '/tools/pdf-to-jpg' },
      { name: 'Image Compressor', path: '/tools/compress-image' },
      { name: 'Password Generator', path: '/tools/password-generator' },
      { name: 'QR Code Generator', path: '/tools/qr-generator' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#d4a843] rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ToolHive</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Every tool you need, completely free. 300+ online tools for PDF, Image, Text, Security, and more.
            </p>
            <a
              href="mailto:waninumaan621@gmail.com"
              className="flex items-center gap-2 text-sm text-[#d4a843] hover:text-[#e5c478] transition-colors"
            >
              <Mail className="w-4 h-4" />
              waninumaan621@gmail.com
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-[#d4a843] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} ToolHive. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Created with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{' '}
            <span className="text-[#d4a843]">Wani Numaan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
