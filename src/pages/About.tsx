import { Link } from 'react-router-dom';
import { Wrench, Shield, Zap, Heart, Mail, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-10 h-10 text-[#d4a843]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About ToolHive
          </h1>
          <p className="text-xl text-gray-300">
            Every tool you need, completely free.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              ToolHive was born from a simple frustration: why should basic online tools require sign-ups, 
              subscriptions, or uploading files to unknown servers? We believed there had to be a better way.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Created by <strong>Wani Numaan</strong>, ToolHive started as a small collection of utilities 
              and has grown into a comprehensive suite of over 300 free tools. Our mission is to provide 
              everyone with access to powerful online tools without barriers.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Today, ToolHive helps thousands of users every day with tasks ranging from PDF conversion 
              to password generation, from image optimization to code formatting. And it's all completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, title: 'Privacy First', desc: 'Your files never leave your device. All processing happens in your browser.' },
              { icon: <Zap className="w-8 h-8" />, title: 'Free Forever', desc: 'We believe tools should be accessible to everyone, regardless of budget.' },
              { icon: <Heart className="w-8 h-8" />, title: 'User Focused', desc: 'Every feature we build is designed with our users\' needs in mind.' },
            ].map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#1e3a5f] dark:text-[#d4a843]">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '300+', label: 'Free Tools' },
                { value: '10', label: 'Categories' },
                { value: '0', label: 'Required Sign-ups' },
                { value: '100%', label: 'Free Forever' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-[#d4a843] mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you.
          </p>
          <a
            href="mailto:waninumaan621@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e3a5f] text-white font-semibold rounded-xl hover:bg-[#2d4a6f] transition-colors"
          >
            <Mail className="w-5 h-5" />
            waninumaan621@gmail.com
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to get started?
          </h2>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4a843] text-[#1e3a5f] font-bold rounded-xl hover:bg-[#e5c478] transition-colors"
          >
            Explore All Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
