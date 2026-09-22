/**
 * Romantic Date Proposal - Main Application Logic
 * Manages steps, interactive selections, ticket generation, and WhatsApp integration
 */

const I18N = {
  en: {
    letterTitle: "A Secret Letter For You 💌",
    letterSubtitle: "Tap the envelope to open...",
    letterBody: "Hey {crushName}, you make everyday a little brighter and sweeter. I have a very special question to ask you... - Dipu 🌹",
    openLetterBtn: "Open Letter ✨",
    proposalQuestion: "Will you go on a date with me? 💖",
    yesBtn: "YES! Absolutely 🥰",
    celebrationTitle: "YAAAY! I Knew You'd Say Yes! 🎉",
    celebrationSub: "Let's plan our dream date together step by step! ✨",
    stepDateTitle: "When are we going? 📅",
    stepDateSub: "Pick our special day and your favorite time of day",
    timeSlots: [
      { id: "morning", label: "Morning Coffee ☕", desc: "Fresh start & sweet pastries" },
      { id: "lunch", label: "Sunny Lunch Date ☀️", desc: "Warm sunlight & tasty treats" },
      { id: "sunset", label: "Sunset Stroll 🌅", desc: "Golden hour sky & hand holding" },
      { id: "dinner", label: "Candlelight Dinner 🕯️", desc: "Romantic evening & delicious food" },
      { id: "night", label: "Late Night Under Stars ✨", desc: "Chilly breeze & cozy conversations" }
    ],
    stepFoodTitle: "What are we eating? 🍕🍣",
    stepFoodSub: "Select everything that makes your mouth water (Pick 1 or more)",
    stepActivityTitle: "What are we doing? 🎡🎬",
    stepActivitySub: "Choose our fun date adventures together",
    stepOutfitTitle: "Dress Code & Special Wish 👗💌",
    stepOutfitSub: "How should we dress up, and anything special on your mind?",
    secretNotePlaceholder: "Write a secret wish, sweet note, or anything special you want... 💕",
    nextBtn: "Continue 👉",
    backBtn: "👈 Back",
    finishBtn: "Generate Date Pass 🎟️✨",
    ticketHeader: "OFFICIAL DATE BOARDING PASS",
    ticketSubtitle: "Valid for One Unforgettable Romance Journey",
    passengerLabel: "PASSENGER",
    dateLabel: "DATE & TIME",
    foodLabel: "MENU CRAVINGS",
    activityLabel: "ITINERARY",
    dressLabel: "DRESS CODE",
    noteLabel: "SPECIAL WISH",
    whatsappBtn: "📲 Send Plan to WhatsApp",
    copyBtn: "📋 Copy Date Summary",
    downloadBtn: "📸 Print / Save Ticket",
    restartBtn: "🔄 Edit / Plan Another",
    copiedToast: "Copied to clipboard! 💖",
    sealText: "ACCEPTED & NON-REFUNDABLE ❤️",
    quickYesBtn: "📲 Send Quick 'YES!' to WhatsApp 💖",
    waModalTitle: "Date Pass Confirmed! 🎉",
    waModalDesc: "Opening WhatsApp automatically to send your date pass to {number}...",
    waInstantBtn: "Open WhatsApp Now 🚀",
    waCancelBtn: "View Ticket First",
    waBanner: "📲 Auto-syncing to WhatsApp: {number}"
  },
  bn: {
    letterTitle: "তোমার জন্য একটি স্পেশাল চিঠি 💌",
    letterSubtitle: "চিঠির খামে চাপ দিয়ে ওপেন করো...",
    letterBody: "প্রিয় {crushName}, তোমাকে দেখলে মনটা খুশিতে ভরে যায়। তোমার কাছে দীপুর ছোট্ট একটা মিষ্টি প্রশ্ন ছিলো... 🌹",
    openLetterBtn: "চিঠি খোলো ✨",
    proposalQuestion: "তুমি কি আমার সাথে ডেটে যাবা? 💖",
    yesBtn: "হ্যাঁ! অবশ্যই 🥰",
    celebrationTitle: "ইয়াহুউউ! আমি জানতাম তুমি হ্যাঁ বলবে! 🎉",
    celebrationSub: "চলো আমাদের মিষ্টি ডেটটা একসাথে মনের মতো প্ল্যান করি! ✨",
    stepDateTitle: "আমরা কবে যাচ্ছি? 📅",
    stepDateSub: "একটা সুন্দর দিন এবং পছন্দের সময় বেছে নাও",
    timeSlots: [
      { id: "morning", label: "সকালের কফি ডেট ☕", desc: "মিষ্টি সকাল ও গরম কফি" },
      { id: "lunch", label: "লাঞ্চ ডেট ☀️", desc: "দুপুরের আড্ডা ও মুখরোচক খাবার" },
      { id: "sunset", label: "সূর্যাস্তের হাঁটাচলা 🌅", desc: "গোধূলির আকাশ ও একসাথে হাত ধরা" },
      { id: "dinner", label: "ক্যান্ডেললাইট ডিনার 🕯️", desc: "রোমান্টিক আলো ও প্রিয় খাবার" },
      { id: "night", label: "রাতের তারার মেলা ✨", desc: "ঠান্ডা বাতাস ও অন্তহীন গল্প" }
    ],
    stepFoodTitle: "আমরা কী খাবো? 🍕🍣",
    stepFoodSub: "তোমার যা যা খেতে মন চায় সিলেক্ট করো (এক বা একাধিক)",
    stepActivityTitle: "আমরা কী কী করবো? 🎡🎬",
    stepActivitySub: "আমাদের স্মরণীয় অ্যাডভেঞ্চার বেছে নাও",
    stepOutfitTitle: "ড্রেস কোড ও মিষ্টি বার্তা 👗💌",
    stepOutfitSub: "আমরা কেমন সাজবো আর তোমার কোনো স্পেশাল আবদার আছে?",
    secretNotePlaceholder: "তোমার কোনো স্পেশাল আবদার বা মিষ্টি কথা এখানে লিখো... 💕",
    nextBtn: "পরবর্তী ধাপ 👉",
    backBtn: "👈 পেছনে",
    finishBtn: "ডেট টিকেট তৈরি করো 🎟️✨",
    ticketHeader: "অফিসিয়াল ডেট বোর্ডিং পাস",
    ticketSubtitle: "একটি চিরস্মরণীয় ভালোবাসার ভ্রমণের নিশ্চয়তা",
    passengerLabel: "যাত্রী / পার্টনার",
    dateLabel: "তারিখ ও সময়",
    foodLabel: "পছন্দের খাবার",
    activityLabel: "অ্যাক্টিভিটি প্ল্যান",
    dressLabel: "ড্রেস কোড",
    noteLabel: "স্পেশাল আবদার",
    whatsappBtn: "📲 WhatsApp-এ পাঠাও",
    copyBtn: "📋 সামারি কপি করো",
    downloadBtn: "📸 টিকেট সেভ / প্রিন্ট করো",
    restartBtn: "🔄 আবার এডিট করো",
    copiedToast: "কপি করা হয়েছে! 💖",
    sealText: "অনুমোদিত ও অপরিবর্তনীয় ❤️",
    quickYesBtn: "📲 WhatsApp-এ তাৎক্ষণিক 'হ্যাঁ' পাঠাও 💖",
    waModalTitle: "ডেট প্ল্যান কনফার্ম হয়েছে! 🎉",
    waModalDesc: "আপনার ডেট টিকেট পাঠাতে স্বয়ংক্রিয়ভাবে WhatsApp ওপেন হচ্ছে ({number})...",
    waInstantBtn: "এখনই WhatsApp ওপেন করো 🚀",
    waCancelBtn: "আগে টিকেট দেখি",
    waBanner: "📲 স্বয়ংক্রিয়ভাবে WhatsApp-এ পাঠানো হচ্ছে: {number}"
  }
};

class DateApp {
  constructor() {
    this.currentStep = 0; // 0: Letter, 1: Proposal, 2: Celebration, 3: Date, 4: Food, 5: Activities, 6: Outfit, 7: Ticket
    this.language = localStorage.getItem("date_app_lang") || DATE_APP_CONFIG.defaultLanguage || "en";
    window.currentLanguage = this.language;

    let storedCrush = localStorage.getItem("date_crush_name");
    let storedSender = localStorage.getItem("date_sender_name");
    if (!storedCrush || storedCrush === "Pookie") {
      storedCrush = DATE_APP_CONFIG.crushName;
      localStorage.setItem("date_crush_name", storedCrush);
    }
    if (!storedSender || storedSender === "Your Secret Admirer") {
      storedSender = DATE_APP_CONFIG.senderName;
      localStorage.setItem("date_sender_name", storedSender);
    }

    this.state = {
      crushName: storedCrush,
      senderName: storedSender,
      whatsappNumber: localStorage.getItem("date_wp_num") || DATE_APP_CONFIG.whatsappNumber,
      selectedDate: "",
      selectedTime: "dinner",
      selectedFoods: ["pizza", "dessert"],
      selectedActivities: ["movie", "coffee"],
      selectedDress: "fancy",
      secretNote: ""
    };

    this.runaway = null;
  }

  init() {
    this.bindGlobalEvents();
    this.renderFoodGrid();
    this.renderActivityGrid();
    this.renderDressOptions();
    this.renderTimeSlots();
    this.updateLanguageUI();
    this.setupDatePicker();

    // Start background floating hearts
    setInterval(() => {
      if (window.confettiCelebration) {
        const bg = document.getElementById("hearts-bg");
        if (bg) window.confettiCelebration.spawnFloatingHeart(bg);
      }
    }, 800);

    // Initialize runaway button
    this.runaway = new RunawayButton("no-btn", "yes-btn", {
      sensitivity: DATE_APP_CONFIG.runawaySensitivity,
      growStep: DATE_APP_CONFIG.yesGrowStep,
      maxScale: DATE_APP_CONFIG.maxYesScale
    });
    this.runaway.init();

    this.showStep(1);
  }

  setupDatePicker() {
    const dateInput = document.getElementById("date-input");
    if (dateInput) {
      // Set min date to today
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      // Default to next Saturday
      const d = new Date();
      d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
      dateInput.value = d.toISOString().split("T")[0];
      this.state.selectedDate = dateInput.value;

      dateInput.addEventListener("change", (e) => {
        this.state.selectedDate = e.target.value;
      });
    }
  }

  bindGlobalEvents() {
    // Top Music Toggle
    const musicBtn = document.getElementById("music-toggle-btn");
    if (musicBtn) {
      const updateMusicBtnUI = (isPlaying) => {
        musicBtn.classList.toggle("playing", isPlaying);
        if (this.language === "bn") {
          musicBtn.innerHTML = isPlaying ? "🎵 গান: চলছে" : "🔇 গান: বন্ধ";
        } else {
          musicBtn.innerHTML = isPlaying ? "🎵 Music: ON" : "🔇 Music: OFF";
        }
      };

      musicBtn.addEventListener("click", () => {
        const isPlaying = window.soundEngine.toggleBGM();
        updateMusicBtnUI(isPlaying);
      });

      if (window.soundEngine) {
        window.soundEngine.onStateChange = (isPlaying) => {
          updateMusicBtnUI(isPlaying);
        };
      }
      this.updateMusicBtnUI = updateMusicBtnUI;
    }

    // Top Language Toggle
    const langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        this.language = this.language === "en" ? "bn" : "en";
        window.currentLanguage = this.language;
        localStorage.setItem("date_app_lang", this.language);
        langBtn.innerText = this.language === "en" ? "🌐 বাংলা" : "🌐 English";
        this.updateLanguageUI();
        this.renderTimeSlots();
        if (this.runaway) this.runaway.reset();
      });
    }

    // Settings Modal
    const settingsBtn = document.getElementById("settings-btn");
    const settingsModal = document.getElementById("settings-modal");
    const closeSettings = document.getElementById("close-settings");
    const saveSettings = document.getElementById("save-settings");

    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener("click", () => {
        document.getElementById("cfg-crush-name").value = this.state.crushName;
        document.getElementById("cfg-sender-name").value = this.state.senderName;
        document.getElementById("cfg-wp-number").value = this.state.whatsappNumber;
        settingsModal.classList.remove("hidden");
      });

      closeSettings.addEventListener("click", () => settingsModal.classList.add("hidden"));

      saveSettings.addEventListener("click", () => {
        this.state.crushName = document.getElementById("cfg-crush-name").value.trim() || "Pookie";
        this.state.senderName = document.getElementById("cfg-sender-name").value.trim() || "Your Secret Admirer";
        this.state.whatsappNumber = document.getElementById("cfg-wp-number").value.trim() || "8801734738311";

        localStorage.setItem("date_crush_name", this.state.crushName);
        localStorage.setItem("date_sender_name", this.state.senderName);
        localStorage.setItem("date_wp_num", this.state.whatsappNumber);

        settingsModal.classList.add("hidden");
        this.updateLanguageUI();
        if (window.soundEngine) window.soundEngine.playChime();
      });
    }

    // Secret Letter Modal Controls
    const viewLetterBtn = document.getElementById("view-letter-btn");
    const letterModal = document.getElementById("letter-modal");
    const closeLetterBtn = document.getElementById("close-letter");

    if (viewLetterBtn && letterModal) {
      viewLetterBtn.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playChime();
        letterModal.classList.remove("hidden");
      });
    }
    if (closeLetterBtn && letterModal) {
      closeLetterBtn.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playPop();
        letterModal.classList.add("hidden");
      });
    }

    // Step 1: YES Button Click
    const yesBtn = document.getElementById("yes-btn");
    if (yesBtn) {
      yesBtn.addEventListener("click", () => {
        if (window.soundEngine) {
          window.soundEngine.playCelebration();
          // Start ambient bgm if not playing
          window.soundEngine.toggleBGM(true);
          if (this.updateMusicBtnUI) {
            this.updateMusicBtnUI(true);
          }
        }
        if (window.confettiCelebration) {
          window.confettiCelebration.blast(5000);
        }
        this.showStep(2); // Celebration step
      });
    }

    // Celebration Continue button
    const celebContinueBtn = document.getElementById("celeb-continue-btn");
    if (celebContinueBtn) {
      celebContinueBtn.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playPop();
        this.showStep(3); // Date step
      });
    }

    // Step 2 Quick WhatsApp Button
    const celebQuickWaBtn = document.getElementById("celeb-quick-wa-btn");
    if (celebQuickWaBtn) {
      celebQuickWaBtn.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playCelebration();
        const text = this.buildQuickYesText();
        this.sendToWhatsApp(text);
      });
    }

    // WhatsApp Auto Redirect Modal Buttons
    document.getElementById("wa-instant-send-btn")?.addEventListener("click", () => {
      if (this.waTimer) {
        clearInterval(this.waTimer);
        this.waTimer = null;
      }
      document.getElementById("whatsapp-redirect-modal")?.classList.add("hidden");
      this.sendToWhatsApp();
    });

    document.getElementById("wa-cancel-btn")?.addEventListener("click", () => {
      if (this.waTimer) {
        clearInterval(this.waTimer);
        this.waTimer = null;
      }
      document.getElementById("whatsapp-redirect-modal")?.classList.add("hidden");
    });

    // Navigation Buttons
    this.bindNavButtons();

    // Final Action Buttons
    const wpBtn = document.getElementById("whatsapp-share-btn");
    if (wpBtn) {
      wpBtn.addEventListener("click", () => this.sendToWhatsApp());
    }

    const copyBtn = document.getElementById("copy-summary-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => this.copySummary());
    }

    const downloadBtn = document.getElementById("download-ticket-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        window.print();
      });
    }

    const restartBtn = document.getElementById("restart-app-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        if (this.waTimer) {
          clearInterval(this.waTimer);
          this.waTimer = null;
        }
        document.getElementById("whatsapp-redirect-modal")?.classList.add("hidden");
        if (this.runaway) this.runaway.reset();
        this.showStep(1);
      });
    }

    // Secret note text
    const noteArea = document.getElementById("secret-note-input");
    if (noteArea) {
      noteArea.addEventListener("input", (e) => {
        this.state.secretNote = e.target.value;
      });
    }
  }

  bindNavButtons() {
    // Step 3 (Date) Next
    document.getElementById("step3-next")?.addEventListener("click", () => {
      if (window.soundEngine) window.soundEngine.playPop();
      this.showStep(4);
    });

    // Step 4 (Food) Back & Next
    document.getElementById("step4-back")?.addEventListener("click", () => this.showStep(3));
    document.getElementById("step4-next")?.addEventListener("click", () => {
      if (window.soundEngine) window.soundEngine.playPop();
      this.showStep(5);
    });

    // Step 5 (Activity) Back & Next
    document.getElementById("step5-back")?.addEventListener("click", () => this.showStep(4));
    document.getElementById("step5-next")?.addEventListener("click", () => {
      if (window.soundEngine) window.soundEngine.playPop();
      this.showStep(6);
    });

    // Step 6 (Outfit/Note) Back & Finish -> Triggers Automatic WhatsApp!
    document.getElementById("step6-back")?.addEventListener("click", () => this.showStep(5));
    document.getElementById("step6-finish")?.addEventListener("click", () => {
      if (window.soundEngine) {
        window.soundEngine.playCelebration();
      }
      if (window.confettiCelebration) {
        window.confettiCelebration.blast(4000);
      }
      this.generateTicket();
      this.showStep(7);

      // AUTOMATIC WHATSAPP LAUNCH MODAL TRIGGER!
      this.triggerAutoWhatsApp();
    });
  }

  showStep(stepIndex) {
    this.currentStep = stepIndex;
    const allSteps = document.querySelectorAll(".step-container");
    allSteps.forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("active-step");
    });

    const stepMap = {
      1: "step-1-proposal",
      2: "step-2-celebration",
      3: "step-3-date",
      4: "step-4-food",
      5: "step-5-activity",
      6: "step-6-outfit",
      7: "step-7-ticket"
    };

    const targetId = stepMap[stepIndex];
    if (targetId) {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.classList.remove("hidden");
        targetEl.classList.add("active-step");
      }
    }

    if (stepIndex === 1) {
      if (this.runaway) this.runaway.reset();
      if (window.characterEngine) window.characterEngine.setEmotion("asking");
    } else {
      if (this.runaway) this.runaway.hide();
    }

    if (stepIndex === 2) {
      const celebBox = document.getElementById("celebration-character");
      if (celebBox && window.characterEngine) {
        celebBox.innerHTML = window.characterEngine.getCelebratingSVG();
      }
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  updateLanguageUI() {
    const t = I18N[this.language] || I18N.en;

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    setTxt("letter-title", t.letterTitle);
    setTxt("letter-sub", t.letterSubtitle);
    setTxt("letter-body-text", t.letterBody.replace("{crushName}", this.state.crushName));
    setTxt("view-letter-btn", this.language === "bn" ? "💌 গোপন চিঠি" : "💌 Secret Letter");
    setTxt("close-letter", this.language === "bn" ? "পড়েছি, উত্তরে যাই 💖" : "Read & Answer Question 💖");

    setTxt("crush-display-name", this.state.crushName);
    setTxt("proposal-title", t.proposalQuestion);
    setTxt("yes-btn", t.yesBtn);

    const noBtn = document.getElementById("no-btn");
    if (noBtn) {
      const texts = DATE_APP_CONFIG.pleadingTexts[this.language] || DATE_APP_CONFIG.pleadingTexts.en;
      noBtn.innerText = texts[0];
    }

    setTxt("celeb-title", t.celebrationTitle);
    setTxt("celeb-sub", t.celebrationSub);
    setTxt("celeb-continue-btn", this.language === "bn" ? "চলো ডেট প্ল্যান করি 👉" : "Plan Our Date Step-by-Step 👉");

    setTxt("step-date-title", t.stepDateTitle);
    setTxt("step-date-sub", t.stepDateSub);
    setTxt("step3-next", t.nextBtn);

    setTxt("step-food-title", t.stepFoodTitle);
    setTxt("step-food-sub", t.stepFoodSub);
    setTxt("step4-back", t.backBtn);
    setTxt("step4-next", t.nextBtn);

    setTxt("step-act-title", t.stepActivityTitle);
    setTxt("step-act-sub", t.stepActivitySub);
    setTxt("step5-back", t.backBtn);
    setTxt("step5-next", t.nextBtn);

    setTxt("step-outfit-title", t.stepOutfitTitle);
    setTxt("step-outfit-sub", t.stepOutfitSub);
    const noteEl = document.getElementById("secret-note-input");
    if (noteEl) noteEl.placeholder = t.secretNotePlaceholder;

    setTxt("step6-back", t.backBtn);
    setTxt("step6-finish", t.finishBtn);

    // Ticket labels
    setTxt("ticket-header-text", t.ticketHeader);
    setTxt("ticket-sub-text", t.ticketSubtitle);
    setTxt("lbl-passenger", t.passengerLabel);
    setTxt("lbl-date", t.dateLabel);
    setTxt("lbl-food", t.foodLabel);
    setTxt("lbl-activity", t.activityLabel);
    setTxt("lbl-dress", t.dressLabel);
    setTxt("lbl-note", t.noteLabel);
    setTxt("ticket-seal-text", t.sealText);

    setTxt("whatsapp-share-btn", t.whatsappBtn);
    setTxt("copy-summary-btn", t.copyBtn);
    setTxt("download-ticket-btn", t.downloadBtn);
    setTxt("restart-app-btn", t.restartBtn);

    // New WhatsApp Elements
    const formattedNum = "+" + this.getFormattedNumber();
    setTxt("celeb-quick-wa-btn", t.quickYesBtn);
    setTxt("wa-modal-title", t.waModalTitle);
    setTxt("wa-modal-desc", t.waModalDesc.replace("{number}", formattedNum));
    setTxt("wa-instant-send-btn", t.waInstantBtn);
    setTxt("wa-cancel-btn", t.waCancelBtn);
    const waBannerEl = document.getElementById("wa-status-banner");
    if (waBannerEl) waBannerEl.innerHTML = t.waBanner.replace("{number}", `<strong>${formattedNum}</strong>`);

    if (this.updateMusicBtnUI && window.soundEngine) {
      this.updateMusicBtnUI(window.soundEngine.bgmPlaying);
    }
  }

  renderTimeSlots() {
    const container = document.getElementById("time-slots-container");
    if (!container) return;
    const t = I18N[this.language] || I18N.en;

    container.innerHTML = "";
    t.timeSlots.forEach((slot) => {
      const chip = document.createElement("div");
      chip.className = `time-chip ${this.state.selectedTime === slot.id ? "selected" : ""}`;
      chip.innerHTML = `
        <div class="time-label">${slot.label}</div>
        <div class="time-desc">${slot.desc}</div>
      `;
      chip.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playPop();
        this.state.selectedTime = slot.id;
        document.querySelectorAll(".time-chip").forEach((c) => c.classList.remove("selected"));
        chip.classList.add("selected");
      });
      container.appendChild(chip);
    });
  }

  renderFoodGrid() {
    const grid = document.getElementById("food-grid");
    if (!grid) return;
    grid.innerHTML = "";

    DATE_APP_CONFIG.foodOptions.forEach((item) => {
      const card = document.createElement("div");
      const isSelected = this.state.selectedFoods.includes(item.id);
      card.className = `selection-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="card-check">✓</div>
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.desc}</div>
      `;
      card.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playPop();
        if (this.state.selectedFoods.includes(item.id)) {
          this.state.selectedFoods = this.state.selectedFoods.filter((x) => x !== item.id);
          card.classList.remove("selected");
        } else {
          this.state.selectedFoods.push(item.id);
          card.classList.add("selected");
        }
      });
      grid.appendChild(card);
    });
  }

  renderActivityGrid() {
    const grid = document.getElementById("activity-grid");
    if (!grid) return;
    grid.innerHTML = "";

    DATE_APP_CONFIG.activityOptions.forEach((item) => {
      const card = document.createElement("div");
      const isSelected = this.state.selectedActivities.includes(item.id);
      card.className = `selection-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="card-check">✓</div>
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.desc}</div>
      `;
      card.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playPop();
        if (this.state.selectedActivities.includes(item.id)) {
          this.state.selectedActivities = this.state.selectedActivities.filter((x) => x !== item.id);
          card.classList.remove("selected");
        } else {
          this.state.selectedActivities.push(item.id);
          card.classList.add("selected");
        }
      });
      grid.appendChild(card);
    });
  }

  renderDressOptions() {
    const container = document.getElementById("dress-options-container");
    if (!container) return;
    container.innerHTML = "";

    DATE_APP_CONFIG.dressCodeOptions.forEach((item) => {
      const card = document.createElement("div");
      const isSelected = this.state.selectedDress === item.id;
      card.className = `selection-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="card-check">✓</div>
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.desc}</div>
      `;
      card.addEventListener("click", () => {
        if (window.soundEngine) window.soundEngine.playPop();
        this.state.selectedDress = item.id;
        document.querySelectorAll("#dress-options-container .selection-card").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
      });
      container.appendChild(card);
    });
  }

  generateTicket() {
    // Passenger & Sender
    const passengerDisplay = this.state.crushName.includes("Raisa")
      ? `${this.state.crushName} ❤️ ${this.state.senderName}`
      : `${this.state.crushName} (Raisa) ❤️ ${this.state.senderName}`;
    document.getElementById("ticket-passenger").innerText = passengerDisplay;

    // Date & Time
    const t = I18N[this.language] || I18N.en;
    const timeObj = t.timeSlots.find((x) => x.id === this.state.selectedTime) || t.timeSlots[3];
    const dateStr = this.state.selectedDate || "Upcoming Weekend";
    document.getElementById("ticket-datetime").innerText = `${dateStr} • ${timeObj.label}`;

    // Food list
    const foodNames = this.state.selectedFoods.map((fid) => {
      const f = DATE_APP_CONFIG.foodOptions.find((x) => x.id === fid);
      return f ? f.title : fid;
    });
    document.getElementById("ticket-food").innerText = foodNames.length > 0 ? foodNames.join(", ") : "Surprise Delicious Feast 🎁";

    // Activity list
    const actNames = this.state.selectedActivities.map((aid) => {
      const a = DATE_APP_CONFIG.activityOptions.find((x) => x.id === aid);
      return a ? a.title : aid;
    });
    document.getElementById("ticket-activity").innerText = actNames.length > 0 ? actNames.join(", ") : "Cozy Talks & Long Walk ☕";

    // Dress code
    const dressObj = DATE_APP_CONFIG.dressCodeOptions.find((x) => x.id === this.state.selectedDress);
    document.getElementById("ticket-dress").innerText = dressObj ? dressObj.title : "Casual & Comfy 👟";

    // Note
    const noteEl = document.getElementById("ticket-note");
    if (this.state.secretNote && this.state.secretNote.trim() !== "") {
      noteEl.innerText = `"${this.state.secretNote.trim()}"`;
      document.getElementById("ticket-note-row").style.display = "block";
    } else {
      document.getElementById("ticket-note-row").style.display = "none";
    }

    // Unique boarding ticket number
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("ticket-number").innerText = `PASS-${randomCode}-LOVE`;
  }

  getFormattedNumber() {
    let num = (this.state.whatsappNumber || "8801734738311").replace(/[^0-9]/g, "");
    if (num.startsWith("01") && num.length === 11) {
      num = "88" + num;
    }
    if (!num) num = "8801734738311";
    return num;
  }

  buildQuickYesText() {
    if (this.language === "bn") {
      return `💖 *ডেট প্রপোজাল গ্রহণ করা হয়েছে!* 🐰🥰✨\n\n` +
        `আমি তোমার সাথে ডেটে যাওয়ার জন্য 'হ্যাঁ' বলেছি! 🌹\n` +
        `পার্টনার: ${this.state.crushName} (রাইসা) 🐰❤️\n` +
        `প্রেরক: ${this.state.senderName} (দীপু)\n\n` +
        `দীপু, খুব তাড়াতাড়ি আমাদের মিষ্টি ডেট হচ্ছে! 🥰✨`;
    }
    return `💖 *DATE PROPOSAL ACCEPTED!* 🐰🥰✨\n\n` +
      `Hey Dipu! I just clicked *YES* to your date proposal! 🌹\n` +
      `From: ${this.state.crushName} (Raisa) 🐰❤️\n` +
      `To: ${this.state.senderName} (Dipu)\n\n` +
      `Can't wait for our date! 🥰✨`;
  }

  buildPlanText() {
    const t = I18N[this.language] || I18N.en;
    const timeObj = t.timeSlots.find((x) => x.id === this.state.selectedTime) || t.timeSlots[3];
    const dateStr = this.state.selectedDate || "Upcoming Weekend";

    const foodNames = this.state.selectedFoods.map((fid) => {
      const f = DATE_APP_CONFIG.foodOptions.find((x) => x.id === fid);
      return f ? f.title : fid;
    }).join(", ");

    const actNames = this.state.selectedActivities.map((aid) => {
      const a = DATE_APP_CONFIG.activityOptions.find((x) => x.id === aid);
      return a ? a.title : aid;
    }).join(", ");

    const dressObj = DATE_APP_CONFIG.dressCodeOptions.find((x) => x.id === this.state.selectedDress);
    const ticketCode = document.getElementById("ticket-number")?.innerText || "PASS-892419-LOVE";

    if (this.language === "bn") {
      return `🎟️ *অফিসিয়াল ডেট বোর্ডিং পাস কনফার্মড!* 🐰💖\n\n` +
        `👤 *পার্টনার:* ${this.state.crushName} (রাইসা) ❤️ ${this.state.senderName} (দীপু)\n` +
        `📅 *তারিখ ও সময়:* ${dateStr} (${timeObj.label})\n` +
        `🍕 *পছন্দের খাবার:* ${foodNames || "সারপ্রাইজ খাবার"}\n` +
        `🎡 *অ্যাক্টিভিটি:* ${actNames || "মিষ্টি ডেট"}\n` +
        `👗 *ড্রেস কোড:* ${dressObj ? dressObj.title : "ক্যাজুয়াল"}\n` +
        (this.state.secretNote ? `💌 *স্পেশাল আবদার:* "${this.state.secretNote.trim()}"\n` : "") +
        `\n🔒 *স্ট্যাটাস: অনুমোদিত ও অপরিবর্তনীয়! দীপুর সাথে ডেট নিশ্চিত!* 🥰✨\n` +
        `🎫 *টিকেট কোড:* ${ticketCode}`;
    }

    return `🎟️ *OFFICIAL DATE INVITATION ACCEPTED!* 🐰💖\n\n` +
      `👤 *Couple:* ${this.state.crushName} (Raisa) ❤️ ${this.state.senderName} (Dipu)\n` +
      `📅 *When:* ${dateStr} (${timeObj.label})\n` +
      `🍕 *Food:* ${foodNames || "Surprise feast"}\n` +
      `🎡 *Activities:* ${actNames || "Cozy date"}\n` +
      `👗 *Dress Code:* ${dressObj ? dressObj.title : "Casual"}\n` +
      (this.state.secretNote ? `💌 *Note:* "${this.state.secretNote.trim()}"\n` : "") +
      `\n✅ *Status: Confirmed & Non-Refundable! Can't wait!* 🥰✨\n` +
      `🎫 *Ticket ID:* ${ticketCode}`;
  }

  triggerAutoWhatsApp() {
    const modal = document.getElementById("whatsapp-redirect-modal");
    const badge = document.getElementById("wa-countdown-badge");
    const formattedNum = this.getFormattedNumber();
    const phoneEl = document.getElementById("wa-modal-phone");
    if (phoneEl) phoneEl.innerText = "+" + formattedNum;

    if (modal) modal.classList.remove("hidden");

    let seconds = 2;
    if (badge) badge.innerText = this.language === "bn" ? `${seconds} সেকেন্ডে ওপেন হচ্ছে...` : `Opening in ${seconds}s...`;

    if (this.waTimer) clearInterval(this.waTimer);

    this.waTimer = setInterval(() => {
      seconds--;
      if (seconds > 0) {
        if (badge) badge.innerText = this.language === "bn" ? `${seconds} সেকেন্ডে ওপেন হচ্ছে...` : `Opening in ${seconds}s...`;
      } else {
        clearInterval(this.waTimer);
        this.waTimer = null;
        if (modal) modal.classList.add("hidden");
        this.sendToWhatsApp();
      }
    }, 1000);
  }

  sendToWhatsApp(customText = null) {
    const text = customText || this.buildPlanText();
    const num = this.getFormattedNumber();

    // Use direct API URL which triggers native WhatsApp on Android/iOS & WhatsApp Web on Desktop
    const url = `https://api.whatsapp.com/send?phone=${num}&text=${encodeURIComponent(text)}`;

    try {
      window.location.href = url;
    } catch (e) {
      window.open(url, "_blank");
    }
  }

  copySummary() {
    const text = this.buildPlanText();
    const t = I18N[this.language] || I18N.en;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => this.showToast(t.copiedToast));
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      this.showToast(t.copiedToast);
    }
  }

  showToast(msg) {
    let toast = document.getElementById("app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "app-toast";
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.className = "show";
    setTimeout(() => {
      toast.className = "";
    }, 2400);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.dateApp = new DateApp();
  window.dateApp.init();
});
