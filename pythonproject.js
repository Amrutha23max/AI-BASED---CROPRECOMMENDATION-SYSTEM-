/* ===========================
   AgriXAI — app.js
   =========================== */

// ---- TRANSLATIONS ----
// ---- PAGE NAVIGATION CONFIG ----
const BACKEND_URL = "https://crop-backend-lwhy.onrender.com";
// 1. PAGE CONFIGURATION
let analysisDone = false;
const pageSequence = ["home", "phone", "otp", "location", "choice", "upload", "manual", "analyzing", "results", "guidance", "suggestions", "contact"];


const translations = {
  en: {
    navAbout: "AI-powered crop recommendations using soil and climate data.",
    tagline: "Smart Soil. Smart Crops.",
    subtitle: "AI-powered crop recommendations for every farmer",
    heroAbout: "AgriXAI is an advanced AI-powered platform dedicated to helping Indian farmers make data-driven decisions. By combining soil science with machine learning, we provide instant crop recommendations based on your unique soil health and local climate conditions to enhance productivity and sustainability.",
    startBtn: "🚀 Start Analysis",
    featuresTitle: "Features",
    featureSoil: "Soil Analysis",
    featureCrop: "Crop Advice",
    cropRotation: "Crop Rotation",
    expertTitle: "Expert Suggestions",
    sug1: '"Integrate real-time market prices for the recommended crops to help farmers calculate potential profit."',
    sug1Author: "- Dr. Aruna, Agronomist",
    sug2: '"Add a fertilizer calculator based on the specific nutrient deficiency found in the soil analysis."',
    sug2Author: "- Ramesh Rao, Agri-Tech Expert",
    sug3: '"Implement a satellite-based weather alert system to warn farmers about upcoming heavy rainfall."',
    sug3Author: "- ISRO Research Team",
    phoneTitle: "Verify Identity",
    phoneDesc: "Please enter your phone number to continue.",
    getOtpBtn: "Get OTP",
    otpTitle: "Enter OTP",
    otpDesc: "We have sent a 4-digit code to your phone.",
    verifyBtn: "Verify & Continue",
    locationTitle: "Your Location",
    locationDesc: "We need your location for climate data",
    allowLocation: "📍 Use My Location",
    manualLocation: "Or enter manually",
    continueBtn: "Continue →",
    choiceTitle: "Choose Analysis Method",
    choiceDesc: "How would you like to provide your soil details?",
    imgUploadBtn: "📸 Upload Soil Image",
    orText: "OR",
    manualEntryBtn: "⌨️ Enter Data Manually",
    processTitle: "Analysis Process",
    step1: 'Click "Choose Image"',
    step2: "Select a clear soil photo",
    step3: 'Click "Analyze Soil"',
    step4: "View AI Crop Result",
    uploadPageTitle: "Upload Image",
    chooseImgBtn: "Choose Image",
    analyzeSoilBtn: "🔬 Analyze Soil",
    manualProcessTitle: "Manual Entry Process",
    mStep1: "Enter Nutrients (N, P, K)",
    mStep2: "Enter Soil pH Level",
    mStep3: "Enter Climate Details",
    mStep4: "Submit for AI Analysis",
    soilLabTitle: "Soil Lab Data",
    soilLabDesc: "Please enter the values from your soil test report.",
    labelN: "Nitrogen (N)",
    labelP: "Phosphorus (P)",
    labelK: "Potassium (K)",
    labelPH: "pH Level",
    labelTemp: "Temperature",
    labelHumidity: "Humidity",
    labelRain: "Rainfall",
    analyzeDataBtn: "🔬 Analyze Data",
    detecting: "Analyzing your soil...",
    resultsTitle: "Your Results",
    soilType: "Soil Type",
    confidence: "Confidence",
    cropRec: "Recommended Crop",
    whyCrop: "Why this crop?",
    startOver: "🔄 Start New Analysis",
    sugPageTitle: "💡 Community Suggestions",
    sugPageDesc: "See what experts and farmers are saying about AgriXAI.",
    addSugTitle: "✍️ Add Your Suggestion",
    addSugDesc: "Have an idea to improve AgriXAI? Share it below.",
    nameLabel: "Name & Profession",
    sugLabel: "Your Suggestion",
    submitSug: "🚀 Submit Suggestion",
    backHome: "← Back to Home",
    contactTitle: "📞 Contact Support",
    contactDesc: "Have questions? Our agronomists are here to help.",
    emailLabel: "Email:",
    phoneLabel: "Phone:",
    addressLabel: "Address:",
    msgPlaceholder: "Type your message here...",
    sendMsg: "Send Message",
    footer: "AgriXAI — Empowering farmers with AI",
    team: "Team",
    teamDesc: "Developed by AgriXAI Research Team, Hyderabad.",
    footerCopy: "© 2024 AgriXAI · Made with 💚 for Indian Farmers",
    chatTitle: "🌱 AgriBot AI",
    sideHome: "🏠 Home",
    sideFeatures: "✨ Features",
    sideSuggestions: "💡 Suggestions",
    sideAbout: "📖 About",
    sideContact: "📞 Contact",
    yourOtp: "YOUR OTP",
    phonePlaceholder: "Enter 10 digit number",
    chatPlaceholder: "Ask about crops, soil...",
    sending: "⏳ Sending...",
    serverError: "❌ Server error. Please try again.",
    noSuggestions: "No suggestions yet. Be the first!",
    sugLoadError: "Could not load suggestions. Please try again.",
    listening: "Listening...",
    chatPlaceholderDefault: "Ask about crops, soil...",
    locPermDenied: "Location permission denied. Please allow location access in your browser settings, or enter manually.",
    locUnavailable: "Location unavailable. Please enter your location manually.",
    locTimeout: "Location request timed out. Please try again or enter manually.",
    locError: "Could not detect location. Please enter manually.",
    otpInvalid: "❌ Invalid OTP, try again.",
    otpVerified: "✅ Phone verified!",
    phoneInvalid: "⚠️ Please enter a valid 10-digit number.",
    contactEmpty: "⚠️ Please type a message first.",
    contactSent: "✅ Message sent! We will get back to you soon.",
    sugEmpty: "⚠️ Please fill all fields.",
    ttsOn: "🔊 Voice replies ON",
    ttsOff: "🔇 Voice replies OFF",
    locDetected: "✅ Location Detected!",
    locDetecting: "⏳ Detecting...",
  },
  te: {
    navAbout: "మట్టి మరియు వాతావరణ డేటా ఉపయోగించి AI-ఆధారిత పంట సిఫార్సులు.",
    tagline: "తెలివైన మట్టి. తెలివైన పంటలు.",
    subtitle: "ప్రతి రైతుకు AI-ఆధారిత పంట సిఫార్సులు",
    heroAbout: "AgriXAI అనేది భారతీయ రైతులు డేటా-ఆధారిత నిర్ణయాలు తీసుకోవడంలో సహాయపడటానికి అంకితమైన అధునాతన AI-ఆధారిత వేదిక. మట్టి శాస్త్రాన్ని మెషిన్ లెర్నింగ్‌తో కలపడం ద్వారా, మీ ప్రత్యేక మట్టి ఆరోగ్యం మరియు స్థానిక వాతావరణ పరిస్థితుల ఆధారంగా తక్షణ పంట సిఫార్సులు అందిస్తాము.",
    startBtn: "🚀 విశ్లేషణ ప్రారంభించండి",
    featuresTitle: "విశేషాలు",
    featureSoil: "మట్టి విశ్లేషణ",
    featureCrop: "పంట సలహా",
    cropRotation: "పంట మార్పిడి",
    expertTitle: "నిపుణుల సూచనలు",
    sug1: '"సిఫార్సు చేసిన పంటలకు రియల్-టైమ్ మార్కెట్ ధరలను అనుసంధానించండి."',
    sug1Author: "- డా. అరుణ, వ్యవసాయ శాస్త్రవేత్త",
    sug2: '"మట్టి విశ్లేషణలో కనుగొన్న పోషక లోపం ఆధారంగా ఎరువుల కాలిక్యులేటర్ జోడించండి."',
    sug2Author: "- రమేష్ రావు, అగ్రి-టెక్ నిపుణుడు",
    sug3: '"వర్షపాతం హెచ్చరికల కోసం ఉపగ్రహ-ఆధారిత వాతావరణ హెచ్చరిక వ్యవస్థను అమలు చేయండి."',
    sug3Author: "- ISRO పరిశోధన బృందం",
    phoneTitle: "గుర్తింపును ధృవీకరించండి",
    phoneDesc: "కొనసాగించడానికి మీ ఫోన్ నంబర్ నమోదు చేయండి.",
    getOtpBtn: "OTP పొందండి",
    otpTitle: "OTP నమోదు చేయండి",
    otpDesc: "మీ ఫోన్‌కు 4 అంకెల కోడ్ పంపబడింది.",
    verifyBtn: "ధృవీకరించండి & కొనసాగించండి",
    locationTitle: "మీ స్థానం",
    locationDesc: "వాతావరణ డేటా కోసం మీ స్థానం అవసరం",
    allowLocation: "📍 నా స్థానం ఉపయోగించు",
    manualLocation: "లేదా మస్తీగా నమోదు చేయండి",
    continueBtn: "కొనసాగించు →",
    choiceTitle: "విశ్లేషణ పద్ధతి ఎంచుకోండి",
    choiceDesc: "మీ మట్టి వివరాలు ఎలా అందించాలనుకుంటున్నారు?",
    imgUploadBtn: "📸 మట్టి చిత్రం అప్‌లోడ్ చేయండి",
    orText: "లేదా",
    manualEntryBtn: "⌨️ డేటా మాన్యువల్‌గా నమోదు చేయండి",
    processTitle: "విశ్లేషణ ప్రక్రియ",
    step1: '"చిత్రం ఎంచుకోండి" క్లిక్ చేయండి',
    step2: "స్పష్టమైన మట్టి ఫోటో ఎంచుకోండి",
    step3: '"మట్టి విశ్లేషణ" క్లిక్ చేయండి',
    step4: "AI పంట ఫలితం చూడండి",
    uploadPageTitle: "చిత్రం అప్‌లోడ్ చేయండి",
    chooseImgBtn: "చిత్రం ఎంచుకోండి",
    analyzeSoilBtn: "🔬 మట్టి విశ్లేషణ",
    manualProcessTitle: "మాన్యువల్ నమోదు ప్రక్రియ",
    mStep1: "పోషకాలు నమోదు చేయండి (N, P, K)",
    mStep2: "మట్టి pH స్థాయి నమోదు చేయండి",
    mStep3: "వాతావరణ వివరాలు నమోదు చేయండి",
    mStep4: "AI విశ్లేషణకు సమర్పించండి",
    soilLabTitle: "మట్టి ల్యాబ్ డేటా",
    soilLabDesc: "మీ మట్టి పరీక్ష నివేదిక నుండి విలువలు నమోదు చేయండి.",
    labelN: "నత్రజని (N)",
    labelP: "భాస్వరం (P)",
    labelK: "పొటాషియం (K)",
    labelPH: "pH స్థాయి",
    labelTemp: "ఉష్ణోగ్రత",
    labelHumidity: "తేమ",
    labelRain: "వర్షపాతం",
    analyzeDataBtn: "🔬 డేటా విశ్లేషించండి",
    detecting: "మీ మట్టిని విశ్లేషిస్తోంది...",
    resultsTitle: "మీ ఫలితాలు",
    soilType: "మట్టి రకం",
    confidence: "నమ్మకం",
    cropRec: "సిఫార్సు చేసిన పంట",
    whyCrop: "ఈ పంట ఎందుకు?",
    startOver: "🔄 కొత్త విశ్లేషణ",
    sugPageTitle: "💡 సమాజ సూచనలు",
    sugPageDesc: "నిపుణులు మరియు రైతులు ఏమి చెప్తున్నారో చూడండి.",
    addSugTitle: "✍️ మీ సూచన జోడించండి",
    addSugDesc: "AgriXAI మెరుగుపరచడానికి ఆలోచన ఉందా? దిగువ పంచుకోండి.",
    nameLabel: "పేరు & వృత్తి",
    sugLabel: "మీ సూచన",
    submitSug: "🚀 సూచన సమర్పించండి",
    backHome: "← హోమ్‌కు తిరిగి వెళ్ళండి",
    contactTitle: "📞 సహాయం సంప్రదించండి",
    contactDesc: "సందేహాలు ఉన్నాయా? మా నిపుణులు సహాయం చేస్తారు.",
    emailLabel: "ఇమెయిల్:",
    phoneLabel: "ఫోన్:",
    addressLabel: "చిరునామా:",
    msgPlaceholder: "మీ సందేశం ఇక్కడ టైప్ చేయండి...",
    sendMsg: "సందేశం పంపండి",
    footer: "AgriXAI — AI తో రైతులను శక్తివంతం చేయడం",
    team: "బృందం",
    teamDesc: "AgriXAI పరిశోధన బృందంచే అభివృద్ధి చేయబడింది, హైదరాబాద్.",
    footerCopy: "© 2024 AgriXAI · భారతీయ రైతుల కోసం 💚 తో తయారు చేయబడింది",
    chatTitle: "🌱 AgriBot AI",
    sideHome: "🏠 హోమ్",
    sideFeatures: "✨ విశేషాలు",
    sideSuggestions: "💡 సూచనలు",
    sideAbout: "📖 గురించి",
    sideContact: "📞 సంప్రదించండి",
    yourOtp: "మీ OTP",
    phonePlaceholder: "10 అంకెల నంబర్ నమోదు చేయండి",
    chatPlaceholder: "పంటలు, మట్టి గురించి అడగండి...",
    sending: "⏳ పంపుతోంది...",
    serverError: "❌ సర్వర్ లోపం. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    noSuggestions: "ఇంకా సూచనలు లేవు. మొదటివారు అవ్వండి!",
    sugLoadError: "సూచనలు లోడ్ కాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    listening: "వింటోంది...",
    chatPlaceholderDefault: "పంటలు, మట్టి గురించి అడగండి...",
    locPermDenied: "లొకేషన్ అనుమతి నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్‌లలో అనుమతించండి లేదా మాన్యువల్‌గా నమోదు చేయండి.",
    locUnavailable: "స్థానం అందుబాటులో లేదు. దయచేసి మాన్యువల్‌గా నమోదు చేయండి.",
    locTimeout: "స్థానం అభ్యర్థన గడువు మించింది. మళ్ళీ ప్రయత్నించండి లేదా మాన్యువల్‌గా నమోదు చేయండి.",
    locError: "స్థానం గుర్తించలేకపోయాం. దయచేసి మాన్యువల్‌గా నమోదు చేయండి.",
    otpInvalid: "❌ చెల్లని OTP, మళ్ళీ ప్రయత్నించండి.",
    otpVerified: "✅ ఫోన్ ధృవీకరించబడింది!",
    phoneInvalid: "⚠️ దయచేసి చెల్లుబాటు అయ్యే 10 అంకెల నంబర్ నమోదు చేయండి.",
    contactEmpty: "⚠️ దయచేసి ముందు సందేశం టైప్ చేయండి.",
    contactSent: "✅ సందేశం పంపబడింది! మేము త్వరలో తిరిగి వస్తాము.",
    sugEmpty: "⚠️ దయచేసి అన్ని ఫీల్డ్‌లు పూరించండి.",
    ttsOn: "🔊 వాయిస్ రిప్లైలు ఆన్",
    ttsOff: "🔇 వాయిస్ రిప్లైలు ఆఫ్",
    locDetected: "✅ స్థానం గుర్తించబడింది!",
    locDetecting: "⏳ గుర్తిస్తోంది...",
  },
  hi: {
    navAbout: "मिट्टी और जलवायु डेटा का उपयोग करके AI-आधारित फसल सिफारिशें।",
    tagline: "स्मार्ट मिट्टी। स्मार्ट फसलें।",
    subtitle: "हर किसान के लिए AI-आधारित फसल सिफारिशें",
    heroAbout: "AgriXAI एक उन्नत AI-संचालित मंच है जो भारतीय किसानों को डेटा-आधारित निर्णय लेने में मदद करता है। मिट्टी विज्ञान को मशीन लर्निंग के साथ जोड़कर, हम आपकी मिट्टी की स्वास्थ्य और स्थानीय जलवायु के आधार पर तत्काल फसल सिफारिशें प्रदान करते हैं।",
    startBtn: "🚀 विश्लेषण शुरू करें",
    featuresTitle: "विशेषताएं",
    featureSoil: "मिट्टी विश्लेषण",
    featureCrop: "फसल सलाह",
    cropRotation: "फसल चक्र",
    expertTitle: "विशेषज्ञ सुझाव",
    sug1: '"अनुशंसित फसलों के लिए रीयल-टाइम बाजार मूल्य एकीकृत करें।"',
    sug1Author: "- डॉ. अरुणा, कृषि विशेषज्ञ",
    sug2: '"मिट्टी विश्लेषण में पाई गई पोषक कमी के आधार पर उर्वरक कैलकुलेटर जोड़ें।"',
    sug2Author: "- रमेश राव, एग्री-टेक विशेषज्ञ",
    sug3: '"भारी वर्षा की चेतावनी के लिए उपग्रह-आधारित मौसम चेतावनी प्रणाली लागू करें।"',
    sug3Author: "- ISRO अनुसंधान दल",
    phoneTitle: "पहचान सत्यापित करें",
    phoneDesc: "जारी रखने के लिए अपना फोन नंबर दर्ज करें।",
    getOtpBtn: "OTP प्राप्त करें",
    otpTitle: "OTP दर्ज करें",
    otpDesc: "आपके फोन पर 4 अंकों का कोड भेजा गया है।",
    verifyBtn: "सत्यापित करें और जारी रखें",
    locationTitle: "आपका स्थान",
    locationDesc: "जलवायु डेटा के लिए आपका स्थान चाहिए",
    allowLocation: "📍 मेरा स्थान उपयोग करें",
    manualLocation: "या मैन्युअल दर्ज करें",
    continueBtn: "जारी रखें →",
    choiceTitle: "विश्लेषण विधि चुनें",
    choiceDesc: "आप अपनी मिट्टी की जानकारी कैसे देना चाहते हैं?",
    imgUploadBtn: "📸 मिट्टी की तस्वीर अपलोड करें",
    orText: "या",
    manualEntryBtn: "⌨️ डेटा मैन्युअल दर्ज करें",
    processTitle: "विश्लेषण प्रक्रिया",
    step1: '"तस्वीर चुनें" पर क्लिक करें',
    step2: "स्पष्ट मिट्टी की फोटो चुनें",
    step3: '"मिट्टी विश्लेषण" पर क्लिक करें',
    step4: "AI फसल परिणाम देखें",
    uploadPageTitle: "तस्वीर अपलोड करें",
    chooseImgBtn: "तस्वीर चुनें",
    analyzeSoilBtn: "🔬 मिट्टी का विश्लेषण करें",
    manualProcessTitle: "मैन्युअल प्रविष्टि प्रक्रिया",
    mStep1: "पोषक तत्व दर्ज करें (N, P, K)",
    mStep2: "मिट्टी का pH स्तर दर्ज करें",
    mStep3: "जलवायु विवरण दर्ज करें",
    mStep4: "AI विश्लेषण के लिए सबमिट करें",
    soilLabTitle: "मिट्टी लैब डेटा",
    soilLabDesc: "अपनी मिट्टी परीक्षण रिपोर्ट से मान दर्ज करें।",
    labelN: "नाइट्रोजन (N)",
    labelP: "फास्फोरस (P)",
    labelK: "पोटैशियम (K)",
    labelPH: "pH स्तर",
    labelTemp: "तापमान",
    labelHumidity: "नमी",
    labelRain: "वर्षा",
    analyzeDataBtn: "🔬 डेटा विश्लेषण करें",
    detecting: "आपकी मिट्टी का विश्लेषण हो रहा है...",
    resultsTitle: "आपके परिणाम",
    soilType: "मिट्टी का प्रकार",
    confidence: "विश्वास",
    cropRec: "अनुशंसित फसल",
    whyCrop: "यह फसल क्यों?",
    startOver: "🔄 नया विश्लेषण",
    sugPageTitle: "💡 सामुदायिक सुझाव",
    sugPageDesc: "देखें विशेषज्ञ और किसान क्या कह रहे हैं।",
    addSugTitle: "✍️ अपना सुझाव जोड़ें",
    addSugDesc: "AgriXAI को बेहतर बनाने का विचार है? नीचे साझा करें।",
    nameLabel: "नाम और पेशा",
    sugLabel: "आपका सुझाव",
    submitSug: "🚀 सुझाव जमा करें",
    backHome: "← होम पर वापस जाएं",
    contactTitle: "📞 सहायता संपर्क करें",
    contactDesc: "प्रश्न हैं? हमारे विशेषज्ञ मदद करेंगे।",
    emailLabel: "ईमेल:",
    phoneLabel: "फोन:",
    addressLabel: "पता:",
    msgPlaceholder: "यहां अपना संदेश टाइप करें...",
    sendMsg: "संदेश भेजें",
    footer: "AgriXAI — AI से किसानों को सशक्त बनाना",
    team: "टीम",
    teamDesc: "AgriXAI अनुसंधान दल, हैदराबाद द्वारा विकसित।",
    footerCopy: "© 2024 AgriXAI · भारतीय किसानों के लिए 💚 के साथ बनाया गया",
    chatTitle: "🌱 AgriBot AI",
    sideHome: "🏠 होम",
    sideFeatures: "✨ विशेषताएं",
    sideSuggestions: "💡 सुझाव",
    sideAbout: "📖 के बारे में",
    sideContact: "📞 संपर्क",
    yourOtp: "आपका OTP",
    phonePlaceholder: "10 अंकों का नंबर दर्ज करें",
    chatPlaceholder: "फसलों, मिट्टी के बारे में पूछें...",
    sending: "⏳ भेज रहे हैं...",
    serverError: "❌ सर्वर त्रुटि। कृपया पुनः प्रयास करें।",
    noSuggestions: "अभी तक कोई सुझाव नहीं। पहले बनें!",
    sugLoadError: "सुझाव लोड नहीं हो सके। कृपया पुनः प्रयास करें।",
    listening: "सुन रहा हूँ...",
    chatPlaceholderDefault: "फसलों, मिट्टी के बारे में पूछें...",
    locPermDenied: "स्थान अनुमति अस्वीकृत। ब्राउज़र सेटिंग में अनुमति दें या मैन्युअल दर्ज करें।",
    locUnavailable: "स्थान उपलब्ध नहीं। कृपया मैन्युअल दर्ज करें।",
    locTimeout: "स्थान अनुरोध समय सीमा पार। पुनः प्रयास करें या मैन्युअल दर्ज करें।",
    locError: "स्थान पता नहीं चला। कृपया मैन्युअल दर्ज करें।",
    otpInvalid: "❌ अमान्य OTP, पुनः प्रयास करें।",
    otpVerified: "✅ फोन सत्यापित!",
    phoneInvalid: "⚠️ कृपया एक वैध 10 अंकों का नंबर दर्ज करें।",
    contactEmpty: "⚠️ कृपया पहले संदेश टाइप करें।",
    contactSent: "✅ संदेश भेज दिया! हम जल्द ही आपसे संपर्क करेंगे।",
    sugEmpty: "⚠️ कृपया सभी फ़ील्ड भरें।",
    ttsOn: "🔊 वॉइस रिप्लाई चालू",
    ttsOff: "🔇 वॉइस रिप्लाई बंद",
    locDetected: "✅ स्थान मिल गया!",
    locDetecting: "⏳ पता लगा रहे हैं...",
  },
};
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}


// ---- STATE ----
let currentLang = "en";
let generatedOTP = null;
let currentPage = "home";
let locDetected = false;

// ---- LANGUAGE CHANGE ----
function changeLang(lang) {
  currentLang = lang;

  document.documentElement.lang = lang === 'te' ? 'te' : lang === 'hi' ? 'hi' : 'en';

  const t = translations[lang];
  const greetings = {
    en: "Hello! I am your AgriXAI assistant. How can I help you today?",
    te: "నమస్కారం! నేను మీ AgriXAI సహాయకుడిని. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    hi: "नमस्ते! मैं आपका AgriXAI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
  };
  const greetingEl = document.getElementById('botGreeting');
  if (greetingEl) greetingEl.textContent = greetings[lang] || greetings.en;
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll("[data-key-placeholder]").forEach(el => {
    const key = el.getAttribute("data-key-placeholder");
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  if (locDetected) {
    document.getElementById("locBtn").textContent = t.locDetected;
  }
}
function renderSuggestionsFromServer() {
  const list = document.getElementById('suggestionsList');
  const t = translations[currentLang];
  list.innerHTML = Array(3).fill(`
    <div class="suggestion-item skeleton-card">
      <div class="skel-line" style="width:90%; height:14px;"></div>
      <div class="skel-line" style="width:75%; height:14px; margin-top:8px;"></div>
      <div class="skel-line" style="width:50%; height:14px; margin-top:8px;"></div>
      <div class="skel-line" style="width:40%; height:12px; margin-top:16px; margin-left:auto;"></div>
    </div>
  `).join('');
  fetch("https://crop-backend-lwhy.onrender.com/get-suggestions")
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:#6a8a6a; grid-column:1/-1;">${t.noSuggestions}</p>`;
        return;
      }
      list.innerHTML = data.map(s => `
        <div class="suggestion-item">
          <p class="suggestion-item-text">"${s.text}"</p>
          <div class="suggestion-item-author">— ${s.name}</div>
        </div>
      `).join('');
    })
    .catch(() => {
      list.innerHTML = `<p style="text-align:center; color:#c62828; grid-column:1/-1;">${t.sugLoadError}</p>`;
    });
}

// ADD THIS ABOVE the goTo function
const pageTitles = {
  en: {
    home: "AgriXAI – Smart Soil. Smart Crops.",
    phone: "AgriXAI – Verify Identity",
    otp: "AgriXAI – Enter OTP",
    location: "AgriXAI – Your Location",
    choice: "AgriXAI – Choose Method",
    upload: "AgriXAI – Upload Soil Image",
    manual: "AgriXAI – Enter Soil Data",
    analyzing: "AgriXAI – Analyzing...",
    results: "AgriXAI – Your Results",
    suggestions: "AgriXAI – Community Suggestions",
    contact: "AgriXAI – Contact Us"
  },
  te: {
    home: "AgriXAI – తెలివైన మట్టి. తెలివైన పంటలు.",
    phone: "AgriXAI – గుర్తింపు ధృవీకరించండి",
    otp: "AgriXAI – OTP నమోదు చేయండి",
    location: "AgriXAI – మీ స్థానం",
    choice: "AgriXAI – పద్ధతి ఎంచుకోండి",
    upload: "AgriXAI – మట్టి చిత్రం అప్‌లోడ్",
    manual: "AgriXAI – మట్టి డేటా నమోదు",
    analyzing: "AgriXAI – విశ్లేషిస్తోంది...",
    results: "AgriXAI – మీ ఫలితాలు",
    suggestions: "AgriXAI – సమాజ సూచనలు",
    contact: "AgriXAI – సంప్రదించండి"
  },
  hi: {
    home: "AgriXAI – स्मार्ट मिट्टी। स्मार्ट फसलें।",
    phone: "AgriXAI – पहचान सत्यापित करें",
    otp: "AgriXAI – OTP दर्ज करें",
    location: "AgriXAI – आपका स्थान",
    choice: "AgriXAI – विधि चुनें",
    upload: "AgriXAI – मिट्टी की तस्वीर अपलोड करें",
    manual: "AgriXAI – मिट्टी डेटा दर्ज करें",
    analyzing: "AgriXAI – विश्लेषण हो रहा है...",
    results: "AgriXAI – आपके परिणाम",
    suggestions: "AgriXAI – सामुदायिक सुझाव",
    contact: "AgriXAI – संपर्क करें"
  }
};

// ---- NAVIGATION (With Browser History) ----
// REPLACE ALL goTo FUNCTIONS WITH THIS ONE
function goTo(page, pushToHistory = true) {
  const idx = pageSequence.indexOf(page);
  if (idx !== -1) {
    currentPageIndex = idx;
    currentPage = page;
  }

  if (pushToHistory) {
    history.pushState({ page: page }, "", "#" + page);
  }

  // Hide all pages
  document.querySelectorAll(".page, .page-wide").forEach(p => {
    p.classList.remove("active");
    p.style.display = "none";
  });

  // Show target page
  const target = document.getElementById("page-" + page);
  if (target) {
  target.style.display = "block";
  // Force reflow so transition fires
  target.getBoundingClientRect();
  target.classList.add("active");
}

  // Mark page as visited **only if coming forward**
  visitedPages.add(page);

  // Update arrows
  updateNavButtons();

  // Step dots logic
  const stepDots = document.getElementById("stepDots");
  const dotMap = { location: 0, upload: 1, manual: 1, results: 2 };
  if (dotMap[page] !== undefined) {
    stepDots.style.display = "flex";
    document.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === dotMap[page]);
    });
  } else {
    stepDots.style.display = "none";
  }

  if (page === 'suggestions') {
    renderSuggestionsFromServer();
    document.querySelector('.sug-fab').classList.add('visible');
  } else {
    const fab = document.querySelector('.sug-fab');
    if (fab) fab.classList.remove('visible');
  }
  if (page === "home") {
    clearTimeout(slideTimer); // Stop old timer before starting new one
    slideIndex = 0;
    showSlides();
  }
  window.scrollTo(0, 0);
  const titles = pageTitles[currentLang] || pageTitles.en;
document.title = titles[page] || "AgriXAI";
};



function navTo(page) {
  document.getElementById('sidebar').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');

  if (page === 'features' || page === 'about') {
    goTo('home');
    setTimeout(() => {
      const section = document.getElementById(page + '-section');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  } else {
    // suggestions, contact, home — all navigate directly to their page
    goTo(page);
  }
}
function clearAllData() {
    // 1. Clears all input fields (N, P, K, Phone number, etc.)
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        if (input.type !== 'button' && input.type !== 'submit' && !input.readOnly ) {
            input.value = '';
        }
    });

    // 2. Resets the results page values to default
    document.getElementById('soilTypeVal').innerText = '—';
    document.getElementById('cropName').innerText = '—';
    document.getElementById('xaiText').innerText = '—';
    document.getElementById('confPct').innerText = '0%';
     document.getElementById('confFill').style.width = '0%';
    
    const imgPreview = document.getElementById('imgPreview');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    if(imgPreview) imgPreview.style.display = 'none';
    if(uploadPlaceholder) uploadPlaceholder.style.display = 'block';

    // 4. Resets Analysis Progress Bar
    const progressFill = document.getElementById('progressFill');
    if(progressFill) progressFill.style.width = '0%';
   
    
}
function startOver() {
    clearAllData();
    goTo('home');
}

  
// ---- UI ARROW BUTTONS ----

let visitedPages = new Set(); // Tracks pages you have been to
function updateNavButtons() {
  const backBtn = document.getElementById('backBtn');
  const forwardBtn = document.getElementById('forwardBtn');

  if (!backBtn || !forwardBtn) return;

  // Back disabled only on first page
  backBtn.disabled = (currentPageIndex === 0);

  // Forward enabled only if next page is visited OR analyzing/last page
  const nextPage = pageSequence[currentPageIndex + 1];
  forwardBtn.disabled = !nextPage || (!visitedPages.has(nextPage) && currentPage !== "analyzing");
}
function goBack() {
  window.history.back(); // Triggers the same thing as browser back arrow
}

function goForward() {
  window.history.forward(); // Triggers the same thing as browser forward arrow
}

// ---- PHONE & OTP LOGIC ----
function handleSendOTP() {
  const phone = document.getElementById('phoneNumber').value;
  const errEl = document.getElementById('phoneError');
  const t = translations[currentLang];

  if (/^\d{10}$/.test(phone)) {
    errEl.textContent = '';
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Navigate FIRST
    goTo('otp');
    
    // Then update OTP hint box AFTER page is visible
    setTimeout(() => {
      document.getElementById('otpHintCode').textContent = generatedOTP;
      document.getElementById('otpHintBox').style.display = 'block';
      resetOTPFields();
    }, 100);

  } else {
    errEl.textContent = t.phoneInvalid;
    document.getElementById('phoneNumber').focus();
  }
}

function handleVerifyOTP() {
  let userEnteredOtp = "";
  document.querySelectorAll('.otp-input').forEach(input => { userEnteredOtp += input.value; });
  const t = translations[currentLang];
  if (userEnteredOtp === generatedOTP) {
    showToast(t.otpVerified, "success");
    goTo('location');
  } else {
    showToast(t.otpInvalid, "error");
    resetOTPFields();
    document.querySelectorAll('.otp-input').forEach(input => input.value = "");
    document.querySelectorAll('.otp-input')[0].focus();
  }
}

// ---- LOCATION DETECTION ----
function detectLocation() {
  const btn = document.getElementById("locBtn");
  const manualInput = document.getElementById("manualLoc");
  const t = translations[currentLang];
  btn.textContent = t.locDetecting;
  btn.disabled = true;
  if (!navigator.geolocation) {
    showToast("⚠️ " + t.locError, "error");
    btn.textContent = "📍 " + (translations[currentLang].allowLocation || "Use My Location");
    btn.disabled = false;
    return;
  }
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      window.detectedLat = lat;
      window.detectedLon = lon;
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        .then(res => res.json())
        .then(data => {
          const address = data.address;
          const city = address.city || address.town || address.village || address.county || "Unknown";
          const state = address.state || "";
          const locationString = state ? `${city}, ${state}` : city;
          manualInput.value = locationString;
          manualInput.placeholder = locationString + " (Live)";
          locDetected = true;
          btn.textContent = translations[currentLang].locDetected;
          btn.classList.add("blue-btn");
          btn.disabled = false;
          fetchAndFillWeather();
        })
        .catch(() => {
          manualInput.value = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
          locDetected = true;
          btn.textContent = translations[currentLang].locDetected;
          btn.classList.add("blue-btn");
          btn.disabled = false;
        });
    },
    function(error) {
      btn.textContent = "📍 " + (translations[currentLang].allowLocation || "Use My Location");
      btn.disabled = false;
      const t = translations[currentLang];
      const messages = { 1: t.locPermDenied, 2: t.locUnavailable, 3: t.locTimeout };
      showToast("⚠️ " + (messages[error.code] || t.locError), "error");
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

function goToUpload() {
  const manual = document.getElementById("manualLoc").value.trim();
  if (!locDetected && !manual) {
    document.getElementById("manualLoc").style.borderColor = "#ef5350";
    document.getElementById("manualLoc").focus();
    setTimeout(() => { document.getElementById("manualLoc").style.borderColor = ""; }, 1500);
    return;
  }
  goTo("upload");
}

// ---- IMAGE PREVIEW ----
// --- NEW: Helper for the Split-Screen Steps ---
function updateStep(stepNumber) {
    const step = document.getElementById('s' + stepNumber);
    if (step) {
        document.querySelectorAll('.step-item').forEach(el => el.classList.remove('active'));
        step.classList.add('active');
    }
}

// --- UPDATED: Replaces your old previewImage ---
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Trigger Step 2 immediately when they pick a file
  updateStep(2);

  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById("imgPreview");
    const placeholder = document.getElementById("uploadPlaceholder");
    preview.src = e.target.result;
    preview.style.display = "block";
    placeholder.style.display = "none";
    
    const btn = document.getElementById("analyzeBtn");
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
    
    // Trigger Step 3: Now the user sees the "Analyze" button is ready
    updateStep(3);
  };
  reader.readAsDataURL(file);
}

async function fetchAndFillWeather() {
  if (!window.detectedLat || !window.detectedLon) return;

  const API_KEY = "89b5f844f022adb7fa725581a2ab47c2";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${window.detectedLat}&lon=${window.detectedLon}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 401 || data.cod === "401" || data.cod === 429) {
      showToast("⚠️ Weather service not ready. Please enter manually.", "error");
      return;
    }

    const temp     = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const rainfall = data.rain
      ? Math.round(data.rain["1h"] * 365 * 24)
      : estimateRainfall(window.detectedLat, window.detectedLon, data.name);

    const inputs = document.querySelectorAll('#page-manual .input-field');

    // 👇 THIS WAS MISSING — actually set the values
    inputs[4].value = temp;
    inputs[5].value = humidity;
    inputs[6].value = rainfall;

    inputs[4].classList.add('auto-filled');
    inputs[5].classList.add('auto-filled');
    inputs[6].classList.add('auto-filled');

    showToast(`✅ Weather filled: ${temp}°C, ${humidity}% humidity`, "success");

  } catch(e) {
    showToast("⚠️ Weather data unavailable. Please enter manually.", "error");
  }
}

function startAnalysis() {
  if (currentPage === 'upload') updateStep(4);
  goTo("analyzing");
  animateProgress();
}

function estimateRainfall(lat, lon, cityName) {
  // Approximate annual rainfall (mm) for major Indian cities
  const cityRainfall = {
    "Hyderabad":  800,
    "Chennai":   1200,
    "Mumbai":    2200,
    "Delhi":      650,
    "Bangalore":  900,
    "Kolkata":   1600,
    "Pune":       700,
    "Kurnool":    650,
    "Vijayawada": 900,
    "Warangal":   900,
    "Tirupati":  1000,
    "Vizag":     1000,
  };

  // Check if city name matches
  for (const city in cityRainfall) {
    if (cityName && cityName.toLowerCase().includes(city.toLowerCase())) {
      return cityRainfall[city];
    }
  }

  // Fallback based on latitude zone if city not found
  if (lat < 15) return 1200;       // South India — high rainfall
  if (lat < 20) return 900;        // Andhra, Telangana
  if (lat < 25) return 750;        // Central India
  return 650;                       // North India
}

// --- Step control for Manual Page ---
function updateManualStep(stepNumber) {
    // Remove active class from all manual steps (m1, m2, m3, m4)
    for(let i=1; i<=4; i++){
        const el = document.getElementById('m' + i);
        if(el) {
            el.classList.remove('active');
        }
    }
    // Add active class to current step
    const current = document.getElementById('m' + stepNumber);
    if(current) {
        current.classList.add('active');
    }
}
function handleContinue() {
  const manualInput = document.getElementById("manualLoc").value.trim();

  if (!manualInput) {
    showToast("⚠️ Please enter or detect your location.", "error");
    document.getElementById("manualLoc").style.borderColor = "#c62828";
    setTimeout(() => { document.getElementById("manualLoc").style.borderColor = ""; }, 2000);
    return;
  }

  // If GPS already detected — weather already fetched, just continue
  if (window.detectedLat && window.detectedLon) {
    goTo('choice');
    return;
  }

  // If manually typed — geocode the city name to get coordinates
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(manualInput)}&format=json&limit=1`)
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        window.detectedLat = parseFloat(data[0].lat);
        window.detectedLon = parseFloat(data[0].lon);
        fetchAndFillWeather(); // fetch weather for typed city
      }
      goTo('choice');
    })
    .catch(() => {
      goTo('choice'); // even if geocoding fails, still continue
    });
}
// --- Specific Start for Manual Path ---
function startManualAnalysis() {
  const inputs = document.querySelectorAll('#page-manual .input-field');
  
  // Get values
  const n        = inputs[0].value.trim();
  const p        = inputs[1].value.trim();
  const k        = inputs[2].value.trim();
  const ph       = inputs[3].value.trim();
  const temp     = inputs[4].value.trim();
  const humidity = inputs[5].value.trim();
  const rainfall = inputs[6].value.trim();

  // Check all fields filled
  if (!n || !p || !k || !ph || !temp || !humidity || !rainfall) {
    showToast("⚠️ Please fill all fields before analyzing.", "error");
    
    // Highlight empty fields in red
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = "#c62828";
        setTimeout(() => { input.style.borderColor = ""; }, 2000);
      }
    });
    return;
  }

  // Check value ranges
  if (n < 0 || n > 150) {
    showToast("⚠️ Nitrogen must be between 0 and 150.", "error");
    inputs[0].style.borderColor = "#c62828";
    setTimeout(() => { inputs[0].style.borderColor = ""; }, 2000);
    return;
  }
  if (p < 0 || p > 50) {
    showToast("⚠️ Phosphorus must be between 0 and 50.", "error");
    inputs[1].style.borderColor = "#c62828";
    setTimeout(() => { inputs[1].style.borderColor = ""; }, 2000);
    return;
  }
  if (k < 0 || k > 300) {
    showToast("⚠️ Potassium must be between 0 and 300.", "error");
    inputs[2].style.borderColor = "#c62828";
    setTimeout(() => { inputs[2].style.borderColor = ""; }, 2000);
    return;
  }
  if (ph < 3.5 || ph > 9.0) {
    showToast("⚠️ pH must be between 3.5 and 9.0.", "error");
    inputs[3].style.borderColor = "#c62828";
    setTimeout(() => { inputs[3].style.borderColor = ""; }, 2000);
    return;
  }

  // All good — proceed
  updateManualStep(4);
  setTimeout(() => {
    goTo("analyzing");
    animateProgress();
  }, 400);
}


function animateProgress() {
  let pct = 0;
  const fill  = document.getElementById("progressFill");
  const label = document.getElementById("progressLabel");
  const interval = setInterval(() => {
    pct += Math.floor(Math.random() * 8) + 3;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      setTimeout(showResults, 400);
    }
    fill.style.width  = pct + "%";
    label.textContent = pct + "%";
  }, 120);
}
function drawNPKChart(n, p, k) {
  const canvas = document.getElementById('npkChart');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  const ctx = canvas.getContext('2d');
  const bars = [
    { label: 'N', value: n, max: 150, color: '#2d7a2d' },
    { label: 'P', value: p, max: 50,  color: '#ff8f00' },
    { label: 'K', value: k, max: 300, color: '#1565c0' }
  ];
  const barH = 18, gap = 12, startY = 10, labelW = 20;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bars.forEach((bar, i) => {
    const y = startY + i * (barH + gap);
    const fillW = ((bar.value / bar.max) * (canvas.width - labelW - 60));
    // Label
    ctx.fillStyle = '#4a6741';
    ctx.font = 'bold 12px Nunito, sans-serif';
    ctx.fillText(bar.label, 0, y + 13);
    // Background track
    ctx.fillStyle = '#e8f5e9';
    ctx.beginPath();
    ctx.roundRect(labelW, y, canvas.width - labelW - 55, barH, 6);
    ctx.fill();
    // Filled bar
    ctx.fillStyle = bar.color;
    ctx.beginPath();
    ctx.roundRect(labelW, y, fillW, barH, 6);
    ctx.fill();
    // Value text
    ctx.fillStyle = '#1b3a1f';
    ctx.font = 'bold 11px Nunito, sans-serif';
    ctx.fillText(bar.value, canvas.width - 48, y + 13);
  });
}
function showResults() {
  const d = dummyResults;
  document.getElementById("soilColorBox").style.background = d.soilColor;
  document.getElementById("soilTypeVal").textContent = d.soilType;
  document.getElementById("confFill").style.width    = d.confidence + "%";
  document.getElementById("confPct").textContent     = d.confidence + "%";
  document.getElementById("cropEmoji").textContent   = d.cropEmoji;
  document.getElementById("cropName").textContent    = d.crop;
  document.getElementById("xaiText").textContent     = d.explanation;
  drawNPKChart(d.nitrogen, d.phosphorus, d.potassium);
  goTo("results");
  analysisDone = true;
}
function fillList(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  if (!items || items.length === 0) {
    el.innerHTML = "<li>No data available</li>";
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

function showCropGuidance() {
  if (!latestMLResult || !latestMLResult.crop_guidance) {
    alert("Guidance data not available.");
    return;
  }

  const selected = latestMLResult.crop_guidance[0];
  const guide = selected.guidance || {};

  document.getElementById("guideCropName").textContent =
    `${selected.crop} (${selected.confidence}%)`;

  document.getElementById("guideSeason").textContent =
    guide.season || "Not available";

  document.getElementById("guideWater").textContent =
    guide.water_requirement || "Not available";

  fillList("guideGrow", guide.how_to_grow);
  fillList("guideDiseases", guide.common_diseases);
  fillList("guideChemical", guide.chemical_fertilizers);
  fillList("guideOrganic", guide.organic_suggestions);

  const linksBox = document.getElementById("guideLinks");
  linksBox.innerHTML = "";

  if (guide.purchase_links && guide.purchase_links.length > 0) {
    guide.purchase_links.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.textContent = `🛒 ${link.name}`;
      linksBox.appendChild(a);
    });
  } else {
    linksBox.textContent = "No purchase links available.";
  }

  goTo("guidance");
}

function openSugModal() {
  document.getElementById('sugModal').classList.add('open');
}

function closeSugModal(event) {
  // Close if clicking the overlay background, or the × button
  if (!event || event.target === document.getElementById('sugModal')) {
    document.getElementById('sugModal').classList.remove('open');
  }
}

function handleExpertSubmit() {
  const name = document.getElementById('expertName').value.trim();
  const sug  = document.getElementById('expertSug').value.trim();
  const t = translations[currentLang];
  if (!name || !sug) {
    showToast(t.sugEmpty, "error");
    return;
  }
  fetch("https://crop-backend-lwhy.onrender.com/add-suggestion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, text: sug })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById('expertName').value = "";
    document.getElementById('expertSug').value = "";
    document.getElementById('sugModal').classList.remove('open');
    renderSuggestionsFromServer();
  })
  .catch(() => {
    showToast(t.serverError, "error");
  });
}


// ---- SLIDESHOW SCRIPT ----
let slideIndex = 0;
let slideTimer = null;

function showSlides() {
  clearTimeout(slideTimer); // Clear any existing timer first
  
  let slides = document.getElementsByClassName("slide");
  let dots = document.querySelectorAll(".dots .dot");
  
  for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
  
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  
  for (let i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", ""); }
  
  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
  
  slideTimer = setTimeout(showSlides, 2000); // Save timer reference
}
function currentSlide(n) {
  clearTimeout(slideTimer);
  let slides = document.getElementsByClassName("slide");
  let dots = document.querySelectorAll(".dots .dot");
  
  slideIndex = n;
  
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
  
  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
  
  slideTimer = setTimeout(showSlides, 3000);
}
// ---- INITIALIZATION & BROWSER LISTENERS ----
// ---- INITIALIZATION (FORCED HOME ON REFRESH) ----
document.addEventListener("DOMContentLoaded", () => {

  // 1. We ignore the old URL and force the page to 'home'
  const initialPage = "home";
  
  // 2. We clear all data so the app starts fresh
  if (typeof clearAllData === "function") {
    clearAllData();
  }
  
  // 3. We update the browser's address bar to say #home
  history.replaceState({ page: initialPage }, "", "#" + initialPage);
  
  // 4. We actually navigate to the home page
  goTo(initialPage, false);
  
  // 5. Start the normal app functions
  changeLang("en");
  showSlides();
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    setTimeout(() => document.getElementById('splash').remove(), 500);
  }, 1800);
  // 6. Keep your existing OTP auto-focus logic
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < otpInputs.length - 1) otpInputs[index + 1].focus();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) otpInputs[index - 1].focus();
    });
  });
});
// 3. This listens specifically for Browser Back/Forward buttons
window.onpopstate = function(event) {
  if (event.state && event.state.page) {
    goTo(event.state.page, false); 
  } else {
    goTo("home", false);
  }
};
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

// Optional: Close sidebar if user presses 'Escape' key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
  }
});
/* ---- AGRIBOT LOGIC ---- */

function toggleChat() {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.classList.toggle('chat-hidden');
}
function handleChatKey(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
}
function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  const chatBox = document.getElementById("chat-box");

  if (msg === "") return;

  // Show user message
  chatBox.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value = "";

  // Show typing
  chatBox.innerHTML += `<div class="typing-indicator" id="typingDots">
  <span></span><span></span><span></span>
</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  fetch("https://crop-backend-lwhy.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: msg,
      analysisDone: analysisDone,
      lang: currentLang
    })
  })
  .then(res => res.json())
  .then(data => {
    // Remove typing
    const typingDots = document.getElementById("typingDots");
    if (typingDots) typingDots.remove();

    // Show bot reply
    chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    speakBotReply(data.reply);
  })
  .catch(err => {
    chatBox.innerHTML += `<div class="bot-msg">Server error. Try again.</div>`;
  });
}

// ---- VOICE INPUT (Speech-to-Text) ----
let recognition = null;
let isListening = false;

function toggleVoiceInput() {
  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("⚠️ Voice not supported in this browser. Try Chrome.", "error");
    return;
  }

  if (isListening) {
    // Stop listening
    recognition.stop();
    return;
  }

  // Map app language to BCP-47 language code
  const langMap = { en: "en-IN", te: "te-IN", hi: "hi-IN" };

  recognition = new SpeechRecognition();
  recognition.lang = langMap[currentLang] || "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isListening = true;
    const micBtn = document.getElementById('micBtn');
    micBtn.classList.add('listening');
    micBtn.title = "Listening... click to stop";

    const placeholders = {
      en: translations.en.listening,
      te: translations.te.listening,
      hi: translations.hi.listening
    };
    document.getElementById('chatInput').placeholder = placeholders[currentLang] || translations.en.listening;
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chatInput').value = transcript;
    // Auto-send after voice input
    setTimeout(() => sendChatMessage(), 300);
  };

  recognition.onerror = (event) => {
    const errors = {
      "not-allowed": "⚠️ Microphone permission denied.",
      "no-speech":   "⚠️ No speech detected. Try again.",
      "network":     "⚠️ Network error during voice input."
    };
    showToast(errors[event.error] || "⚠️ Voice error. Try again.", "error");
  };

  recognition.onend = () => {
    isListening = false;
    const micBtn = document.getElementById('micBtn');
    if (micBtn) {
      micBtn.classList.remove('listening');
      micBtn.title = "Speak";
    }
    // Restore placeholder
    const placeholders = {
      en: translations.en.chatPlaceholderDefault,
      te: translations.te.chatPlaceholderDefault,
      hi: translations.hi.chatPlaceholderDefault
    };
    const input = document.getElementById('chatInput');
    if (input) input.placeholder = placeholders[currentLang] || "Ask about crops, soil...";
  };

  recognition.start();
}

// ---- TEXT-TO-SPEECH (Bot replies read aloud) ----
let ttsEnabled = false;

function speakBotReply(text) {
  if (!ttsEnabled) return;
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const langMap = { en: "en-IN", te: "te-IN", hi: "hi-IN" };
  const preferredLang = langMap[currentLang] || "en-IN";

  // Check if preferred voice exists, else fallback to en-IN
  const voices = window.speechSynthesis.getVoices();
  const hasVoice = voices.some(v => v.lang === preferredLang);
  utterance.lang = hasVoice ? preferredLang : "en-IN";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}
window.speechSynthesis.onvoiceschanged = function() {
  window.speechSynthesis.getVoices(); // pre-load voice list
};
function handleContactSubmit() {
  const btn = document.getElementById('contactSendBtn');
  const textarea = document.getElementById('contactMsg');
  const t = translations[currentLang];
  if (!textarea.value.trim()) {
    showToast(t.contactEmpty, "error");
    return;
  }
  btn.textContent = t.sending;
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = t.sendMsg;
    btn.disabled = false;
    textarea.value = "";
    showToast(t.contactSent, "success");
  }, 1500);
}

function toggleTTS() {
  ttsEnabled = !ttsEnabled;
  const btn = document.getElementById('ttsToggleBtn');
  const t = translations[currentLang];
  if (btn) {
    btn.textContent = ttsEnabled ? '🔊' : '🔇';
    btn.style.opacity = ttsEnabled ? '1' : '0.6';
  }
  if (!ttsEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
  showToast(ttsEnabled ? t.ttsOn : t.ttsOff, "info");
}
