/* ===========================
   AgriXAI — app.js
   =========================== */

// ---- TRANSLATIONS ----
// ---- PAGE NAVIGATION CONFIG ----
const BACKEND_URL = "https://crop-backend-lwhy.onrender.com";
// 1. PAGE CONFIGURATION
let analysisDone = false;
const pageSequence = ["home", "phone", "otp", "location","choice", "upload", "manual","analyzing", "results","suggestions","contact"];
let currentPageIndex = 0;

const translations = {
  en: {
    tagline: "Smart Soil. Smart Crops.",
    subtitle: "AI-powered crop recommendations for every farmer",
    startBtn: "🚀 Start Analysis",
    locationTitle: "Your Location",
    locationDesc: "We need your location to fetch live climate data",
    allowLocation: "📍 Use My Location",
    manualLocation: "Or enter manually",
    locationPlaceholder: "e.g. Hyderabad, Telangana",
    continueBtn: "Continue →",
    uploadTitle: "Upload Soil Image",
    uploadDesc: "Take a clear photo of your soil sample",
    uploadBtn: "📁 Choose Image",
    cameraBtn: "📷 Use Camera",
    analyzeBtn: "🔬 Analyze Soil",
    resultsTitle: "Your Results",
    soilType: "Soil Type",
    soilParams: "Soil Parameters",
    climate: "Climate Conditions",
    cropRec: "✨ Recommended Crop",
    whyCrop: "Why this crop?",
    confidence: "Confidence",
    temp: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    startOver: "🔄 Start New Analysis",
    about: "About Project",
    contact: "Contact",
    team: "Team",
    footer: "AgriXAI — Empowering farmers with AI",
    detecting: "Analyzing your soil...",
    cropRotation: "Crop Rotation",
    phoneTitle: "Verify Identity",
    phoneDesc: "Enter your phone number to continue",
    getOtpBtn: "Get OTP",
    otpTitle: "Enter OTP",
    otpDesc: "Enter the 4-digit code sent to your phone",
    verifyBtn: "Verify & Continue"
  },
  te: {
    tagline: "తెలివైన మట్టి. తెలివైన పంటలు.",
    subtitle: "ప్రతి రైతుకు AI-ఆధారిత పంట సిఫార్సులు",
    startBtn: "🚀 విశ్లేషణ ప్రారంభించండి",
    locationTitle: "మీ స్థానం",
    locationDesc: "వాతావరణ డేటా కోసం మీ స్థానం అవసరం",
    allowLocation: "📍 నా స్థానం ఉపయోగించు",
    manualLocation: "లేదా మస్తీగా నమోదు చేయండి",
    locationPlaceholder: "ఉదా: హైదరాబాద్",
    continueBtn: "కొనసాగించు →",
    uploadTitle: "మట్టి చిత్రం అప్‌లోడ్",
    uploadDesc: "మట్టి నమూనా యొక్క స్పష్టమైన ఫోటో తీయండి",
    uploadBtn: "📁 చిత్రం ఎంచుకోండి",
    cameraBtn: "📷 కెమెరా ఉపయోగించు",
    analyzeBtn: "🔬 మట్టి విశ్లేషణ",
    resultsTitle: "మీ ఫలితాలు",
    soilType: "మట్టి రకం",
    soilParams: "మట్టి పారామితులు",
    climate: "వాతావరణ పరిస్థితులు",
    cropRec: "✨ సిఫార్సు చేసిన పంట",
    whyCrop: "ఈ పంట ఎందుకు?",
    confidence: "నమ్మకం",
    temp: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    rainfall: "వర్షపాతం",
    startOver: "🔄 కొత్త విశ్లేషణ",
    about: "ప్రాజెక్ట్ గురించి",
    contact: "సంప్రదించండి",
    team: "బృందం",
    footer: "AgriXAI — AI తో రైతులను శక్తివంతం చేయడం",
    detecting: "మీ మట్టిని విశ్లేషిస్తోంది...",
    phoneTitle: "గుర్తింపును ధృవీకరించండి",
    phoneDesc: "కొనసాగించడానికి మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
    getOtpBtn: "OTP పొందండి",
    otpTitle: "OTP నమోదు చేయండి",
    otpDesc: "మీ ఫోన్‌కు పంపిన 4 అంకెల కోడ్‌ను నమోదు చేయండి",
    verifyBtn: "ధృవీకరించండి & కొనసాగించండి",
    cropRotation: "పంట మార్పిడి",
  },
  hi: {
    tagline: "स्मार्ट मिट्टी। स्मार्ट फसलें।",
    subtitle: "हर किसान के लिए AI-आधारित फसल सिफारिशें",
    startBtn: "🚀 विश्लेषण शुरू करें",
    locationTitle: "आपका स्थान",
    locationDesc: "मौसम डेटा के लिए आपका स्थान चाहिए",
    allowLocation: "📍 मेरा स्थान उपयोग करें",
    manualLocation: "या मैन्युअल दर्ज करें",
    locationPlaceholder: "जैसे: हैदराबाद, तेलंगाना",
    continueBtn: "जारी रखें →",
    uploadTitle: "मिट्टी की तस्वीर अपलोड करें",
    uploadDesc: "अपने मिट्टी के नमूने की स्पष्ट तस्वीर लें",
    uploadBtn: "📁 तस्वीर चुनें",
    cameraBtn: "📷 कैमरा उपयोग करें",
    analyzeBtn: "🔬 मिट्टी का विश्लेषण करें",
    resultsTitle: "आपके परिणाम",
    soilType: "मिट्टी का प्रकार",
    soilParams: "मिट्टी के मापदंड",
    climate: "मौसम की स्थिति",
    cropRec: "✨ सुझाई गई फसल",
    whyCrop: "यह फसल क्यों?",
    confidence: "नम्मी",
    temp: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",
    startOver: "🔄 नया विश्लेषण",
    about: "प्रोजेक्ट के बारे में",
    contact: "संपर्क",
    team: "टीम",
    footer: "AgriXAI — AI से किसानों को सशक्त बनाना",
    detecting: "आपकी मिट्टी का विश्लेषण हो रहा है...",
    phoneTitle: "पहचान सत्यापित करें",
    phoneDesc: "जारी रखने के लिए अपना फोन नंबर दर्ज करें",
    getOtpBtn: "ओटीपी प्राप्त करें",
    otpTitle: "ओटीपी दर्ज करें",
    otpDesc: "अपने फोन पर भेजा गया 4 अंकों का कोड दर्ज करें",
    verifyBtn: "सत्यापित करें और जारी रखें",
    cropRotation: "फसल चक्र",
  },
};

const dummyResults = {
  soilType: "Black Cotton Soil",
  soilColor: "#3d2b1f",
  ph: 7.8,
  nitrogen: 42,
  phosphorus: 28,
  potassium: 65,
  temperature: "28°C",
  humidity: "72%",
  rainfall: "850 mm/yr",
  crop: "Cotton",
  cropEmoji: "🌿",
  confidence: 87,
  explanation: "Black cotton soil has high clay content and excellent water retention. Its slightly alkaline pH (7.8) and moderate nitrogen levels are ideal for cotton cultivation.",
};

// ---- STATE ----
let currentLang = "en";
let generatedOTP = null;
let currentPage = "home";
let locDetected = false;

// ---- LANGUAGE CHANGE ----
function changeLang(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll("[data-key-placeholder]").forEach(el => {
    const key = el.getAttribute("data-key-placeholder");
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  if (locDetected) {
    document.getElementById("locBtn").textContent = "✅ Location Detected!";
  }
}
function renderSuggestionsFromServer() {
  fetch("https://crop-backend-lwhy.onrender.com/get-suggestions")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('suggestionsList');

      list.innerHTML = data.map(s => `
        <div class="suggestion-item">
          <p>"${s.text}"</p>
          <div>— ${s.name}</div>
        </div>
      `).join('');
    });
}
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
    target.classList.add("active");
    target.style.display = "block";
    target.classList.add("fade-in");
    setTimeout(() => target.classList.remove("fade-in"), 500);
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

  if (page === 'otp') resetOTPFields();
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
}

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
  if (/^\d{10}$/.test(phone)) {
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('otpHintCode').textContent = generatedOTP;
    document.getElementById('otpHintBox').style.display = 'block';

    resetOTPFields();
    goTo('otp');
  } else {
    alert("Please enter a valid 10-digit phone number");
  }
}

function handleVerifyOTP() {
  let userEnteredOtp = "";
  document.querySelectorAll('.otp-input').forEach(input => { userEnteredOtp += input.value; });
  if (userEnteredOtp === generatedOTP) {
    alert("Phone Verified Successfully!");
    goTo('location');
  } else {
    alert("Invalid OTP! Try again.");
     resetOTPFields();
    document.querySelectorAll('.otp-input').forEach(input => input.value = "");
    document.querySelectorAll('.otp-input')[0].focus();
  }
}

// ---- LOCATION DETECTION ----
function detectLocation() {
  const btn = document.getElementById("locBtn");
  const manualInput = document.getElementById("manualLoc");

  btn.textContent = "⏳ Detecting...";
  btn.disabled = true;

  // Step 1: Get real GPS coordinates from browser
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser. Please enter location manually.");
    btn.textContent = "📍 Use My Location";
    btn.disabled = false;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    // Step 2: On success — reverse geocode coordinates to city name
    function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Using OpenStreetMap Nominatim API (free, no API key needed)
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        .then(res => res.json())
        .then(data => {
          const address = data.address;

          // Build location string from what's available
          const city = address.city || address.town || address.village || address.county || "Unknown";
          const state = address.state || "";
          const locationString = state ? `${city}, ${state}` : city;

          // Show in the input field
          manualInput.value = locationString;
          manualInput.placeholder = locationString + " (Live)";

          locDetected = true;
          btn.textContent = "✅ Location Detected!";
          btn.classList.add("blue-btn");
          btn.disabled = false;
        })
        .catch(() => {
          // Geocoding failed but we still have coordinates
          manualInput.value = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
          locDetected = true;
          btn.textContent = "✅ Location Detected!";
          btn.classList.add("blue-btn");
          btn.disabled = false;
        });
    },

    // Step 3: On failure — tell user exactly why
    function(error) {
      btn.textContent = "📍 Use My Location";
      btn.disabled = false;

      const messages = {
        1: "Location permission denied. Please allow location access in your browser settings, or enter manually.",
        2: "Location unavailable. Please enter your location manually.",
        3: "Location request timed out. Please try again or enter manually."
      };
      alert(messages[error.code] || "Could not detect location. Please enter manually.");
    },

    // Options: timeout after 10 seconds
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


function startAnalysis() {
  if (currentPage === 'upload') updateStep(4);
  goTo("analyzing");
  animateProgress();
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

// --- Specific Start for Manual Path ---
function startManualAnalysis() {
    updateManualStep(4); // Highlight the final step (Submit)
    
    // Tiny delay so user sees step 4 light up
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

function showResults() {
  const d = dummyResults;
  document.getElementById("soilColorBox").style.background = d.soilColor;
  document.getElementById("soilTypeVal").textContent = d.soilType;
  document.getElementById("confFill").style.width    = d.confidence + "%";
  document.getElementById("confPct").textContent     = d.confidence + "%";
  document.getElementById("cropEmoji").textContent   = d.cropEmoji;
  document.getElementById("cropName").textContent    = d.crop;
  document.getElementById("xaiText").textContent     = d.explanation;
  goTo("results");
  analysisDone = true;
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

  if (!name || !sug) {
    alert("Fill both fields");
    return;
  }

  fetch("https://crop-backend-lwhy.onrender.com/add-suggestion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      text: sug
    })
  })
  .then(res => res.json())
  .then(() => {
    // Clear inputs
    document.getElementById('expertName').value = "";
    document.getElementById('expertSug').value = "";

    // Close modal
    document.getElementById('sugModal').classList.remove('open');

    // 🔥 THIS IS IMPORTANT
    renderSuggestionsFromServer();  // refresh UI

  })
  .catch(() => {
    alert("Server error");
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
  
  slideTimer = setTimeout(showSlides, 3000); // Save timer reference
}

function resetSlides() {
  clearTimeout(slideTimer);
  slideIndex = 0;
}
function currentSlide(n){
  clearTimeout(slideTimer);
  slideIndex = n - 1;
  showSlides();
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
  chatBox.innerHTML += `<div class="bot-msg">Typing...</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  fetch("https://crop-backend-lwhy.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: msg,
      analysisDone: analysisDone
    })
  })
  .then(res => res.json())
  .then(data => {
    // Remove typing
    const typingMsg = chatBox.querySelector(".bot-msg:last-child");
    if (typingMsg) typingMsg.remove();

    // Show bot reply
    chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(err => {
    chatBox.innerHTML += `<div class="bot-msg">Server error. Try again.</div>`;
  });
}
// --- NEW FUNCTION: Clears the 4 OTP boxes ---
function resetOTPFields() {
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach(input => {
    input.value = ""; // Empties the box
  });
  // Puts the typing cursor in the first box automatically
  if (otpInputs[0]) otpInputs[0].focus();
}
