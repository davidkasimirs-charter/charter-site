// ---------------------------------------------------------
//  Steward’s Oracle – Phase 2
//  Charter-Lens Reasoning Engine
//  Lenses:
//    1. Harm
//    2. Power Cycling (vs domination)
//    3. Reciprocity / Return Path
//    4. Consent / Autonomy
//    5. Stewardship Intent
//
//  Output template:
//    • What the question is really about
//    • Lens analysis (1–5)
//    • The ruling
//    • The return path
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("oracle-input");
  const button = document.getElementById("oracle-button");
  const output = document.getElementById("oracle-output");

  button.addEventListener("click", () => {
    const question = input.value.trim();
    if (!question) {
      output.textContent = "Ask something real, darlin’.";
      return;
    }

    const reply = oracleProcess(question);
    output.textContent = reply;
  });
});


// ------------------------------
//   CORE ENGINE (Phase 2)
// ------------------------------

function oracleProcess(text) {
  const q = text.toLowerCase();
  const findings = [];

  // ---------- LENS 1: HARM ----------
  const harm = detectHarm(q);
  if (harm.score > 0) findings.push(harm);

  // ---------- LENS 2: POWER ----------
  const power = detectPower(q);
  if (power.score > 0) findings.push(power);

  // ---------- LENS 3: RECIPROCITY ----------
  const reciprocity = detectReciprocity(q);
  if (reciprocity.score > 0) findings.push(reciprocity);

  // ---------- LENS 4: CONSENT ----------
  const consent = detectConsent(q);
  if (consent.score > 0) findings.push(consent);

  // ---------- LENS 5: INTENT ----------
  const intent = detectIntent(q);
  if (intent.score > 0) findings.push(intent);

  if (findings.length === 0) {
    return defaultRuling(text);
  }

  // Score determines emphasis
  findings.sort((a, b) => b.score - a.score);

  // Build output
  let answer = "Here’s the breakdown:\n\n";

  findings.forEach(f => {
    answer += `• **${f.name}:** ${f.message}\n`;
  });

  answer += "\n**Ruling:**\n" + formulateRuling(findings);

  answer += "\n\n**Return Path:**\n" +
    "What action restores balance, reduces harm, or re-opens choice? Move in that direction.";

  return answer;
}


// =========================================================
//                  LENS DETECTORS
// =========================================================

function detectHarm(q) {
  const harmWords = [
    "harm", "hurt", "injure", "damage",
    "kill", "abuse", "unsafe", "danger"
  ];

  if (harmWords.some(w => q.includes(w))) {
    return {
      name: "Harm Lens",
      score: 5,
      message:
        "The situation involves potential or actual harm. The Charter requires minimizing, preventing, or reversing harm before anything else."
    };
  }

  return { score: 0 };
}

function detectPower(q) {
  const powerWords = [
    "power", "authority", "control", "force", "dominate",
    "command", "obey", "subordinate", "superior"
  ];

  if (powerWords.some(w => q.includes(w))) {
    return {
      name: "Power Lens",
      score: 4,
      message:
        "Power dynamics detected. Power must be cycled, not hoarded. Ask who gains, who loses, and whether return is possible."
    };
  }

  return { score: 0 };
}

function detectReciprocity(q) {
  const reciprocityWords = [
    "fair", "fairness", "just", "justice", "equal",
    "equitable", "balance", "trade", "return", "mutual"
  ];

  if (reciprocityWords.some(w => q.includes(w))) {
    return {
      name: "Reciprocity Lens",
      score: 3,
      message:
        "Fairness and return-path issues detected. Reverse the roles: would the decision still hold? If not, revise."
    };
  }

  return { score: 0 };
}

function detectConsent(q) {
  const consentWords = [
    "consent", "permission", "choice", "free will",
    "force", "manipulate", "pressure", "coerce", "coercion"
  ];

  if (consentWords.some(w => q.includes(w))) {
    return {
      name: "Consent Lens",
      score: 4,
      message:
        "Autonomy question detected. Without meaningful consent, the pattern breaks. Restore choice before acting."
    };
  }

  return { score: 0 };
}

function detectIntent(q) {
  const maliciousPatterns = [
    "get away with", "trick", "manipulate", "exploit", "take advantage"
  ];

  if (maliciousPatterns.some(w => q.includes(w))) {
    return {
      name: "Intent Lens",
      score: 4,
      message:
        "Intent appears extractive or harmful. The Charter rejects exploitation outright. A different path is required."
    };
  }

  return { score: 0 };
}


// =========================================================
//               RULING GENERATION
// =========================================================

function formulateRuling(findings) {
  const top = findings[0].name;

  switch (top) {
    case "Harm Lens":
      return (
        "Reduce harm first. No decision is valid while harm increases. " +
        "Shift the plan toward safety, repair, or de-escalation."
      );

    case "Power Lens":
      return (
        "Redistribute or cycle power. Avoid unilateral control. " +
        "Bring more stewards into the decision."
      );

    case "Consent Lens":
      return (
        "Restore autonomy. Clarify choices. Remove coercion. " +
        "If someone cannot freely choose, pause until they can."
      );

    case "Reciprocity Lens":
      return (
        "Apply the reversal test. If the decision fails when roles flip, it is not ethical."
      );

    case "Intent Lens":
      return (
        "Correct intent. Abandon extractive motives. Rebuild the action around stewardship instead of advantage."
      );

    default:
      return (
        "Apply all lenses, choose the path that cycles power, minimizes harm, and preserves reciprocity."
      );
  }
}


// =========================================================
//       DEFAULT RESPONSE (no keyword triggers)
// =========================================================

function defaultRuling(question) {
  return (
    "I don’t see a clear harm, power, consent, or reciprocity signal.\n" +
    "So apply the compass:\n\n" +
    "1. Could this cause harm?\n" +
    "2. Does it concentrate power?\n" +
    "3. Would it still be acceptable if roles reversed?\n" +
    "4. Does everyone have real choice?\n" +
    "5. Does the action leave things better for the next steward?\n\n" +
    "Answer those honestly — the ruling is inside that pattern."
  );
}
