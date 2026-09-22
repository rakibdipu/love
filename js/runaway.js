/**
 * Runaway Button Physics & Proximity Evasion
 * Impossible-to-click "No" button with smooth animations and viewport bounds safety
 */
class RunawayButton {
  constructor(noButtonId, yesButtonId, options = {}) {
    this.noBtn = document.getElementById(noButtonId);
    this.yesBtn = document.getElementById(yesButtonId);
    this.options = Object.assign({
      sensitivity: 90,  // Trigger radius in px
      padding: 24,      // Safe distance from screen edges
      growStep: 0.15,
      maxScale: 2.5
    }, options);

    this.evasionCount = 0;
    this.isDetached = false;
    this.originalParent = null;
    this.originalNextSibling = null;
    this.yesScale = 1;
    this.currentTextIndex = 0;
    this.boundListeners = false;
  }

  init() {
    if (!this.noBtn || !this.yesBtn) return;
    if (this.boundListeners) return;

    this.boundListeners = true;

    // Desktop: Cursor Proximity Tracking
    window.addEventListener("mousemove", (e) => this.handleMouseMove(e));

    // Fallback: Direct Hover / Mouse Enter
    this.noBtn.addEventListener("mouseenter", (e) => {
      this.dodge(e.clientX, e.clientY);
    });

    // Mobile / Touchscreen: Immediate Leap on Touch
    this.noBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0] || e.changedTouches[0];
      this.dodge(touch ? touch.clientX : 0, touch ? touch.clientY : 0);
    }, { passive: false });

    this.noBtn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.dodge(e.clientX, e.clientY);
    });

    // In case user tries pressing Tab or Space on it
    this.noBtn.addEventListener("focus", () => {
      this.dodge(0, 0);
    });
  }

  handleMouseMove(e) {
    if (!this.noBtn) return;
    
    // Only dodge when proposal step is visible
    const stepProposal = document.getElementById("step-1-proposal");
    if (!stepProposal || stepProposal.classList.contains("hidden")) return;

    const rect = this.noBtn.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    // If mouse cursor penetrates the sensitivity bubble (85px)
    if (dist < this.options.sensitivity) {
      this.dodge(e.clientX, e.clientY);
    }
  }

  dodge(mouseX = 0, mouseY = 0) {
    if (!this.noBtn) return;

    const stepProposal = document.getElementById("step-1-proposal");
    if (!stepProposal || stepProposal.classList.contains("hidden")) return;

    // Detach to document.body on first evasion so no parent backdrop-filter or transform clips it
    if (!this.isDetached) {
      const initialRect = this.noBtn.getBoundingClientRect();
      this.originalParent = this.noBtn.parentNode;
      this.originalNextSibling = this.noBtn.nextSibling;

      document.body.appendChild(this.noBtn);
      this.noBtn.style.position = "fixed";
      this.noBtn.style.zIndex = "999999";
      this.noBtn.style.left = `${Math.round(initialRect.left)}px`;
      this.noBtn.style.top = `${Math.round(initialRect.top)}px`;
      this.noBtn.style.margin = "0";
      this.isDetached = true;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnW = this.noBtn.offsetWidth || 110;
    const btnH = this.noBtn.offsetHeight || 48;
    const pad = this.options.padding;

    const minX = pad;
    const maxX = Math.max(pad, vw - btnW - pad);
    const minY = 75; // Below top floating navbar
    const maxY = Math.max(minY, vh - btnH - pad);

    const yesRect = this.yesBtn ? this.yesBtn.getBoundingClientRect() : null;

    // Pick a safe coordinate at least 150px away from the cursor/touch and not overlapping YES button
    let targetX, targetY;
    let attempts = 0;
    do {
      targetX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      targetY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      attempts++;
    } while (
      attempts < 25 &&
      (
        (mouseX > 0 && mouseY > 0 && Math.hypot(mouseX - (targetX + btnW / 2), mouseY - (targetY + btnH / 2)) < 150) ||
        (yesRect &&
          targetX + btnW > yesRect.left - 20 &&
          targetX < yesRect.right + 20 &&
          targetY + btnH > yesRect.top - 20 &&
          targetY < yesRect.bottom + 20
        )
      )
    );

    // Smooth physics transition
    this.noBtn.style.transition = "left 0.22s cubic-bezier(0.2, 1, 0.3, 1), top 0.22s cubic-bezier(0.2, 1, 0.3, 1), transform 0.2s ease";
    this.noBtn.style.left = `${targetX}px`;
    this.noBtn.style.top = `${targetY}px`;

    // Playful rotation tilt
    const tilt = (Math.random() - 0.5) * 26;
    this.noBtn.style.transform = `rotate(${tilt}deg)`;

    // Play woosh/dodge sound
    if (window.soundEngine) {
      window.soundEngine.playDodge();
    }

    this.onEvasion();
  }

  onEvasion() {
    this.evasionCount++;

    // Grow the YES button
    if (this.yesBtn && this.yesScale < this.options.maxScale) {
      this.yesScale += this.options.growStep;
      this.yesBtn.style.transform = `scale(${this.yesScale})`;
    }

    // Cycle through funny pleading text
    const lang = window.currentLanguage || (window.DATE_APP_CONFIG ? window.DATE_APP_CONFIG.defaultLanguage : "en");
    const texts = DATE_APP_CONFIG.pleadingTexts[lang] || DATE_APP_CONFIG.pleadingTexts.en;

    this.currentTextIndex = (this.currentTextIndex + 1) % texts.length;
    this.noBtn.innerText = texts[this.currentTextIndex];

    // Spawn floating emoji reaction
    this.spawnReactionEmoji();

    // Switch bear character to pleading expression
    if (window.characterEngine) {
      window.characterEngine.setEmotion("pleading");
    }
  }

  spawnReactionEmoji() {
    const emojis = ["🥺", "💔", "😭", "😿", "🙈", "👉👈", "💨", "❤️‍🩹", "🏃💨"];
    const bubble = document.createElement("div");
    bubble.className = "floating-plead-bubble";
    bubble.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    const rect = this.noBtn.getBoundingClientRect();
    bubble.style.position = "fixed";
    bubble.style.left = `${rect.left + rect.width / 2}px`;
    bubble.style.top = `${rect.top}px`;
    bubble.style.zIndex = "1000000";

    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 1100);
  }

  hide() {
    if (this.noBtn) {
      this.noBtn.style.display = "none";
    }
  }

  reset() {
    this.evasionCount = 0;
    this.yesScale = 1;
    this.currentTextIndex = 0;

    if (this.noBtn) {
      this.noBtn.style.display = "";
      this.noBtn.style.position = "";
      this.noBtn.style.left = "";
      this.noBtn.style.top = "";
      this.noBtn.style.transform = "";
      this.noBtn.style.margin = "";
      this.noBtn.style.zIndex = "";

      if (this.isDetached && this.originalParent) {
        if (this.originalNextSibling) {
          this.originalParent.insertBefore(this.noBtn, this.originalNextSibling);
        } else {
          this.originalParent.appendChild(this.noBtn);
        }
        this.isDetached = false;
      }

      const lang = window.currentLanguage || "en";
      this.noBtn.innerText = DATE_APP_CONFIG.pleadingTexts[lang][0];
    }

    if (this.yesBtn) {
      this.yesBtn.style.transform = "scale(1)";
    }

    if (window.characterEngine) {
      window.characterEngine.setEmotion("asking");
    }
  }
}

window.RunawayButton = RunawayButton;
