import { render, screen } from '@testing-library/react';
import { Card } from '@/layers/ui/components/Layout';

describe('Card Component', () => {
  it('affiche le contenu', () => {
    render(
      <Card>
        <h2>Titre de la carte</h2>
        <p>Contenu de la carte</p>
      </Card>
    );
    
    expect(screen.getByText('Titre de la carte')).toBeInTheDocument();
    expect(screen.getByText('Contenu de la carte')).toBeInTheDocument();
  });

  it('applique les classes par défaut', () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild;
    
    expect(card).toHaveClass('bg-white', 'rounded-2xl', 'shadow-md', 'p-6');
  });

  it('applique les classes personnalisées', () => {
    const { container } = render(<Card className="custom-class">Test</Card>);
    const card = container.firstChild;
    
    expect(card).toHaveClass('custom-class');
  });
});
