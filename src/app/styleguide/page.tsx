"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Styleguide() {
  const colorItems = [
    ["bg","Fond"],["fg","Texte"],
    ["primary","Primaire"],["secondary","Secondaire"],
    ["muted","Muted"],["border","Bordure"],
    ["success","Succès"],["warning","Alerte"],["danger","Danger"]
  ];
  const fonts = ["xs","sm","base","lg","xl","2xl","3xl"] as const;

  return (
    <main className="space-y-8">
      <h1 className="text-2xl font-semibold">Padavwa DS v1 — Styleguide</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Couleurs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {colorItems.map(([k,label])=>(
            <div key={k} className="border rounded-xl p-3">
              <div className="h-10 w-full rounded-md" style={{ backgroundColor: `hsl(var(--${k}))` }} />
              <div className="mt-2 text-sm font-medium">{label}</div>
              <div className="text-xs opacity-70">--{k}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Typographie</h2>
        <div className="grid gap-2">
          {fonts.map((f)=>(
            <div key={f} className={`text-${f}`}>
              Texte {f} — The quick brown fox jumps over the lazy dog.
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Composants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primaire</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="grid gap-2 max-w-sm">
          <label className="text-sm">Input</label>
          <Input placeholder="Votre email" />
        </div>
      </section>
    </main>
  );
}
