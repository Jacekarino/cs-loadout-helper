(function () {
  'use strict';

  // Pobranie modułów Bazy Wiedzy (KB) i Maszyny Wnioskowania (Engine)
  const KB = window.CS2_KB;
  const EngineModule = window.CS2_Engine;

  if (!KB || !EngineModule) {
    console.error("Błąd: Nie załadowano modułów KB lub Engine.");
    return;
  }

  // Inicjalizacja instancji Maszyny Wnioskowania
  const inferenceEngine = EngineModule.createEngine(KB);

  // 5 pytań taktycznych w ankiecie
  const TACTICAL_QUESTION_KEYS = [
    "round_economy",
    "tactical_role",
    "engagement_distance",
    "weapon_feature",
    "playstyle"
  ];

  // Stan aplikacji
  const appState = {
    facts: {
      side: null,
      round_economy: null,
      tactical_role: null,
      engagement_distance: null,
      weapon_feature: null,
      playstyle: null
    },
    autoTransitionTimer: null
  };

  // Referencje do elementów DOM
  const dom = {
    teamSelectPanel: document.getElementById("team-select-panel"),
    surveyPanel: document.getElementById("survey-panel"),
    resultPanel: document.getElementById("result-panel"),

    // Wybór drużyny
    teamCardT: document.getElementById("choose-team-t"),
    teamCardCT: document.getElementById("choose-team-ct"),
    selectedTeamDisplay: document.getElementById("selected-team-display"),
    changeTeamBtn: document.getElementById("change-team-btn"),
    resultTeamBadge: document.getElementById("result-team-badge"),
    hiddenSideInput: document.getElementById("hidden-side-input"),

    // Formularz ankiety
    form: document.getElementById("diagnostic-form"),
    surveyProgressBadge: document.getElementById("survey-progress-badge"),
    primaryWeaponCard: document.getElementById("primary-weapon-container"),

    // Modal z informacjami
    openInfoBtn: document.getElementById("open-info-btn"),
    closeInfoBtn: document.getElementById("close-info-btn"),
    infoModal: document.getElementById("info-modal")
  };

  // Wybór drużyny
  function selectTeam(side) {
    appState.facts.side = side;
    if (dom.hiddenSideInput) {
      dom.hiddenSideInput.value = side;
    }

    // Motyw wizualny frakcji
    if (side === "T") {
      document.body.className = "theme-t";
      if (dom.selectedTeamDisplay) {
        dom.selectedTeamDisplay.innerHTML = `<span style="color: var(--cs-orange);">★ Terroryści (T)</span>`;
      }
      if (dom.resultTeamBadge) {
        dom.resultTeamBadge.className = "side-badge t";
        dom.resultTeamBadge.textContent = "Terroryści (T)";
      }
    } else {
      document.body.className = "theme-ct";
      if (dom.selectedTeamDisplay) {
        dom.selectedTeamDisplay.innerHTML = `<span style="color: var(--cs-blue);">🛡 Antyterroryści (CT)</span>`;
      }
      if (dom.resultTeamBadge) {
        dom.resultTeamBadge.className = "side-badge ct";
        dom.resultTeamBadge.textContent = "Antyterroryści (CT)";
      }
    }

    // Przejście z panelu wyboru drużyny do panelu ankiety
    if (dom.teamSelectPanel) dom.teamSelectPanel.style.display = "none";
    if (dom.resultPanel) dom.resultPanel.style.display = "none";
    if (dom.surveyPanel) dom.surveyPanel.style.display = "block";

    updateSurveyProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Powrót do wyboru drużyny
  function returnToTeamSelection() {
    if (appState.autoTransitionTimer) {
      clearTimeout(appState.autoTransitionTimer);
      appState.autoTransitionTimer = null;
    }

    // Reset motywu do domyślnego
    document.body.className = "";
    appState.facts.side = null;
    if (dom.hiddenSideInput) dom.hiddenSideInput.value = "";

    // Wyczyszczenie pytań ankiety
    if (dom.form) {
      dom.form.reset();
      const allRadios = dom.form.querySelectorAll('input[type="radio"]');
      allRadios.forEach(radio => {
        radio.checked = false;
      });
    }
    TACTICAL_QUESTION_KEYS.forEach(key => {
      appState.facts[key] = null;
    });

    // Pokazanie panelu wyboru drużyny
    if (dom.surveyPanel) dom.surveyPanel.style.display = "none";
    if (dom.resultPanel) dom.resultPanel.style.display = "none";
    if (dom.teamSelectPanel) dom.teamSelectPanel.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Pomocnicze sprawdzanie odpowiedzi w ankiecie
  function getAnsweredInfo() {
    const answeredKeys = [];
    const missingKeys = [];

    for (const key of TACTICAL_QUESTION_KEYS) {
      const checkedInput = dom.form.querySelector(`input[name="${key}"]:checked`);
      if (checkedInput && checkedInput.value) {
        answeredKeys.push(key);
      } else {
        missingKeys.push(key);
      }
    }

    const hasTeam = Boolean(appState.facts.side);

    return {
      count: answeredKeys.length,
      answeredKeys,
      missingKeys,
      hasTeam,
      allAnswered: hasTeam && (answeredKeys.length === TACTICAL_QUESTION_KEYS.length)
    };
  }

  // Spróbuj ponownie w ankiecie
  function retrySurvey() {
    if (appState.autoTransitionTimer) {
      clearTimeout(appState.autoTransitionTimer);
      appState.autoTransitionTimer = null;
    }

    // Reset pytań w ankiecie
    if (dom.form) {
      dom.form.reset();
      const allRadios = dom.form.querySelectorAll('input[type="radio"]');
      allRadios.forEach(radio => {
        radio.checked = false;
      });
    }

    TACTICAL_QUESTION_KEYS.forEach(key => {
      appState.facts[key] = null;
    });

    if (appState.facts.side === "CT") {
      document.body.className = "theme-ct";
    } else {
      document.body.className = "theme-t";
    }

    // Reset podświetleń i komunikatów
    document.querySelectorAll(".question-group").forEach(el => {
      el.classList.remove("unanswered-highlight");
    });

    if (dom.surveyProgressBadge) {
      dom.surveyProgressBadge.textContent = "Wypełniono: 0 / 5";
    }

    // Ukryj wynik, cofnij do ankiety
    if (dom.resultPanel) dom.resultPanel.style.display = "none";
    if (dom.teamSelectPanel) dom.teamSelectPanel.style.display = "none";
    if (dom.surveyPanel) dom.surveyPanel.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Resetowanie stanu przy odświeżeniu strony
  function resetAllOnRefresh() {
    if (appState.autoTransitionTimer) {
      clearTimeout(appState.autoTransitionTimer);
      appState.autoTransitionTimer = null;
    }

    if (dom.form) {
      dom.form.reset();
      const allRadios = dom.form.querySelectorAll('input[type="radio"]');
      allRadios.forEach(radio => {
        radio.checked = false;
      });
    }

    appState.facts.side = null;
    TACTICAL_QUESTION_KEYS.forEach(key => {
      appState.facts[key] = null;
    });

    if (dom.hiddenSideInput) {
      dom.hiddenSideInput.value = "";
    }

    // Domyślny motyw
    document.body.className = "";

    document.querySelectorAll(".question-group").forEach(el => {
      el.classList.remove("unanswered-highlight");
    });

    if (dom.surveyProgressBadge) {
      dom.surveyProgressBadge.textContent = "Wypełniono: 0 / 5";
    }

    if (dom.primaryWeaponCard) {
      dom.primaryWeaponCard.innerHTML = "";
    }

    // Stan na start
    if (dom.surveyPanel) dom.surveyPanel.style.display = "none";
    if (dom.resultPanel) dom.resultPanel.style.display = "none";
    if (dom.teamSelectPanel) dom.teamSelectPanel.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Aktualizacja postępu ankiety i obsługa zmian
  function updateSurveyProgress() {
    const { count, missingKeys, allAnswered } = getAnsweredInfo();

    if (dom.surveyProgressBadge) {
      dom.surveyProgressBadge.textContent = `Wypełniono: ${count} / 5`;
    }

    return { count, missingKeys, allAnswered };
  }

  function handleFormChange(event) {
    if (appState.autoTransitionTimer) {
      clearTimeout(appState.autoTransitionTimer);
      appState.autoTransitionTimer = null;
    }

    // Odczyt wartości
    const formData = new FormData(dom.form);
    for (const key of TACTICAL_QUESTION_KEYS) {
      appState.facts[key] = formData.get(key) || null;
    }

    // Usunięcie podświetlenia z grupy po odpowiedzi
    if (event && event.target) {
      const qGroup = event.target.closest(".question-group");
      if (qGroup) qGroup.classList.remove("unanswered-highlight");
    }

    const { allAnswered } = updateSurveyProgress();

    // Ankieta wypełniona = podmień panel 
    if (allAnswered) {
      appState.autoTransitionTimer = setTimeout(() => {
        completeSurveyAndShowResult();
      }, 250);
    }
  }

  // Wywołanie maszyny wnioskowania i podmiana panelu na wynik
  function completeSurveyAndShowResult() {
    if (appState.autoTransitionTimer) {
      clearTimeout(appState.autoTransitionTimer);
      appState.autoTransitionTimer = null;
    }

    const { hasTeam, allAnswered } = getAnsweredInfo();

    if (!hasTeam) {
      returnToTeamSelection();
      return;
    }

    if (!allAnswered) {
      return;
    }

    // Fakty z ankiety
    const formData = new FormData(dom.form);
    for (const key of TACTICAL_QUESTION_KEYS) {
      appState.facts[key] = formData.get(key);
    }

    // Wywołanie silnika wnioskowania w przód
    const result = inferenceEngine.run(appState.facts);
    renderPrimaryWeapon(result.primaryWeapon);

    // Podmienienie panelu ankiety na panel z wynikiem
    if (dom.surveyPanel) dom.surveyPanel.style.display = "none";
    if (dom.teamSelectPanel) dom.teamSelectPanel.style.display = "none";
    if (dom.resultPanel) dom.resultPanel.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Wyświetlanie pojedynczego wyniku
  function renderPrimaryWeapon(weapon) {
    if (!dom.primaryWeaponCard) return;

    if (!weapon) {
      dom.primaryWeaponCard.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">Brak dopasowania broni.</p>`;
      return;
    }

    dom.primaryWeaponCard.innerHTML = `
      <div class="primary-weapon-card">
        <div class="weapon-header">
          <div class="weapon-title-area">
            <span class="weapon-category-tag">${weapon.categoryName}</span>
            <h3 class="weapon-name">${weapon.name}</h3>
          </div>
          <div class="weapon-hud-icon-container">
            <img src="assets/weapon-icons/${weapon.id}.svg" alt="${weapon.name}" class="weapon-hud-icon" />
          </div>
        </div>

        <p class="weapon-desc">${weapon.description}</p>

        <!-- Statystyki broni -->
        <div class="weapon-stats-grid-4x2">
          <div class="stat-card-box">
            <span class="stat-card-label">Obrażenia</span>
            <span class="stat-card-val">${weapon.damage} DMG</span>
          </div>
          <div class="stat-card-box">
            <span class="stat-card-label">Headshot</span>
            <span class="stat-card-val">${weapon.headshotMultiplier || "4.0x"}</span>
          </div>
          <div class="stat-card-box">
            <span class="stat-card-label">Penetracja</span>
            <span class="stat-card-val">${weapon.armorPen}%</span>
          </div>
          <div class="stat-card-box">
            <span class="stat-card-label">Prędkość</span>
            <span class="stat-card-val">${weapon.fireRate} RPM</span>
          </div>
          <div class="stat-card-box">
            <span class="stat-card-label">Magazynek</span>
            <span class="stat-card-val">${weapon.magCapacity}</span>
          </div>
          <div class="stat-card-box">
            <span class="stat-card-label">Kontrola</span>
            <span class="stat-card-val">${weapon.recoilControl}</span>
          </div>
          <div class="stat-card-box">
            <span class="stat-card-label">Cena</span>
            <span class="stat-card-val">$${weapon.price}</span>
          </div>
          <div class="stat-card-box">
            <span class="stat-card-label">Nagroda</span>
            <span class="stat-card-val">+ $${weapon.killReward}</span>
          </div>
        </div>

        <!-- Model broni -->
        <div class="weapon-model-showcase">
          <img 
            src="assets/weapon-models/${weapon.id}.png" 
            alt="${weapon.name} Model" 
            class="weapon-model-img" 
            loading="lazy"
            onerror="this.parentElement.style.display='none'"
          />
        </div>

        <!-- Przycisk try again -->
        <div class="try-again-wrapper">
          <button id="try-again-btn" type="button" class="btn btn-primary btn-try-again">
            Spróbuj ponownie
          </button>
        </div>
      </div>
    `;

    // Kliknięcie spróbuj ponownie
    const tryAgainBtn = document.getElementById("try-again-btn");
    if (tryAgainBtn) {
      tryAgainBtn.addEventListener("click", () => {
        retrySurvey();
      });
    }
  }

  // Rejestracja zdarzeń
  function setupEventListeners() {
    // Wybór drużyny (T / CT)
    if (dom.teamCardT) {
      dom.teamCardT.addEventListener("click", () => selectTeam("T"));
    }
    if (dom.teamCardCT) {
      dom.teamCardCT.addEventListener("click", () => selectTeam("CT"));
    }

    // Przycisk zmiana drużyny na górnym pasku ankiety
    if (dom.changeTeamBtn) {
      dom.changeTeamBtn.addEventListener("click", () => returnToTeamSelection());
    }

    // Zmiana opcji w formularzu ankiety
    dom.form.addEventListener("change", (e) => {
      handleFormChange(e);
    });

    // Obsługa modala "Informacje"
    if (dom.openInfoBtn && dom.infoModal) {
      dom.openInfoBtn.addEventListener("click", () => {
        dom.infoModal.classList.add("active");
      });
    }

    if (dom.closeInfoBtn && dom.infoModal) {
      dom.closeInfoBtn.addEventListener("click", () => {
        dom.infoModal.classList.remove("active");
      });
    }

    if (dom.infoModal) {
      dom.infoModal.addEventListener("click", (e) => {
        if (e.target === dom.infoModal) {
          dom.infoModal.classList.remove("active");
        }
      });
    }

    // Zapewnienie czyszczenia po reloadzie
    window.addEventListener("pageshow", () => {
      resetAllOnRefresh();
    });
  }

  // Start aplikacji
  function init() {
    setupEventListeners();
    resetAllOnRefresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();