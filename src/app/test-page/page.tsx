export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎯 Test Page - Kanpanya</h1>
      <p>Si vous voyez cette page, le déploiement fonctionne !</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      <p>Environment: {process.env.NODE_ENV}</p>
    </div>
  );
}
