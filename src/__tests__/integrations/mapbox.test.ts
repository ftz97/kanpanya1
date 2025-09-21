// Mock Mapbox GL
const mockMapboxGL = {
  Map: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    remove: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    removeSource: jest.fn(),
    removeLayer: jest.fn(),
    getStyle: jest.fn(() => ({ sources: {}, layers: [] })),
    setStyle: jest.fn(),
    flyTo: jest.fn(),
    setCenter: jest.fn(),
    setZoom: jest.fn(),
    fitBounds: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(),
    addTo: jest.fn(),
    remove: jest.fn(),
  })),
  Popup: jest.fn(() => ({
    setLngLat: jest.fn(),
    setHTML: jest.fn(),
    addTo: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  GeolocateControl: jest.fn(),
  FullscreenControl: jest.fn(),
  ScaleControl: jest.fn(),
  AttributionControl: jest.fn(),
};

// Mock des modules Mapbox
jest.mock('mapbox-gl', () => mockMapboxGL);
jest.mock('react-map-gl', () => ({
  Map: jest.fn(({ children, ...props }) => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'mapbox-map', ...props }, children);
  }),
  Marker: jest.fn(({ children, ...props }) => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'mapbox-marker', ...props }, children);
  }),
  Popup: jest.fn(({ children, ...props }) => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'mapbox-popup', ...props }, children);
  }),
  NavigationControl: jest.fn(() => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'navigation-control' });
  }),
  GeolocateControl: jest.fn(() => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'geolocate-control' });
  }),
  FullscreenControl: jest.fn(() => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'fullscreen-control' });
  }),
  ScaleControl: jest.fn(() => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'scale-control' });
  }),
  AttributionControl: jest.fn(() => {
    import React from "react";
    return React.createElement('div', { 'data-testid': 'attribution-control' });
  }),
}));

describe('Intégration Mapbox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    const clickHandler = jest.fn();
    
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
