import { FAQ } from '../types';

export const faqs: FAQ[] = [
  // General
  { id: '1', question: 'Is ToolHive completely free to use?', answer: 'Yes! All tools on ToolHive are 100% free. We sustain our service through non-intrusive advertisements. There are no hidden fees, subscriptions, or premium tiers.', category: 'general' },
  { id: '2', question: 'Do I need to create an account?', answer: 'No account or registration is required. You can use all tools immediately without signing up. Your privacy is important to us.', category: 'general' },
  { id: '3', question: 'Are my files and data secure?', answer: 'Absolutely. All file processing happens directly in your browser. Your files never leave your device and are not uploaded to our servers. We take your privacy seriously.', category: 'general' },
  { id: '4', question: 'How many tools are available?', answer: 'ToolHive offers over 300 free online tools across 10 categories including PDF, Image, Text, Security, Web Development, and more.', category: 'general' },
  { id: '5', question: 'Can I use ToolHive on mobile devices?', answer: 'Yes! ToolHive is fully responsive and works on all devices - smartphones, tablets, laptops, and desktops.', category: 'general' },
  
  // PDF Tools
  { id: '6', question: 'What\'s the maximum PDF file size I can process?', answer: 'Since all processing happens in your browser, the limit depends on your device\'s memory. Generally, files up to 50MB work smoothly on most devices.', category: 'pdf' },
  { id: '7', question: 'Can I merge multiple PDF files?', answer: 'Yes! Our PDF Merge tool allows you to combine multiple PDF files into one. Simply upload your files, arrange them in order, and merge.', category: 'pdf' },
  { id: '8', question: 'Will compressing a PDF reduce quality?', answer: 'Our compression algorithm is optimized to reduce file size while maintaining readable quality. You can choose between different compression levels based on your needs.', category: 'pdf' },
  { id: '9', question: 'Can I convert PDF to Word format?', answer: 'Yes, our PDF to Word converter extracts text and attempts to maintain formatting. Note that complex layouts may require manual adjustments.', category: 'pdf' },
  
  // Image Tools
  { id: '10', question: 'What image formats are supported?', answer: 'We support all common image formats including JPG, PNG, GIF, WebP, BMP, and SVG. You can also convert between these formats.', category: 'image' },
  { id: '11', question: 'How much can images be compressed?', answer: 'Typical compression ratios range from 40-80% file size reduction while maintaining visual quality. Results vary based on the original image.', category: 'image' },
  { id: '12', question: 'Can I resize multiple images at once?', answer: 'Yes! Our batch processing feature allows you to resize multiple images simultaneously with the same dimensions.', category: 'image' },
  { id: '13', question: 'Will resizing affect image quality?', answer: 'Enlarging images may reduce quality. For best results, resize to smaller dimensions or maintain the original aspect ratio.', category: 'image' },
  
  // Text Tools
  { id: '14', question: 'Is there a word limit for text tools?', answer: 'Most text tools can handle documents up to 100,000 words. For very large documents, we recommend splitting them into smaller sections.', category: 'text' },
  { id: '15', question: 'Does the word counter include spaces?', answer: 'Our word counter shows both character count with spaces and without spaces, along with word count, sentence count, and more.', category: 'text' },
  { id: '16', question: 'Can I convert text to speech?', answer: 'Yes! Our Text to Speech tool uses your browser\'s built-in speech synthesis to read text aloud in multiple languages and voices.', category: 'text' },
  
  // Security Tools
  { id: '17', question: 'How secure are generated passwords?', answer: 'Our password generator uses cryptographically secure random number generation. Passwords are generated locally and never stored or transmitted.', category: 'security' },
  { id: '18', question: 'Are hash values reversible?', answer: 'Cryptographic hashes like SHA-256 are one-way functions. It\'s computationally infeasible to reverse a hash back to the original input.', category: 'security' },
  { id: '19', question: 'Is Base64 encoding secure?', answer: 'Base64 is an encoding scheme, not encryption. It converts data to a text format but provides no security. Use encryption for sensitive data.', category: 'security' },
  
  // Web Dev Tools
  { id: '20', question: 'Can I customize QR code colors?', answer: 'Yes! Our QR Code Generator allows you to customize foreground and background colors while ensuring the code remains scannable.', category: 'webdev' },
  { id: '21', question: 'Will minified code still work?', answer: 'Yes, minification removes whitespace and shortens variable names without changing functionality. Always test minified code before deployment.', category: 'webdev' },
  { id: '22', question: 'What JSON errors can be detected?', answer: 'Our JSON validator detects syntax errors, missing brackets, invalid characters, improper nesting, and provides line-specific error messages.', category: 'webdev' },
  
  // AI Tools
  { id: '23', question: 'Are AI features really free?', answer: 'Yes! AI tools are free but limited to 5 uses per day per user to ensure fair usage. The counter resets at midnight.', category: 'ai' },
  { id: '24', question: 'How accurate is the AI grammar checker?', answer: 'Our AI grammar checker catches most common errors but may not be perfect for specialized terminology. Always review suggestions.', category: 'ai' },
  { id: '25', question: 'Is my text data used to train AI?', answer: 'No. Your text is processed in real-time and immediately discarded. We do not store, log, or use your data for any purpose.', category: 'ai' },
  
  // Technical
  { id: '26', question: 'Why do some tools require JavaScript?', answer: 'All processing happens in your browser using JavaScript. This ensures your files stay private and never leave your device.', category: 'general' },
  { id: '27', question: 'Does ToolHive work offline?', answer: 'Most tools work offline once the page is loaded. However, AI features and some tools requiring external resources need an internet connection.', category: 'general' },
  { id: '28', question: 'Which browsers are supported?', answer: 'ToolHive works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for best performance.', category: 'general' },
  { id: '29', question: 'Can I report a bug or suggest a feature?', answer: 'Yes! Contact us at waninumaan621@gmail.com with bug reports or feature suggestions. We value user feedback.', category: 'general' },
  { id: '30', question: 'Who created ToolHive?', answer: 'ToolHive was created by Wani Numaan with the mission of providing free, privacy-focused online tools for everyone.', category: 'general' },
];

export const getFAQsByCategory = (category: string): FAQ[] => {
  if (category === 'all') return faqs;
  return faqs.filter(faq => faq.category === category);
};
