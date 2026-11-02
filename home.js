// ============================================================================
// ZERO TWO (CODE:002) — HOME DASHBOARD SCRIPT (WITH PT-BR / EN-US GATE)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Load Session from Login ---
  const rawSession = sessionStorage.getItem('zeroTwoSession');
  let sessionData = {
    email: 'darling@squad13.franxx',
    hash: '002-A9F4C2-88E1B0-XX02',
    loginTime: new Date().toLocaleTimeString('pt-BR')
  };

  if (rawSession) {
    try {
      sessionData = JSON.parse(rawSession);
    } catch {
      // Fallback to default demo session if malformed
    }
  }

  // --- Language Dictionary (PT-BR & EN-US) ---
  const i18n = {
    pt: {
      htmlLang: 'pt-BR',
      langBadge: '🇧🇷 PT-BR',
      navPortalTag: 'PORTAL INICIAL',
      navOverview: 'Visão Geral',
      navShortener: '🔗 Encurtar Link',
      navEpisodes: 'Episódios',
      navSquad: 'Esquadrão 13',
      navSession: 'Sessão Hash',
      navWhereAreYou: '📍 Cadê você?',
      navLogout: 'SAIR',
      modeSakura: 'MODO: SAKURA',
      modeRampage: 'MODO: RAMPAGE (002)',
      petalsOn: '🌸 PÉTALAS: ON',
      petalsOff: '🌸 PÉTALAS: OFF',
      heroSyncBadge: 'CONEXÃO NEURAL ESTABELECIDA // CODE:002',
      heroWelcomePrefix: 'Bem-vindo ao Cockpit,',
      heroBoostActivate: 'ATIVAR MODO STRELIZIA APUS',
      heroBoostDeactivate: 'DESATIVAR STRELIZIA APUS',
      heroQuoteBtn: 'Nova Fala da Zero Two',
      orbSyncLabel: 'SINCRONIA',
      orbOnline: 'STRELIZIA // ONLINE',
      orbMax: 'STRELIZIA APUS // MAX',
      metricMagmaLabel: 'ENERGIA DE MAGMA',
      metricMagmaStatus: 'ESTÁVEL',
      metricBpmLabel: 'FREQUÊNCIA CARDÍACA',
      metricBpmStatus: 'SINCRONIZADA',
      metricUptimeLabel: 'TEMPO DE SESSÃO ATIVA',
      metricUptimeTag: 'HASH VÁLIDO',
      metricUptimeSub: 'Autenticado via Hash',
      metricKlaxoLabel: 'ALERTA KLAXOSAUR',
      metricKlaxoTag: 'NÍVEL ZERO',
      metricKlaxoValue: 'SETOR 13 LIMPO',
      metricKlaxoSub: 'Radar de Plantation 13 ativo',
      metricWhereLabel: 'SINAL DE BUSCA // 002',
      metricWhereTag: 'CHAMANDO',
      metricWhereTitle: 'Cadê você ?',
      metricWhereSub: 'Clique para rastrear sinal',
      metricShortLabel: 'FERRAMENTA // URL',
      metricShortTag: 'CUSTOMIZAR',
      metricShortTitle: 'Encurtar Link',
      metricShortSub: 'Encurte ou personalize o link',
      shortenerSub: 'FERRAMENTAS // STRELIZIA OS',
      shortenerTitle: 'ENCURTADOR E PERSONALIZADOR DE LINKS',
      shortenerBadge: 'MODIFICADOR ATIVO',
      shortTargetLabel: 'LINK ORIGINAL (URL PARA ENCURTAR OU MODIFICAR)',
      shortSlugLabel: 'PERSONALIZAR FINAL DO LINK (OPCIONAL — DO SEU JEITO)',
      shortCreateBtn: '🔗 Encurtar / Modificar Link',
      shortFillWhereBtn: 'Usar Link do "Cadê você?"',
      shortResultLabel: 'LINK PERSONALIZADO / ENCURTADO PRONTO:',
      shortResultStatus: 'ATIVO',
      shortCopyBtn: 'Copiar Link',
      shortCopyWithMsgBtn: 'Copiar com Mensagem',
      shortHistoryTitle: 'LINKS CRIADOS NESTA SESSÃO:',
      epSectionSub: 'ARQUIVO DE MEMÓRIAS // ANIME',
      epSectionTitle: 'EPISÓDIOS EM DESTAQUE',
      ep1Title: 'Sozinho e Solitário',
      ep1Desc: 'O primeiro encontro sob as cerejeiras entre Hiro (Code:016) e a misteriosa garota com chifres vermelhos, Zero Two.',
      ep6Title: 'DARLING in the FRANXX',
      ep6Desc: 'Superando o limite da terceira viagem, Hiro e Zero Two despertam o verdadeiro poder das asas da Strelizia.',
      ep13Title: 'A Fera e o Príncipe',
      ep13Desc: 'O livro ilustrado, a neve e a promessa de infância que uniu o destino dos dois muito antes da Plantation 13.',
      ep15Title: 'Jian (Pássaro de Uma Asa)',
      ep15Desc: 'A reunião emocionante no cockpit na Grande Crevasse e a transformação carmesim da Strelizia.',
      epPlayBtn: '▶ Acessar Memória',
      squadSectionSub: 'HANGAR DE COMBATE',
      squadSectionTitle: 'UNIDADES DO ESQUADRÃO 13',
      unitFlight: 'EM VOO // 100%',
      unitReady94: 'PRONTA // 94%',
      unitReady89: 'PRONTA // 89%',
      termSectionSub: 'CREDENCIAIS CRIPTOGRÁFICAS',
      termSectionTitle: 'REGISTRO DA SESSÃO HASH',
      termEmailKey: 'E-mail:',
      termHashKey: 'Hash Utilizado:',
      termTimeKey: 'Horário do Login:',
      termProtoKey: 'Protocolo:',
      termProtoVal: 'FRANXX-SHA002 (40s TTL VERIFICADO)',
      initialLogs: [
        ['OK', 'Chave Hash validada dentro da janela de 40 segundos.'],
        ['OK', 'Ponte neural estabelecida com a unidade Strelizia.'],
        ['002', 'Zero Two: "Não solte a minha mão, Darling!"']
      ],
      quotes: [
        '"Encontrei você, meu Darling. Os sistemas da <strong>Strelizia</strong> estão sincronizados em 100% e prontos para o voo."',
        '"Se você tem algo a dizer, é melhor falar logo... Mas eu já sei que você veio voar comigo, <strong>Darling</strong>."',
        '"Enquanto estivermos conectados no mesmo cockpit, nenhum Klaxosaur poderá nos parar."',
        '"Você cumpriu a nossa promessa. Agora, vamos cruzar o céu juntos na <strong>Strelizia</strong>!"',
        '"Mesmo que o mundo acabe, minhas asas sempre pertencerão a você, meu <strong>Darling</strong>."'
      ],
      toastLangLoaded: 'Idioma definido para <strong>Português (BR)</strong>. Bem-vindo, Darling!',
      toastApusOn: '🔥 <strong>Strelizia True Apus</strong> ativada! Poder máximo liberado!',
      toastApusOff: '🌸 Modo padrão da <strong>Strelizia</strong> restaurado.',
      toastEpPlay: '🎬 Carregando arquivo de memória: <strong>EP // ',
      toastLogout: 'Encerrando conexão neural... Até logo, Darling!',
      logApusOn: 'Sobrecarga carmesim ativada! Sincronização neural em 100.0%.',
      logApusOff: 'Modo padrão Sakura restaurado.',
      logEpPlay: 'Reproduzindo memória neural do Episódio '
    },
    en: {
      htmlLang: 'en',
      langBadge: '🇺🇸 EN-US',
      navPortalTag: 'HOME PORTAL',
      navOverview: 'Overview',
      navShortener: '🔗 Shorten Link',
      navEpisodes: 'Episodes',
      navSquad: 'Squad 13',
      navSession: 'Hash Session',
      navWhereAreYou: '📍 Where are you?',
      navLogout: 'LOGOUT',
      modeSakura: 'MODE: SAKURA',
      modeRampage: 'MODE: RAMPAGE (002)',
      petalsOn: '🌸 PETALS: ON',
      petalsOff: '🌸 PETALS: OFF',
      heroSyncBadge: 'NEURAL LINK ESTABLISHED // CODE:002',
      heroWelcomePrefix: 'Welcome to the Cockpit,',
      heroBoostActivate: 'ACTIVATE STRELIZIA APUS MODE',
      heroBoostDeactivate: 'DEACTIVATE STRELIZIA APUS',
      heroQuoteBtn: 'New Zero Two Quote',
      orbSyncLabel: 'SYNC RATE',
      orbOnline: 'STRELIZIA // ONLINE',
      orbMax: 'STRELIZIA APUS // MAX',
      metricMagmaLabel: 'MAGMA ENERGY',
      metricMagmaStatus: 'STABLE',
      metricBpmLabel: 'HEART RATE',
      metricBpmStatus: 'SYNCHRONIZED',
      metricUptimeLabel: 'ACTIVE SESSION TIME',
      metricUptimeTag: 'VALID HASH',
      metricUptimeSub: 'Authenticated via Hash',
      metricKlaxoLabel: 'KLAXOSAUR ALERT',
      metricKlaxoTag: 'LEVEL ZERO',
      metricKlaxoValue: 'SECTOR 13 CLEAR',
      metricKlaxoSub: 'Plantation 13 radar active',
      metricWhereLabel: 'SEARCH BEACON // 002',
      metricWhereTag: 'CALLING',
      metricWhereTitle: 'Where are you?',
      metricWhereSub: 'Click to track signal',
      metricShortLabel: 'TOOL // URL',
      metricShortTag: 'CUSTOMIZE',
      metricShortTitle: 'Shorten Link',
      metricShortSub: 'Shorten or customize any link',
      shortenerSub: 'TOOLS // STRELIZIA OS',
      shortenerTitle: 'LINK SHORTENER & CUSTOMIZER',
      shortenerBadge: 'MODIFIER ACTIVE',
      shortTargetLabel: 'ORIGINAL LINK (URL TO SHORTEN OR MODIFY)',
      shortSlugLabel: 'CUSTOMIZE LINK ENDING (OPTIONAL — YOUR WAY)',
      shortCreateBtn: '🔗 Shorten / Modify Link',
      shortFillWhereBtn: 'Use "Where are you?" Link',
      shortResultLabel: 'CUSTOM / SHORTENED LINK READY:',
      shortResultStatus: 'ACTIVE',
      shortCopyBtn: 'Copy Link',
      shortCopyWithMsgBtn: 'Copy with Message',
      shortHistoryTitle: 'LINKS CREATED IN THIS SESSION:',
      epSectionSub: 'MEMORY ARCHIVE // ANIME',
      epSectionTitle: 'FEATURED EPISODES',
      ep1Title: 'Alone and Lonesome',
      ep1Desc: 'The first fateful meeting beneath the cherry blossoms between Hiro (Code:016) and the horned girl, Zero Two.',
      ep6Title: 'DARLING in the FRANXX',
      ep6Desc: 'Surpassing the third-ride curse, Hiro and Zero Two awaken the true crimson wings of Strelizia.',
      ep13Title: 'The Beast and the Prince',
      ep13Desc: 'The picture book, the falling snow, and the childhood promise that bound their destinies together.',
      ep15Title: 'Jian (The One-Winged Bird)',
      ep15Desc: 'The emotional reunion inside the cockpit at the Gran Crevasse and Strelizia’s crimson awakening.',
      epPlayBtn: '▶ Access Memory',
      squadSectionSub: 'COMBAT HANGAR',
      squadSectionTitle: 'SQUAD 13 FRANXX UNITS',
      unitFlight: 'IN FLIGHT // 100%',
      unitReady94: 'READY // 94%',
      unitReady89: 'READY // 89%',
      termSectionSub: 'CRYPTOGRAPHIC CREDENTIALS',
      termSectionTitle: 'HASH SESSION REGISTRY',
      termEmailKey: 'E-mail:',
      termHashKey: 'Used Hash:',
      termTimeKey: 'Login Time:',
      termProtoKey: 'Protocol:',
      termProtoVal: 'FRANXX-SHA002 (40s TTL VERIFIED)',
      initialLogs: [
        ['OK', 'Hash key validated within the 40-second window.'],
        ['OK', 'Neural bridge established with unit Strelizia.'],
        ['002', 'Zero Two: "Never let go of my hand, Darling!"']
      ],
      quotes: [
        '"Found you, my Darling. All <strong>Strelizia</strong> systems are 100% synchronized and ready for flight."',
        '"If you have something you want to say, you better spit it out... Though I already know you came to fly with me, <strong>Darling</strong>."',
        '"As long as we are connected in the same cockpit, no Klaxosaur can ever stop us."',
        '"You kept our promise. Now let’s soar across the skies together aboard <strong>Strelizia</strong>!"',
        '"Even if the whole world ends, my wings will always belong to you, my <strong>Darling</strong>."'
      ],
      toastLangLoaded: 'Language set to <strong>English (US)</strong>. Welcome aboard, Darling!',
      toastApusOn: '🔥 <strong>Strelizia True Apus</strong> activated! Maximum power unleashed!',
      toastApusOff: '🌸 Standard <strong>Strelizia</strong> mode restored.',
      toastEpPlay: '🎬 Loading memory archive: <strong>EP // ',
      toastLogout: 'Closing neural connection... See you soon, Darling!',
      logApusOn: 'Crimson overload activated! Neural synchronization at 100.0%.',
      logApusOff: 'Standard Sakura mode restored.',
      logEpPlay: 'Playing neural memory from Episode '
    }
  };

  // --- State ---
  let currentLang = 'pt';
  let quoteIndex = 0;
  let apusActive = false;
  let petalsActive = true;
  let uptimeTimerId = null;
  let secondsElapsed = 0;

  // --- DOM Elements ---
  const langGateOverlay = document.getElementById('lang-gate-overlay');
  const homeAppWrapper = document.getElementById('home-app-wrapper');
  const langChoiceBtns = document.querySelectorAll('.lang-choice-btn');
  const switchLangBtn = document.getElementById('switch-lang-btn');
  const currentLangBadge = document.getElementById('current-lang-badge');

  const navUserEmail = document.getElementById('nav-user-email');
  const heroUserName = document.getElementById('hero-user-name');
  const heroHashBadge = document.getElementById('hero-hash-badge');
  const heroQuoteText = document.getElementById('hero-quote-text');
  const squadPilotName = document.getElementById('squad-pilot-name');

  const termEmail = document.getElementById('term-email');
  const termHash = document.getElementById('term-hash');
  const termTime = document.getElementById('term-time');
  const terminalLog = document.getElementById('terminal-log');

  const orbSyncValue = document.getElementById('orb-sync-value');
  const orbModeStatus = document.getElementById('orb-mode-status');
  const boostSyncBtn = document.getElementById('boost-sync-btn');
  const boostBtnText = document.getElementById('boost-btn-text');
  const cycleQuoteBtn = document.getElementById('cycle-quote-btn');

  const metricMagma = document.getElementById('metric-magma');
  const metricBpm = document.getElementById('metric-bpm');
  const sessionUptime = document.getElementById('session-uptime');

  const themeModeBtn = document.getElementById('theme-mode-btn');
  const themeModeLabel = document.getElementById('theme-mode-label');
  const petalsToggleBtn = document.getElementById('petals-toggle-btn');
  const petalsBtnLabel = document.getElementById('petals-btn-label');
  const logoutHomeBtn = document.getElementById('logout-home-btn');
  const navTabs = document.querySelectorAll('.nav-tab');
  const episodeBtns = document.querySelectorAll('.ep-play-btn');
  const toastContainer = document.getElementById('toast-container');

  // --- Populate User & Hash Info ---
  const userPrefix = sessionData.email.includes('@')
    ? sessionData.email.split('@')[0].toUpperCase()
    : sessionData.email.toUpperCase();

  navUserEmail.textContent = sessionData.email;
  heroUserName.textContent = userPrefix;
  heroHashBadge.textContent = `HASH: ${sessionData.hash}`;
  squadPilotName.textContent = userPrefix;

  termEmail.textContent = sessionData.email;
  termHash.textContent = sessionData.hash;
  termTime.textContent = sessionData.loginTime;

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
    }, 3500);
  }

  function appendTerminalLog(tag, text) {
    const p = document.createElement('p');
    p.innerHTML = `<span>[${tag}]</span> ${text}`;
    terminalLog.appendChild(p);
    terminalLog.scrollTop = terminalLog.scrollHeight;
  }

  // --- Apply Selected Language ---
  function applyLanguage(lang) {
    currentLang = lang;
    sessionStorage.setItem('zeroTwoLang', lang);
    const dict = i18n[lang];
    document.documentElement.lang = dict.htmlLang;
    currentLangBadge.textContent = dict.langBadge;

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Dynamic labels
    themeModeLabel.textContent = apusActive ? dict.modeRampage : dict.modeSakura;
    petalsBtnLabel.textContent = petalsActive ? dict.petalsOn : dict.petalsOff;
    boostBtnText.textContent = apusActive ? dict.heroBoostDeactivate : dict.heroBoostActivate;
    orbModeStatus.textContent = apusActive ? dict.orbMax : dict.orbOnline;
    heroQuoteText.innerHTML = dict.quotes[quoteIndex % dict.quotes.length];

    // Populate initial terminal logs in the chosen language
    terminalLog.innerHTML = '';
    dict.initialLogs.forEach(([tag, msg]) => appendTerminalLog(tag, msg));
  }

  // --- Start Home Content After Language Selection ---
  function initializeHomeWithLanguage(lang) {
    applyLanguage(lang);

    // Dismiss language gate & reveal Home content
    langGateOverlay.classList.add('dismissed');
    homeAppWrapper.classList.remove('pre-load');
    homeAppWrapper.classList.add('loaded');

    showToast(i18n[lang].toastLangLoaded);

    // Start live uptime counter once loaded
    if (!uptimeTimerId) {
      uptimeTimerId = setInterval(() => {
        secondsElapsed += 1;
        const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const secs = String(secondsElapsed % 60).padStart(2, '0');
        sessionUptime.textContent = `${mins}:${secs}`;

        const randomBpm = (apusActive ? 142 : 116) + Math.floor(Math.random() * 6);
        const randomMagma = (apusActive ? 12800 : 9400) + Math.floor(Math.random() * 95);
        const locale = currentLang === 'pt' ? 'pt-BR' : 'en-US';
        metricBpm.innerHTML = `${randomBpm} <small>BPM</small>`;
        metricMagma.innerHTML = `${randomMagma.toLocaleString(locale)} <small>GW</small>`;
      }, 1000);
    }
  }

  // --- Language Gate Button Listeners ---
  langChoiceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosenLang = btn.getAttribute('data-lang');
      initializeHomeWithLanguage(chosenLang);
    });
  });

  // If user already picked a language during this session (e.g. returning from "Cadê você?"), restore it directly
  const savedSessionLang = sessionStorage.getItem('zeroTwoLang');
  if (savedSessionLang && i18n[savedSessionLang]) {
    initializeHomeWithLanguage(savedSessionLang);
  }

  // --- Top Navbar Language Switcher ---
  switchLangBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'pt' ? 'en' : 'pt';
    applyLanguage(nextLang);
    showToast(i18n[nextLang].toastLangLoaded);
  });

  // --- Quotes Cycler ---
  cycleQuoteBtn.addEventListener('click', () => {
    const dict = i18n[currentLang];
    quoteIndex = (quoteIndex + 1) % dict.quotes.length;
    heroQuoteText.style.opacity = '0';
    setTimeout(() => {
      heroQuoteText.innerHTML = dict.quotes[quoteIndex];
      heroQuoteText.style.opacity = '1';
    }, 180);
  });

  // --- Strelizia Apus Boost Mode ---
  boostSyncBtn.addEventListener('click', () => {
    apusActive = !apusActive;
    const dict = i18n[currentLang];
    document.body.classList.toggle('rampage-mode', apusActive);
    themeModeLabel.textContent = apusActive ? dict.modeRampage : dict.modeSakura;

    if (apusActive) {
      orbSyncValue.textContent = '100.0%';
      orbModeStatus.textContent = dict.orbMax;
      boostBtnText.textContent = dict.heroBoostDeactivate;
      appendTerminalLog('APUS', dict.logApusOn);
      showToast(dict.toastApusOn);
    } else {
      orbSyncValue.textContent = '99.8%';
      orbModeStatus.textContent = dict.orbOnline;
      boostBtnText.textContent = dict.heroBoostActivate;
      appendTerminalLog('002', dict.logApusOff);
      showToast(dict.toastApusOff);
    }
  });

  // --- Theme Mode Button ---
  themeModeBtn.addEventListener('click', () => {
    boostSyncBtn.click();
  });

  // --- Navigation Tabs ---
  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      navTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.getAttribute('data-target');
      if (targetId === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // --- Episode Cards Interaction ---
  episodeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dict = i18n[currentLang];
      const card = btn.closest('.episode-card');
      const epNum = card.getAttribute('data-ep');
      appendTerminalLog('MEM', `${dict.logEpPlay}${epNum}`);
      showToast(`${dict.toastEpPlay}${epNum}</strong>`);
    });
  });

  // --- Logout Handler ---
  logoutHomeBtn.addEventListener('click', () => {
    sessionStorage.removeItem('zeroTwoSession');
    showToast(i18n[currentLang].toastLogout);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  });

  // ==========================================================================
  // LINK SHORTENER & CUSTOMIZER TOOL LOGIC
  // ==========================================================================
  const shortenerForm = document.getElementById('shortener-form');
  const shortenTargetUrl = document.getElementById('shorten-target-url');
  const shortenCustomSlug = document.getElementById('shorten-custom-slug');
  const slugDomainPrefix = document.getElementById('slug-domain-prefix');
  const fillWhereLinkBtn = document.getElementById('fill-where-link-btn');
  const shortenerResultBox = document.getElementById('shortener-result-box');
  const shortenedOutputInput = document.getElementById('shortened-output-input');
  const copyShortenedBtn = document.getElementById('copy-shortened-btn');
  const copyShortenedText = document.getElementById('copy-shortened-text');
  const copyShortenedWithMsgBtn = document.getElementById('copy-shortened-with-msg-btn');
  const shortenerHistoryList = document.getElementById('shortener-history-list');

  if (slugDomainPrefix && window.location.protocol.startsWith('http')) {
    slugDomainPrefix.textContent = `${window.location.origin}/s/`;
  }

  function getLocalShortLinks() {
    try {
      return JSON.parse(localStorage.getItem('zeroTwoShortLinks') || '{}');
    } catch {
      return {};
    }
  }

  function saveLocalShortLink(slug, targetUrl) {
    try {
      const store = getLocalShortLinks();
      store[slug] = {
        slug,
        targetUrl,
        createdAt: new Date().toLocaleTimeString('pt-BR')
      };
      localStorage.setItem('zeroTwoShortLinks', JSON.stringify(store));
    } catch {
      // ignore
    }
  }

  // Redirect if opened with ?atalho=SLUG (local file:// fallback)
  const homeUrlParams = new URLSearchParams(window.location.search);
  const localSlug = homeUrlParams.get('atalho');
  if (localSlug) {
    const store = getLocalShortLinks();
    if (store[localSlug] && store[localSlug].targetUrl) {
      window.location.href = store[localSlug].targetUrl;
    }
  }

  function renderShortenerHistory() {
    if (!shortenerHistoryList) return;
    const store = getLocalShortLinks();
    const entries = Object.values(store).reverse();
    shortenerHistoryList.innerHTML = '';

    if (entries.length === 0) {
      shortenerHistoryList.innerHTML = `<span class="metric-subtext">${
        currentLang === 'pt' ? 'Nenhum link personalizado criado ainda.' : 'No custom links created yet.'
      }</span>`;
      return;
    }

    entries.forEach((item) => {
      const baseOrigin = window.location.protocol.startsWith('http')
        ? `${window.location.origin}/s/${item.slug}`
        : `${window.location.href.split('?')[0]}?atalho=${item.slug}`;

      const row = document.createElement('div');
      row.className = 'short-history-item';
      row.innerHTML = `
        <div class="short-history-info">
          <strong>${baseOrigin}</strong>
          <span>→ ${item.targetUrl}</span>
        </div>
        <button type="button" class="hash-action-btn copy-btn" data-copy-url="${baseOrigin}">
          ${currentLang === 'pt' ? 'Copiar' : 'Copy'}
        </button>
      `;
      row.querySelector('button').addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(baseOrigin);
        } catch {
          // ignore
        }
        showToast(
          currentLang === 'pt'
            ? '✅ Link personalizado copiado!'
            : '✅ Custom link copied!'
        );
      });
      shortenerHistoryList.appendChild(row);
    });
  }

  renderShortenerHistory();

  if (fillWhereLinkBtn) {
    fillWhereLinkBtn.addEventListener('click', () => {
      const whereBase = window.location.href
        .split('?')[0]
        .replace(/home\.html$/i, 'cade-voce.html');
      const code = '002-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      shortenTargetUrl.value = `${whereBase}?sinal=${code}`;
      shortenCustomSlug.focus();
      showToast(
        currentLang === 'pt'
          ? '📍 Link do "Cadê você?" preenchido! Agora escolha o nome final ou clique em Encurtar.'
          : '📍 "Where are you?" link filled! Now pick a custom ending or click Shorten.'
      );
    });
  }

  if (shortenerForm) {
    shortenerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let targetUrl = shortenTargetUrl.value.trim();
      if (!targetUrl) {
        showToast(
          currentLang === 'pt'
            ? '⚠️ Cole ou preencha um link para encurtar/modificar.'
            : '⚠️ Please enter a link to shorten/modify.'
        );
        return;
      }

      if (!/^https?:\/\//i.test(targetUrl) && !/^file:\/\//i.test(targetUrl) && !targetUrl.startsWith('/')) {
        targetUrl = 'https://' + targetUrl;
      }

      const cleanSlug = (shortenCustomSlug.value || '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')
        .slice(0, 48);

      const finalSlug =
        cleanSlug || '002-' + Math.random().toString(36).substring(2, 7).toLowerCase();

      saveLocalShortLink(finalSlug, targetUrl);

      let finalShortUrl = window.location.protocol.startsWith('http')
        ? `${window.location.origin}/s/${finalSlug}`
        : `${window.location.href.split('?')[0]}?atalho=${finalSlug}`;

      if (window.location.protocol.startsWith('http')) {
        try {
          const res = await fetch('/api/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetUrl, customSlug: finalSlug })
          });
          const data = await res.json();
          if (data && data.ok && data.shortUrl) {
            finalShortUrl = data.shortUrl;
          }
        } catch {
          // fallback to local URL
        }
      }

      shortenedOutputInput.value = finalShortUrl;
      shortenerResultBox.classList.remove('hidden');
      renderShortenerHistory();
      appendTerminalLog('URL', `${finalShortUrl} -> ${targetUrl}`);
      showToast(
        currentLang === 'pt'
          ? `🔗 Link modificado com sucesso: <strong>${finalShortUrl}</strong>`
          : `🔗 Link modified successfully: <strong>${finalShortUrl}</strong>`
      );
    });
  }

  if (copyShortenedBtn) {
    copyShortenedBtn.addEventListener('click', async () => {
      const val = shortenedOutputInput.value;
      if (!val) return;
      try {
        await navigator.clipboard.writeText(val);
      } catch {
        shortenedOutputInput.select();
        document.execCommand('copy');
      }
      copyShortenedText.textContent = currentLang === 'pt' ? 'Copiado!' : 'Copied!';
      showToast(
        currentLang === 'pt' ? '✅ Link copiado!' : '✅ Link copied!'
      );
      setTimeout(() => {
        copyShortenedText.textContent = i18n[currentLang].shortCopyBtn;
      }, 2000);
    });
  }

  if (copyShortenedWithMsgBtn) {
    copyShortenedWithMsgBtn.addEventListener('click', async () => {
      const val = shortenedOutputInput.value;
      if (!val) return;
      const msg = `Clique nesse link para compartilhar os dados no site: ${val}`;
      try {
        await navigator.clipboard.writeText(msg);
      } catch {
        // ignore
      }
      showToast(
        currentLang === 'pt'
          ? '✅ Mensagem + Link encurtado copiados!'
          : '✅ Message + Shortened Link copied!'
      );
    });
  }

  // ==========================================================================
  // SAKURA PETALS & HUD PARTICLE CANVAS
  // ==========================================================================
  const canvas = document.getElementById('sakura-canvas');
  const ctx = canvas.getContext('2d');
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
    const dict = i18n[currentLang];
    petalsToggleBtn.classList.toggle('active', petalsActive);
    petalsBtnLabel.textContent = petalsActive ? dict.petalsOn : dict.petalsOff;
  });
});
