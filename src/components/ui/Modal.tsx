export function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-2xl shadow-lg bg-white p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
