// 🌍 Supported Languages
export type Language = 'en' | 'hi' | 'mr';

// 🧠 All Translation Keys (VERY IMPORTANT)
type TranslationKeys = {
  // Dashboard
  dashboard: string;
  learn: string;
  quiz: string;
  chat: string;
  detector: string;
  progress: string;
  emergency: string;

  // Learn Module
  upi: string;
  govt: string;

  // Quiz
  question: string;
  option1: string;
  option2: string;

  // Chat
  send: string;
  speak: string;
  placeholder: string;

  // Detector
  detect: string;
  upload: string;
  result: string;

  // Progress
  risk: string;

  // Emergency
  call: string;
  report: string;
};

// 🌐 Translations
export const t: Record<Language, TranslationKeys> = {
  // 🇬🇧 ENGLISH
  en: {
    dashboard: "Digital Aadhaar",
    learn: "Learn",
    quiz: "Quiz",
    chat: "Scam Chat",
    detector: "Scam Detector",
    progress: "Progress",
    emergency: "Emergency",

    upi: "UPI Training",
    govt: "Government Schemes",

    question: "You received ₹5000. Click the link?",
    option1: "Click Link",
    option2: "Ignore",

    send: "Send",
    speak: "Speak",
    placeholder: "Type your reply...",

    detect: "Detect Scam",
    upload: "Upload Image",
    result: "Analysis Result",

    risk: "Risk Score",

    call: "Call Helpline",
    report: "Report Scam"
  },

  // 🇮🇳 HINDI
  hi: {
    dashboard: "डिजिटल आधार",
    learn: "सीखें",
    quiz: "प्रश्नोत्तरी",
    chat: "स्कैम चैट",
    detector: "स्कैम जांच",
    progress: "प्रगति",
    emergency: "आपातकाल",

    upi: "यूपीआई प्रशिक्षण",
    govt: "सरकारी योजनाएं",

    question: "आपको ₹5000 मिले। लिंक खोलें?",
    option1: "लिंक खोलें",
    option2: "अनदेखा करें",

    send: "भेजें",
    speak: "बोलें",
    placeholder: "अपना जवाब लिखें...",

    detect: "स्कैम जांचें",
    upload: "छवि अपलोड करें",
    result: "परिणाम",

    risk: "जोखिम स्कोर",

    call: "हेल्पलाइन कॉल करें",
    report: "शिकायत करें"
  },

  // 🇮🇳 MARATHI
  mr: {
    dashboard: "डिजिटल आधार",
    learn: "शिका",
    quiz: "क्विझ",
    chat: "स्कॅम चॅट",
    detector: "स्कॅम तपास",
    progress: "प्रगती",
    emergency: "आपत्कालीन",

    upi: "UPI प्रशिक्षण",
    govt: "शासकीय योजना",

    question: "तुम्हाला ₹5000 मिळाले. लिंक उघडाल का?",
    option1: "लिंक उघडा",
    option2: "दुर्लक्ष करा",

    send: "पाठवा",
    speak: "बोला",
    placeholder: "तुमचा प्रतिसाद लिहा...",

    detect: "स्कॅम तपासा",
    upload: "प्रतिमा अपलोड करा",
    result: "निकाल",

    risk: "धोका स्कोअर",

    call: "हेल्पलाइन कॉल",
    report: "तक्रार करा"
  }
};