// ============================================================================
// ZERO TWO (CODE:002) — "CADÊ VOCÊ?" NEURAL RADAR & WRITTEN LOCATION SCRIPT
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Load Session & Language ---
  const rawSession = sessionStorage.getItem('zeroTwoSession');
  let sessionData = {
    email: 'darling@squad13.franxx',
    hash: '002-A9F4C2-88E1B0-XX02'
  };

  if (rawSession) {
    try {
      sessionData = JSON.parse(rawSession);
    } catch {
      // fallback
    }
  }

  let currentLang = sessionStorage.getItem('zeroTwoLang') || 'pt';
  let petalsActive = true;
  let activeSectorIndex = 0;

  // --- Translations (PT-BR & EN-US) ---
  const i18n = {
    pt: {
      htmlLang: 'pt-BR',
      langBadge: '🇧🇷 PT-BR',
      backHomeBtn: 'Voltar para Home',
      pageTag: 'RADAR // CADÊ VOCÊ?',
      modeSakura: 'MODO: SAKURA',
      modeRampage: 'MODO: RAMPAGE (002)',
      petalsOn: '🌸 PÉTALAS: ON',
      petalsOff: '🌸 PÉTALAS: OFF',
      beaconBadge: 'FREQUÊNCIA DE BUSCA NEURAL // CODE:002',
      whereMainTitle: 'Cadê você,',
      pingBtnText: 'EMITIR SINAL DE LOCALIZAÇÃO',
      confirmHereBtn: '"Estou aqui, Zero Two!"',
      seeWhereBtn: 'Vê onde está',
      shareBoxTitle: 'LINK DE LOCALIZAÇÃO GERADO',
      shareBoxReady: 'PRONTO PARA ENVIAR',
      shareBoxDesc: 'Copie este link e envie para a pessoa. Assim que ela abrir, a localização aparecerá em forma de escrita na tela:',
      copyLinkBtn: 'Copiar Link',
      copiedLinkBtn: 'Copiado!',
      writtenLocHeader: 'LOCALIZAÇÃO EM FORMA DE ESCRITA',
      writtenLocLoading: 'Obtendo localização em forma de escrita...',
      labelTarget: 'ALVO RASTREADO',
      labelCoords: 'COORDENADAS ATUAIS',
      labelDistance: 'DISTÂNCIA NEURAL',
      labelSignalStatus: 'STATUS DO ENCONTRO',
      statusFound: 'ENCONTRO CONFIRMADO // 100%',
      radarSub: 'SONAR HOLOGRÁFICO STRELIZIA',
      radarTitle: 'RADAR DE RASTREAMENTO',
      radarHint: 'Clique no radar ou escolha um dos setores ao lado para sintonizar sua localização com a Zero Two.',
      sectorsSub: 'PONTOS DE ENCONTRO',
      sectorsTitle: 'ONDE VOCÊ ESTÁ AGORA?',
      sec0Name: 'Jardim das Cerejeiras (Mistilteinn)',
      sec0Desc: 'Onde as pétalas caem e nos vimos pela primeira vez.',
      sec1Name: 'Lago da Plantation 13',
      sec1Desc: 'Águas cristalinas onde Zero Two mergulhou livremente.',
      sec2Name: 'Floresta Nevada (Promessa de Infância)',
      sec2Desc: 'Sob a neve e o livro ilustrado da Fera e do Príncipe.',
      sec3Name: 'Grande Crevasse (Cockpit Strelizia)',
      sec3Desc: 'No coração da batalha onde nossas almas se uniram.',
      sec4Name: 'Árvore de Sakura Estelar (Eternidade)',
      sec4Desc: 'Além das estrelas, onde nossas almas sempre se reencontram.',
      replyLabel: 'ENVIAR RESPOSTA DIRETA PARA ZERO TWO:',
      replyPlaceholder: 'Ex: Estou te esperando sob as cerejeiras, Zero Two!',
      replySendBtn: 'Transmitir',
      toastPing: '📡 Pulso de radar emitido! Coordenadas sincronizadas com a <strong>Zero Two</strong>.',
      toastHere: '❤️ Sinal recebido! Zero Two: <strong>"Encontrei você, meu Darling!"</strong>',
      toastLinkCreated: '🔗 Link gerado! Copie e envie para quem você quer localizar.',
      toastLinkCopied: '✅ Link copiado para a área de transferência!',
      toastLocSuccess: '📍 Localização identificada e escrita na tela!',
      toastLang: 'Idioma alterado para <strong>Português (BR)</strong>.',
      sectorsData: [
        {
          code: 'SEC // MISTILTEINN',
          coords: '13.002° N, 16.016° E',
          dist: '0.02 KM (SOB AS CEREJEIRAS)',
          status: 'SINAL FORTE // 98.4%',
          quote: '"Eu procurei por você sob cada árvore de cerejeira de Mistilteinn... Então era aqui que você estava, meu <strong>Darling</strong>!"',
          log: 'Sinal detectado no Jardim das Cerejeiras (Mistilteinn).'
        },
        {
          code: 'SEC // LAGO-P13',
          coords: '42.810° S, 02.998° W',
          dist: '0.15 KM (BEIRA DA ÁGUA)',
          status: 'SINAL CLARO // 95.8%',
          quote: '"Lembra quando nos encontramos neste lago pela primeira vez? A água continua brilhando como os seus olhos, <strong>Darling</strong>."',
          log: 'Coordenadas sintonizadas no Lago da Plantation 13.'
        },
        {
          code: 'SEC // FLORESTA-NEVE',
          coords: '88.104° N, 00.002° E',
          dist: '0.00 KM (MEMÓRIA VIVA)',
          status: 'RESSONÂNCIA // 99.2%',
          quote: '"Mesmo no frio daquela noite de neve, você segurou a minha mão e me deu um motivo para continuar procurando por você, <strong>Darling</strong>."',
          log: 'Memória de infância na Floresta Nevada sincronizada.'
        },
        {
          code: 'SEC // GRAN-CREVASSE',
          coords: '66.600° S, 13.002° E',
          dist: '0.00 KM (MESMO COCKPIT)',
          status: 'CONEXÃO TOTAL // 99.9%',
          quote: '"Aqui dentro da Strelizia não existe distância entre nós dois. Nossos corações batem juntos, meu <strong>Darling</strong>!"',
          log: 'Ponte neural máxima estabelecida na Grande Crevasse.'
        },
        {
          code: 'SEC // SAKURA-ESTELAR',
          coords: '∞.002° N, ∞.016° E',
          dist: '0.00 KM (ALMAS UNIDAS)',
          status: 'PROMESSA ETERNA // 100%',
          quote: '"Não importa quantos séculos passem ou em qual estrela estejamos... Eu sempre vou encontrar você de novo, meu <strong>Darling</strong>."',
          log: 'Sincronização eterna confirmada na Árvore de Sakura Estelar.'
        }
      ],
      zeroTwoReplies: [
        'Zero Two: "Eu ouvi a sua voz! Já estou voando até você, Darling!"',
        'Zero Two: "Nunca mais se esconda de mim, viu? Promessa é promessa!"',
        'Zero Two: "Suas coordenadas estão gravadas no meu coração, Darling ❤️"'
      ]
    },
    en: {
      htmlLang: 'en',
      langBadge: '🇺🇸 EN-US',
      backHomeBtn: 'Back to Home',
      pageTag: 'RADAR // WHERE ARE YOU?',
      modeSakura: 'MODE: SAKURA',
      modeRampage: 'MODE: RAMPAGE (002)',
      petalsOn: '🌸 PETALS: ON',
      petalsOff: '🌸 PETALS: OFF',
      beaconBadge: 'NEURAL SEARCH FREQUENCY // CODE:002',
      whereMainTitle: 'Where are you,',
      pingBtnText: 'EMIT LOCATION BEACON',
      confirmHereBtn: '"I am right here, Zero Two!"',
      seeWhereBtn: 'See where you are',
      shareBoxTitle: 'GENERATED LOCATION LINK',
      shareBoxReady: 'READY TO SHARE',
      shareBoxDesc: 'Copy this link and send it. As soon as the person opens it, the location will appear in written form on screen:',
      copyLinkBtn: 'Copy Link',
      copiedLinkBtn: 'Copied!',
      writtenLocHeader: 'LOCATION IN WRITTEN FORM',
      writtenLocLoading: 'Retrieving detailed written location...',
      labelTarget: 'TRACKED TARGET',
      labelCoords: 'CURRENT COORDINATES',
      labelDistance: 'NEURAL DISTANCE',
      labelSignalStatus: 'RENDEZVOUS STATUS',
      statusFound: 'RENDEZVOUS CONFIRMED // 100%',
      radarSub: 'STRELIZIA HOLOGRAPHIC SONAR',
      radarTitle: 'NEURAL TRACKING RADAR',
      radarHint: 'Click on the radar or select a sector on the right to tune your location with Zero Two.',
      sectorsSub: 'RENDEZVOUS POINTS',
      sectorsTitle: 'WHERE ARE YOU RIGHT NOW?',
      sec0Name: 'Cherry Blossom Garden (Mistilteinn)',
      sec0Desc: 'Where the sakura petals fall and we first met.',
      sec1Name: 'Plantation 13 Lake',
      sec1Desc: 'Crystal waters where Zero Two swam freely.',
      sec2Name: 'Snowy Forest (Childhood Promise)',
      sec2Desc: 'Beneath the falling snow and the picture book.',
      sec3Name: 'Gran Crevasse (Strelizia Cockpit)',
      sec3Desc: 'At the heart of the battle where our souls united.',
      sec4Name: 'Starlight Sakura Tree (Eternity)',
      sec4Desc: 'Beyond the stars, where our souls always reunite.',
      replyLabel: 'SEND DIRECT REPLY TO ZERO TWO:',
      replyPlaceholder: 'Ex: I am waiting for you beneath the cherry blossoms, Zero Two!',
      replySendBtn: 'Transmit',
      toastPing: '📡 Radar pulse emitted! Coordinates synchronized with <strong>Zero Two</strong>.',
      toastHere: '❤️ Signal locked! Zero Two: <strong>"Found you, my Darling!"</strong>',
      toastLinkCreated: '🔗 Link generated! Copy and send it to share.',
      toastLinkCopied: '✅ Link copied to clipboard!',
      toastLocSuccess: '📍 Location identified and displayed in written form!',
      toastLang: 'Language switched to <strong>English (US)</strong>.',
      sectorsData: [
        {
          code: 'SEC // MISTILTEINN',
          coords: '13.002° N, 16.016° E',
          dist: '0.02 KM (UNDER THE SAKURA)',
          status: 'STRONG SIGNAL // 98.4%',
          quote: '"I searched for you beneath every cherry blossom tree in Mistilteinn... So this is where you were, my <strong>Darling</strong>!"',
          log: 'Signal detected at the Cherry Blossom Garden (Mistilteinn).'
        },
        {
          code: 'SEC // LAKE-P13',
          coords: '42.810° S, 02.998° W',
          dist: '0.15 KM (WATERFRONT)',
          status: 'CLEAR SIGNAL // 95.8%',
          quote: '"Remember when we first met at this lake? The water still sparkles just like your eyes, <strong>Darling</strong>."',
          log: 'Coordinates tuned to Plantation 13 Lake.'
        },
        {
          code: 'SEC // SNOW-FOREST',
          coords: '88.104° N, 00.002° E',
          dist: '0.00 KM (LIVING MEMORY)',
          status: 'RESONANCE // 99.2%',
          quote: '"Even in the freezing snow that night, you held my hand and gave me a reason to keep searching for you, <strong>Darling</strong>."',
          log: 'Childhood memory in the Snowy Forest synchronized.'
        },
        {
          code: 'SEC // GRAN-CREVASSE',
          coords: '66.600° S, 13.002° E',
          dist: '0.00 KM (SAME COCKPIT)',
          status: 'FULL LINK // 99.9%',
          quote: '"Inside Strelizia there is zero distance between us. Our hearts beat as one, my <strong>Darling</strong>!"',
          log: 'Maximum neural bridge established at Gran Crevasse.'
        },
        {
          code: 'SEC // STAR-SAKURA',
          coords: '∞.002° N, ∞.016° E',
          dist: '0.00 KM (SOULS UNITED)',
          status: 'ETERNAL PROMISE // 100%',
          quote: '"No matter how many centuries pass or which star we are on... I will always find you again, my <strong>Darling</strong>."',
          log: 'Eternal synchronization confirmed at the Starlight Sakura Tree.'
        }
      ],
      zeroTwoReplies: [
        'Zero Two: "I heard your voice! I am flying straight to you, Darling!"',
        'Zero Two: "Never hide from me again, okay? A promise is a promise!"',
        'Zero Two: "Your coordinates are engraved in my heart, Darling ❤️"'
      ]
    }
  };

  // --- DOM Elements ---
  const navUserEmail = document.getElementById('nav-user-email');
  const whereUserName = document.getElementById('where-user-name');
  const whereHashBadge = document.getElementById('where-hash-badge');
  const whereQuoteDisplay = document.getElementById('where-quote-display');
  const targetPilotCode = document.getElementById('target-pilot-code');
  const currentCoordsVal = document.getElementById('current-coords-val');
  const currentDistVal = document.getElementById('current-dist-val');
  const signalLockStatus = document.getElementById('signal-lock-status');
  const radarSectorCode = document.getElementById('radar-sector-code');

  const pingSignalBtn = document.getElementById('ping-signal-btn');
  const confirmHereBtn = document.getElementById('confirm-here-btn');
  const seeWhereBtn = document.getElementById('see-where-btn');
  const shareLinkBox = document.getElementById('share-link-box');
  const generatedShareUrl = document.getElementById('generated-share-url');
  const copyShareUrlBtn = document.getElementById('copy-share-url-btn');
  const copyShareBtnText = document.getElementById('copy-share-btn-text');

  const writtenLocationCard = document.getElementById('written-location-card');
  const writtenLocMain = document.getElementById('written-loc-main');
  const writtenLocSub = document.getElementById('written-loc-sub');

  const sectorCards = document.querySelectorAll('.sector-card');
  const replySignalForm = document.getElementById('reply-signal-form');
  const darlingMessageInput = document.getElementById('darling-message-input');
  const transmissionLog = document.getElementById('where-transmission-log');

  const switchLangBtn = document.getElementById('switch-lang-btn');
  const currentLangBadge = document.getElementById('current-lang-badge');
  const themeModeBtn = document.getElementById('theme-mode-btn');
  const themeModeLabel = document.getElementById('theme-mode-label');
  const petalsToggleBtn = document.getElementById('petals-toggle-btn');
  const petalsBtnLabel = document.getElementById('petals-btn-label');
  const toastContainer = document.getElementById('toast-container');

  // --- Populate User Data ---
  const userPrefix = sessionData.email.includes('@')
    ? sessionData.email.split('@')[0].toUpperCase()
    : sessionData.email.toUpperCase();

  navUserEmail.textContent = sessionData.email;
  whereUserName.textContent = userPrefix;
  whereHashBadge.textContent = `HASH: ${sessionData.hash}`;
  targetPilotCode.textContent = `CODE:016 // ${userPrefix}`;

  // --- Toast & Log Helpers ---
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

  function addLog(tag, text) {
    const p = document.createElement('p');
    p.innerHTML = `<span>[${tag}]</span> ${text}`;
    transmissionLog.appendChild(p);
    transmissionLog.scrollTop = transmissionLog.scrollHeight;
  }

  // --- Radar Blips Coordinates (Normalized -1 to 1) ---
  const sectorPoints = [
    { x: -0.35, y: -0.28 },
    { x: 0.42, y: -0.22 },
    { x: -0.25, y: 0.44 },
    { x: 0.32, y: 0.35 },
    { x: 0.0, y: -0.05 }
  ];
  let pulseWaves = [];

  function triggerRadarWave() {
    const pt = sectorPoints[activeSectorIndex];
    pulseWaves.push({ x: pt.x, y: pt.y, radius: 4, alpha: 1.0 });
  }

  // --- Select Sector ---
  function selectSector(index, logEvent = true) {
    activeSectorIndex = index;
    const dict = i18n[currentLang];
    const sec = dict.sectorsData[index];

    sectorCards.forEach((c, idx) => {
      c.classList.toggle('active', idx === index);
    });

    currentCoordsVal.textContent = sec.coords;
    currentDistVal.textContent = sec.dist;
    signalLockStatus.textContent = sec.status;
    radarSectorCode.textContent = sec.code;

    whereQuoteDisplay.style.opacity = '0';
    setTimeout(() => {
      whereQuoteDisplay.innerHTML = sec.quote;
      whereQuoteDisplay.style.opacity = '1';
    }, 150);

    triggerRadarWave();
    if (logEvent) {
      addLog('RADAR', sec.log);
    }
  }

  // --- Convert Coordinates / IP into Written Location ---
  async function resolveWrittenLocation() {
    const dict = i18n[currentLang];
    writtenLocationCard.classList.remove('hidden');
    writtenLocMain.textContent = dict.writtenLocLoading;
    writtenLocSub.textContent = '';

    // Helper to display final written text
    const renderWrittenResult = (writtenAddress, lat, lon, sourceLabel) => {
      writtenLocMain.textContent = `📍 ${writtenAddress}`;
      const coordText =
        lat && lon
          ? `Latitude: ${Number(lat).toFixed(5)}° | Longitude: ${Number(lon).toFixed(5)}° (${sourceLabel})`
          : sourceLabel;
      writtenLocSub.textContent = coordText;

      if (lat && lon) {
        currentCoordsVal.textContent = `${Number(lat).toFixed(4)}°, ${Number(lon).toFixed(4)}°`;
      }
      signalLockStatus.textContent = dict.statusFound;
      triggerRadarWave();
      addLog('LOC', writtenAddress);
      showToast(dict.toastLocSuccess);
    };

    // Fallback via public IP geolocation API if GPS permission is denied or unavailable
    const fallbackIpLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('IP lookup failed');
        const data = await res.json();
        const parts = [data.city, data.region, data.country_name].filter(Boolean);
        const written = parts.length > 0
          ? (currentLang === 'pt'
              ? `Você está em ${parts.join(', ')}`
              : `You are located in ${parts.join(', ')}`)
          : (currentLang === 'pt' ? 'Localização aproximada identificada' : 'Approximate location identified');
        renderWrittenResult(written, data.latitude, data.longitude, 'Rede / IP');
      } catch {
        const msg =
          currentLang === 'pt'
            ? 'Permita o acesso à localização no navegador para exibir a rua, bairro e cidade por escrito.'
            : 'Please allow browser location access to display your street, neighborhood, and city in written form.';
        writtenLocMain.textContent = msg;
      }
    };

    if (!('geolocation' in navigator)) {
      await fallbackIpLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const langParam = currentLang === 'pt' ? 'pt-BR' : 'en-US';
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${langParam}`;
          const response = await fetch(url, {
            headers: { Accept: 'application/json' }
          });
          const geo = await response.json();

          if (geo && geo.address) {
            const a = geo.address;
            const street = a.road || a.pedestrian || a.suburb || '';
            const number = a.house_number ? `, nº ${a.house_number}` : '';
            const neighborhood = a.suburb || a.neighbourhood || a.quarter || '';
            const city = a.city || a.town || a.village || a.municipality || '';
            const state = a.state || '';
            const country = a.country || '';

            const segments = [
              street ? `${street}${number}` : '',
              neighborhood && neighborhood !== street ? `Bairro ${neighborhood}` : '',
              city && state ? `${city} - ${state}` : city || state,
              country
            ].filter(Boolean);

            const fullText =
              segments.length > 0
                ? segments.join(', ')
                : geo.display_name;

            renderWrittenResult(fullText, latitude, longitude, 'GPS Preciso');
          } else if (geo && geo.display_name) {
            renderWrittenResult(geo.display_name, latitude, longitude, 'GPS');
          } else {
            renderWrittenResult(
              currentLang === 'pt'
                ? `Coordenadas localizadas (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`
                : `Coordinates located (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
              latitude,
              longitude,
              'GPS'
            );
          }
        } catch {
          renderWrittenResult(
            currentLang === 'pt'
              ? `Localização ativa nas coordenadas ${latitude.toFixed(5)}°, ${longitude.toFixed(5)}°`
              : `Active location at coordinates ${latitude.toFixed(5)}°, ${longitude.toFixed(5)}°`,
            latitude,
            longitude,
            'GPS'
          );
        }
      },
      async () => {
        await fallbackIpLocation();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  // --- "Vê onde está" Button: Generate Shareable Site Link (Railway / Current Domain) ---
  seeWhereBtn.addEventListener('click', () => {
    const dict = i18n[currentLang];
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const shareUrl = `${baseUrl}?localizar=1`;

    generatedShareUrl.value = shareUrl;
    shareLinkBox.classList.remove('hidden');
    copyShareBtnText.textContent = dict.copyLinkBtn;

    addLog('LINK', shareUrl);
    showToast(dict.toastLinkCreated);

    // Also resolve and show written location immediately on click
    resolveWrittenLocation();
  });

  // --- Copy Generated Link ---
  copyShareUrlBtn.addEventListener('click', async () => {
    const dict = i18n[currentLang];
    const linkToCopy = generatedShareUrl.value;
    if (!linkToCopy) return;

    try {
      await navigator.clipboard.writeText(linkToCopy);
      copyShareBtnText.textContent = dict.copiedLinkBtn;
      showToast(dict.toastLinkCopied);
      setTimeout(() => {
        copyShareBtnText.textContent = i18n[currentLang].copyLinkBtn;
      }, 2200);
    } catch {
      generatedShareUrl.select();
      document.execCommand('copy');
      copyShareBtnText.textContent = dict.copiedLinkBtn;
      showToast(dict.toastLinkCopied);
    }
  });

  // --- Apply Language ---
  function applyLanguage(lang) {
    currentLang = lang;
    sessionStorage.setItem('zeroTwoLang', lang);
    const dict = i18n[lang];
    document.documentElement.lang = dict.htmlLang;
    currentLangBadge.textContent = dict.langBadge;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const isRampage = document.body.classList.contains('rampage-mode');
    themeModeLabel.textContent = isRampage ? dict.modeRampage : dict.modeSakura;
    petalsBtnLabel.textContent = petalsActive ? dict.petalsOn : dict.petalsOff;
    darlingMessageInput.placeholder = dict.replyPlaceholder;

    selectSector(activeSectorIndex, false);
  }

  // Initialize language & initial log
  applyLanguage(currentLang);
  addLog('002', i18n[currentLang].sectorsData[0].log);

  // Check if user opened the shared link (?localizar=1)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('localizar') === '1') {
    resolveWrittenLocation();
  }

  // --- Event Listeners ---
  sectorCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = Number(card.getAttribute('data-sector'));
      selectSector(idx, true);
    });
  });

  pingSignalBtn.addEventListener('click', () => {
    triggerRadarWave();
    const dict = i18n[currentLang];
    addLog('PING', `${dict.sectorsData[activeSectorIndex].coords} — OK`);
    showToast(dict.toastPing);
  });

  confirmHereBtn.addEventListener('click', () => {
    triggerRadarWave();
    const dict = i18n[currentLang];
    signalLockStatus.textContent = dict.statusFound;
    addLog('DARLING', dict.confirmHereBtn);
    addLog('002', dict.zeroTwoReplies[0]);
    showToast(dict.toastHere);
  });

  replySignalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = darlingMessageInput.value.trim();
    if (!msg) return;

    const dict = i18n[currentLang];
    addLog(userPrefix, `"${msg}"`);
    darlingMessageInput.value = '';
    triggerRadarWave();
    signalLockStatus.textContent = dict.statusFound;

    const randomReply =
      dict.zeroTwoReplies[Math.floor(Math.random() * dict.zeroTwoReplies.length)];
    setTimeout(() => {
      addLog('002', randomReply);
      showToast(dict.toastHere);
    }, 350);
  });

  switchLangBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'pt' ? 'en' : 'pt';
    applyLanguage(nextLang);
    showToast(i18n[nextLang].toastLang);
  });

  themeModeBtn.addEventListener('click', () => {
    const isRampage = document.body.classList.toggle('rampage-mode');
    const dict = i18n[currentLang];
    themeModeLabel.textContent = isRampage ? dict.modeRampage : dict.modeSakura;
  });

  petalsToggleBtn.addEventListener('click', () => {
    petalsActive = !petalsActive;
    const dict = i18n[currentLang];
    petalsToggleBtn.classList.toggle('active', petalsActive);
    petalsBtnLabel.textContent = petalsActive ? dict.petalsOn : dict.petalsOff;
  });

  // ==========================================================================
  // INTERACTIVE HUD RADAR CANVAS
  // ==========================================================================
  const radarCanvas = document.getElementById('radar-canvas');
  const rCtx = radarCanvas.getContext('2d');
  let sweepAngle = 0;

  radarCanvas.addEventListener('click', () => {
    const nextIdx = (activeSectorIndex + 1) % sectorPoints.length;
    selectSector(nextIdx, true);
  });

  function drawRadar() {
    const w = radarCanvas.width;
    const h = radarCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = w * 0.44;
    const isRampage = document.body.classList.contains('rampage-mode');
    const primaryColor = isRampage ? '#ff003c' : '#00f0ff';
    const accentPink = '#ff2a6d';

    rCtx.clearRect(0, 0, w, h);

    // Concentric rings
    rCtx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
    rCtx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach((factor) => {
      rCtx.beginPath();
      rCtx.arc(cx, cy, maxR * factor, 0, Math.PI * 2);
      rCtx.stroke();
    });

    // Crosshair axes
    rCtx.beginPath();
    rCtx.moveTo(cx - maxR, cy);
    rCtx.lineTo(cx + maxR, cy);
    rCtx.moveTo(cx, cy - maxR);
    rCtx.lineTo(cx, cy + maxR);
    rCtx.stroke();

    // Sweeping Radar Beam
    rCtx.save();
    rCtx.translate(cx, cy);
    rCtx.rotate(sweepAngle);

    const grad = rCtx.createConicGradient(0, 0, 0);
    grad.addColorStop(0, 'rgba(255, 42, 109, 0.38)');
    grad.addColorStop(0.18, 'rgba(0, 240, 255, 0.08)');
    grad.addColorStop(0.25, 'transparent');
    grad.addColorStop(1, 'transparent');

    rCtx.fillStyle = grad;
    rCtx.beginPath();
    rCtx.arc(0, 0, maxR, 0, Math.PI * 2);
    rCtx.fill();

    // Leading beam line
    rCtx.strokeStyle = accentPink;
    rCtx.lineWidth = 2;
    rCtx.beginPath();
    rCtx.moveTo(0, 0);
    rCtx.lineTo(maxR, 0);
    rCtx.stroke();
    rCtx.restore();

    // Draw Sector Blips
    sectorPoints.forEach((pt, idx) => {
      const bx = cx + pt.x * maxR;
      const by = cy + pt.y * maxR;
      const isSelected = idx === activeSectorIndex;

      rCtx.save();
      rCtx.beginPath();
      rCtx.arc(bx, by, isSelected ? 7 : 4.5, 0, Math.PI * 2);
      rCtx.fillStyle = isSelected ? accentPink : primaryColor;
      rCtx.shadowColor = rCtx.fillStyle;
      rCtx.shadowBlur = isSelected ? 14 : 6;
      rCtx.fill();

      if (isSelected) {
        rCtx.strokeStyle = '#ffffff';
        rCtx.lineWidth = 1.5;
        rCtx.beginPath();
        rCtx.arc(bx, by, 13, 0, Math.PI * 2);
        rCtx.stroke();
      }
      rCtx.restore();
    });

    // Draw Expanding Pulse Waves
    for (let i = pulseWaves.length - 1; i >= 0; i--) {
      const pw = pulseWaves[i];
      const px = cx + pw.x * maxR;
      const py = cy + pw.y * maxR;

      rCtx.save();
      rCtx.strokeStyle = `rgba(255, 42, 109, ${pw.alpha})`;
      rCtx.lineWidth = 2;
      rCtx.beginPath();
      rCtx.arc(px, py, pw.radius, 0, Math.PI * 2);
      rCtx.stroke();
      rCtx.restore();

      pw.radius += 1.4;
      pw.alpha -= 0.018;
      if (pw.alpha <= 0) {
        pulseWaves.splice(i, 1);
      }
    }

    sweepAngle += 0.025;
    requestAnimationFrame(drawRadar);
  }

  drawRadar();

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
});
