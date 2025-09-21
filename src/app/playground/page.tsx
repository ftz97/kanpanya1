"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

// Single-file playground: Quiz + Scratch (front-only)
// Drop this component into app/playground/page.tsx
// Tailwind CSS required (no external libs).

export default function Playground() {
  const [tab, setTab] = useState<"quiz" | "scratch">("quiz");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-4xl px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Kanpanya — Playground</h1>
          <nav className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setTab("quiz")}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-2xl border transition shadow-sm text-xs sm:text-sm ${
                tab === "quiz"
                  ? "bg-primary text-white border-primary"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Quiz
            </button>
            <button
              onClick={() => setTab("scratch")}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-2xl border transition shadow-sm text-xs sm:text-sm ${
                tab === "scratch"
                  ? "bg-primary text-white border-primary"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Scratch
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-3 sm:px-4 py-6 sm:py-8">
        {tab === "quiz" ? <QuizDemo /> : <ScratchDemo />}
      </main>
    </div>
  );
}

function QuizDemo() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(
    null
  );
  const [score, setScore] = useState(0);

  const questions = useMemo(
    () => [
      {
        text: "Quelle est la capitale de la Guadeloupe ?",
        options: ["Basse-Terre", "Pointe-à-Pitre", "Les Abymes", "Gosier"],
        correct: 0,
        reward: 10,
      },
      {
        text: "Quel est le code couleur principal de Kanpanya ?",
        options: ["#FF0000", "#14B8A6", "#3B82F6", "#F59E0B"],
        correct: 1,
        reward: 10,
      },
    ],
    []
  );

  const q = questions[current];

  const submit = () => {
    if (selected == null) return;
    const ok = selected === q.correct;
    setResult({ ok, msg: ok ? "✅ Bonne réponse ! +10 pts" : "❌ Mauvaise réponse" });
    if (ok) setScore((s) => s + q.reward);
  };

  const next = () => {
    setSelected(null);
    setResult(null);
    setCurrent((c) => Math.min(c + 1, questions.length - 1));
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setResult(null);
    setScore(0);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr,320px] items-start">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quiz démo</h2>
          <span className="text-sm text-gray-500">
            Question {current + 1}/{questions.length}
          </span>
        </div>

        <p className="mt-4 text-lg font-medium">{q.text}</p>

        <div className="mt-4 grid gap-2">
          {q.options.map((opt, idx) => (
            <label key={idx} className="cursor-pointer">
              <input
                type="radio"
                name={`q_${current}`}
                className="peer hidden"
                checked={selected === idx}
                onChange={() => setSelected(idx)}
              />
              <div
                className={`border rounded-xl p-3 transition peer-checked:border-teal-600 peer-checked:bg-teal-50 hover:bg-gray-50`}
              >
                {opt}
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={submit}
            className="px-4 py-2 rounded-xl bg-teal-600 text-white hover:scale-[1.02] active:scale-95 transition"
          >
            Valider
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50"
          >
            Recommencer
          </button>
          {current < questions.length - 1 && (
            <button
              onClick={next}
              className="ml-auto px-4 py-2 rounded-xl border hover:bg-gray-50"
            >
              Suivant
            </button>
          )}
        </div>

        {result && (
          <p
            className={`mt-4 font-medium ${
              result.ok ? "text-teal-700" : "text-rose-600"
            }`}
          >
            {result.msg}
          </p>
        )}
      </div>

      <aside className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-2">Résumé</h3>
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>Score</span>
          <span className="text-teal-600">{score}</span>
          <span className="text-sm font-normal text-gray-500">points</span>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Tout est côté front — aucune API. Idéal pour tester l&apos;UI et le flow.
        </p>
      </aside>
    </div>
  );
}

function ScratchDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coverDrawnRef = useRef(false);
  const [scratchedPct, setScratchedPct] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const W = 340;
  const H = 180;

  
const stableDrawCover = useCallback(() => {
  drawCover();
}, [drawCover]);

const stableSetScratchedPct = useCallback(() => {
  setScratchedPct();
}, [setScratchedPct]);

const stableSetRevealed = useCallback(() => {
  setRevealed();
}, [setRevealed]);

useEffect(() => {
  stableDrawCover();
  stableSetScratchedPct();
  stableSetRevealed();
}, [stableDrawCover, stableSetScratchedPct, stableSetRevealed]);;

  const drawCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Silver gradient cover
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#d1d5db"); // gray-300
    grad.addColorStop(1, "#9ca3af"); // gray-400
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Diagonal stripes for texture
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = "#ffffff";
    for (let i = -H; i < W + H; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 8, 0);
      ctx.lineTo(i - H + 8, H);
      ctx.lineTo(i - H, H);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Hint text
    ctx.fillStyle = "#374151"; // gray-700
    ctx.font = "600 16px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.textAlign = "center";
    ctx.fillText("Gratte ici ✨", W / 2, H / 2);

    coverDrawnRef.current = true;
  };

  const getXY = (e: PointerEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    setIsDrawing(true);
    erase(e.nativeEvent);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || revealed) return;
    erase(e.nativeEvent);
  };

  const end = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    // Compute scratched percent on stroke end
    setTimeout(checkScratched, 0);
  };

  const erase = (evt: PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getXY(evt, canvas);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const img = ctx.getImageData(0, 0, W, H);

    const total = W * H;
    let cleared = 0;
    // Count transparent pixels (alpha <= 20)
    for (let i = 3; i < img.data.length; i += 4) {
      if (img.data[i] <= 20) cleared++;
    }
    const pct = Math.round((cleared / total) * 100);
    setScratchedPct(pct);
    if (pct >= 55) setRevealed(true);
  };

  const reset = () => {
    drawCover();
    setScratchedPct(0);
    setRevealed(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr,320px] items-start">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Carte à gratter démo</h2>
          <div className="text-sm text-gray-500">{scratchedPct}% gratté</div>
        </div>

        <div className="mt-4 relative mx-auto w-[340px]">
          {/* Prize layer (under the canvas) */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-center rounded-xl border ${
              revealed ? "ring-2 ring-teal-500" : ""
            }`}
            aria-hidden
          >
            <div className="p-4">
              <p className="text-2xl font-bold text-teal-600">🎁 1 ticket tombola</p>
              <p className="text-gray-600 mt-1">À récupérer en caisse</p>
            </div>
          </div>

          {/* Scratch canvas */}
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerLeave={end}
            className="relative z-10 border rounded-xl touch-none select-none cursor-pointer"
          />

          {/* Win badge */}
          {revealed && (
            <div className="absolute -top-3 -right-3 z-20 bg-teal-600 text-white px-3 py-1 rounded-full text-sm shadow animate-bounce">
              +10 points
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50"
          >
            Réinitialiser
          </button>
          <button
            onClick={checkScratched}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50"
          >
            Vérifier le %
          </button>
        </div>

        {revealed && (
          <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-xl text-teal-800">
            Bravo 🎉 — gain dévoilé ! (front-only, pas d&apos;API)
          </div>
        )}
      </div>

      <aside className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-2">Conseils UI</h3>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Contraste fort entre la couche à gratter et le lot.</li>
          <li>Utiliser pointer events (meilleur que mouse/touch séparés).</li>
          <li>Auto-révélation à ~55% gratté pour la fluidité.</li>
          <li>Bouton reset pour tests rapides.</li>
        </ul>
      </aside>
    </div>
  );
}
