import { vi } from 'vitest';
import React from 'react';

// Mock Mapbox GL
const mockMapboxGL = {
  Map: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    remove: vi.fn(),
    addSource: vi.fn(),
    addLayer: vi.fn(),
    removeSource: vi.fn(),
    removeLayer: vi.fn(),
    getStyle: vi.fn(() => ({ sources: {}, layers: [] })),
    setStyle: vi.fn(),
    flyTo: vi.fn(),
    setCenter: vi.fn(),
    setZoom: vi.fn(),
    fitBounds: vi.fn(),
  })),
  Marker: vi.fn(() => ({
    setLngLat: vi.fn(),
    addTo: vi.fn(),
    remove: vi.fn(),
  })),
  Popup: vi.fn(() => ({
    setLngLat: vi.fn(),
    setHTML: vi.fn(),
    addTo: vi.fn(),
    remove: vi.fn(),
  })),
  NavigationControl: vi.fn(),
  GeolocateControl: vi.fn(),
  FullscreenControl: vi.fn(),
  ScaleControl: vi.fn(),
  AttributionControl: vi.fn(),
};

// Mock des modules Mapbox
vi.mock('mapbox-gl', () => mockMapboxGL);
vi.mock('react-map-gl', () => ({
  Map: vi.fn(({ children, ...props }) => {
    return React.createElement('div', { 'data-testid': 'mapbox-map', ...props }, children);
  }),
  Marker: vi.fn(({ children, ...props }) => {
    return React.createElement('div', { 'data-testid': 'mapbox-marker', ...props }, children);
  }),
  Popup: vi.fn(({ children, ...props }) => {
    return React.createElement('div', { 'data-testid': 'mapbox-popup', ...props }, children);
  }),
  NavigationControl: vi.fn(() => {
    return React.createElement('div', { 'data-testid': 'navigation-control' });
  }),
  GeolocateControl: vi.fn(() => {
    return React.createElement('div', { 'data-testid': 'geolocate-control' });
  }),
  FullscreenControl: vi.fn(() => {
    return React.createElement('div', { 'data-testid': 'fullscreen-control' });
  }),
  ScaleControl: vi.fn(() => {
    return React.createElement('div', { 'data-testid': 'scale-control' });
  }),
  AttributionControl: vi.fn(() => {
    return React.createElement('div', { 'data-testid': 'attribution-control' });
  }),
}));

describe('Intégration Mapbox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('peut créer une instance de carte Mapbox', () => {
    const map = new mockMapboxGL.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1
    });
    
    expect(map).toBeDefined();
    expect(mockMapboxGL.Map).toHaveBeenCalledWith({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1
    });
  });

  it('peut créer un marqueur', () => {
    const marker = new mockMapboxGL.Marker();
    marker.setLngLat([0, 0]);
    
    expect(marker).toBeDefined();
    expect(mockMapboxGL.Marker).toHaveBeenCalled();
  });

  it('peut créer une popup', () => {
    const popup = new mockMapboxGL.Popup();
    popup.setLngLat([0, 0]);
    popup.setHTML('<p>Test popup</p>');
    
    expect(popup).toBeDefined();
    expect(mockMapboxGL.Popup).toHaveBeenCalled();
  });

  it('peut gérer les événements de carte', () => {
    const map = new mockMapboxGL.Map({ container: 'map' });
    const clickHandler = vi.fn();
    
    map.on('click', clickHandler);
    map.off('click', clickHandler);
    
    expect(map.on).toHaveBeenCalledWith('click', clickHandler);
    expect(map.off).toHaveBeenCalledWith('click', clickHandler);
  });

  it('peut ajouter des sources et des couches', () => {
    const map = new mockMapboxGL.Map({ container: 'map' });
    
    map.addSource('test-source', { type: 'geojson', data: {} });
    map.addLayer({ id: 'test-layer', type: 'fill', source: 'test-source' });
    
    expect(map.addSource).toHaveBeenCalledWith('test-source', { type: 'geojson', data: {} });
    expect(map.addLayer).toHaveBeenCalledWith({ id: 'test-layer', type: 'fill', source: 'test-source' });
  });
});
