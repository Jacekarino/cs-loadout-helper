(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./knowledgeBase.js'));
  } else {
    root.CS2_Engine = factory(root.CS2_KB);
  }
}(typeof self !== 'undefined' ? self : this, function (KB) {

  // Domyślne bronie awaryjne jeśli żadna nie pasuje
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

    // Uruchomienie wnioskowania w przód
    run(facts) {
      if (!this.kb || !this.kb.RULES || !this.kb.WEAPONS) {
        throw new Error("Baza wiedzy nie została poprawnie załadowana.");
      }

      const side = facts.side || "T";
      const budget = facts.round_economy || "full";

      const matchedCandidates = [];

      // Przegląd reguł (IF... THEN...)
      for (const rule of this.kb.RULES) {
        // 1. Zgodność frakcyjna
        if (rule.conditions.side && rule.conditions.side !== side) {
          continue;
        }

        // 2. Zgodność budżetowa
        let budgetScore = 0;
        if (rule.conditions.round_economy === budget) {
          budgetScore = 10;
        } else if (budget === "rich" && rule.conditions.round_economy === "full") {
          budgetScore = 4;
        } else {
          continue;
        }

        // 3. Weryfikacja faktów
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

        // 4. Kara za ewentualne sprzeczności
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
