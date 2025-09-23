import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock des composants qui pourraient causer des erreurs
jest.mock('@/components/Test', () => {
  return function MockTest() {
    return <div data-testid="test-component">Composant Test</div>;
  };
}, { virtual: true });

describe('Page d\'accueil', () => {
  it('affiche le titre principal', () => {
    render(<Home />);
    expect(screen.getByText('Kanpanya')).toBeInTheDocument();
  });

  it('affiche le message de test', () => {
    render(<Home />);
    expect(screen.getByText('Page de test - Si vous voyez ceci, l\'application fonctionne !')).toBeInTheDocument();
  });
});
