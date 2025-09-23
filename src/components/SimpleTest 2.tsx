"use client";

export default function SimpleTest() {
  console.log('🔄 SimpleTest component rendered');
  
  return (
    <div className="p-6 bg-green-100 rounded-lg">
      <h2 className="text-xl font-bold text-green-800 mb-4">✅ Test Simple</h2>
      <p className="text-green-700">
        Si vous voyez ce message, le composant se charge correctement.
      </p>
      <p className="text-sm text-green-600 mt-2">
        Timestamp: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}
