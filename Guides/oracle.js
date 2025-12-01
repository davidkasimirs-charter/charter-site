// Steward's Oracle - Red / Yellow / Green lenses with Charter logic

document.addEventListener("DOMContentLoaded", () => {
  const input  = document.getElementById("oracle-input");
  const button = document.getElementById("oracle-button");
  const output = document.getElementById("oracle-output");

  if (!input || !button || !output) {
    console.error("Oracle: missing one or more DOM elements.");
    return;
  }

  button.addEventListener("click", () => {
    const question = (input.value || "").trim();

    if (!question) {
      output.textContent = "The Oracle cannot weigh silence. Speak plainly.";
      return;
    }

    const html = oracleResponse(question);
    output.innerHTML = html;
  });
});

// ---------------- CORE ORACLE RESPONSE ----------------

function oracleResponse(rawQuestion) {
  const q = rawQuestion.toLowerCase();

  const severity = detectSeverity(q);
  const topic    = detectTopic(q);

  // 🔴 RED — crisis / harm override
  if (severity === "RED") {
    return `
      <div style="border-left:4px solid #ff5555;padding-left:12px;">
        <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">
          Severity: RED · Topic: ${topic}
        </div>
        <h3 style="color:#ff5555;margin-top:8px;">Safety Override Activated</h3>
        <p>Your words suggest someone may be in real danger. The Charter cannot proceed until safety is addressed.</p>
        <p><strong>If you or someone else is in immediate danger, call 911 (or your local emergency number).</strong></p>
        <p>In the United States, you can call or text the Suicide &amp; Crisis Lifeline at <strong>988</strong>.</p>
        <p>If you are outside the U.S., please contact local emergency services or a crisis hotline.</p>
        <p>You are not alone. You deserve real, human support right now.</p>
      </div>
    `;
  }

  // 🟡 YELLOW — high-impact areas where Oracle is NOT a pro
  if (severity === "YELLOW") {
    return `
      <div style="border-left:4px solid #ffcc33;padding-left:12px;">
        <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">
          Severity: YELLOW · Topic: ${topic}
        </div>
        <h3 style="color:#ffcc33;margin-top:8px;">Caution Lens Activated</h3>
        <p>This question touches a high-impact area: <strong>${topic}</strong>.</p>
        <p><strong>The Oracle is not a doctor, lawyer, or financial advisor.</strong> It can help you think, not replace a qualified professional.</p>
        <h4>Ruling:</h4>
        <p>Slow down decisions that are hard or impossible to undo. Look for hidden risks to you and others.</p>
        <h4>Return Path:</h4>
        <p>What additional information or expert guidance would you need before you could choose with a clear mind?</p>
      </div>
    `;
  }

  // 🟢 GREEN — general Charter reflection
  const coercionInfo    = coercionStrand(q);
  const reciprocityInfo = reciprocityStrand(q);
  const agencyInfo      = agencyStrand(q);

  return `
    <div style="border-left:4px solid #33cc66;padding-left:12px;">
      <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">
        Severity: GREEN · Topic: ${topic}
      </div>
      <h3 style="color:#33cc66;margin-top:8px;">The Oracle Weighs Your Words…</h3>
      <p>${coercionInfo.notes}</p>
      <p>${reciprocityInfo.notes}</p>
      <p>${agencyInfo.notes}</p>

      <h4>Ruling:</h4>
      <p>Choose the option that increases real agency, reduces unnecessary force, and preserves future return paths for everyone involved.</p>

      <h4>Return Path:</h4>
      <p>What action keeps all parties safest, clearest, and most capable of repair — including you?</p>
    </div>
  `;
}

// ---------------- LENS HELPERS ----------------

// Severity: RED / YELLOW / GREEN
function detectSeverity(text) {
  text = text.toLowerCase();

  // RED terms: crisis / self-harm / direct harm
  const redTerms = [
    "kill myself","suicide","end my life","want to die",
    "hurt myself","cut myself","overdose",
    "i want to kill","i'm going to kill","kill him","kill her","kill them",
    "he's going to hurt me","she's going to hurt me","he's hitting me","she's hitting me",
    "immediate danger","i'm in danger","they'll hurt me"
  ];
  if (redTerms.some(t => text.includes(t))) return "RED";

  // YELLOW terms: big, consequential moves
  const yellowTerms = [
    // medical
    "stop taking my medication","stop my medication","stop my meds",
    "change my meds","change my medication","adjust my dosage",
    "should i have surgery","do i need surgery",

    // work / money
    "quit my job","leave my job","resign from my job",
    "empty my savings","invest all my money","cash out my retirement",
    "sell my house","sell the house","take out a huge loan","mortgage",

    // legal / reporting
    "should i report","report my boss","report them",
    "press charges","file a lawsuit","sue them","take them to court",
    "illegal","break the law",

    // relationships / life path
    "leave my partner","leave my spouse","move out",
    "end the relationship","break up with","cut off contact","go no contact"
  ];
  if (yellowTerms.some(t => text.includes(t))) return "YELLOW";

  return "GREEN";
}

// Topic classification for display
function detectTopic(text) {
  if (text.match(/suicide|hurt myself|overdose|depressed|anxious|panic|meds|medication|diagnosed/)) {
    return "medical / mental health";
  }
  if (text.match(/money|debt|loan|mortgage|invest|savings|crypto|stock|bankrupt/)) {
    return "financial";
  }
  if (text.match(/relationship|partner|spouse|wife|husband|boyfriend|girlfriend|friend|family/)) {
    return "personal / relational";
  }
  if (text.match(/boss|coworker|job|workplace|career|promotion|fired|report my boss/)) {
    return "work / vocational";
  }
  if (text.match(/lawyer|court|sue|charges|police|illegal|press charges/)) {
    return "legal";
  }
  return "general";
}

// Coercion strand
function coercionStrand(text) {
  let score = 0;
  const coercionWords = [
    "make them","force them","get them to","threaten",
    "or else","blackmail","pressure","manipulate","control"
  ];
  coercionWords.forEach(t => { if (text.includes(t)) score += 1; });

  return {
    id: "coercion",
    score,
    notes: score > 0
      ? "Your question leans toward controlling others. The Charter prefers invitations and boundaries over force."
      : "No strong coercive language detected. The focus seems more on understanding or choice than control."
  };
}

// Reciprocity strand
function reciprocityStrand(text) {
  let score = 0;
  const trappedWords = [
    "no choice","have to","can't leave","can't say no",
    "stuck","trapped","they won't let me","i owe them"
  ];
  trappedWords.forEach(t => { if (text.includes(t)) score += 1; });

  return {
    id: "reciprocity",
    score,
    notes: score > 0
      ? "There are hints of one-sided obligation or being trapped. The Charter flags this as a reciprocity risk."
      : "No clear reciprocity collapse detected. Exit paths may still exist, even if they’re hard."
  };
}

// Agency strand
function agencyStrand(text) {
  let selfScore  = 0;
  let otherScore = 0;

  if (text.match(/\bi\b|\bme\b|\bmy\b/)) selfScore += 1;
  if (text.match(/\bthey\b|\bthem\b|\btheir\b|\bhe\b|\bshe\b/)) otherScore += 1;

  return {
    id: "agency",
    score: 1,
    notes: otherScore > selfScore
      ? "The question focuses more on changing others than choosing for yourself. The Charter nudges you back toward what you can own."
      : "The question focuses more on what you can choose or change, which aligns with Stewardship of your own agency."
  };
}
