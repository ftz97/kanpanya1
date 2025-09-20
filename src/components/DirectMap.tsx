import RealMapboxMap from './RealMapboxMap';

export default function DirectMap() {
  return (
    <RealMapboxMap 
      height="400px"
      center={[2.3522, 48.8566]} // Paris
      zoom={12}
    />
  );
}

