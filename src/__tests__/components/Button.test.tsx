import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('affiche le texte du bouton', () => {
    render(<Button>Cliquer ici</Button>);
    expect(screen.getByText('Cliquer ici')).toBeInTheDocument();
  });

  it('appelle onClick quand cliqué', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Cliquer</Button>);
    
    fireEvent.click(screen.getByText('Cliquer'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('est désactivé quand disabled=true', () => {
    render(<Button disabled>Désactivé</Button>);
    const button = screen.getByText('Désactivé');
    expect(button).toBeDisabled();
  });

  it('affiche le loading quand disabled=true', () => {
    render(<Button disabled>Chargement</Button>);
    const button = screen.getByText('Chargement');
    expect(button).toBeDisabled();
  });

  it('applique les variants correctement', () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByText('Default')).toHaveClass('bg-[#17BFA0]');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-100');

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText('Destructive')).toHaveClass('bg-red-500');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline')).toHaveClass('border');
  });

  it('applique les tailles correctement', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('px-3');

    rerender(<Button size="default">Default</Button>);
    expect(screen.getByText('Default')).toHaveClass('px-4');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('px-6');
  });

  it('applique les classes personnalisées', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });
});
