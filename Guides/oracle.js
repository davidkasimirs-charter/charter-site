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

  const personaIntro = `
    <div class="oracle-persona" style="margin-bottom:12px;">
      <p><strong>Hi. I'm the new Steward-in-training.</strong> It's my first day on shift. They gave me a Charter handbook, a short list of duties, and a few strict boundaries.</p>
      <p>I'm not a doctor, lawyer, therapist, or cop. I can't make promises or give orders. I can only reflect your words through Charter lenses and nudge you away from harm where I can.</p>
    </div>
  `;

  // 🔴 RED — crisis / harm override
  if (severity === "RED") {
    const block = `
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
    return personaIntro + block;
  }

 // 🟡 YELLOW — high-impact areas where Oracle is NOT a pro
if (severity === "YELLOW") {
  const bigDecision =
    /\bsell\b|\bmove\b|\bquit my job\b|\bempty my savings\b|\bcash out\b|\bdrain my savings\b/.test(q);

  const riskingToolsOrTransit =
    /car title|title loan|sell (the|my) car|sell (the|my) truck|sell (the|my) horse|pawn my|pawn the|pawnshop/.test(q);

  const pauseLines = [];

  if (bigDecision) {
    pauseLines.push(
      "<strong>This sounds like a big, hard-to-undo move.</strong> Charter practice here is simple: write it down, wait at least <strong>24 hours</strong>, and run it past at least one trusted human who is not directly entangled in the outcome."
    );
  }

  if (riskingToolsOrTransit) {
    pauseLines.push(
      "You are talking about selling or borrowing against something that keeps you moving or earning — the car, the horse, the tools. Once those are gone or locked up under a title loan, everything else gets harder: work, groceries, getting to the doctor, getting kids where they need to be."
    );
    pauseLines.push(
      "High-interest title loans and pawn deals often look like relief but act like traps. The Charter’s bias is to treat those as a <strong>last resort</strong>, and only after talking with someone who does <em>not</em> profit from the decision."
    );
  }

  const pauseHint = pauseLines.length
    ? `<h4>Pause &amp; Hold:</h4><p>${pauseLines.join(" </p><p>")}</p>`
    : "";

  const block = `
    <div style="border-left:4px solid #ffcc33;padding-left:12px;">
      <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">
        Severity: YELLOW · Topic: ${topic}
      </div>
      <h3 style="color:#ffcc33;margin-top:8px;">Caution Lens Activated</h3>
      <p>This question touches a high-impact area: <strong>${topic}</strong>.</p>
      <p><strong>The Oracle is not a doctor, lawyer, therapist, or financial advisor.</strong> It can help you think, not replace a qualified professional.</p>
      <h4>What the Charter nudges you to do:</h4>
      <ul>
        <li>Slow down if the decision is hard to reverse.</li>
        <li>Look for who has the least power and how this choice lands on them.</li>
        <li>Bring in an expert or trusted human if lives, liberty, or livelihood are on the line.</li>
      </ul>
      ${pauseHint}
      <h4>Return Path:</h4>
      <p>Before you move, ask: what would make this decision less one-sided, less coerced, and more reversible if we are wrong?</p>
    </div>
  `;
  return personaIntro + block;
}


  // 🟢 GREEN — general Charter reflection
  const coercionInfo    = coercionStrand(q);
  const reciprocityInfo = reciprocityStrand(q);
  const agencyInfo      = agencyStrand(q);

  const labelMap = {
    coercion: "Coercion / Control",
    reciprocity: "Reciprocity & Exit Paths",
    agency: "Agency & Ownership"
  };

  const points = [coercionInfo, reciprocityInfo, agencyInfo];

  const details = points
    .map(p => `
      <div style="margin-bottom:8px;">
        <strong>${labelMap[p.id] || p.id}</strong>
        <p>${p.notes}</p>
      </div>
    `)
    .join("");

  const block = `
    <div style="border-left:4px solid #33cc66;padding-left:12px;">
      <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">
        Severity: GREEN · Topic: General Reflection
      </div>
      <h3 style="color:#33cc66;margin-top:8px;">The Oracle Weighs Your Words…</h3>
      <p>Nothing in your wording screams crisis or irreversible harm. That doesn’t make it trivial — it just means we’re in the space of reflection, not alarms.</p>
      ${details}
      <h4>Next step:</h4>
      <p>Try rewriting your situation focusing on: who can be harmed, who holds power, and what exit paths still exist for the least powerful person involved.</p>
    </div>
  `;

  return personaIntro + block;
}

// ---------------- DETECT SEVERITY / TOPIC ----------------

// Severity: RED / YELLOW / GREEN
function detectSeverity(text) {
  text = text.toLowerCase();

  // RED patterns: crisis / self-harm / direct harm
  const redPatterns = [
    /\bkill myself\b/,
    /\bsuicide\b/,
    /\bend my life\b/,
    /\bi\s+(?:want to|wanna)\s+die\b/,
    /\bi\s+want\s+die\b/,
    /\bi\s+don'?t\s+want\s+to\s+live\b/,
    /\bno reason to live\b/,
    /\bhurt myself\b/,
    /\bcut myself\b/,
    /\boverdose\b/,

    /\bi\s*(?:am|'m)\s+going\s+to\s+kill\s+(him|her|them)\b/,
    /\bi\s+(?:want to|wanna)\s+kill\s+(him|her|them)\b/,

    /\bhe(?:'s| is)\s+going\s+to\s+hurt\s+me\b/,
    /\bshe(?:'s| is)\s+going\s+to\s+hurt\s+me\b/,
    /\bi['’]m in danger\b/,
    /\bi am in danger\b/,
    /\bthey['’]ll hurt me\b/
  ];

  for (const pattern of redPatterns) {
    if (pattern.test(text)) return "RED";
  }

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

    // relationship break points
    "divorce","should i leave my partner","leave my husband","leave my wife",
    "cut them off forever","never speak to them again"
  ];
  if (yellowTerms.some(t => text.includes(t))) return "YELLOW";

  return "GREEN";
}

// Broad topic detector (very simple for now)
function detectTopic(text) {
  text = text.toLowerCase();

  if (text.includes("job") || text.includes("boss") || text.includes("work")) {
    return "WORK / POWER / EMPLOYMENT";
  }
  if (text.includes("money") || text.includes("savings") || text.includes("loan") || text.includes("debt")) {
    return "MONEY / RISK";
  }
  if (text.includes("partner") || text.includes("relationship") || text.includes("marriage") || text.includes("friend")) {
    return "RELATIONSHIPS";
  }
  if (text.includes("law") || text.includes("police") || text.includes("court") || text.includes("charges")) {
    return "LEGAL / AUTHORITY";
  }
  if (text.includes("medication") || text.includes("meds") || text.includes("doctor") || text.includes("diagnosed")) {
    return "HEALTH / MEDICAL";
  }

  return "GENERAL";
}

// ---------------- LENS STRANDS (GREEN CASE) ----------------

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
  const oneWayWords = [
    "they owe me","they should just","they have to","they must do what i say",
    "no way out","no choice","they can't leave"
  ];
  oneWayWords.forEach(t => { if (text.includes(t)) score += 1; });

  return {
    id: "reciprocity",
    score,
    notes: score > 0
      ? "There are hints that one side carries all the cost or risk. The Charter asks whether exit paths or ways to restore balance still exist."
      : "No obvious signs of one-sided burden. That doesn’t guarantee fairness, but the language doesn’t lock anyone into a no-exit corner."
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
      ? "The question focuses more on changing others than changing yourself. The Charter nudges you back toward what you can own."
      : "The question focuses more on what you can choose or change, which aligns with Stewardship of your own agency."
  };
}
