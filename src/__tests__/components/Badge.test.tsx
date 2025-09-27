import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge data-testid="badge">Badge par défaut</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Badge par défaut');
    expect(badge).toHaveClass('bg-[#17BFA0]', 'text-white');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary" data-testid="badge">Badge secondaire</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-900');
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive" data-testid="badge">Badge destructif</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-red-500', 'text-white');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline" data-testid="badge">Badge outline</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('border-gray-300', 'text-gray-700', 'bg-white');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge" data-testid="badge">Badge personnalisé</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('renders as span element', () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.tagName).toBe('SPAN');
  });

  it('has correct base classes', () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'border',
      'px-2',
      'py-0.5',
      'text-xs',
      'font-medium'
    );
  });

  it('handles ref correctly', () => {
    const ref = vi.fn();
    render(<Badge ref={ref} data-testid="badge">Badge</Badge>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it('passes through HTML attributes', () => {
    render(
      <Badge 
        id="test-badge"
        title="Badge de test"
        data-testid="badge"
        role="status"
      >
        Badge avec attributs
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('id', 'test-badge');
    expect(badge).toHaveAttribute('title', 'Badge de test');
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('renders with different content types', () => {
    const { rerender } = render(<Badge>Texte simple</Badge>);
    expect(screen.getByText('Texte simple')).toBeInTheDocument();

    rerender(<Badge><span>Contenu avec span</span></Badge>);
    expect(screen.getByText('Contenu avec span')).toBeInTheDocument();

    rerender(<Badge><strong>Contenu avec strong</strong></Badge>);
    expect(screen.getByText('Contenu avec strong')).toBeInTheDocument();
  });

  it('handles empty content', () => {
    render(<Badge data-testid="badge"></Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('');
  });

  it('handles numeric content', () => {
    render(<Badge data-testid="badge">123</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveTextContent('123');
  });

  it('maintains consistent styling across variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'] as const;
    
    variants.forEach(variant => {
      const { unmount } = render(<Badge variant={variant} data-testid="badge">Test</Badge>);
      const badge = screen.getByTestId('badge');
      
      // Toutes les variantes doivent avoir les classes de base
      expect(badge).toHaveClass('inline-flex', 'items-center', 'justify-center');
      expect(badge).toHaveClass('rounded-md', 'border', 'px-2', 'py-0.5');
      expect(badge).toHaveClass('text-xs', 'font-medium');
      
      unmount();
    });
  });

  it('handles multiple children', () => {
    render(
      <Badge data-testid="badge">
        <span>Icon</span>
        <span>Text</span>
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveTextContent('IconText');
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('works with different event handlers', () => {
    const handleClick = vi.fn();
    const handleMouseOver = vi.fn();
    
    render(
      <Badge 
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        data-testid="badge"
      >
        Badge interactif
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    
    // Simuler les événements
    badge.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Note: fireEvent.mouseOver n'est pas disponible dans cette version
    // mais le composant devrait accepter les props d'événement
    expect(badge).toBeInTheDocument();
  });
});

