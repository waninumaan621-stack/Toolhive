const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm space-y-8">
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Last updated:</strong> January 1, 2024
          </p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Welcome to ToolHive ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of any information you provide while using our website and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at toolhive.com.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              By accessing or using ToolHive, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Do NOT Collect</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              At ToolHive, we prioritize your privacy. Here's what we do NOT collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Your Files:</strong> All file processing (PDF, images, text, etc.) happens directly in your web browser using client-side JavaScript. Your files are NEVER uploaded to our servers.</li>
              <li><strong>Personal Information:</strong> We do not require registration, login, or any form of account creation. We do not collect names, email addresses, phone numbers, or other personally identifiable information.</li>
              <li><strong>Payment Information:</strong> ToolHive is completely free. We do not collect any payment or billing information.</li>
              <li><strong>Location Data:</strong> We do not track your precise geographic location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Information We May Collect</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may collect limited information to improve our services:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Usage Analytics:</strong> We use privacy-respecting analytics to understand how our tools are used. This includes anonymous data such as page views, tool usage counts, browser type, and general geographic region (country level only).</li>
              <li><strong>Local Storage:</strong> We use your browser's local storage to save preferences (such as dark mode settings) and track daily AI usage limits. This data remains on your device and is not transmitted to our servers.</li>
              <li><strong>Log Data:</strong> Like most websites, our servers may automatically collect certain information when you visit, including your IP address, browser type, pages visited, and time spent on pages. This data is used for security purposes and to diagnose technical issues.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use minimal cookies necessary for the website to function properly. These may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Preference Cookies:</strong> Remember your settings (like dark mode)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand site usage patterns</li>
              <li><strong>Advertising Cookies:</strong> Third-party advertising partners (such as Google AdSense) may use cookies to serve relevant advertisements</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may use third-party services that have their own privacy policies:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Google AdSense:</strong> For displaying advertisements. Google's privacy policy applies to ads shown on our site.</li>
              <li><strong>Google Gemini AI:</strong> For AI-powered tools. Text submitted to AI features is processed according to Google's privacy policy.</li>
              <li><strong>Analytics Services:</strong> For understanding website usage patterns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We implement appropriate technical and organizational security measures to protect any information we process. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Children's Privacy</h2>
            <p className="text-gray-600 dark:text-gray-400">
              ToolHive does not knowingly collect information from children under 13 years of age. Our services are intended for general audiences. If you believe we have inadvertently collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. International Users</h2>
            <p className="text-gray-600 dark:text-gray-400">
              ToolHive is accessible worldwide. By using our services, you acknowledge that your information may be processed in the country where our servers are located. We comply with applicable data protection laws including GDPR for European users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Depending on your location, you may have certain rights regarding your information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Right to access information we hold about you</li>
              <li>Right to request deletion of your data</li>
              <li>Right to opt-out of tracking</li>
              <li>Right to data portability</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Since we don't collect personal information, these rights primarily apply to clearing local storage data, which you can do through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of ToolHive after any changes indicates your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <p className="text-gray-900 dark:text-white font-medium">ToolHive</p>
              <p className="text-gray-600 dark:text-gray-400">Developer: Wani Numaan</p>
              <a href="mailto:waninumaan621@gmail.com" className="text-[#1e3a5f] dark:text-[#d4a843] hover:underline">
                waninumaan621@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
