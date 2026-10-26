/**
 * CS2 LOADOUT EXPERT SYSTEM - PROSTA MASZYNA WNIOSKOWANIA (INFERENCE ENGINE)
 * 
 * Klasyczny silnik regułowy dla studentów (przedmiot: Metody Sztucznej Inteligencji):
 * 1. Pamięć Robocza (Working Memory) - przechowuje fakty wybrane w ankiecie.
 * 2. Logika IF... THEN... - weryfikacja przesłanek reguł produkcyjnych (Forward Chaining).
 * 3. Zwraca wyłącznie JEDEN, najbardziej pasujący wynik (rekomendowaną broń).
 * 4. Respektuje poziom budżetu (nigdy nie zaleca pistoletów startowych przy dużych funduszach).
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./knowledgeBase.js'));
  } else {
    root.CS2_Engine = factory(root.CS2_KB);
  }
}(typeof self !== 'undefined' ? self : this, function (KB) {

  // Domyślne bronie awaryjne dopasowane do frakcji i poziomu budżetu
  const FALLBACK_WEAPONS = {
    rich: { T: "ak47", CT: "m4a1s" },
    full: { T: "ak47", CT: "m4a1s" },
    semi: { T: "galilar", CT: "famas" },
    force: { T: "mac10", CT: "mp9" },
    eco: { T: "glock", CT: "usp" }
  };

  class SimpleInferenceEngine {
    constructor(knowledgeBase = KB) {
      this.kb = knowledgeBase;
    }

    /**
     * Główny punkt wejścia wnioskowania w przód (Forward Chaining).
     * Zwraca wyłącznie JEDEN, najbardziej optymalny wynik.
     * 
     * @param {Object} facts - Odpowiedzi użytkownika z ankiety
     * @returns {Object} Obiekt z pojedynczą rekomendowaną bronią
     */
    run(facts) {
      if (!this.kb || !this.kb.RULES || !this.kb.WEAPONS) {
        throw new Error("Baza wiedzy nie została poprawnie załadowana.");
      }

      const side = facts.side || "T";
      const budget = facts.round_economy || "full";

      const matchedCandidates = [];

      // Przegląd reguł produkcyjnych (IF... THEN...)
      for (const rule of this.kb.RULES) {
        // 1. Zgodność frakcyjna (T, CT lub obie frakcje)
        if (rule.conditions.side && rule.conditions.side !== side) {
          continue;
        }

        // 2. Ścisła zgodność budżetowa (brak absurdalnych zaleceń eco przy dużym budżecie)
        let budgetScore = 0;
        if (rule.conditions.round_economy === budget) {
          budgetScore = 10;
        } else if (budget === "rich" && rule.conditions.round_economy === "full") {
          budgetScore = 4; // przy bogatym budżecie dopuszczamy karabiny/AWP z full-buy
        } else {
          continue;
        }

        // 3. Weryfikacja przesłanek taktycznych (rola w rundzie, cechy broni, styl gry, dystans)
        let matchScore = budgetScore;
        let hasConflict = false;

        for (const [key, val] of Object.entries(rule.conditions)) {
          if (key === "side" || key === "round_economy") continue;
          if (facts[key] === val) {
            matchScore += 3;
          } else if (facts[key] !== undefined) {
            hasConflict = true;
          }
        }

        // Kara za sprzeczność przesłanki, aby dokładne dopasowanie zawsze wygrywało
        if (hasConflict) {
          matchScore -= 5;
        }

        matchedCandidates.push({
          rule,
          score: matchScore
        });
      }

      // Wybór najlepiej dopasowanej reguły
      let selectedWeaponId = null;
      let matchedRule = null;

      if (matchedCandidates.length > 0) {
        matchedCandidates.sort((a, b) => b.score - a.score);
        matchedRule = matchedCandidates[0].rule;
        selectedWeaponId = matchedRule.conclusion.primaryWeaponId;
      } else {
        selectedWeaponId = FALLBACK_WEAPONS[budget] ? FALLBACK_WEAPONS[budget][side] : "ak47";
      }

      const primaryWeapon = this.kb.WEAPONS[selectedWeaponId];

      return {
        success: true,
        primaryWeapon,
        matchedRule
      };
    }
  }

  return {
    ForwardChainingEngine: SimpleInferenceEngine,
    createEngine: (kb) => new SimpleInferenceEngine(kb || KB)
  };
}));
