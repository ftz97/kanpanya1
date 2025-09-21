import { render, screen } from '@testing-library/react';

// Test simple pour vérifier que Jest fonctionne
describe('Tests de Base', () => {
  it('affiche un message simple', () => {
    render(<div>Test réussi !</div>);
    expect(screen.getByText('Test réussi !')).toBeInTheDocument();
  });

  it('calcule correctement', () => {
    expect(2 + 2).toBe(4);
  });

  it('vérifie les chaînes', () => {
    expect('hello').toContain('lo');
  });
});
