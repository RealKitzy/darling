// ============================================================================
// ZERO TWO (CODE:002) — "CADÊ VOCÊ?" RADAR, CONSENT SCREEN & ADDRESS DETAILS
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
      shareBoxTitle: 'CONVITE DE COMPARTILHAMENTO',
      shareBoxReady: 'AGUARDANDO A PESSOA CLICAR...',
      shareBoxDesc:
        'Copie a mensagem abaixo e envie. Ela avisa: "Clique nesse link para compartilhar os dados no site":',
      copyLinkBtn: 'Copiar Mensagem + Link',
      copiedLinkBtn: 'Copiado!',
      consentTag: 'SOLICITAÇÃO DE COMPARTILHAMENTO // CODE:002',
      consentTitle: 'Compartilhar Dados de Localização no Site',
      consentExplanation:
        'Você acessou um link para compartilhar dados no site. Ao clicar no botão abaixo e autorizar no seu navegador, sua localização atual (CEP, Rua, Número aproximado, Bairro, Cidade e País) será consultada e exibida no painel do site.',
      consentSharedHeader: 'DADOS COMPARTILHADOS COM O SITE:',
      consentConfirmBtn: '❤️ Autorizar e Compartilhar Dados no Site',
      consentEnterSiteBtn: 'Ir para o Site',
      locPanelSub: 'DADOS COMPARTILHADOS NO SITE',
      locPanelTitle: 'ONDE A PESSOA ESTÁ',
      locBadgeWaiting: 'AGUARDANDO DADOS',
      locBadgeReceived: 'LOCALIZAÇÃO ATIVA',
      fieldStreetLabel: 'RUA / LOGRADOURO',
      fieldNumberLabel: 'NÚMERO (OU APROXIMADO)',
      fieldNeighborhoodLabel: 'BAIRRO',
      fieldCepLabel: 'CEP (CÓDIGO POSTAL)',
      fieldCityLabel: 'CIDADE',
      fieldCountryLabel: 'PAÍS',
      writtenLocHeader: 'RESUMO POR ESCRITO DA LOCALIZAÇÃO',
      writtenLocEmpty:
        'Nenhuma localização compartilhada ainda. Envie o link de convite ou clique em "Estou aqui, Zero Two!".',
      writtenLocLoading: 'Consultando CEP, rua, número aproximado, bairro, cidade e país...',
      labelTarget: 'ALVO RASTREADO',
      labelCoords: 'COORDENADAS ATUAIS',
      labelDistance: 'FONTE DOS DADOS',
      labelSignalStatus: 'STATUS DO SINAL',
      statusFound: 'SINAL SINCRONIZADO // 100%',
      radarSub: 'SONAR HOLOGRÁFICO STRELIZIA',
      radarTitle: 'RADAR DE RASTREAMENTO',
      radarHint:
        'O radar sincroniza automaticamente quando os dados de localização são autorizados e enviados para o painel.',
      replyLabel: 'ENVIAR RESPOSTA DIRETA PARA ZERO TWO:',
      replyPlaceholder: 'Ex: Estou te esperando sob as cerejeiras, Zero Two!',
      replySendBtn: 'Transmitir',
      toastPing: '📡 Pulso de radar emitido! Coordenadas sincronizadas com a <strong>Zero Two</strong>.',
      toastHere: '❤️ Sincronizando sua localização atual com a <strong>Zero Two</strong>!',
      toastLinkCreated:
        '🔗 Link e mensagem gerados! Copie e envie para quem vai compartilhar os dados no site.',
      toastLinkCopied: '✅ Mensagem + Link copiados para a área de transferência!',
      toastLocSuccess: '📍 Dados de localização (CEP, Rua, Bairro, Cidade e País) atualizados no painel!',
      toastLang: 'Idioma alterado para <strong>Português (BR)</strong>.',
      shareMessagePrefix: 'Clique nesse link para compartilhar os dados no site:',
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
      shareBoxTitle: 'LOCATION SHARING INVITE',
      shareBoxReady: 'WAITING FOR RECIPIENT...',
      shareBoxDesc:
        'Copy the message below and send it ("Click this link to share the data on the site"):',
      copyLinkBtn: 'Copy Message + Link',
      copiedLinkBtn: 'Copied!',
      consentTag: 'LOCATION SHARING REQUEST // CODE:002',
      consentTitle: 'Share Location Data on the Site',
      consentExplanation:
        'You opened a link to share location data on the site. By clicking the button below and allowing browser access, your current location (Postal Code, Street, Approximate Number, Neighborhood, City, and Country) will be displayed on the site panel.',
      consentSharedHeader: 'DATA SHARED WITH THE SITE:',
      consentConfirmBtn: '❤️ Authorize & Share Data on the Site',
      consentEnterSiteBtn: 'Go to the Site',
      locPanelSub: 'DATA SHARED ON THE SITE',
      locPanelTitle: 'WHERE THE PERSON IS',
      locBadgeWaiting: 'WAITING FOR DATA',
      locBadgeReceived: 'LOCATION ACTIVE',
      fieldStreetLabel: 'STREET',
      fieldNumberLabel: 'NUMBER (OR APPROXIMATE)',
      fieldNeighborhoodLabel: 'NEIGHBORHOOD',
      fieldCepLabel: 'POSTAL CODE (CEP)',
      fieldCityLabel: 'CITY',
      fieldCountryLabel: 'COUNTRY',
      writtenLocHeader: 'WRITTEN LOCATION SUMMARY',
      writtenLocEmpty:
        'No location shared yet. Send the invite link or click "I am right here, Zero Two!".',
      writtenLocLoading: 'Retrieving postal code, street, number, neighborhood, city, and country...',
      labelTarget: 'TRACKED TARGET',
      labelCoords: 'CURRENT COORDINATES',
      labelDistance: 'DATA SOURCE',
      labelSignalStatus: 'SIGNAL STATUS',
      statusFound: 'SIGNAL SYNCHRONIZED // 100%',
      radarSub: 'STRELIZIA HOLOGRAPHIC SONAR',
      radarTitle: 'NEURAL TRACKING RADAR',
      radarHint:
        'The radar synchronizes automatically when location data is authorized and sent to the panel.',
      replyLabel: 'SEND DIRECT REPLY TO ZERO TWO:',
      replyPlaceholder: 'Ex: I am waiting for you beneath the cherry blossoms, Zero Two!',
      replySendBtn: 'Transmit',
      toastPing: '📡 Radar pulse emitted! Coordinates synchronized with <strong>Zero Two</strong>.',
      toastHere: '❤️ Synchronizing your current location with <strong>Zero Two</strong>!',
      toastLinkCreated: '🔗 Invite message and link generated! Copy and send it.',
      toastLinkCopied: '✅ Message + Link copied to clipboard!',
      toastLocSuccess: '📍 Location details (Postal Code, Street, Neighborhood, City, Country) updated!',
      toastLang: 'Language switched to <strong>English (US)</strong>.',
      shareMessagePrefix: 'Clique nesse link para compartilhar os dados no site:',
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
  const targetPilotCode = document.getElementById('target-pilot-code');
  const currentCoordsVal = document.getElementById('current-coords-val');
  const currentDistVal = document.getElementById('current-dist-val');
  const signalLockStatus = document.getElementById('signal-lock-status');

  const pingSignalBtn = document.getElementById('ping-signal-btn');
  const confirmHereBtn = document.getElementById('confirm-here-btn');
  const seeWhereBtn = document.getElementById('see-where-btn');
  const shareLinkBox = document.getElementById('share-link-box');
  const shareLinkStatus = document.getElementById('share-link-status');
  const generatedShareUrl = document.getElementById('generated-share-url');
  const copyShareUrlBtn = document.getElementById('copy-share-url-btn');
  const copyShareBtnText = document.getElementById('copy-share-btn-text');

  // Detailed Location Fields (Replacing "Pontos de Encontro")
  const locPanelBadge = document.getElementById('loc-panel-badge');
  const locFieldStreet = document.getElementById('loc-field-street');
  const locFieldNumber = document.getElementById('loc-field-number');
  const locFieldNeighborhood = document.getElementById('loc-field-neighborhood');
  const locFieldCep = document.getElementById('loc-field-cep');
  const locFieldCity = document.getElementById('loc-field-city');
  const locFieldCountry = document.getElementById('loc-field-country');
  const locDetailItems = document.querySelectorAll('.loc-detail-item');

  const writtenLocMain = document.getElementById('written-loc-main');
  const writtenLocSub = document.getElementById('written-loc-sub');

  // Consent Modal Elements (Zero Two Heart Pose)
  const shareConsentOverlay = document.getElementById('share-consent-overlay');
  const confirmConsentShareBtn = document.getElementById('confirm-consent-share-btn');
  const confirmConsentBtnText = document.getElementById('confirm-consent-btn-text');
  const enterSiteDirectlyBtn = document.getElementById('enter-site-directly-btn');
  const consentSharedPreview = document.getElementById('consent-shared-preview');
  const consentSharedSummary = document.getElementById('consent-shared-summary');

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

  let activeSignalCode = null;
  let signalPollTimer = null;
  const signalChannel =
    typeof BroadcastChannel !== 'undefined'
      ? new BroadcastChannel('zero_two_signal_channel')
      : null;

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

  // --- Radar Blips ---
  const sectorPoints = [
    { x: -0.35, y: -0.28 },
    { x: 0.42, y: -0.22 },
    { x: -0.25, y: 0.44 },
    { x: 0.32, y: 0.35 },
    { x: 0.0, y: -0.05 }
  ];
  let pulseWaves = [];

  function triggerRadarWave() {
    pulseWaves.push({ x: 0.0, y: -0.05, radius: 4, alpha: 1.0 });
  }

  // --- Clear Location Fields (Used when clicking "Vê onde está") ---
  function resetLocationPanel() {
    const dict = i18n[currentLang];
    locFieldStreet.textContent = '—';
    locFieldNumber.textContent = '—';
    locFieldNeighborhood.textContent = '—';
    locFieldCep.textContent = '—';
    locFieldCity.textContent = '—';
    locFieldCountry.textContent = '—';
    locDetailItems.forEach((item) => item.classList.remove('populated'));
    locPanelBadge.textContent = dict.locBadgeWaiting;
    writtenLocMain.textContent = dict.writtenLocEmpty;
    writtenLocSub.textContent = '';
    currentCoordsVal.textContent = 'AGUARDANDO SINAL';
  }

  // --- Populate Detailed Location Fields on Panel ---
  function renderLocationDetails(details) {
    const dict = i18n[currentLang];
    locFieldStreet.textContent = details.street || '—';
    locFieldNumber.textContent = details.number || '—';
    locFieldNeighborhood.textContent = details.neighborhood || '—';
    locFieldCep.textContent = details.cep || '—';
    locFieldCity.textContent = details.city || '—';
    locFieldCountry.textContent = details.country || '—';

    locDetailItems.forEach((item) => item.classList.add('populated'));
    locPanelBadge.textContent = dict.locBadgeReceived;

    writtenLocMain.textContent = `📍 ${details.writtenAddress}`;
    const coordText =
      details.lat && details.lon
        ? `Latitude: ${Number(details.lat).toFixed(5)}° | Longitude: ${Number(details.lon).toFixed(5)}° (${details.sourceLabel || 'GPS'})`
        : details.sourceLabel || '';
    writtenLocSub.textContent = coordText;

    if (details.lat && details.lon) {
      currentCoordsVal.textContent = `${Number(details.lat).toFixed(4)}°, ${Number(details.lon).toFixed(4)}°`;
    }
    currentDistVal.textContent = details.sourceLabel || 'CONSENTIMENTO DIRETO';
    signalLockStatus.textContent = dict.statusFound;
    triggerRadarWave();
    addLog('LOC', details.writtenAddress);
    showToast(dict.toastLocSuccess);
  }

  // --- Resolve Detailed Location Only After Explicit User Action ---
  function requestAndResolveLocation(signalCodeToReport = null, onResolvedCallback = null) {
    const dict = i18n[currentLang];
    writtenLocMain.textContent = dict.writtenLocLoading;
    writtenLocSub.textContent = '';

    if (!('geolocation' in navigator)) {
      const msg =
        currentLang === 'pt'
          ? 'Seu navegador não suporta geolocalização.'
          : 'Your browser does not support geolocation.';
      writtenLocMain.textContent = msg;
      if (onResolvedCallback) onResolvedCallback(null, msg);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let street = 'Via identificada por coordenadas';
        let number = 'S/N (Aproximado na via)';
        let neighborhood = '—';
        let cep = '—';
        let city = '—';
        let country = '—';
        let writtenAddress = `Coordenadas (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;

        try {
          const langParam = currentLang === 'pt' ? 'pt-BR' : 'en-US';
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=${langParam}`;
          const response = await fetch(url, {
            headers: { Accept: 'application/json' }
          });
          const geo = await response.json();

          if (geo && geo.address) {
            const a = geo.address;
            street = a.road || a.pedestrian || a.footway || a.path || a.suburb || 'Rua não especificada';
            number = a.house_number
              ? `Nº ${a.house_number}`
              : currentLang === 'pt'
                ? 'S/N (Número aproximado no trecho)'
                : 'Approx. street segment';
            neighborhood =
              a.suburb || a.neighbourhood || a.quarter || a.city_district || a.borough || 'Centro / Setor Local';
            cep = a.postcode || (currentLang === 'pt' ? 'CEP Geral da Região' : 'Regional Postal Code');

            const rawCity = a.city || a.town || a.village || a.municipality || a.county || '—';
            const rawState = a.state || '';
            city = rawState && rawCity !== '—' ? `${rawCity} - ${rawState}` : rawCity;
            country = a.country || '—';

            writtenAddress = `${street}, ${number} — Bairro ${neighborhood}, CEP: ${cep}, ${city}, ${country}`;
          }
        } catch {
          // Keep coordinate fallback if reverse geocoding request fails
        }

        const details = {
          code: signalCodeToReport,
          street,
          number,
          neighborhood,
          cep,
          city,
          country,
          writtenAddress,
          lat: latitude,
          lon: longitude,
          sourceLabel: 'GPS Autorizado',
          timestamp: Date.now()
        };

        renderLocationDetails(details);

        if (signalCodeToReport) {
          try {
            localStorage.setItem(`zeroTwoSignal_${signalCodeToReport}`, JSON.stringify(details));
          } catch {
            // ignore
          }
          if (signalChannel) {
            try {
              signalChannel.postMessage(details);
            } catch {
              // ignore
            }
          }
          if (window.location.protocol.startsWith('http')) {
            try {
              await fetch(`/api/sinal/${encodeURIComponent(signalCodeToReport)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
              });
            } catch {
              // ignore
            }
          }
        }

        if (onResolvedCallback) onResolvedCallback(details, null);
      },
      () => {
        const errMsg =
          currentLang === 'pt'
            ? 'Permissão de localização recusada ou indisponível no navegador. Autorize a permissão de localização do navegador para compartilhar os dados.'
            : 'Browser location permission denied or unavailable. Please allow browser location access to share data.';
        writtenLocMain.textContent = errMsg;
        if (onResolvedCallback) onResolvedCallback(null, errMsg);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }

  // --- Handle Incoming Location When Recipient Authorizes on the Link ---
  function handleIncomingRemoteSignal(data) {
    if (!data || !activeSignalCode || data.code !== activeSignalCode) return;
    if (signalPollTimer) {
      clearInterval(signalPollTimer);
      signalPollTimer = null;
    }
    if (shareLinkStatus) {
      shareLinkStatus.textContent =
        currentLang === 'pt' ? 'DADOS RECEBIDOS NO PAINEL!' : 'DATA RECEIVED ON PANEL!';
    }
    renderLocationDetails(data);
  }

  if (signalChannel) {
    signalChannel.addEventListener('message', (event) => {
      if (event && event.data) {
        handleIncomingRemoteSignal(event.data);
      }
    });
  }

  window.addEventListener('storage', (event) => {
    if (activeSignalCode && event.key === `zeroTwoSignal_${activeSignalCode}` && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        handleIncomingRemoteSignal(parsed);
      } catch {
        // ignore
      }
    }
  });

  function startWaitingForRecipient(code) {
    activeSignalCode = code;
    if (signalPollTimer) {
      clearInterval(signalPollTimer);
      signalPollTimer = null;
    }

    if (window.location.protocol.startsWith('http')) {
      signalPollTimer = setInterval(async () => {
        try {
          const res = await fetch(`/api/sinal/${encodeURIComponent(code)}`);
          if (!res.ok) return;
          const json = await res.json();
          if (json && json.ok && json.data && json.data.writtenAddress) {
            handleIncomingRemoteSignal({
              code,
              ...json.data
            });
          }
        } catch {
          // ignore network errors
        }
      }, 2000);
    }
  }

  // --- "Vê onde está" Button: ONLY generate invite message + link & wait ---
  seeWhereBtn.addEventListener('click', () => {
    const dict = i18n[currentLang];

    // Reset panel so sender's own location is NEVER displayed when clicking "Vê onde está"
    resetLocationPanel();

    if (window.location.search) {
      try {
        window.history.replaceState({}, '', window.location.pathname);
      } catch {
        // ignore
      }
    }

    const cleanBaseUrl = window.location.href.split('?')[0].split('#')[0];
    const randomCode = '002-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const shareUrl = `${cleanBaseUrl}?sinal=${randomCode}`;
    const fullInviteText = `${dict.shareMessagePrefix} ${shareUrl}`;

    generatedShareUrl.value = fullInviteText;
    shareLinkBox.classList.remove('hidden');
    copyShareBtnText.textContent = dict.copyLinkBtn;
    if (shareLinkStatus) {
      shareLinkStatus.textContent = dict.shareBoxReady;
    }

    startWaitingForRecipient(randomCode);

    addLog('CONVITE', fullInviteText);
    showToast(dict.toastLinkCreated);
  });

  // --- Copy Invite Message + Link ---
  copyShareUrlBtn.addEventListener('click', async () => {
    const dict = i18n[currentLang];
    const textToCopy = generatedShareUrl.value;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
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
  }

  // Initialize language & initial log
  applyLanguage(currentLang);
  addLog('002', 'Radar neural inicializado. Aguardando sincronização de localização.');

  // --- Check if User Opened the Shared Link (?sinal=002-XXXXXX) ---
  const urlParams = new URLSearchParams(window.location.search);
  const sharedSignalCode = urlParams.get('sinal') || (urlParams.get('localizar') === '1' ? 'LOCAL' : null);

  if (sharedSignalCode && shareConsentOverlay) {
    // Show the Zero Two Heart Pose & Transparent Consent Screen first
    shareConsentOverlay.classList.remove('hidden');

    confirmConsentShareBtn.addEventListener('click', () => {
      confirmConsentBtnText.textContent =
        currentLang === 'pt'
          ? 'Solicitando permissão no navegador...'
          : 'Requesting browser permission...';

      requestAndResolveLocation(sharedSignalCode, (details, errMsg) => {
        consentSharedPreview.classList.remove('hidden');
        if (details) {
          consentSharedSummary.textContent = details.writtenAddress;
          confirmConsentBtnText.textContent =
            currentLang === 'pt'
              ? '✅ Dados Compartilhados! Entrando no Site...'
              : '✅ Data Shared! Entering Site...';
          setTimeout(() => {
            shareConsentOverlay.classList.add('dismissed');
            setTimeout(() => shareConsentOverlay.classList.add('hidden'), 400);
          }, 1600);
        } else {
          consentSharedSummary.textContent = errMsg || '';
          confirmConsentBtnText.textContent = i18n[currentLang].consentConfirmBtn;
        }
      });
    });

    enterSiteDirectlyBtn.addEventListener('click', () => {
      shareConsentOverlay.classList.add('dismissed');
      setTimeout(() => shareConsentOverlay.classList.add('hidden'), 400);
    });
  }

  // --- Other Buttons ---
  pingSignalBtn.addEventListener('click', () => {
    triggerRadarWave();
    const dict = i18n[currentLang];
    addLog('PING', 'Pulso de radar emitido — OK');
    showToast(dict.toastPing);
  });

  confirmHereBtn.addEventListener('click', () => {
    triggerRadarWave();
    const dict = i18n[currentLang];
    addLog('DARLING', dict.confirmHereBtn);
    addLog('002', dict.zeroTwoReplies[0]);
    showToast(dict.toastHere);
    requestAndResolveLocation(null);
  });

  replySignalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = darlingMessageInput.value.trim();
    if (!msg) return;

    const dict = i18n[currentLang];
    addLog(userPrefix, `"${msg}"`);
    darlingMessageInput.value = '';
    triggerRadarWave();

    const randomReply =
      dict.zeroTwoReplies[Math.floor(Math.random() * dict.zeroTwoReplies.length)];
    setTimeout(() => {
      addLog('002', randomReply);
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
    rCtx.strokeStyle = isRampage ? 'rgba(255, 0, 60, 0.22)' : 'rgba(0, 240, 255, 0.2)';
    rCtx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach((ratio) => {
      rCtx.beginPath();
      rCtx.arc(cx, cy, maxR * ratio, 0, Math.PI * 2);
      rCtx.stroke();
    });

    // Crosshairs
    rCtx.beginPath();
    rCtx.moveTo(cx - maxR, cy);
    rCtx.lineTo(cx + maxR, cy);
    rCtx.moveTo(cx, cy - maxR);
    rCtx.lineTo(cx, cy + maxR);
    rCtx.stroke();

    // Rotating sonar sweep cone
    sweepAngle += 0.024;
    const grad = rCtx.createConicGradient(sweepAngle, cx, cy);
    grad.addColorStop(0, isRampage ? 'rgba(255, 0, 60, 0.36)' : 'rgba(0, 240, 255, 0.34)');
    grad.addColorStop(0.18, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    rCtx.fillStyle = grad;
    rCtx.beginPath();
    rCtx.arc(cx, cy, maxR, 0, Math.PI * 2);
    rCtx.fill();

    // Expanding pulse waves
    for (let i = pulseWaves.length - 1; i >= 0; i--) {
      const pw = pulseWaves[i];
      const px = cx + pw.x * maxR;
      const py = cy + pw.y * maxR;
      pw.radius += 1.6;
      pw.alpha -= 0.018;

      if (pw.alpha <= 0) {
        pulseWaves.splice(i, 1);
        continue;
      }

      rCtx.save();
      rCtx.strokeStyle = accentPink;
      rCtx.globalAlpha = pw.alpha;
      rCtx.lineWidth = 2;
      rCtx.beginPath();
      rCtx.arc(px, py, pw.radius, 0, Math.PI * 2);
      rCtx.stroke();
      rCtx.restore();
    }

    // Center active target blip
    sectorPoints.forEach((pt, idx) => {
      const px = cx + pt.x * maxR;
      const py = cy + pt.y * maxR;
      const isCenter = idx === 4;

      rCtx.save();
      rCtx.fillStyle = isCenter ? accentPink : primaryColor;
      rCtx.shadowColor = isCenter ? accentPink : primaryColor;
      rCtx.shadowBlur = isCenter ? 14 : 6;
      rCtx.beginPath();
      rCtx.arc(px, py, isCenter ? 6.5 : 3.5, 0, Math.PI * 2);
      rCtx.fill();
      rCtx.restore();
    });

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

      if (this.y > canvas.height + 25 || this.x < -35 || this.x > canvas.width + 35) {
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
