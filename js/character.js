/**
 * Animated SVG Character Engine - Cute Bunny / Rabbit 🐰
 * Specially created for Rabbit (Raisa) & Dipu
 * 100% Offline, Zero external CDN dependencies, Never breaks!
 */
class CharacterEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentEmotion = "asking";
  }

  init() {
    this.render();
  }

  setEmotion(emotion) {
    if (this.currentEmotion === emotion) return;
    this.currentEmotion = emotion;
    this.render();
  }

  render() {
    if (!this.container) return;

    if (this.currentEmotion === "asking") {
      this.container.innerHTML = this.getAskingSVG();
    } else if (this.currentEmotion === "pleading") {
      this.container.innerHTML = this.getPleadingSVG();
    } else if (this.currentEmotion === "celebrating") {
      this.container.innerHTML = this.getCelebratingSVG();
    }
  }

  // 1. Asking Expression: Adorable Bunny holding glowing beating heart
  getAskingSVG() {
    return `
      <svg class="cute-bear-svg bear-asking" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ff4d6d" />
            <stop offset="100%" stop-color="#c9184a" />
          </radialGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Floating ambient sparkles -->
        <g class="sparkle-stars">
          <circle cx="25" cy="45" r="3" fill="#ffb703" />
          <circle cx="175" cy="40" r="3.5" fill="#f72585" />
          <polygon points="170,24 172,30 178,32 172,34 170,40 168,34 162,32 168,30" fill="#ffd166" />
        </g>

        <!-- Cute Bunny Ears -->
        <g class="bunny-ears">
          <!-- Left Ear -->
          <g class="bunny-ear-left" style="transform-origin: 70px 75px;">
            <path d="M56,75 C48,25 54,6 68,5 C82,4 86,25 78,75 Z" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
            <path d="M61,70 C56,32 59,15 68,14 C77,13 79,32 74,70 Z" fill="#ffb3c1" opacity="0.75" />
          </g>
          <!-- Right Ear -->
          <g class="bunny-ear-right" style="transform-origin: 130px 75px;">
            <path d="M122,75 C114,25 118,4 132,5 C146,6 152,25 144,75 Z" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
            <path d="M126,70 C121,32 123,13 132,14 C141,15 144,32 139,70 Z" fill="#ffb3c1" opacity="0.75" />
          </g>
        </g>

        <!-- Chubby Bunny Head / Face -->
        <ellipse cx="100" cy="118" rx="66" ry="58" fill="#ffffff" stroke="#fbcfe8" stroke-width="3" />

        <!-- Rosy Blushing Cheeks -->
        <ellipse cx="60" cy="126" rx="14" ry="9" fill="#ff758f" opacity="0.65" class="blush-pulse" />
        <ellipse cx="140" cy="126" rx="14" ry="9" fill="#ff758f" opacity="0.65" class="blush-pulse" />

        <!-- Cute Bunny Whiskers -->
        <g stroke="#ffccd5" stroke-width="2" stroke-linecap="round">
          <line x1="40" y1="123" x2="20" y2="119" />
          <line x1="40" y1="129" x2="22" y2="133" />
          <line x1="160" y1="123" x2="180" y2="119" />
          <line x1="160" y1="129" x2="178" y2="133" />
        </g>

        <!-- Snout -->
        <ellipse cx="100" cy="128" rx="22" ry="16" fill="#fff5f7" stroke="#fce7f3" stroke-width="2" />
        <!-- Pink Heart-shaped Bunny Nose -->
        <path d="M96,120 C94,116 98,114 100,117 C102,114 106,116 104,120 L100,124 Z" fill="#ff758f" />
        <!-- Bunny Smile / Mouth -->
        <path d="M95,125 Q100,131 100,127 Q100,131 105,125" fill="none" stroke="#4a1525" stroke-width="2.2" stroke-linecap="round" />

        <!-- Big Sparkling Eyes -->
        <g class="bunny-eyes">
          <!-- Left Eye -->
          <circle cx="72" cy="106" r="8" fill="#4a1525" />
          <circle cx="70" cy="103" r="3" fill="#ffffff" />
          <circle cx="75" cy="109" r="1.5" fill="#ffffff" />
          <!-- Right Eye -->
          <circle cx="128" cy="106" r="8" fill="#4a1525" />
          <circle cx="126" cy="103" r="3" fill="#ffffff" />
          <circle cx="131" cy="109" r="1.5" fill="#ffffff" />
        </g>

        <!-- Hands holding a Glowing Beating Heart -->
        <g class="heart-container" transform="translate(100, 154)">
          <path class="beating-heart" d="M0,8 C-16,-12 -38,4 -18,24 L0,40 L18,24 C38,4 16,-12 0,8 Z" fill="url(#heartGlow)" filter="url(#softGlow)" />
          <ellipse cx="-7" cy="12" rx="4" ry="2" fill="#ffffff" opacity="0.6" transform="rotate(-30 -7 12)" />
          
          <!-- Soft White Bunny Paws -->
          <circle cx="-19" cy="19" r="9" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
          <circle cx="19" cy="19" r="9" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
        </g>
      </svg>
    `;
  }

  // 2. Pleading Expression: Bunny with teary anime eyes 🥺 and sad droopy ears
  getPleadingSVG() {
    return `
      <svg class="cute-bear-svg bear-pleading" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Sad Droopy Bunny Ears -->
        <g class="bunny-ears-droop">
          <!-- Left Droopy Ear -->
          <g transform="rotate(-18 65 75)">
            <path d="M56,75 C48,25 54,6 68,5 C82,4 86,25 78,75 Z" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
            <path d="M61,70 C56,32 59,15 68,14 C77,13 79,32 74,70 Z" fill="#ffb3c1" opacity="0.75" />
          </g>
          <!-- Right Droopy Ear -->
          <g transform="rotate(18 135 75)">
            <path d="M122,75 C114,25 118,4 132,5 C146,6 152,25 144,75 Z" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
            <path d="M126,70 C121,32 123,13 132,14 C141,15 144,32 139,70 Z" fill="#ffb3c1" opacity="0.75" />
          </g>
        </g>

        <!-- Bunny Head -->
        <ellipse cx="100" cy="118" rx="66" ry="58" fill="#ffffff" stroke="#fbcfe8" stroke-width="3" />

        <!-- Deep Blushing Cheeks -->
        <ellipse cx="60" cy="128" rx="14" ry="9" fill="#ff758f" opacity="0.8" />
        <ellipse cx="140" cy="128" rx="14" ry="9" fill="#ff758f" opacity="0.8" />

        <!-- Whiskers -->
        <g stroke="#ffccd5" stroke-width="2" stroke-linecap="round">
          <line x1="40" y1="124" x2="20" y2="122" />
          <line x1="40" y1="130" x2="22" y2="135" />
          <line x1="160" y1="124" x2="180" y2="122" />
          <line x1="160" y1="130" x2="178" y2="135" />
        </g>

        <!-- Snout -->
        <ellipse cx="100" cy="130" rx="22" ry="16" fill="#fff5f7" stroke="#fce7f3" stroke-width="2" />
        <path d="M96,122 C94,118 98,116 100,119 C102,116 106,118 104,122 L100,126 Z" fill="#ff758f" />
        <!-- Trembling Sad Bunny Mouth -->
        <path d="M94,132 Q100,125 106,132" fill="none" stroke="#4a1525" stroke-width="2.5" stroke-linecap="round" />

        <!-- Big Watery Pleading Anime Eyes 🥺 -->
        <g class="pleading-eyes">
          <!-- Left Eye -->
          <ellipse cx="68" cy="104" rx="11" ry="13" fill="#2d0a15" />
          <circle cx="65" cy="99" r="5" fill="#ffffff" />
          <circle cx="72" cy="109" r="3" fill="#ffffff" />
          <circle cx="63" cy="108" r="1.5" fill="#ffffff" />
          <!-- Tear Left -->
          <ellipse cx="56" cy="120" rx="4" ry="7" fill="#38bdf8" opacity="0.85" class="tear-anim" />

          <!-- Right Eye -->
          <ellipse cx="132" cy="104" rx="11" ry="13" fill="#2d0a15" />
          <circle cx="129" cy="99" r="5" fill="#ffffff" />
          <circle cx="136" cy="109" r="3" fill="#ffffff" />
          <circle cx="127" cy="108" r="1.5" fill="#ffffff" />
          <!-- Tear Right -->
          <ellipse cx="144" cy="120" rx="4" ry="7" fill="#38bdf8" opacity="0.85" class="tear-anim" />
        </g>

        <!-- Paws Pleading Together -->
        <g class="paws-together" transform="translate(100, 156)">
          <circle cx="-8" cy="0" r="10" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
          <circle cx="8" cy="0" r="10" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
          <path d="M0,-8 L-6,4 L6,4 Z" fill="#ff758f" />
        </g>
      </svg>
    `;
  }

  // 3. Celebrating Expression: Joyfully jumping Bunny with party poppers
  getCelebratingSVG() {
    return `
      <svg class="cute-bear-svg bear-celebrating" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Confetti & Star Sparkles -->
        <circle cx="30" cy="35" r="4" fill="#ff4d6d" />
        <circle cx="170" cy="40" r="4" fill="#ffb703" />
        <circle cx="22" cy="115" r="3" fill="#7209b7" />
        <circle cx="178" cy="115" r="3.5" fill="#06d6a0" />
        <polygon points="45,15 48,22 55,23 49,28 51,35 45,30 39,35 41,28 35,23 42,22" fill="#ffd166" />
        <polygon points="155,18 158,25 165,26 159,31 161,38 155,33 149,38 151,31 145,26 152,25" fill="#ffd166" />

        <!-- Perked Up Happy Bunny Ears -->
        <g class="bunny-ears-happy">
          <g class="bunny-ear-left">
            <path d="M56,70 C46,20 52,2 66,2 C80,2 84,20 78,70 Z" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
            <path d="M61,65 C56,28 59,10 68,10 C77,10 79,28 74,65 Z" fill="#ffb3c1" opacity="0.75" />
          </g>
          <g class="bunny-ear-right">
            <path d="M122,70 C116,20 120,2 134,2 C148,2 154,20 144,70 Z" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" />
            <path d="M126,65 C121,28 123,10 132,10 C141,10 144,28 139,65 Z" fill="#ffb3c1" opacity="0.75" />
          </g>
        </g>

        <!-- Bunny Head -->
        <ellipse cx="100" cy="114" rx="66" ry="58" fill="#ffffff" stroke="#fbcfe8" stroke-width="3" />

        <!-- Rosy Cheeks -->
        <ellipse cx="58" cy="122" rx="14" ry="9" fill="#ff4d6d" opacity="0.75" />
        <ellipse cx="142" cy="122" rx="14" ry="9" fill="#ff4d6d" opacity="0.75" />

        <!-- Whiskers -->
        <g stroke="#ffccd5" stroke-width="2" stroke-linecap="round">
          <line x1="38" y1="120" x2="18" y2="116" />
          <line x1="38" y1="126" x2="20" y2="130" />
          <line x1="162" y1="120" x2="182" y2="116" />
          <line x1="162" y1="126" x2="180" y2="130" />
        </g>

        <!-- Snout -->
        <ellipse cx="100" cy="126" rx="23" ry="17" fill="#fff5f7" stroke="#fce7f3" stroke-width="2" />
        <path d="M96,117 C94,113 98,111 100,114 C102,111 106,113 104,117 L100,121 Z" fill="#ff758f" />
        <!-- Laughing Joyful Open Bunny Mouth -->
        <path d="M90,124 Q100,142 110,124 Z" fill="#c9184a" stroke="#4a1525" stroke-width="2" />
        <path d="M94,130 Q100,138 106,130" fill="#ff758f" />

        <!-- Cheerful Happy Inverted Curved Eyes ^ ^ -->
        <path d="M60,104 Q70,92 80,104" fill="none" stroke="#4a1525" stroke-width="4.5" stroke-linecap="round" />
        <path d="M120,104 Q130,92 140,104" fill="none" stroke="#4a1525" stroke-width="4.5" stroke-linecap="round" />

        <!-- Raised Cheering Bunny Paws In the Air! -->
        <circle cx="34" cy="85" r="11" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" class="paw-left-anim" />
        <circle cx="166" cy="85" r="11" fill="#ffffff" stroke="#fbcfe8" stroke-width="2.5" class="paw-right-anim" />
      </svg>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.characterEngine = new CharacterEngine("character-display");
  window.characterEngine.init();
});
