export default function Styleguide() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Kanpanya Design System</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Couleurs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="h-12 w-full rounded-md bg-blue-600 mb-2"></div>
            <div className="text-sm font-medium">Primaire</div>
            <div className="text-xs text-gray-500">blue-600</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="h-12 w-full rounded-md bg-gray-100 mb-2"></div>
            <div className="text-sm font-medium">Secondaire</div>
            <div className="text-xs text-gray-500">gray-100</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="h-12 w-full rounded-md bg-green-500 mb-2"></div>
            <div className="text-sm font-medium">Succès</div>
            <div className="text-xs text-gray-500">green-500</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="h-12 w-full rounded-md bg-red-500 mb-2"></div>
            <div className="text-sm font-medium">Danger</div>
            <div className="text-xs text-gray-500">red-500</div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Typographie</h2>
        <div className="space-y-2">
          <div className="text-xs">Texte xs — The quick brown fox jumps over the lazy dog.</div>
          <div className="text-sm">Texte sm — The quick brown fox jumps over the lazy dog.</div>
          <div className="text-base">Texte base — The quick brown fox jumps over the lazy dog.</div>
          <div className="text-lg">Texte lg — The quick brown fox jumps over the lazy dog.</div>
          <div className="text-xl">Texte xl — The quick brown fox jumps over the lazy dog.</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Composants</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Boutons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Primaire</button>
              <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200">Secondaire</button>
              <button className="hover:bg-gray-100 px-4 py-2 rounded-md">Ghost</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Danger</button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Input</h3>
            <div className="max-w-sm">
              <input 
                type="text" 
                placeholder="Votre email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
