/**
 * Confetti & Floating Hearts Engine
 * Pure Canvas-based, smooth 60fps animations
 */
class ConfettiCelebration {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.active = false;
  }

  init() {
    if (!this.canvas) {
      this.canvas = document.createElement("canvas");
      this.canvas.id = "confetti-canvas";
      this.canvas.style.position = "fixed";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.width = "100vw";
      this.canvas.style.height = "100vh";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.zIndex = "99999";
      document.body.appendChild(this.canvas);

      this.ctx = this.canvas.getContext("2d");
      window.addEventListener("resize", () => this.resize());
      this.resize();
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  // Shoot big celebration confetti blast with hearts and colorful ribbons
  blast(duration = 4000) {
    this.init();
    this.particles = [];
    this.active = true;

    const colors = ["#ff4d6d", "#ff758f", "#ff85a1", "#f72585", "#7209b7", "#ffb703", "#fb8500", "#ffcad4", "#ffd166"];
    const shapes = ["circle", "rect", "heart"];

    const count = 180;
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      this.particles.push({
        x: w / 2,
        y: h / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 6,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        decay: Math.random() * 0.006 + 0.004,
        gravity: 0.22
      });
    }

    if (!this.animationId) {
      this.loop();
    }

    // Auto terminate after duration
    setTimeout(() => {
      this.active = false;
    }, duration);
  }

  // Draw cute mini heart shape
  drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.3);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  loop() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.shape === "heart") {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.color);
      } else if (p.shape === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
      } else {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0 || this.active) {
      this.animationId = requestAnimationFrame(() => this.loop());
    } else {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // Floating background ambient hearts
  spawnFloatingHeart(container) {
    const heart = document.createElement("span");
    heart.className = "floating-bg-heart";
    const hearts = ["❤️", "💖", "💕", "🌸", "✨", "🥰", "🍓"];
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 95 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heart.style.fontSize = Math.random() * 16 + 14 + "px";
    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }
}

window.confettiCelebration = new ConfettiCelebration();
