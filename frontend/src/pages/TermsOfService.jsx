import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-up space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
      <p className="text-gray-500 text-sm">Last updated: June 2026</p>
      {[
        { title: '1. Acceptance of Terms', content: 'By using ToolHive, you agree to these Terms of Service. If you do not agree, please do not use our website.' },
        { title: '2. Use of Tools', content: 'All tools provided on ToolHive are for personal and professional use. You may not use our tools for illegal activities, to violate others privacy, or to process content that violates applicable laws.' },
        { title: '3. No Warranty', content: 'ToolHive tools are provided as-is without any warranty. We do not guarantee accuracy of results. Always verify important outputs independently.' },
        { title: '4. File Processing', content: 'All file processing happens in your browser locally. We do not store, access, or transmit your files to any server. You are responsible for your own files and data.' },
        { title: '5. Intellectual Property', content: 'All content, design, and code on ToolHive is owned by Wani Numaan. You may not copy, reproduce, or redistribute our website without permission.' },
        { title: '6. Limitation of Liability', content: 'ToolHive shall not be liable for any damages arising from use of our tools. Use all tools at your own risk.' },
        { title: '7. Advertisements', content: 'ToolHive displays advertisements via Google AdSense. We are not responsible for the content of third party advertisements.' },
        { title: '8. Changes to Terms', content: 'We reserve the right to modify these terms at any time. Continued use of ToolHive after changes means you accept the new terms.' },
        { title: '9. Contact', content: 'For any questions about these Terms, contact us at waninumaan621@gmail.com' },
      ].map(s => (
        <div key={s.title} className="card p-5">
          <h2 className="font-bold text-slate-900 dark:text-white mb-2">{s.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.content}</p>
        </div>
      ))}
      <Link to="/" className="btn-gold px-6 py-2.5 inline-block">← Back to Home</Link>
    </div>
  );
}
