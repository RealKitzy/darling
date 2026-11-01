// ============================================================================
// ZERO TWO (CODE:002) — HASH + EMAIL AUTHENTICATION PORTAL SCRIPT (40s TTL)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants ---
  const HASH_TTL_SECONDS = 40;

  // --- DOM Elements ---
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('darling-email');
  const hashInput = document.getElementById('darling-hash');
  const emailError = document.getElementById('email-error');
  const hashError = document.getElementById('hash-error');

  const hashGeneratorBox = document.getElementById('hash-generator-box');
  const requestHashBtn = document.getElementById('request-hash-btn');
  const requestHashLabel = document.getElementById('request-hash-label');
  const copyHashBtn = document.getElementById('copy-hash-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const generatedHashDisplay = document.getElementById('generated-hash-display');
  const hashStatus = document.getElementById('hash-status');

  const hashTimerBadge = document.getElementById('hash-timer');
  const hashTimerValue = document.getElementById('hash-timer-value');
  const hashTimerTrack = document.getElementById('hash-timer-track');
  const hashTimerFill = document.getElementById('hash-timer-fill');

  const syncPercentEl = document.getElementById('sync-percent');
  const syncBarFill = document.getElementById('sync-bar-fill');

  const themeModeBtn = document.getElementById('theme-mode-btn');
  const themeModeLabel = document.getElementById('theme-mode-label');
  const petalsToggleBtn = document.getElementById('petals-toggle-btn');

  const loginView = document.getElementById('login-view');
  const successView = document.getElementById('success-view');
  const loggedDarlingName = document.getElementById('logged-darling-name');
  const telemetryEmail = document.getElementById('telemetry-email');
  const telemetryHash = document.getElementById('telemetry-hash');
  const logoutBtn = document.getElementById('logout-btn');
  const toastContainer = document.getElementById('toast-container');

  // --- State ---
  let currentActiveHash = '';
  let hashExpired = false;
  let remainingSeconds = 0;
  let countdownInterval = null;

  // --- Toast Helper ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<span>🌸</span> <div>${message}</div>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3600);
  }

  // --- Random Cryptographic Hash Generator ---
  function createRandomHash() {
    const chars = '0123456789ABCDEF';
    const randomChunk = (len) => {
      let out = '';
      const array = new Uint32Array(len);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < len; i++) {
        out += chars[array[i] % chars.length];
      }
      return out;
    };

    return `002-${randomChunk(6)}-${randomChunk(6)}-XX${randomChunk(2)}`;
  }

  // --- Clear Countdown ---
  function stopHashCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  // --- Expire Current Hash ---
  function expireHash() {
    stopHashCountdown();
    currentActiveHash = '';
    hashExpired = true;

    generatedHashDisplay.innerHTML = '<span class="hash-placeholder">HASH EXPIRADO (TEMPO ESGOTADO)</span>';
    hashStatus.textContent = 'EXPIRADO';
    hashStatus.classList.remove('ready');
    hashStatus.classList.add('expired-text');
    hashGeneratorBox.classList.add('expired');

    hashTimerValue.textContent = '0s';
    hashTimerFill.style.width = '0%';
    copyHashBtn.classList.add('hidden');
    requestHashLabel.textContent = 'Novo Hash';

    updateSyncMeter();
    showToast('⏱ O tempo de <strong>40 segundos</strong> do Hash expirou! Solicite um novo Hash.');
  }

  // --- Start 40s Countdown ---
  function startHashCountdown() {
    stopHashCountdown();
    remainingSeconds = HASH_TTL_SECONDS;
    hashExpired = false;

    hashGeneratorBox.classList.remove('expired');
    hashStatus.classList.remove('expired-text');
    hashStatus.classList.add('ready');
    hashStatus.textContent = 'ATIVO';

    hashTimerBadge.classList.remove('hidden', 'urgent');
    hashTimerTrack.classList.remove('hidden');
    hashTimerFill.classList.remove('urgent');

    // Reset bar immediately to 100%
    hashTimerFill.style.transition = 'none';
    hashTimerFill.style.width = '100%';
    hashTimerValue.textContent = `${remainingSeconds}s`;

    // Force reflow before enabling smooth linear transition
    void hashTimerFill.offsetWidth;
    hashTimerFill.style.transition = 'width 1s linear, background 0.3s ease';

    countdownInterval = setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds <= 0) {
        expireHash();
        return;
      }

      hashTimerValue.textContent = `${remainingSeconds}s`;
      const pct = (remainingSeconds / HASH_TTL_SECONDS) * 100;
      hashTimerFill.style.width = `${pct}%`;

      if (remainingSeconds <= 10) {
        hashTimerBadge.classList.add('urgent');
        hashTimerFill.classList.add('urgent');
      }
    }, 1000);
  }

  // --- Request Hash Handler ---
  requestHashBtn.addEventListener('click', () => {
    currentActiveHash = createRandomHash();
    generatedHashDisplay.textContent = currentActiveHash;
    copyHashBtn.classList.remove('hidden');
    copyBtnText.textContent = 'Copiar';
    requestHashLabel.textContent = 'Gerar Outro';

    hashError.textContent = '';
    hashInput.parentElement.classList.remove('input-error');

    startHashCountdown();
    updateSyncMeter();

    showToast(`Novo Hash gerado! Você tem <strong>40 segundos</strong> para utilizá-lo.`);
  });

  // --- Copy Hash Handler ---
  copyHashBtn.addEventListener('click', async () => {
    if (!currentActiveHash) return;
    try {
      await navigator.clipboard.writeText(currentActiveHash);
      copyBtnText.textContent = 'Copiado!';
      showToast('Hash copiado! Cole no campo abaixo antes que o cronômetro zere.');
      setTimeout(() => {
        copyBtnText.textContent = 'Copiar';
      }, 2000);
    } catch {
      hashInput.value = currentActiveHash;
      updateSyncMeter();
      showToast('Hash preenchido automaticamente no campo!');
    }
  });

  // --- Live Neural Sync Rate Calculation ---
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function updateSyncMeter() {
    const emailVal = emailInput.value.trim();
    const hashVal = hashInput.value.trim();

    let sync = 0;

    if (currentActiveHash && !hashExpired) {
      sync += 15;
    }

    if (emailVal.length > 0) {
      sync += isValidEmail(emailVal) ? 40 : Math.min(25, emailVal.length * 2.5);
    }

    if (hashVal.length > 0 && currentActiveHash && !hashExpired) {
      if (hashVal.toUpperCase() === currentActiveHash.toUpperCase()) {
        sync += 44.8;
      } else {
        sync += Math.min(25, hashVal.length * 1.4);
      }
    }

    const clamped = Math.min(99.8, sync);
    syncPercentEl.textContent = `${clamped.toFixed(1)}%`;
    syncBarFill.style.width = `${clamped}%`;
  }

  emailInput.addEventListener('input', () => {
    emailError.textContent = '';
    emailInput.parentElement.classList.remove('input-error');
    updateSyncMeter();
  });

  hashInput.addEventListener('input', () => {
    hashError.textContent = '';
    hashInput.parentElement.classList.remove('input-error');
    updateSyncMeter();
  });

  // --- Theme Mode Switcher (Sakura vs Rampage) ---
  themeModeBtn.addEventListener('click', () => {
    const isRampage = document.body.classList.toggle('rampage-mode');
    themeModeLabel.textContent = isRampage ? 'MODO: RAMPAGE (002)' : 'MODO: SAKURA';
    showToast(
      isRampage
        ? '<strong>Modo Klaxosaur Rampage</strong> ativado! Sangue carmesim em alta frequência.'
        : '<strong>Modo Sakura</strong> restaurado. Pétalas de cerejeira sincronizadas.'
    );
  });

  // --- Form Submission & Validation ---
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const emailVal = emailInput.value.trim();
    const hashVal = hashInput.value.trim().toUpperCase();

    if (!emailVal) {
      emailError.textContent = 'Informe seu e-mail para continuar, Darling!';
      emailInput.parentElement.classList.add('input-error');
      valid = false;
    } else if (!isValidEmail(emailVal)) {
      emailError.textContent = 'Insira um endereço de e-mail válido (ex: voce@dominio.com).';
      emailInput.parentElement.classList.add('input-error');
      valid = false;
    }

    if (hashExpired) {
      hashError.textContent = 'Este Hash expirou (limite de 40s esgotado). Clique em "Novo Hash" acima!';
      hashInput.parentElement.classList.add('input-error');
      valid = false;
    } else if (!currentActiveHash) {
      hashError.textContent = 'Clique primeiro em "Solicitar Hash" acima para gerar seu código!';
      hashInput.parentElement.classList.add('input-error');
      valid = false;
    } else if (!hashVal) {
      hashError.textContent = 'Cole ou digite o código Hash gerado acima.';
      hashInput.parentElement.classList.add('input-error');
      valid = false;
    } else if (hashVal !== currentActiveHash.toUpperCase()) {
      hashError.textContent = 'O Hash digitado não confere com o Hash ativo.';
      hashInput.parentElement.classList.add('input-error');
      valid = false;
    }

    if (!valid) return;

    // Stop countdown & save session for Home page
    stopHashCountdown();
    syncPercentEl.textContent = '100.0%';
    syncBarFill.style.width = '100%';

    const sessionPayload = {
      email: emailVal,
      hash: currentActiveHash,
      loginTime: new Date().toLocaleTimeString('pt-BR')
    };
    sessionStorage.setItem('zeroTwoSession', JSON.stringify(sessionPayload));
    sessionStorage.removeItem('zeroTwoLang');

    showToast('Hash autenticado! Redirecionando para a <strong>Home</strong>... ❤️');

    setTimeout(() => {
      window.location.href = 'home.html';
    }, 650);
  });

  // --- Logout Handler ---
  logoutBtn.addEventListener('click', () => {
    stopHashCountdown();
    successView.classList.remove('active');
    loginView.classList.add('active');
    hashInput.value = '';
    currentActiveHash = '';
    hashExpired = false;

    generatedHashDisplay.innerHTML = '<span class="hash-placeholder">••••-••••••••-••••••••-•••</span>';
    hashStatus.textContent = 'AGUARDANDO SOLICITAÇÃO';
    hashStatus.classList.remove('ready', 'expired-text');
    hashGeneratorBox.classList.remove('expired');
    hashTimerBadge.classList.add('hidden');
    hashTimerTrack.classList.add('hidden');
    copyHashBtn.classList.add('hidden');
    requestHashLabel.textContent = 'Solicitar Hash';

    updateSyncMeter();
    showToast('Sessão encerrada. Solicite um novo Hash quando quiser voar novamente!');
  });

  // ==========================================================================
  // SAKURA PETALS & HUD PARTICLE CANVAS
  // ==========================================================================
  const canvas = document.getElementById('sakura-canvas');
  const ctx = canvas.getContext('2d');
  let petalsActive = true;
  let particles = [];
  let mouse = { x: -9999, y: -9999 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class SakuraPetal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -25;
      this.size = 5 + Math.random() * 8;
      this.speedY = 0.65 + Math.random() * 1.25;
      this.speedX = -0.5 + Math.random() * 1.2;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.025;
      this.opacity = 0.35 + Math.random() * 0.5;
      this.isHudSpark = Math.random() < 0.22;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.45;
      this.angle += this.spin;

      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110 && dist > 0) {
        this.x += (dx / dist) * 1.1;
        this.y += (dy / dist) * 0.6;
      }

      if (this.y > canvas.height + 25 || this.x < -30 || this.x > canvas.width + 30) {
        this.reset(false);
      }
    }

    draw() {
      const isRampage = document.body.classList.contains('rampage-mode');
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;

      if (this.isHudSpark) {
        ctx.fillStyle = isRampage ? '#ff003c' : '#00f0ff';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fillRect(-this.size * 0.25, -this.size * 0.25, this.size * 0.5, this.size * 0.5);
      } else {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          -this.size * 0.6,
          -this.size * 0.5,
          -this.size,
          this.size * 0.4,
          0,
          this.size
        );
        ctx.bezierCurveTo(
          this.size,
          this.size * 0.4,
          this.size * 0.6,
          -this.size * 0.5,
          0,
          0
        );
        ctx.fillStyle = isRampage ? '#ff1e42' : '#ff85b3';
        ctx.shadowColor = isRampage ? '#ff003c' : '#ff2a6d';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(55, Math.floor((window.innerWidth * window.innerHeight) / 24000));
    for (let i = 0; i < count; i++) {
      particles.push(new SakuraPetal());
    }
  }

  resizeCanvas();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (petalsActive) {
      for (const p of particles) {
        p.update();
        p.draw();
      }
    }
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  petalsToggleBtn.addEventListener('click', () => {
    petalsActive = !petalsActive;
    petalsToggleBtn.classList.toggle('active', petalsActive);
    petalsToggleBtn.innerHTML = petalsActive
      ? '<span>🌸 PÉTALAS: ON</span>'
      : '<span>🌸 PÉTALAS: OFF</span>';
  });
});
