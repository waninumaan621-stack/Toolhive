import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// HTML Minifier
export const HTMLMinifier = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const minify = (html: string) => {
    return html
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  };

  const output = minify(input);
  const savings = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HTML Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your HTML code here..."
          className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
        />
      </div>
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Minified ({savings}% smaller)
            </label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white resize-none font-mono text-sm"
          />
          <p className="text-sm text-gray-500 mt-2">{input.length} → {output.length} characters</p>
        </div>
      )}
    </div>
  );
};

// CSS Minifier
export const CSSMinifier = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const minify = (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .replace(/;\}/g, '}')
      .trim();
  };

  const output = minify(input);
  const savings = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CSS Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your CSS code here..."
          className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
        />
      </div>
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Minified ({savings}% smaller)
            </label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
};

// JS Minifier
export const JSMinifier = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const minify = (js: string) => {
    return js
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
      .trim();
  };

  const output = minify(input);
  const savings = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JavaScript Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JavaScript code here..."
          className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
        />
      </div>
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Minified ({savings}% smaller)
            </label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
};

// Meta Tag Generator
export const MetaTagGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    let tags = '';
    if (title) tags += `<title>${title}</title>\n`;
    if (description) tags += `<meta name="description" content="${description}">\n`;
    if (keywords) tags += `<meta name="keywords" content="${keywords}">\n`;
    if (author) tags += `<meta name="author" content="${author}">\n`;
    if (title) tags += `<meta property="og:title" content="${title}">\n`;
    if (description) tags += `<meta property="og:description" content="${description}">\n`;
    if (ogImage) tags += `<meta property="og:image" content="${ogImage}">\n`;
    tags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    tags += `<meta charset="UTF-8">`;
    return tags;
  };

  const output = generateTags();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Website" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description (150-160 chars recommended)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of your page..." className="w-full h-20 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" />
        <p className="text-xs text-gray-500 mt-1">{description.length}/160 characters</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keywords (comma separated)</label>
        <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Image URL</label>
        <input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Meta Tags</label>
          <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
        <pre className="p-4 bg-gray-900 rounded-xl text-green-400 text-sm overflow-x-auto">{output}</pre>
      </div>
    </div>
  );
};

// Regex Tester
export const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');

  const getMatches = () => {
    if (!pattern) return [];
    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      const matches: { match: string; index: number; groups?: string[] }[] = [];
      let match;
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({ match: match[0], index: match.index, groups: match.slice(1) });
        }
      } else {
        match = regex.exec(testString);
        if (match) matches.push({ match: match[0], index: match.index, groups: match.slice(1) });
      }
      return matches;
    } catch (e) {
      setError('Invalid regular expression');
      return [];
    }
  };

  const matches = getMatches();

  const highlightMatches = () => {
    if (!pattern || !testString || error) return testString;
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      return testString.replace(regex, '<mark class="bg-yellow-300 dark:bg-yellow-600">$&</mark>');
    } catch {
      return testString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Regular Expression</label>
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700">
            <span className="text-gray-400">/</span>
            <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="[a-z]+" className="flex-1 bg-transparent text-gray-900 dark:text-white outline-none font-mono" />
            <span className="text-gray-400">/</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Flags</label>
          <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gim" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test String</label>
        <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against..." className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" />
      </div>
      {testString && pattern && !error && (
        <>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Highlighted Matches ({matches.length})</label>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl" dangerouslySetInnerHTML={{ __html: highlightMatches() }} />
          </div>
          {matches.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Match Details</label>
              <div className="space-y-2">
                {matches.map((m, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
                    <span className="font-mono text-[#1e3a5f] dark:text-[#d4a843]">"{m.match}"</span>
                    <span className="text-gray-500 ml-2">at index {m.index}</span>
                    {m.groups && m.groups.length > 0 && (
                      <span className="text-gray-500 ml-2">groups: [{m.groups.join(', ')}]</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// WhatsApp Link Generator
export const WhatsAppLink = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
  };

  const link = generateLink();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number (with country code)</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1234567890" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pre-filled Message (optional)</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Hello! I'm interested in..." className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" />
      </div>
      {phone && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Link</label>
            <button onClick={() => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl break-all font-mono text-sm text-gray-900 dark:text-white">{link}</div>
          <a href={link} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full py-3 bg-green-500 hover:bg-green-600 text-white text-center rounded-xl font-semibold">
            Open in WhatsApp
          </a>
        </div>
      )}
    </div>
  );
};

// HTTP Status Codes
export const HTTPStatusCodes = () => {
  const [search, setSearch] = useState('');
  
  const codes = [
    { code: 100, name: 'Continue', desc: 'Server received request headers' },
    { code: 101, name: 'Switching Protocols', desc: 'Server is switching protocols' },
    { code: 200, name: 'OK', desc: 'Request succeeded' },
    { code: 201, name: 'Created', desc: 'Resource created successfully' },
    { code: 204, name: 'No Content', desc: 'Success but no content to return' },
    { code: 301, name: 'Moved Permanently', desc: 'Resource moved to new URL' },
    { code: 302, name: 'Found', desc: 'Resource temporarily at different URL' },
    { code: 304, name: 'Not Modified', desc: 'Resource not modified since last request' },
    { code: 400, name: 'Bad Request', desc: 'Invalid request syntax' },
    { code: 401, name: 'Unauthorized', desc: 'Authentication required' },
    { code: 403, name: 'Forbidden', desc: 'Access denied' },
    { code: 404, name: 'Not Found', desc: 'Resource not found' },
    { code: 405, name: 'Method Not Allowed', desc: 'HTTP method not supported' },
    { code: 408, name: 'Request Timeout', desc: 'Server timed out waiting' },
    { code: 429, name: 'Too Many Requests', desc: 'Rate limit exceeded' },
    { code: 500, name: 'Internal Server Error', desc: 'Server encountered an error' },
    { code: 501, name: 'Not Implemented', desc: 'Server does not support functionality' },
    { code: 502, name: 'Bad Gateway', desc: 'Invalid response from upstream server' },
    { code: 503, name: 'Service Unavailable', desc: 'Server temporarily unavailable' },
    { code: 504, name: 'Gateway Timeout', desc: 'Upstream server timed out' },
  ];

  const filtered = codes.filter(c => 
    c.code.toString().includes(search) || 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  );

  const getColor = (code: number) => {
    if (code < 200) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (code < 300) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (code < 400) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (code < 500) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  return (
    <div className="space-y-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by code or description..."
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.code} className={`p-4 rounded-xl ${getColor(c.code)}`}>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{c.code}</span>
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm opacity-80">{c.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Robots.txt Generator
export const RobotsTxtGenerator = () => {
  const [sitemap, setSitemap] = useState('');
  const [disallow, setDisallow] = useState(['/admin/', '/private/']);
  const [crawlDelay, setCrawlDelay] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let txt = 'User-agent: *\n';
    disallow.forEach(d => { if (d) txt += `Disallow: ${d}\n`; });
    if (crawlDelay) txt += `Crawl-delay: ${crawlDelay}\n`;
    txt += '\n';
    if (sitemap) txt += `Sitemap: ${sitemap}\n`;
    return txt;
  };

  const output = generate();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sitemap URL</label>
        <input value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Disallow Paths (one per line)</label>
        <textarea value={disallow.join('\n')} onChange={(e) => setDisallow(e.target.value.split('\n'))} placeholder="/admin/&#10;/private/" className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Crawl Delay (seconds)</label>
        <input type="number" value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} placeholder="10" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">robots.txt</label>
          <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
        <pre className="p-4 bg-gray-900 rounded-xl text-green-400 text-sm">{output}</pre>
      </div>
    </div>
  );
};
