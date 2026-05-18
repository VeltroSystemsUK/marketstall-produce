"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Palette, Type, RotateCcw, Pencil } from "lucide-react";

const TOKEN = process.env.NEXT_PUBLIC_DEMO_TOKEN ?? "veltrodemo";
const STORAGE_KEY = "veltro-demo-v1";

// ── Colour themes ─────────────────────────────────────────────────────────────
const THEMES = [
  {
    id: "earth",
    label: "Artisan Warm",
    dot: "#d48430",
    gradient:
      "rgba(124,64,29,0.92) 0%, rgba(154,81,30,0.74) 50%, rgba(241,112,41,0.38) 100%",
    vars: {
      "--color-forest-50": "#fdf8ef",
      "--color-forest-100": "#faefd7",
      "--color-forest-300": "#ecbe7c",
      "--color-forest-700": "#9a511e",
      "--color-forest-800": "#7c401d",
      "--color-forest-950": "#381b0c",
      "--color-harvest-400": "#f6924b",
      "--color-harvest-500": "#f17029",
      "--color-harvest-600": "#e45419",
      "--color-cream": "#fdf6ec",
      "--color-earth-50": "#fdf6f0",
    },
  },
  {
    id: "forest",
    label: "Heritage Green",
    dot: "#2d8a4a",
    gradient:
      "rgba(14,60,30,0.92) 0%, rgba(30,90,50,0.74) 50%, rgba(45,138,74,0.38) 100%",
    vars: {
      "--color-forest-50": "#f0f7f1",
      "--color-forest-100": "#d6f0de",
      "--color-forest-300": "#7ac898",
      "--color-forest-700": "#1e6e42",
      "--color-forest-800": "#145030",
      "--color-forest-950": "#072415",
      "--color-harvest-400": "#6ab87c",
      "--color-harvest-500": "#2d8a4a",
      "--color-harvest-600": "#1e6e42",
      "--color-cream": "#f0f7f1",
      "--color-earth-50": "#e8f5ee",
    },
  },
  {
    id: "ocean",
    label: "Ocean Blue",
    dot: "#2980b9",
    gradient:
      "rgba(13,58,92,0.92) 0%, rgba(26,88,138,0.74) 50%, rgba(41,128,185,0.38) 100%",
    vars: {
      "--color-forest-50": "#f0f6fc",
      "--color-forest-100": "#cce0f5",
      "--color-forest-300": "#7ab8e0",
      "--color-forest-700": "#1a5c8a",
      "--color-forest-800": "#0d3a5c",
      "--color-forest-950": "#061e30",
      "--color-harvest-400": "#5dade2",
      "--color-harvest-500": "#2980b9",
      "--color-harvest-600": "#1f6491",
      "--color-cream": "#f0f6fc",
      "--color-earth-50": "#e8f2fc",
    },
  },
  {
    id: "berry",
    label: "Wild Berry",
    dot: "#9b59b6",
    gradient:
      "rgba(64,18,86,0.92) 0%, rgba(91,44,111,0.74) 50%, rgba(155,89,182,0.38) 100%",
    vars: {
      "--color-forest-50": "#f9f0ff",
      "--color-forest-100": "#eedcff",
      "--color-forest-300": "#c690e8",
      "--color-forest-700": "#7d3c98",
      "--color-forest-800": "#5b2c6f",
      "--color-forest-950": "#2c1254",
      "--color-harvest-400": "#c39bd3",
      "--color-harvest-500": "#9b59b6",
      "--color-harvest-600": "#7d3c98",
      "--color-cream": "#fdf8ff",
      "--color-earth-50": "#f5e8ff",
    },
  },
  {
    id: "midnight",
    label: "Midnight Gold",
    dot: "#c9a227",
    gradient:
      "rgba(10,10,10,0.94) 0%, rgba(26,26,26,0.78) 50%, rgba(201,162,39,0.30) 100%",
    vars: {
      "--color-forest-50": "#f5f5f5",
      "--color-forest-100": "#e8e8e8",
      "--color-forest-300": "#a0a0a0",
      "--color-forest-700": "#2e2e2e",
      "--color-forest-800": "#1a1a1a",
      "--color-forest-950": "#0a0a0a",
      "--color-harvest-400": "#d4a830",
      "--color-harvest-500": "#c9a227",
      "--color-harvest-600": "#a88320",
      "--color-cream": "#f8f6f0",
      "--color-earth-50": "#f2f0e8",
    },
  },
];

// ── Font pairs ────────────────────────────────────────────────────────────────
const FONTS = [
  {
    id: "classic",
    label: "Classic",
    preview: "Aa",
    display: "var(--font-libre-baskerville), Georgia, serif",
    body: "var(--font-source-sans-3), system-ui, sans-serif",
  },
  {
    id: "elegant",
    label: "Elegant",
    preview: "Aa",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@400;700&display=swap",
    display: "'Cormorant Garamond', Palatino, serif",
    body: "'Lato', system-ui, sans-serif",
  },
  {
    id: "modern",
    label: "Modern",
    preview: "Aa",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap",
    display: "'Outfit', system-ui, sans-serif",
    body: "'Outfit', system-ui, sans-serif",
  },
  {
    id: "rustic",
    label: "Rustic",
    preview: "Aa",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700&display=swap",
    display: "'Playfair Display', Georgia, serif",
    body: "'Nunito', system-ui, sans-serif",
  },
];

// ── Saved state type ──────────────────────────────────────────────────────────
type Saved = {
  themeId: string;
  fontId: string;
  texts: Record<string, string>;
};

function load(): Saved {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {} as Saved;
  }
}

function save(data: Partial<Saved>) {
  const current = load();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...data }));
}

// ── Apply helpers ─────────────────────────────────────────────────────────────
function applyTheme(themeId: string) {
  const theme = THEMES.find((t) => t.id === themeId);
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  document.querySelectorAll<HTMLElement>(".gradient-hero").forEach((el) => {
    el.style.background = `linear-gradient(160deg, ${theme.gradient})`;
  });
}

function applyFont(fontId: string) {
  const font = FONTS.find((f) => f.id === fontId);
  if (!font) return;
  const root = document.documentElement;
  root.style.setProperty("--font-display", font.display);
  root.style.setProperty("--font-sans", font.body);

  if (font.googleUrl && !document.getElementById(`gf-${fontId}`)) {
    const link = document.createElement("link");
    link.id = `gf-${fontId}`;
    link.rel = "stylesheet";
    link.href = font.googleUrl;
    document.head.appendChild(link);
  }
}

function applyTexts(texts: Record<string, string>) {
  Object.entries(texts).forEach(([key, html]) => {
    const el = document.querySelector<HTMLElement>(`[data-demo-edit="${key}"]`);
    if (el) el.innerHTML = html;
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DemoEditor() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [panel, setPanel] = useState<"theme" | "font" | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [themeId, setThemeId] = useState("earth");
  const [fontId, setFontId] = useState("classic");
  const blurRefs = useRef<Map<string, () => void>>(new Map());

  // Activate on ?dm=TOKEN
  useEffect(() => {
    if (searchParams.get("dm") === TOKEN) setActive(true);
  }, [searchParams]);

  // Load and apply saved state on activation
  useEffect(() => {
    if (!active) return;
    const s = load();
    if (s.themeId) {
      setThemeId(s.themeId);
      applyTheme(s.themeId);
    }
    if (s.fontId) {
      setFontId(s.fontId);
      applyFont(s.fontId);
    }
    if (s.texts) applyTexts(s.texts);
  }, [active]);

  // Attach / detach contentEditable on editMode toggle
  useEffect(() => {
    if (!active) return;
    const els = document.querySelectorAll<HTMLElement>("[data-demo-edit]");

    if (editMode) {
      els.forEach((el) => {
        el.contentEditable = "plaintext-only";
        el.style.cursor = "text";
        el.classList.add("demo-editable");

        const onBlur = () => {
          const key = el.dataset.demoEdit!;
          el.contentEditable = "false";
          const s = load();
          save({ texts: { ...(s.texts ?? {}), [key]: el.innerHTML } });
        };
        el.addEventListener("blur", onBlur, { once: true });
        blurRefs.current.set(el.dataset.demoEdit!, onBlur);
      });
    } else {
      els.forEach((el) => {
        el.contentEditable = "false";
        el.style.cursor = "";
        el.classList.remove("demo-editable");
      });
      blurRefs.current.clear();
    }

    return () => {
      els.forEach((el) => {
        el.contentEditable = "false";
        el.classList.remove("demo-editable");
      });
    };
  }, [editMode, active]);

  if (!active) return null;

  const currentTheme = THEMES.find((t) => t.id === themeId)!;

  return (
    <>
      {/* Panels */}
      {panel === "theme" && (
        <div className="demo-panel">
          <p className="demo-panel-label">Brand colour</p>
          <div className="demo-swatches">
            {THEMES.map((t) => (
              <button
                key={t.id}
                title={t.label}
                onClick={() => {
                  setThemeId(t.id);
                  applyTheme(t.id);
                  save({ themeId: t.id });
                }}
                className={`demo-swatch${themeId === t.id ? " demo-swatch-active" : ""}`}
                style={{ background: t.dot }}
              />
            ))}
          </div>
          <p className="demo-panel-sublabel">{currentTheme.label}</p>
        </div>
      )}

      {panel === "font" && (
        <div className="demo-panel">
          <p className="demo-panel-label">Font pairing</p>
          <div className="demo-font-list">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFontId(f.id);
                  applyFont(f.id);
                  save({ fontId: f.id });
                }}
                className={`demo-font-btn${fontId === f.id ? " demo-font-btn-active" : ""}`}
                style={{ fontFamily: f.display }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="demo-toolbar" onClick={() => setPanel(null)}>
        <span className="demo-badge">● Demo</span>

        <button
          className={`demo-btn${panel === "theme" ? " demo-btn-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setPanel(panel === "theme" ? null : "theme");
          }}
        >
          <Palette className="demo-icon" />
          Colours
        </button>

        <button
          className={`demo-btn${panel === "font" ? " demo-btn-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setPanel(panel === "font" ? null : "font");
          }}
        >
          <Type className="demo-icon" />
          Fonts
        </button>

        <button
          className={`demo-btn${editMode ? " demo-btn-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setEditMode((v) => !v);
            setPanel(null);
          }}
        >
          <Pencil className="demo-icon" />
          Edit text
        </button>

        <button
          className="demo-btn demo-btn-reset"
          onClick={(e) => {
            e.stopPropagation();
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
          }}
        >
          <RotateCcw className="demo-icon" />
          Reset
        </button>
      </div>

      <style>{`
        .demo-toolbar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 16px;
          background: rgba(10,10,10,0.92);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 12px; color: white;
        }
        .demo-badge {
          margin-right: 8px; font-size: 11px; font-weight: 600;
          color: #6ee7b7; letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .demo-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
          white-space: nowrap;
        }
        .demo-btn:hover { background: rgba(255,255,255,0.12); color: white; }
        .demo-btn-active { background: rgba(99,102,241,0.3) !important; border-color: rgba(99,102,241,0.6) !important; color: white !important; }
        .demo-btn-reset { margin-left: auto; border-color: rgba(239,68,68,0.3); color: rgba(239,68,68,0.8); }
        .demo-btn-reset:hover { background: rgba(239,68,68,0.15); color: #f87171; border-color: rgba(239,68,68,0.5); }
        .demo-icon { width: 13px; height: 13px; flex-shrink: 0; }
        .demo-panel {
          position: fixed; bottom: 48px; left: 16px; z-index: 9999;
          background: rgba(10,10,10,0.96); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          padding: 14px 16px; min-width: 200px;
          animation: demo-slide-up 0.15s ease;
        }
        @keyframes demo-slide-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .demo-panel-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 10px; }
        .demo-panel-sublabel { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 8px; }
        .demo-swatches { display: flex; gap: 8px; }
        .demo-swatch { width: 28px; height: 28px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: all 0.15s; }
        .demo-swatch:hover { transform: scale(1.15); }
        .demo-swatch-active { border-color: white; transform: scale(1.15); }
        .demo-font-list { display: flex; flex-direction: column; gap: 4px; }
        .demo-font-btn { text-align: left; padding: 7px 10px; border-radius: 6px; border: 1px solid transparent; background: transparent; color: rgba(255,255,255,0.7); font-size: 14px; cursor: pointer; transition: all 0.15s; }
        .demo-font-btn:hover { background: rgba(255,255,255,0.08); color: white; }
        .demo-font-btn-active { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.4); color: white; }
        [data-demo-edit].demo-editable { outline: 2px dashed rgba(99,102,241,0.6); outline-offset: 3px; border-radius: 4px; }
        [data-demo-edit].demo-editable:hover { outline-color: rgba(99,102,241,1); background: rgba(99,102,241,0.05); }
        [data-demo-edit].demo-editable:focus { outline-color: rgba(99,102,241,1); outline-style: solid; }
      `}</style>
    </>
  );
}
