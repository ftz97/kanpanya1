"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

const QUESTION_BANK: Question[] = [
  { id: "q-vitc", text: "Quel fruit est le plus riche en vitamine C ?", options: ["Orange", "Kiwi", "Pomme", "Banane"], correctIndex: 1 },
  { id: "q-hydrat", text: "Quelle boisson hydrate le mieux après un effort ?", options: ["Soda", "Jus d'orange", "Eau", "Café"], correctIndex: 2 },
  { id: "q-protv", text: "Quelle est une bonne source de protéines végétales ?", options: ["Banane", "Concombre", "Lentilles", "Pomme de terre"], correctIndex: 2 },
  { id: "q-omega3", text: "Quelle huile est la plus riche en oméga-3 ?", options: ["Tournesol", "Colza", "Coco", "Olive"], correctIndex: 1 },
  { id: "q-fibres", text: "Quel féculent contient le plus de fibres ?", options: ["Riz blanc", "Pâtes blanches", "Pommes de terre", "Riz complet"], correctIndex: 3 },
  { id: "q-vitd", text: "Quelle vitamine le soleil aide-t-il à fabriquer ?", options: ["Vitamine A", "Vitamine C", "Vitamine D", "Vitamine K"], correctIndex: 2 },
  { id: "q-sel", text: "Quel geste réduit le sel au quotidien ?", options: ["Goûter avant de resaler", "Ajouter du sel systématiquement", "Sauces toutes prêtes", "Charcuterie souvent"], correctIndex: 0 },
  { id: "q-antigaspi", text: "Quel choix est le plus anti-gaspi et économique ?", options: ["Jeter les restes", "Cuisiner les restes", "Commander systématiquement", "Acheter en doublon"], correctIndex: 1 },
];

function sample<T>(arr: T[], n: number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default;
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  setTimeout(() => confetti({ particleCount: 80, spread: 90, origin: { y: 0.7 } }), 200);
}

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** Points gagnés par bonne réponse (par défaut 10) */
  pointsPerCorrect?: number;
  /** Callback optionnel pour sauver en base, analytics, etc. */
  onComplete?: (payload: { score: number; total: number; points: number }) => void;
};

export default function InteractiveOfferQuiz({
  open,
  onOpenChange,
  pointsPerCorrect = 10,
  onComplete,
}: Props) {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [selected, setSelected] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (open) {
      setQuestions(sample(QUESTION_BANK, 4));
      setIdx(0);
      setScore(0);
      setFinished(false);
      setSelected(null);
    }
  }, [open]);

  function answer(i: number) {
    if (selected !== null) return;
    const q = questions[idx];
    if (!q) return;

    setSelected(i);
    const isCorrect = i === q.correctIndex;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx((x) => x + 1);
        setSelected(null);
      } else {
        setFinished(true);
        fireConfetti().catch(() => {});
      }
    }, 800);
  }

  const q = questions[idx];
  const total = questions.length;
  const points = score * pointsPerCorrect;

  React.useEffect(() => {
    if (finished && onComplete) {
      onComplete({ score, total, points });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-teal-700 text-center">Offre interactive</DialogTitle>
          <DialogDescription className="sr-only">Quiz interactif pour gagner des points</DialogDescription>
        </DialogHeader>

        {!finished ? (
          <div className="space-y-5">
            <p className="text-center text-muted-foreground">
              Question {idx + 1} / {total}
            </p>
            <h3 className="text-xl text-center font-medium">{q?.text}</h3>

            <div className="grid gap-3">
              {q?.options.map((opt, i) => {
                const base = "w-full rounded-2xl border-2 py-3 text-center text-lg transition";
                let cls = "border-teal-600 text-teal-700 hover:bg-teal-50";
                if (selected !== null) {
                  if (i === q.correctIndex) {
                    cls = "border-teal-600 bg-teal-600 text-white";
                  } else if (i === selected) {
                    cls = "border-red-500 bg-red-50 text-red-700";
                  } else {
                    cls = "border-slate-200 text-slate-400";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={selected !== null}
                    className={`${base} ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 py-2">
            <h3 className="text-2xl font-semibold">🎉 Quiz terminé !</h3>
            <p className="text-lg">Votre score : {score} / {total}</p>

            {/* Badge +X points */}
            <div className="flex items-center justify-center">
              <span
                className="inline-flex items-center rounded-full border border-teal-600 bg-teal-600/10 px-3 py-1 text-sm font-medium text-teal-700 animate-bounce"
                aria-label={`+${points} points`}
                title={`+${points} points`}
              >
                +{points} points
              </span>
            </div>

            <p className="text-muted-foreground">Merci d&apos;avoir participé 🙏</p>

            <button className="btn btn-primary mt-2" onClick={() => onOpenChange(false)}>
              Fermer
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
