"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Palette,
  Type,
  RotateCcw,
  Pencil,
  Camera,
  X,
  Wand2,
} from "lucide-react";

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
  {
    id: "terracotta",
    label: "Terracotta Clay",
    dot: "#c0614a",
    gradient:
      "rgba(120,40,28,0.92) 0%, rgba(160,65,45,0.74) 50%, rgba(192,97,74,0.38) 100%",
    vars: {
      "--color-forest-50": "#fef4f1",
      "--color-forest-100": "#fde4dc",
      "--color-forest-300": "#e8957e",
      "--color-forest-700": "#a8432c",
      "--color-forest-800": "#7a2f1e",
      "--color-forest-950": "#3d1208",
      "--color-harvest-400": "#d97b60",
      "--color-harvest-500": "#c0614a",
      "--color-harvest-600": "#a04030",
      "--color-cream": "#fef4f1",
      "--color-earth-50": "#fdeee9",
    },
  },
  {
    id: "sage",
    label: "Sage & Cream",
    dot: "#6b8f71",
    gradient:
      "rgba(36,64,42,0.92) 0%, rgba(60,94,68,0.74) 50%, rgba(107,143,113,0.38) 100%",
    vars: {
      "--color-forest-50": "#f1f5f2",
      "--color-forest-100": "#dce9de",
      "--color-forest-300": "#9bbfa1",
      "--color-forest-700": "#4a7051",
      "--color-forest-800": "#2e4d34",
      "--color-forest-950": "#132418",
      "--color-harvest-400": "#88b18f",
      "--color-harvest-500": "#6b8f71",
      "--color-harvest-600": "#52725a",
      "--color-cream": "#f5f8f5",
      "--color-earth-50": "#edf4ee",
    },
  },
  {
    id: "slate",
    label: "Slate Blue",
    dot: "#4a6fa5",
    gradient:
      "rgba(22,38,68,0.92) 0%, rgba(38,62,108,0.74) 50%, rgba(74,111,165,0.38) 100%",
    vars: {
      "--color-forest-50": "#f0f3f8",
      "--color-forest-100": "#d4deed",
      "--color-forest-300": "#7e9ec5",
      "--color-forest-700": "#2e5494",
      "--color-forest-800": "#1a3566",
      "--color-forest-950": "#0a1630",
      "--color-harvest-400": "#6e98c0",
      "--color-harvest-500": "#4a6fa5",
      "--color-harvest-600": "#355788",
      "--color-cream": "#f0f4f9",
      "--color-earth-50": "#e8eef6",
    },
  },
  {
    id: "rose",
    label: "Rose Petal",
    dot: "#c2667d",
    gradient:
      "rgba(96,28,48,0.92) 0%, rgba(140,50,75,0.74) 50%, rgba(194,102,125,0.38) 100%",
    vars: {
      "--color-forest-50": "#fef0f3",
      "--color-forest-100": "#fdd6de",
      "--color-forest-300": "#e898ac",
      "--color-forest-700": "#a63d57",
      "--color-forest-800": "#782b3e",
      "--color-forest-950": "#3a0f1c",
      "--color-harvest-400": "#d4849a",
      "--color-harvest-500": "#c2667d",
      "--color-harvest-600": "#a04060",
      "--color-cream": "#fff5f7",
      "--color-earth-50": "#fde8ed",
    },
  },
  {
    id: "marigold",
    label: "Marigold",
    dot: "#e8a020",
    gradient:
      "rgba(100,56,8,0.92) 0%, rgba(150,88,12,0.74) 50%, rgba(232,160,32,0.38) 100%",
    vars: {
      "--color-forest-50": "#fffbef",
      "--color-forest-100": "#fef0c0",
      "--color-forest-300": "#f8cc60",
      "--color-forest-700": "#a86018",
      "--color-forest-800": "#7a4010",
      "--color-forest-950": "#3a1a04",
      "--color-harvest-400": "#f0b840",
      "--color-harvest-500": "#e8a020",
      "--color-harvest-600": "#c87c10",
      "--color-cream": "#fffbf0",
      "--color-earth-50": "#fef6e0",
    },
  },
];

// ── Font pairs ────────────────────────────────────────────────────────────────
const FONTS = [
  {
    id: "classic",
    label: "Classic",
    display: "var(--font-libre-baskerville), Georgia, serif",
    body: "var(--font-source-sans-3), system-ui, sans-serif",
  },
  {
    id: "elegant",
    label: "Elegant",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@400;700&display=swap",
    display: "'Cormorant Garamond', Palatino, serif",
    body: "'Lato', system-ui, sans-serif",
  },
  {
    id: "modern",
    label: "Modern",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap",
    display: "'Outfit', system-ui, sans-serif",
    body: "'Outfit', system-ui, sans-serif",
  },
  {
    id: "rustic",
    label: "Rustic",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700&display=swap",
    display: "'Playfair Display', Georgia, serif",
    body: "'Nunito', system-ui, sans-serif",
  },
  {
    id: "editorial",
    label: "Editorial",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Jost:wght@400;500;600&display=swap",
    display: "'Fraunces', Georgia, serif",
    body: "'Jost', system-ui, sans-serif",
  },
  {
    id: "refined",
    label: "Refined",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&display=swap",
    display: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
  },
  {
    id: "literary",
    label: "Literary",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;0,700;1,400&family=Mulish:wght@400;600;700&display=swap",
    display: "'Spectral', Georgia, serif",
    body: "'Mulish', system-ui, sans-serif",
  },
  {
    id: "futuristic",
    label: "Futuristic",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;700&display=swap",
    display: "'Syne', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
];

// ── Saved state ───────────────────────────────────────────────────────────────
type Saved = {
  themeId: string;
  fontId: string;
  texts: Record<string, string>;
  images: Record<string, string>;
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

function swapImage(key: string, src: string) {
  const container = document.querySelector<HTMLElement>(
    `[data-demo-img="${key}"]`,
  );
  if (!container) return;
  const img = container.querySelector("img") as HTMLImageElement | null;
  if (!img) return;
  img.src = src;
  img.srcset = "";
  img.sizes = "";
}

function applyImages(images: Record<string, string>) {
  Object.entries(images).forEach(([key, src]) => swapImage(key, src));
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DemoEditor() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [panel, setPanel] = useState<"theme" | "font" | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [imgMode, setImgMode] = useState(false);
  const [themeId, setThemeId] = useState("earth");
  const [fontId, setFontId] = useState("classic");

  // Image picker
  const [imgPicker, setImgPicker] = useState<{
    key: string;
    label: string;
  } | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
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
    if (s.images) applyImages(s.images);
  }, [active]);

  // Image edit mode — inject clickable overlays on [data-demo-img] elements
  useEffect(() => {
    if (!active) return;
    const els = document.querySelectorAll<HTMLElement>("[data-demo-img]");

    if (imgMode) {
      els.forEach((el) => {
        const overlay = document.createElement("div");
        overlay.className = "demo-img-overlay";
        overlay.setAttribute("data-demo-img-overlay", "true");
        overlay.innerHTML = `<span class="demo-img-overlay-label">📷 Change photo</span>`;
        el.appendChild(overlay);
      });
    } else {
      document
        .querySelectorAll("[data-demo-img-overlay]")
        .forEach((o) => o.remove());
    }

    return () => {
      document
        .querySelectorAll("[data-demo-img-overlay]")
        .forEach((o) => o.remove());
    };
  }, [imgMode, active]);

  // Capture-phase click to open image picker
  useEffect(() => {
    if (!active || !imgMode) return;

    const handleClick = (e: Event) => {
      const container = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-demo-img]",
      );
      if (!container) return;
      e.preventDefault();
      e.stopPropagation();
      const key = container.dataset.demoImg!;
      const label = container.dataset.demoImgLabel ?? key;
      setImgPicker({ key, label });
      setAiPrompt("");
      setAiError("");
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [active, imgMode]);

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

  async function handleFileUpload(file: File) {
    if (!imgPicker) return;
    const dataUrl = await fileToDataUrl(file);
    swapImage(imgPicker.key, dataUrl);
    const s = load();
    save({ images: { ...(s.images ?? {}), [imgPicker.key]: dataUrl } });
    setImgPicker(null);
  }

  async function handleAIGenerate() {
    if (!imgPicker || !aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError("");
    try {
      const fullPrompt = `${aiPrompt.trim()}, professional food photography, natural light, high quality`;
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=800&height=600&nologo=1&model=flux`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("bad response");
      const blob = await res.blob();
      const dataUrl = await blobToDataUrl(blob);
      swapImage(imgPicker.key, dataUrl);
      const s = load();
      save({ images: { ...(s.images ?? {}), [imgPicker.key]: dataUrl } });
      setImgPicker(null);
    } catch {
      setAiError("Generation failed — check your connection and try again.");
    } finally {
      setAiLoading(false);
    }
  }

  if (!active) return null;

  const currentTheme = THEMES.find((t) => t.id === themeId)!;

  return (
    <>
      {/* ── Image picker modal ─────────────────────────────────── */}
      {imgPicker && (
        <div
          className="demo-modal-backdrop"
          onClick={() => !aiLoading && setImgPicker(null)}
        >
          <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <p className="demo-modal-title">{imgPicker.label}</p>
              <button
                className="demo-modal-close"
                onClick={() => !aiLoading && setImgPicker(null)}
                disabled={aiLoading}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f);
              }}
            />
            <button
              className="demo-modal-upload-btn"
              onClick={() => fileRef.current?.click()}
              disabled={aiLoading}
            >
              Upload from device
            </button>

            <div className="demo-modal-divider">
              <span>or generate with AI</span>
            </div>

            <div className="demo-modal-ai-row">
              <input
                type="text"
                placeholder="e.g. artisan sourdough on a wooden board"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAIGenerate()}
                disabled={aiLoading}
                className="demo-modal-input"
                autoFocus
              />
              <button
                className="demo-modal-generate-btn"
                onClick={handleAIGenerate}
                disabled={aiLoading || !aiPrompt.trim()}
              >
                {aiLoading ? (
                  <span className="demo-spinner" />
                ) : (
                  <Wand2 style={{ width: 13, height: 13 }} />
                )}
                {aiLoading ? "Generating…" : "Generate"}
              </button>
            </div>
            {aiLoading && (
              <p className="demo-modal-hint">
                This takes 15–30 seconds — hang tight.
              </p>
            )}
            {aiError && <p className="demo-modal-error">{aiError}</p>}
          </div>
        </div>
      )}

      {/* ── Panels ────────────────────────────────────────────── */}
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

      {/* ── Toolbar ───────────────────────────────────────────── */}
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
            if (imgMode) setImgMode(false);
            setPanel(null);
          }}
        >
          <Pencil className="demo-icon" />
          Edit text
        </button>

        <button
          className={`demo-btn${imgMode ? " demo-btn-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setImgMode((v) => !v);
            if (editMode) setEditMode(false);
            setPanel(null);
          }}
        >
          <Camera className="demo-icon" />
          Photos
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
          color: #6ee7b7; letter-spacing: 0.05em; white-space: nowrap;
        }
        .demo-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 500;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
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
        .demo-swatches { display: grid; grid-template-columns: repeat(5, 28px); gap: 8px; }
        .demo-swatch { width: 28px; height: 28px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: all 0.15s; }
        .demo-swatch:hover { transform: scale(1.15); }
        .demo-swatch-active { border-color: white; transform: scale(1.15); }
        .demo-font-list { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
        .demo-font-btn { text-align: left; padding: 7px 10px; border-radius: 6px; border: 1px solid transparent; background: transparent; color: rgba(255,255,255,0.7); font-size: 14px; cursor: pointer; transition: all 0.15s; }
        .demo-font-btn:hover { background: rgba(255,255,255,0.08); color: white; }
        .demo-font-btn-active { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.4); color: white; }

        [data-demo-edit].demo-editable { outline: 2px dashed rgba(99,102,241,0.6); outline-offset: 3px; border-radius: 4px; }
        [data-demo-edit].demo-editable:hover { outline-color: rgba(99,102,241,1); background: rgba(99,102,241,0.05); }
        [data-demo-edit].demo-editable:focus { outline-color: rgba(99,102,241,1); outline-style: solid; }

        /* Image edit overlays */
        [data-demo-img] { position: relative; }
        .demo-img-overlay {
          position: absolute; inset: 0; z-index: 25;
          cursor: pointer;
          border: 2px solid rgba(99,102,241,0.75);
          border-radius: inherit;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .demo-img-overlay:hover { background: rgba(0,0,0,0.52); }
        .demo-img-overlay-label {
          opacity: 0; color: white; font-size: 12px; font-weight: 600;
          letter-spacing: 0.03em; padding: 6px 14px;
          background: rgba(99,102,241,0.9); border-radius: 6px;
          pointer-events: none; transition: opacity 0.15s;
          white-space: nowrap;
        }
        .demo-img-overlay:hover .demo-img-overlay-label { opacity: 1; }

        /* Image picker modal */
        .demo-modal-backdrop {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .demo-modal {
          background: #141414; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 20px; width: 100%; max-width: 420px;
          animation: demo-slide-up 0.15s ease;
        }
        .demo-modal-header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;
        }
        .demo-modal-title { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); }
        .demo-modal-close {
          background: none; border: none; color: rgba(255,255,255,0.4);
          cursor: pointer; padding: 2px; display: flex; align-items: center;
          border-radius: 4px; transition: color 0.15s;
        }
        .demo-modal-close:hover { color: white; }
        .demo-modal-upload-btn {
          width: 100%; padding: 11px; border-radius: 8px;
          border: 1px dashed rgba(255,255,255,0.2); background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7); font-size: 13px; cursor: pointer; transition: all 0.15s;
        }
        .demo-modal-upload-btn:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.35); color: white; }
        .demo-modal-upload-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .demo-modal-divider {
          display: flex; align-items: center; gap: 10px; margin: 14px 0;
          color: rgba(255,255,255,0.25); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .demo-modal-divider::before, .demo-modal-divider::after {
          content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1);
        }
        .demo-modal-ai-row { display: flex; gap: 8px; }
        .demo-modal-input {
          flex: 1; padding: 9px 12px; border-radius: 8px;
          background: rgb(31,41,55); border: 1px solid rgb(55,65,81);
          color: white; font-size: 13px; outline: none; min-width: 0;
        }
        .demo-modal-input:focus { border-color: rgb(99,102,241); }
        .demo-modal-input:disabled { opacity: 0.5; }
        .demo-modal-generate-btn {
          display: flex; align-items: center; gap: 6px; padding: 9px 14px;
          border-radius: 8px; background: rgb(99,102,241); border: none;
          color: white; font-size: 13px; font-weight: 500; cursor: pointer;
          transition: background 0.15s; white-space: nowrap; flex-shrink: 0;
        }
        .demo-modal-generate-btn:hover:not(:disabled) { background: rgb(79,82,221); }
        .demo-modal-generate-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .demo-spinner {
          width: 13px; height: 13px; border-radius: 50%; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: white;
          animation: demo-spin 0.6s linear infinite; display: inline-block;
        }
        @keyframes demo-spin { to { transform: rotate(360deg); } }
        .demo-modal-hint { margin-top: 10px; font-size: 11px; color: rgba(255,255,255,0.35); }
        .demo-modal-error { margin-top: 10px; font-size: 12px; color: #f87171; }
      `}</style>
    </>
  );
}
