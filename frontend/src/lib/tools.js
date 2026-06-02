export const TOOLS = [
  // PDF Tools (12)
  { id: 'pdf-to-jpg', name: 'PDF to JPG', category: 'pdf', icon: '📄', desc: 'Convert PDF pages to JPG images', limit: '50MB' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', category: 'pdf', icon: '🖼️', desc: 'Convert images to PDF document', limit: '25MB' },
  { id: 'merge-pdf', name: 'Merge PDF', category: 'pdf', icon: '🔗', desc: 'Combine multiple PDFs into one', limit: '50MB each' },
  { id: 'split-pdf', name: 'Split PDF', category: 'pdf', icon: '✂️', desc: 'Split PDF into separate pages', limit: '50MB' },
  { id: 'compress-pdf', name: 'Compress PDF', category: 'pdf', icon: '🗜️', desc: 'Reduce PDF file size', limit: '50MB' },
  { id: 'rotate-pdf', name: 'Rotate PDF', category: 'pdf', icon: '🔄', desc: 'Rotate PDF pages any angle', limit: '50MB' },
  { id: 'pdf-to-text', name: 'PDF to Text', category: 'pdf', icon: '📝', desc: 'Extract text from PDF files', limit: '50MB' },
  { id: 'pdf-watermark', name: 'PDF Watermark', category: 'pdf', icon: '💧', desc: 'Add text watermark to PDF', limit: '50MB' },
  { id: 'pdf-page-count', name: 'PDF Page Count', category: 'pdf', icon: '🔢', desc: 'Count pages and get PDF info', limit: '50MB' },
  { id: 'pdf-protect', name: 'PDF Protect', category: 'pdf', icon: '🔒', desc: 'Add password to PDF', limit: '50MB' },
  { id: 'images-to-pdf', name: 'Images to PDF', category: 'pdf', icon: '📑', desc: 'Convert multiple images to one PDF', limit: '25MB each' },
  { id: 'pdf-to-images', name: 'PDF to Images', category: 'pdf', icon: '🖼️', desc: 'Extract all pages as images', limit: '50MB' },

  // Image Tools (14)
  { id: 'compress-image', name: 'Compress Image', category: 'image', icon: '🗜️', desc: 'Reduce image file size', limit: '25MB' },
  { id: 'resize-image', name: 'Resize Image', category: 'image', icon: '📐', desc: 'Resize to any dimension', limit: '25MB' },
  { id: 'crop-image', name: 'Crop Image', category: 'image', icon: '✂️', desc: 'Crop image to any size', limit: '25MB' },
  { id: 'convert-image', name: 'Convert Image', category: 'image', icon: '🔄', desc: 'JPG ↔ PNG ↔ WEBP conversion', limit: '25MB' },
  { id: 'grayscale-image', name: 'Grayscale Image', category: 'image', icon: '⚫', desc: 'Convert image to black & white', limit: '25MB' },
  { id: 'flip-rotate-image', name: 'Flip & Rotate', category: 'image', icon: '↕️', desc: 'Flip or rotate any image', limit: '25MB' },
  { id: 'image-to-base64', name: 'Image to Base64', category: 'image', icon: '🔡', desc: 'Convert image to base64 string', limit: '25MB' },
  { id: 'base64-to-image', name: 'Base64 to Image', category: 'image', icon: '🖼️', desc: 'Convert base64 back to image', limit: 'Text only' },
  { id: 'image-watermark', name: 'Image Watermark', category: 'image', icon: '💧', desc: 'Add text watermark to image', limit: '25MB' },
  { id: 'add-text-image', name: 'Add Text to Image', category: 'image', icon: '✍️', desc: 'Add custom text on images', limit: '25MB' },
  { id: 'color-extractor', name: 'Color Extractor', category: 'image', icon: '🎨', desc: 'Extract colors from any image', limit: '25MB' },
  { id: 'screen-resolution', name: 'Screen Resolution', category: 'image', icon: '🖥️', desc: 'Check your screen resolution', limit: 'No upload' },
  { id: 'svg-to-png', name: 'SVG to PNG', category: 'image', icon: '🔷', desc: 'Convert SVG vector to PNG image', limit: '10MB' },
  { id: 'images-to-zip', name: 'Images to ZIP', category: 'image', icon: '📦', desc: 'Bundle multiple images into ZIP', limit: '25MB each' },

  // Text Tools (14)
  { id: 'word-counter', name: 'Word Counter', category: 'text', icon: '🔢', desc: 'Count words, chars, sentences', limit: 'No limit' },
  { id: 'case-converter', name: 'Case Converter', category: 'text', icon: 'Aa', desc: 'UPPER, lower, Title, Sentence', limit: 'No limit' },
  { id: 'remove-duplicates', name: 'Remove Duplicates', category: 'text', icon: '🧹', desc: 'Remove duplicate lines from text', limit: 'No limit' },
  { id: 'text-reverser', name: 'Text Reverser', category: 'text', icon: '⬅️', desc: 'Reverse any text instantly', limit: 'No limit' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum', category: 'text', icon: '📄', desc: 'Generate placeholder text', limit: 'No limit' },
  { id: 'fancy-text', name: 'Fancy Text', category: 'text', icon: '✨', desc: 'Convert to stylish Unicode fonts', limit: 'No limit' },
  { id: 'find-replace', name: 'Find & Replace', category: 'text', icon: '🔍', desc: 'Find and replace text in bulk', limit: 'No limit' },
  { id: 'text-diff', name: 'Text Diff', category: 'text', icon: '🔀', desc: 'Compare two texts side by side', limit: 'No limit' },
  { id: 'reading-time', name: 'Reading Time', category: 'text', icon: '⏱️', desc: 'Estimate reading time for text', limit: 'No limit' },
  { id: 'keyword-density', name: 'Keyword Density', category: 'text', icon: '📊', desc: 'Analyze keyword frequency', limit: 'No limit' },
  { id: 'text-to-speech', name: 'Text to Speech', category: 'text', icon: '🔊', desc: 'Convert text to spoken audio', limit: '5000 chars' },
  { id: 'speech-to-text', name: 'Speech to Text', category: 'text', icon: '🎙️', desc: 'Convert your voice to text', limit: 'Microphone' },
  { id: 'markdown-to-html', name: 'Markdown to HTML', category: 'text', icon: '📋', desc: 'Convert Markdown to HTML code', limit: 'No limit' },
  { id: 'html-to-markdown', name: 'HTML to Markdown', category: 'text', icon: '📝', desc: 'Convert HTML to Markdown text', limit: 'No limit' },

  // Security Tools (8)
  { id: 'password-generator', name: 'Password Generator', category: 'security', icon: '🔑', desc: 'Generate strong passwords', limit: 'No limit' },
  { id: 'password-strength', name: 'Password Strength', category: 'security', icon: '🛡️', desc: 'Check how strong your password is', limit: 'No limit' },
  { id: 'md5-hash', name: 'MD5 Hash', category: 'security', icon: '#️⃣', desc: 'Generate MD5 hash of any text', limit: 'No limit' },
  { id: 'sha256-hash', name: 'SHA256 Hash', category: 'security', icon: '🔐', desc: 'Generate SHA256 hash', limit: 'No limit' },
  { id: 'base64-encode', name: 'Base64 Encode/Decode', category: 'security', icon: '🔠', desc: 'Encode or decode Base64 text', limit: 'No limit' },
  { id: 'url-encode', name: 'URL Encode/Decode', category: 'security', icon: '🌐', desc: 'Encode or decode URLs', limit: 'No limit' },
  { id: 'uuid-generator', name: 'UUID Generator', category: 'security', icon: '🎲', desc: 'Generate unique UUIDs instantly', limit: 'No limit' },
  { id: 'random-number', name: 'Random Number', category: 'security', icon: '🎰', desc: 'Generate random numbers in range', limit: 'No limit' },

  // Web & Dev Tools (16)
  { id: 'qr-generator', name: 'QR Code Generator', category: 'web', icon: '📱', desc: 'Generate QR codes for any URL', limit: 'No limit' },
  { id: 'qr-scanner', name: 'QR Code Scanner', category: 'web', icon: '📷', desc: 'Scan QR codes with camera or image', limit: 'Camera / 5MB' },
  { id: 'color-picker', name: 'Color Picker', category: 'web', icon: '🎨', desc: 'Pick colors and get HEX/RGB/HSL', limit: 'No limit' },
  { id: 'json-formatter', name: 'JSON Formatter', category: 'web', icon: '{ }', desc: 'Format and validate JSON', limit: 'No limit' },
  { id: 'html-minifier', name: 'HTML Minifier', category: 'web', icon: '📦', desc: 'Minify HTML code', limit: 'No limit' },
  { id: 'css-minifier', name: 'CSS Minifier', category: 'web', icon: '🎨', desc: 'Minify CSS stylesheets', limit: 'No limit' },
  { id: 'js-minifier', name: 'JS Minifier', category: 'web', icon: '⚡', desc: 'Minify JavaScript code', limit: 'No limit' },
  { id: 'code-to-image', name: 'Code to Image', category: 'web', icon: '📸', desc: 'Beautiful code screenshots', limit: 'No limit' },
  { id: 'meta-tag-gen', name: 'Meta Tag Generator', category: 'web', icon: '🏷️', desc: 'Generate SEO meta tags', limit: 'No limit' },
  { id: 'favicon-gen', name: 'Favicon Generator', category: 'web', icon: '⭐', desc: 'Create favicon from any image', limit: '5MB' },
  { id: 'barcode-gen', name: 'Barcode Generator', category: 'web', icon: '|||', desc: 'Generate barcodes instantly', limit: 'No limit' },
  { id: 'digital-signature', name: 'Digital Signature', category: 'web', icon: '✍️', desc: 'Draw and download your signature', limit: 'No upload' },
  { id: 'robots-txt', name: 'Robots.txt Generator', category: 'web', icon: '🤖', desc: 'Generate robots.txt for your site', limit: 'No limit' },
  { id: 'invoice-number', name: 'Invoice Number Gen', category: 'web', icon: '🧾', desc: 'Generate unique invoice numbers', limit: 'No limit' },
  { id: 'whatsapp-link', name: 'WhatsApp Link Gen', category: 'web', icon: '💬', desc: 'Create WhatsApp chat links instantly', limit: 'No limit' },
  { id: 'regex-tester', name: 'Regex Tester', category: 'web', icon: '🔬', desc: 'Test and debug regex patterns', limit: 'No limit' },

  // Office Tools (20)
  { id: 'csv-to-json', name: 'CSV to JSON', category: 'office', icon: '📊', desc: 'Convert CSV data to JSON format', limit: '10MB' },
  { id: 'json-to-csv', name: 'JSON to CSV', category: 'office', icon: '📋', desc: 'Convert JSON data to CSV format', limit: '10MB' },
  { id: 'csv-viewer', name: 'CSV Viewer', category: 'office', icon: '📈', desc: 'View and analyze CSV files as table', limit: '10MB' },
  { id: 'excel-viewer', name: 'Excel Viewer', category: 'office', icon: '📗', desc: 'View Excel XLSX files in browser', limit: '10MB' },
  { id: 'word-to-text', name: 'Word to Text', category: 'office', icon: '📄', desc: 'Extract text from Word documents', limit: '10MB' },
  { id: 'timestamp-converter', name: 'Timestamp Converter', category: 'office', icon: '🕐', desc: 'Convert Unix timestamp to date', limit: 'No limit' },
  { id: 'date-calculator', name: 'Date Calculator', category: 'office', icon: '📅', desc: 'Calculate days between two dates', limit: 'No limit' },
  { id: 'time-zone-converter', name: 'Time Zone Converter', category: 'office', icon: '🌍', desc: 'Convert time between time zones', limit: 'No limit' },
  { id: 'number-to-words', name: 'Number to Words', category: 'office', icon: '🔤', desc: 'Convert numbers to written words', limit: 'No limit' },
  { id: 'roman-numerals', name: 'Roman Numerals', category: 'office', icon: 'Ⅻ', desc: 'Convert numbers to Roman numerals', limit: 'No limit' },
  { id: 'morse-code', name: 'Morse Code', category: 'office', icon: '📡', desc: 'Translate text to Morse code', limit: 'No limit' },
  { id: 'binary-converter', name: 'Binary Converter', category: 'office', icon: '01', desc: 'Convert text to binary and back', limit: 'No limit' },
  { id: 'color-converter', name: 'Color Converter', category: 'office', icon: '🎨', desc: 'Convert between HEX, RGB, HSL', limit: 'No limit' },
  { id: 'unit-converter', name: 'Unit Converter', category: 'office', icon: '📏', desc: 'Convert length, weight, temperature', limit: 'No limit' },
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', category: 'office', icon: '⏰', desc: 'Focus timer with work/break cycles', limit: 'No limit' },
  { id: 'coin-flip', name: 'Coin Flip & Dice', category: 'office', icon: '🎲', desc: 'Flip coins and roll dice online', limit: 'No limit' },
  { id: 'typing-speed', name: 'Typing Speed Test', category: 'office', icon: '⌨️', desc: 'Test your typing speed in WPM', limit: 'No limit' },
  { id: 'zip-files', name: 'ZIP Files', category: 'office', icon: '🗜️', desc: 'Compress files into a ZIP archive', limit: '50MB total' },
  { id: 'file-size-converter', name: 'File Size Converter', category: 'office', icon: '💾', desc: 'Convert between KB, MB, GB, TB', limit: 'No limit' },
  { id: 'ip-lookup', name: 'IP Address Info', category: 'office', icon: '🌐', desc: 'Look up information about any IP', limit: 'No limit' },

  // File Tools (16)
  { id: 'text-file-creator', name: 'Text File Creator', category: 'file', icon: '📝', desc: 'Create and download .txt files', limit: 'No limit' },
  { id: 'file-to-base64', name: 'File to Base64', category: 'file', icon: '🔡', desc: 'Convert any file to base64 string', limit: '5MB' },
  { id: 'base64-to-file', name: 'Base64 to File', category: 'file', icon: '📁', desc: 'Convert base64 string back to file', limit: 'Text only' },
  { id: 'word-frequency', name: 'Word Frequency', category: 'file', icon: '📊', desc: 'Analyze word frequency in a file', limit: '5MB' },
  { id: 'line-counter', name: 'Line Counter', category: 'file', icon: '🔢', desc: 'Count lines in any text file', limit: '5MB' },
  { id: 'file-compare', name: 'File Compare', category: 'file', icon: '🔀', desc: 'Compare two text files', limit: '5MB each' },
  { id: 'json-validator', name: 'JSON Validator', category: 'file', icon: '✅', desc: 'Validate and check JSON syntax', limit: 'No limit' },
  { id: 'xml-formatter', name: 'XML Formatter', category: 'file', icon: '📋', desc: 'Format and validate XML code', limit: 'No limit' },
  { id: 'sql-formatter', name: 'SQL Formatter', category: 'file', icon: '🗄️', desc: 'Format and beautify SQL queries', limit: 'No limit' },
  { id: 'html-formatter', name: 'HTML Formatter', category: 'file', icon: '🌐', desc: 'Beautify and format HTML code', limit: 'No limit' },
  { id: 'char-frequency', name: 'Character Frequency', category: 'file', icon: '📈', desc: 'Count frequency of each character', limit: 'No limit' },
  { id: 'text-sorter', name: 'Text Line Sorter', category: 'file', icon: '🔤', desc: 'Sort lines alphabetically or reverse', limit: 'No limit' },
  { id: 'number-sorter', name: 'Number Sorter', category: 'file', icon: '🔢', desc: 'Sort a list of numbers', limit: 'No limit' },
  { id: 'list-randomizer', name: 'List Randomizer', category: 'file', icon: '🎲', desc: 'Shuffle and randomize any list', limit: 'No limit' },
  { id: 'text-to-list', name: 'Text to List', category: 'file', icon: '📋', desc: 'Split text into formatted list', limit: 'No limit' },
  { id: 'slug-generator', name: 'Slug Generator', category: 'file', icon: '🔗', desc: 'Generate URL-friendly slugs', limit: 'No limit' },
];

export const CATEGORIES = [
  { id: 'pdf', name: 'PDF Tools', icon: '📄', color: 'red' },
  { id: 'image', name: 'Image Tools', icon: '🖼️', color: 'blue' },
  { id: 'text', name: 'Text Tools', icon: '✍️', color: 'green' },
  { id: 'security', name: 'Security Tools', icon: '🔐', color: 'purple' },
  { id: 'web', name: 'Web & Dev Tools', icon: '🌐', color: 'gold' },
  { id: 'office', name: 'Office Tools', icon: '💼', color: 'orange' },
  { id: 'file', name: 'File Tools', icon: '📁', color: 'teal' },
];

export const getToolsByCategory = (cat) => TOOLS.filter(t => t.category === cat);
export const getToolById = (id) => TOOLS.find(t => t.id === id);
export const searchTools = (query) => {
  const q = query.toLowerCase();
  return TOOLS.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.desc.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
};
