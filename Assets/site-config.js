// Assets/site-config.js

// --- Global nav links ---
export const NAV_LINKS = [
    { id: "home",     label: "Home",            href: "/index.html" },
{ id: "core",     label: "Core Charter",    href: "/Charter/CharterCoreV13.html" },
{ id: "grove",    label: "Grove Intro",     href: "/Charter/grove_intro.html" },
{ id: "guides",   label: "Steward Guides",  href: "/Guides/guides.html" },
{ id: "appendix", label: "Appendices",      href: "/Appendices/appendices.html" },
];

// --- Home page cards ---
export const HOME_CARDS = [
    {
        id: "start",
        title: "1. Start Here – Learner’s Path",
        body: [
            "A gentle on-ramp into Charter logic, language, and mindset.",
            "Designed for first-time readers, curious allies, and future Stewards."
        ],
        primaryLink: {
            href: "/Guides/Learners_Path_v1.0.pdf",
            label: "Open Learner’s Path (v1.0)"
        },
        note: "Best first stop for new readers."
    },
{
    id: "core",
    title: "2. Core Charter – Root Text",
    body: [
        "The main Charter document: definitions, principles, and root clauses.",
        "Use this when you want the ‘constitution’ itself, not the commentary."
    ],
    primaryLink: {
        href: "/Charter/CharterCoreV13.html",
        label: "Read Core Charter (v1.3 HTML)"
    },
    secondaryLinks: [
        {
            href: "/PDF and TXT/Charter 1.3.pdf",
            label: "Download Charter 1.3 (PDF)"
        }
    ]
},
{
    id: "field",
    title: "3. Field Manual – Applied Use",
    body: [
        "Operational checklists and ‘in the wild’ patterns.",
        "Harm arcs, MNA checks, and real-world stewarding tools."
    ],
    primaryLink: {
        href: "/Guides/Field_Manual_v1.0.pdf",
        label: "Open Field Manual (v1.0)"
    }
},
{
    id: "cases",
    title: "4. Case Anthology – Examples",
    body: [
        "Narrative cases and conflict patterns to study and replay.",
        "Use this when you want ‘how did this work’ stories."
    ],
    primaryLink: {
        href: "/Guides/Case_Anthology_v1.0.pdf",
        label: "Open Case Anthology (v1.0)"
    }
},
{
    id: "appendices",
    title: "5. Appendices – Deep Dives",
    body: [
        "Extra scrolls, cultural notes, and extended tools.",
        "Good for specialized contexts or edge scenarios."
    ],
    primaryLink: {
        href: "/Appendices/appendices.html",
        label: "Browse Appendices"
    }
},
{
    id: "integrity",
    title: "6. Integrity & Hashes",
    body: [
        "Verification and tamper-evidence.",
        "Use this when checking that PDF/HTML copies match the current Charter release."
    ],
    primaryLink: {
        href: "/Guides/CSSEC_AddendumKit_v1.1.0_Tamper_Label.txt",
        label: "Open Addendum / Tamper Label"
    }
}
];
