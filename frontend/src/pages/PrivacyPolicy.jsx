import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-up space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-gray-500 text-sm">Last updated: June 2026</p>
      {[
        { title: '1. Information We Collect', content: 'ToolHive does not require registration or login to use our tools. We do not collect personal information unless you contact us voluntarily. We may collect anonymous usage data such as pages visited and tools used to improve our service.' },
        { title: '2. Cookies', content: 'We use cookies to remember your theme preference (light/dark mode). Google AdSense may use cookies to show relevant advertisements. You can disable cookies in your browser settings at any time.' },
        { title: '3. Google AdSense', content: 'We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your visits to this and other websites. You may opt out of personalized advertising by visiting Google Ad Settings.' },
        { title: '4. Third Party Services', content: 'We use Google Fonts for typography and Google Analytics for anonymous traffic analysis. These services have their own privacy policies.' },
        { title: '5. Data Security', content: 'All tools on ToolHive run entirely in your browser. Files you upload are never sent to our servers and are processed locally on your device.' },
        { title: '6. Children\'s Privacy', content: 'ToolHive is not directed at children under 13. We do not knowingly collect information from children.' },
        { title: '7. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.' },
        { title: '8. Contact Us', content: 'If you have questions about this Privacy Policy, contact us at waninumaan621@gmail.com' },
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
