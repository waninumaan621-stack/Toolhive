import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { getToolById, getCategoryById, getToolsByCategory } from '../data/tools';
import { useStore } from '../store/useStore';
import AdBanner from '../components/Layout/AdBanner';

// Text Tools
import WordCounter from '../tools/text/WordCounter';
import CaseConverter from '../tools/text/CaseConverter';
import LoremIpsum from '../tools/text/LoremIpsum';
import { TextReverser, RemoveDuplicates, FindReplace, TextDiff, FancyText, ReadingTime, KeywordDensity, TextToSpeech, MarkdownToHtml, DuplicateWordRemover, TextRepeater } from '../tools/text/TextTools';

// Security Tools
import PasswordGenerator from '../tools/security/PasswordGenerator';
import HashGenerator from '../tools/security/HashGenerator';
import Base64Tool from '../tools/security/Base64Tool';
import UUIDGenerator from '../tools/security/UUIDGenerator';
import { UrlEncodeDecode, CaesarCipher, ROT13Encoder, RandomNumberGenerator, PasswordStrengthChecker, HMACGenerator, JWTDecoder } from '../tools/security/SecurityTools';

// Web Dev Tools
import QRGenerator from '../tools/webdev/QRGenerator';
import JSONFormatter from '../tools/webdev/JSONFormatter';
import ColorPicker from '../tools/webdev/ColorPicker';
import { HTMLMinifier, CSSMinifier, JSMinifier, MetaTagGenerator, RegexTester, WhatsAppLink, HTTPStatusCodes, RobotsTxtGenerator } from '../tools/webdev/WebDevTools';

// Image Tools
import ImageCompressor from '../tools/image/ImageCompressor';
import ImageConverter from '../tools/image/ImageConverter';
import ImageResizer from '../tools/image/ImageResizer';
import { GrayscaleImage, FlipRotateImage, ImageFilter, ColorExtractor, ImageToBase64, ScreenResolution } from '../tools/image/ImageTools';

// Office Tools
import AgeCalculator from '../tools/office/AgeCalculator';
import BMICalculator from '../tools/office/BMICalculator';
import UnitConverter from '../tools/office/UnitConverter';
import { TimestampConverter, DateCalculator, NumberToWords, MorseCode, PomodoroTimer, CoinFlipDice, TypingSpeedTest, LoanCalculator, PercentageCalculator } from '../tools/office/OfficeTools';

// Design Tools
import GradientGenerator from '../tools/design/GradientGenerator';
import BoxShadowGenerator from '../tools/design/BoxShadowGenerator';

// Math Tools
import ScientificCalculator from '../tools/math/ScientificCalculator';

// Social Tools
import HashtagGenerator from '../tools/social/HashtagGenerator';

// AI Tools
import AISummarizer from '../tools/ai/AISummarizer';
import AIGrammarChecker from '../tools/ai/AIGrammarChecker';
import AICodeExplainer from '../tools/ai/AICodeExplainer';
import AITranslator from '../tools/ai/AITranslator';
import AICaptionGenerator from '../tools/ai/AICaptionGenerator';

// Generic fallback
import GenericTool from '../tools/GenericTool';

const ToolPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = getToolById(toolId || '');
  const category = tool ? getCategoryById(tool.category) : null;
  const relatedTools = tool ? getToolsByCategory(tool.category).filter(t => t.id !== tool.id).slice(0, 4) : [];
  const { incrementToolUse, getRemainingAIUses } = useStore();

  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  if (!tool || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tool not found</h1>
          <Link to="/categories" className="text-[#1e3a5f] dark:text-[#d4a843] hover:underline">← Browse all tools</Link>
        </div>
      </div>
    );
  }

  incrementToolUse(tool.id);

  const renderTool = () => {
    switch (tool.id) {
      // Text Tools
      case 'word-counter': return <WordCounter />;
      case 'case-converter': return <CaseConverter />;
      case 'lorem-ipsum': return <LoremIpsum />;
      case 'text-reverser': return <TextReverser />;
      case 'remove-duplicates': return <RemoveDuplicates />;
      case 'find-replace': return <FindReplace />;
      case 'text-diff': return <TextDiff />;
      case 'fancy-text': return <FancyText />;
      case 'reading-time': return <ReadingTime />;
      case 'keyword-density': return <KeywordDensity />;
      case 'text-to-speech': return <TextToSpeech />;
      case 'markdown-to-html': return <MarkdownToHtml />;
      case 'duplicate-word-remover': return <DuplicateWordRemover />;
      case 'text-repeater': return <TextRepeater />;
      
      // Security Tools
      case 'password-generator': return <PasswordGenerator />;
      case 'password-strength': return <PasswordStrengthChecker />;
      case 'md5-hash':
      case 'sha256-hash':
      case 'sha512-hash': return <HashGenerator type={tool.id} />;
      case 'base64-encode': return <Base64Tool />;
      case 'url-encode': return <UrlEncodeDecode />;
      case 'uuid-generator': return <UUIDGenerator />;
      case 'random-number': return <RandomNumberGenerator />;
      case 'caesar-cipher': return <CaesarCipher />;
      case 'rot13-encoder': return <ROT13Encoder />;
      case 'hmac-generator': return <HMACGenerator />;
      case 'jwt-decoder': return <JWTDecoder />;
      
      // Web & Dev Tools
      case 'qr-generator': return <QRGenerator />;
      case 'json-formatter': return <JSONFormatter />;
      case 'color-picker': return <ColorPicker />;
      case 'html-minifier': return <HTMLMinifier />;
      case 'css-minifier': return <CSSMinifier />;
      case 'js-minifier': return <JSMinifier />;
      case 'meta-tag-generator': return <MetaTagGenerator />;
      case 'regex-tester': return <RegexTester />;
      case 'whatsapp-link': return <WhatsAppLink />;
      case 'http-status-codes': return <HTTPStatusCodes />;
      case 'robots-txt-generator': return <RobotsTxtGenerator />;
      
      // Image Tools
      case 'compress-image': return <ImageCompressor />;
      case 'convert-image': return <ImageConverter />;
      case 'resize-image': return <ImageResizer />;
      case 'grayscale-image': return <GrayscaleImage />;
      case 'flip-rotate-image': return <FlipRotateImage />;
      case 'image-filter': return <ImageFilter />;
      case 'color-extractor': return <ColorExtractor />;
      case 'image-to-base64': return <ImageToBase64 />;
      case 'screen-resolution': return <ScreenResolution />;
      
      // Office Tools
      case 'age-calculator': return <AgeCalculator />;
      case 'bmi-calculator': return <BMICalculator />;
      case 'unit-converter': return <UnitConverter />;
      case 'timestamp-converter': return <TimestampConverter />;
      case 'date-calculator': return <DateCalculator />;
      case 'number-to-words': return <NumberToWords />;
      case 'morse-code': return <MorseCode />;
      case 'pomodoro-timer': return <PomodoroTimer />;
      case 'coin-flip': return <CoinFlipDice />;
      case 'typing-speed': return <TypingSpeedTest />;
      case 'loan-calculator': return <LoanCalculator />;
      case 'percentage-calculator':
      case 'percentage-calc': return <PercentageCalculator />;
      
      // Design Tools
      case 'gradient-generator':
      case 'css-gradient': return <GradientGenerator />;
      case 'box-shadow-generator':
      case 'box-shadow': return <BoxShadowGenerator />;
      
      // Math Tools
      case 'scientific-calculator': return <ScientificCalculator />;
      
      // Social Tools
      case 'hashtag-generator': return <HashtagGenerator />;
      
      // AI Tools
      case 'ai-summarizer': return <AISummarizer />;
      case 'ai-grammar': return <AIGrammarChecker />;
      case 'ai-code-explainer': return <AICodeExplainer />;
      case 'ai-translator': return <AITranslator />;
      case 'ai-caption': return <AICaptionGenerator />;
      
      default: return <GenericTool tool={tool} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-gray-500 hover:text-[#1e3a5f] dark:hover:text-[#d4a843]">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/categories" className="text-gray-500 hover:text-[#1e3a5f] dark:hover:text-[#d4a843]">Categories</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to={`/category/${category.id}`} className="text-gray-500 hover:text-[#1e3a5f] dark:hover:text-[#d4a843]">{category.name}</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                  {getIcon(tool.icon, 'w-7 h-7')}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    {tool.name}
                    {tool.isAI && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#d4a843]/10 text-[#d4a843] text-sm rounded-full">
                        <Sparkles className="w-4 h-4" /> AI
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
                  {tool.isAI && (
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      AI uses remaining today: <span className="font-semibold text-[#d4a843]">{getRemainingAIUses()}/5</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              {renderTool()}
            </div>

            <AdBanner position="inline" className="mt-6" />

            {relatedTools.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTools.map((t) => (
                    <Link key={t.id} to={`/tools/${t.id}`} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all">
                      <div className="w-10 h-10 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-lg flex items-center justify-center text-[#1e3a5f] dark:text-[#d4a843]">
                        {getIcon(t.icon, 'w-5 h-5')}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{t.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <AdBanner position="sidebar" className="mb-6 hidden lg:block" />
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">About this tool</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>100% Free to use</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>No registration required</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Works in your browser</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Your data stays private</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
