import { useParams, Link } from 'react-router-dom';
import { getToolById } from '../lib/tools';
import ToolWrapper from '../components/ToolWrapper';

// PDF Tools
import PdfToJpg from '../tools/pdf/PdfToJpg';
import JpgToPdf from '../tools/pdf/JpgToPdf';
import MergePdf from '../tools/pdf/MergePdf';
import SplitPdf from '../tools/pdf/SplitPdf';
import CompressPdf from '../tools/pdf/CompressPdf';
import RotatePdf from '../tools/pdf/RotatePdf';
import PdfToText from '../tools/pdf/PdfToText';
import PdfWatermark from '../tools/pdf/PdfWatermark';
import PdfPageCount from '../tools/pdf/PdfPageCount';
import { PdfProtect, ImagesToPdf, PdfToImages } from '../tools/pdf/PdfExtra';

// Image Tools
import CompressImage from '../tools/image/CompressImage';
import ResizeImage from '../tools/image/ResizeImage';
import CropImage from '../tools/image/CropImage';
import ConvertImage from '../tools/image/ConvertImage';
import GrayscaleImage from '../tools/image/GrayscaleImage';
import FlipRotateImage from '../tools/image/FlipRotateImage';
import ImageToBase64 from '../tools/image/ImageToBase64';
import Base64ToImage from '../tools/image/Base64ToImage';
import ImageWatermark from '../tools/image/ImageWatermark';
import AddTextImage from '../tools/image/AddTextImage';
import ColorExtractor from '../tools/image/ColorExtractor';
import ScreenResolution from '../tools/image/ScreenResolution';
import SvgToPng from '../tools/image/SvgToPng';
import ImagesToZip from '../tools/image/ImagesToZip';

// Text Tools
import WordCounter from '../tools/text/WordCounter';
import CaseConverter from '../tools/text/CaseConverter';
import RemoveDuplicates from '../tools/text/RemoveDuplicates';
import TextReverser from '../tools/text/TextReverser';
import LoremIpsum from '../tools/text/LoremIpsum';
import FancyText from '../tools/text/FancyText';
import FindReplace from '../tools/text/FindReplace';
import TextDiff from '../tools/text/TextDiff';
import ReadingTime from '../tools/text/ReadingTime';
import KeywordDensity from '../tools/text/KeywordDensity';
import TextToSpeech from '../tools/text/TextToSpeech';
import SpeechToText from '../tools/text/SpeechToText';
import MarkdownToHtml from '../tools/text/MarkdownToHtml';
import HtmlToMarkdown from '../tools/text/HtmlToMarkdown';

// Security Tools
import PasswordGenerator from '../tools/security/PasswordGenerator';
import PasswordStrength from '../tools/security/PasswordStrength';
import Md5Hash from '../tools/security/Md5Hash';
import Sha256Hash from '../tools/security/Sha256Hash';
import Base64Encode from '../tools/security/Base64Encode';
import UrlEncode from '../tools/security/UrlEncode';
import UuidGenerator from '../tools/security/UuidGenerator';
import RandomNumber from '../tools/security/RandomNumber';

// Web & Dev Tools
import QrGenerator from '../tools/web/QrGenerator';
import QrScanner from '../tools/web/QrScanner';
import ColorPicker from '../tools/web/ColorPicker';
import JsonFormatter from '../tools/web/JsonFormatter';
import HtmlMinifier from '../tools/web/HtmlMinifier';
import CssMinifier from '../tools/web/CssMinifier';
import JsMinifier from '../tools/web/JsMinifier';
import CodeToImage from '../tools/web/CodeToImage';
import MetaTagGen from '../tools/web/MetaTagGen';
import FaviconGen from '../tools/web/FaviconGen';
import BarcodeGen from '../tools/web/BarcodeGen';
import DigitalSignature from '../tools/web/DigitalSignature';
import RobotsTxt from '../tools/web/RobotsTxt';
import InvoiceNumber from '../tools/web/InvoiceNumber';
import WhatsappLink from '../tools/web/WhatsappLink';
import RegexTester from '../tools/web/RegexTester';

// Office Tools
import CsvToJson from '../tools/office/CsvToJson';
import JsonToCsv from '../tools/office/JsonToCsv';
import CsvViewer from '../tools/office/CsvViewer';
import ExcelViewer from '../tools/office/ExcelViewer';
import WordToText from '../tools/office/WordToText';
import TimestampConverter from '../tools/office/TimestampConverter';
import DateCalculator from '../tools/office/DateCalculator';
import TimeZoneConverter from '../tools/office/TimeZoneConverter';
import NumberToWords from '../tools/office/NumberToWords';
import RomanNumerals from '../tools/office/RomanNumerals';
import MorseCode from '../tools/office/MorseCode';
import BinaryConverter from '../tools/office/BinaryConverter';
import ColorConverter from '../tools/office/ColorConverter';
import UnitConverter from '../tools/office/UnitConverter';
import PomodoroTimer from '../tools/office/PomodoroTimer';
import CoinFlip from '../tools/office/CoinFlip';
import TypingSpeed from '../tools/office/TypingSpeed';
import ZipFiles from '../tools/office/ZipFiles';
import FileSizeConverter from '../tools/office/FileSizeConverter';
import IpLookup from '../tools/office/IpLookup';

// File Tools
import TextFileCreator from '../tools/file/TextFileCreator';
import FileToBase64 from '../tools/file/FileToBase64';
import Base64ToFile from '../tools/file/Base64ToFile';
import WordFrequency from '../tools/file/WordFrequency';
import LineCounter from '../tools/file/LineCounter';
import FileCompare from '../tools/file/FileCompare';
import JsonValidator from '../tools/file/JsonValidator';
import XmlFormatter from '../tools/file/XmlFormatter';
import SqlFormatter from '../tools/file/SqlFormatter';
import HtmlFormatter from '../tools/file/HtmlFormatter';
import CharFrequency from '../tools/file/CharFrequency';
import TextSorter from '../tools/file/TextSorter';
import NumberSorter from '../tools/file/NumberSorter';
import ListRandomizer from '../tools/file/ListRandomizer';
import TextToList from '../tools/file/TextToList';
import SlugGenerator from '../tools/file/SlugGenerator';

const TOOL_COMPONENTS = {
  // PDF
  'pdf-to-jpg': PdfToJpg, 'jpg-to-pdf': JpgToPdf, 'merge-pdf': MergePdf,
  'split-pdf': SplitPdf, 'compress-pdf': CompressPdf, 'rotate-pdf': RotatePdf,
  'pdf-to-text': PdfToText, 'pdf-watermark': PdfWatermark, 'pdf-page-count': PdfPageCount,
  'pdf-protect': PdfProtect, 'images-to-pdf': ImagesToPdf, 'pdf-to-images': PdfToImages,
  // Image
  'compress-image': CompressImage, 'resize-image': ResizeImage, 'crop-image': CropImage,
  'convert-image': ConvertImage, 'grayscale-image': GrayscaleImage, 'flip-rotate-image': FlipRotateImage,
  'image-to-base64': ImageToBase64, 'base64-to-image': Base64ToImage, 'image-watermark': ImageWatermark,
  'add-text-image': AddTextImage, 'color-extractor': ColorExtractor, 'screen-resolution': ScreenResolution,
  'svg-to-png': SvgToPng, 'images-to-zip': ImagesToZip,
  // Text
  'word-counter': WordCounter, 'case-converter': CaseConverter, 'remove-duplicates': RemoveDuplicates,
  'text-reverser': TextReverser, 'lorem-ipsum': LoremIpsum, 'fancy-text': FancyText,
  'find-replace': FindReplace, 'text-diff': TextDiff, 'reading-time': ReadingTime,
  'keyword-density': KeywordDensity, 'text-to-speech': TextToSpeech, 'speech-to-text': SpeechToText,
  'markdown-to-html': MarkdownToHtml, 'html-to-markdown': HtmlToMarkdown,
  // Security
  'password-generator': PasswordGenerator, 'password-strength': PasswordStrength,
  'md5-hash': Md5Hash, 'sha256-hash': Sha256Hash, 'base64-encode': Base64Encode,
  'url-encode': UrlEncode, 'uuid-generator': UuidGenerator, 'random-number': RandomNumber,
  // Web
  'qr-generator': QrGenerator, 'qr-scanner': QrScanner, 'color-picker': ColorPicker,
  'json-formatter': JsonFormatter, 'html-minifier': HtmlMinifier, 'css-minifier': CssMinifier,
  'js-minifier': JsMinifier, 'code-to-image': CodeToImage, 'meta-tag-gen': MetaTagGen,
  'favicon-gen': FaviconGen, 'barcode-gen': BarcodeGen, 'digital-signature': DigitalSignature,
  'robots-txt': RobotsTxt, 'invoice-number': InvoiceNumber, 'whatsapp-link': WhatsappLink,
  'regex-tester': RegexTester,
  // Office
  'csv-to-json': CsvToJson, 'json-to-csv': JsonToCsv, 'csv-viewer': CsvViewer,
  'excel-viewer': ExcelViewer, 'word-to-text': WordToText, 'timestamp-converter': TimestampConverter,
  'date-calculator': DateCalculator, 'time-zone-converter': TimeZoneConverter,
  'number-to-words': NumberToWords, 'roman-numerals': RomanNumerals, 'morse-code': MorseCode,
  'binary-converter': BinaryConverter, 'color-converter': ColorConverter, 'unit-converter': UnitConverter,
  'pomodoro-timer': PomodoroTimer, 'coin-flip': CoinFlip, 'typing-speed': TypingSpeed,
  'zip-files': ZipFiles, 'file-size-converter': FileSizeConverter, 'ip-lookup': IpLookup,
  // File
  'text-file-creator': TextFileCreator, 'file-to-base64': FileToBase64, 'base64-to-file': Base64ToFile,
  'word-frequency': WordFrequency, 'line-counter': LineCounter, 'file-compare': FileCompare,
  'json-validator': JsonValidator, 'xml-formatter': XmlFormatter, 'sql-formatter': SqlFormatter,
  'html-formatter': HtmlFormatter, 'char-frequency': CharFrequency, 'text-sorter': TextSorter,
  'number-sorter': NumberSorter, 'list-randomizer': ListRandomizer, 'text-to-list': TextToList,
  'slug-generator': SlugGenerator,
};

export default function ToolPage() {
  const { id } = useParams();
  const tool = getToolById(id);
  const ToolComponent = TOOL_COMPONENTS[id];

  if (!tool || !ToolComponent) {
    return (
      <div className="text-center py-20 animate-fade-up">
        <p className="text-5xl mb-4">🔧</p>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tool not found</h1>
        <p className="text-gray-400 text-sm mb-5">This tool doesn't exist or was moved.</p>
        <Link to="/" className="btn-gold px-6 py-2.5">Browse all tools</Link>
      </div>
    );
  }

  return (
    <ToolWrapper tool={tool}>
      <ToolComponent tool={tool} />
    </ToolWrapper>
  );
}
