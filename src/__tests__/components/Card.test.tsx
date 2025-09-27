import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default classes', () => {
      render(<Card data-testid="card">Contenu de la carte</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm');
    });

    it('applies custom className', () => {
      render(<Card className="custom-card" data-testid="card">Contenu</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card');
    });

    it('renders children correctly', () => {
      render(<Card>Contenu de test</Card>);
      expect(screen.getByText('Contenu de test')).toBeInTheDocument();
    });

    it('handles ref correctly', () => {
      const ref = vi.fn();
      render(<Card ref={ref} data-testid="card">Contenu</Card>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('CardHeader', () => {
    it('renders with default classes', () => {
      render(<CardHeader data-testid="header">En-tête</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });

    it('applies custom className', () => {
      render(<CardHeader className="custom-header" data-testid="header">En-tête</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('custom-header');
    });

    it('renders children correctly', () => {
      render(<CardHeader>En-tête de test</CardHeader>);
      expect(screen.getByText('En-tête de test')).toBeInTheDocument();
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 with default classes', () => {
      render(<CardTitle data-testid="title">Titre</CardTitle>);
      const title = screen.getByTestId('title');
      expect(title.tagName).toBe('H3');
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
    });

    it('applies custom className', () => {
      render(<CardTitle className="custom-title" data-testid="title">Titre</CardTitle>);
      const title = screen.getByTestId('title');
      expect(title).toHaveClass('custom-title');
    });

    it('renders children correctly', () => {
      render(<CardTitle>Titre de test</CardTitle>);
      expect(screen.getByText('Titre de test')).toBeInTheDocument();
    });
  });

  describe('CardDescription', () => {
    it('renders as p with default classes', () => {
      render(<CardDescription data-testid="description">Description</CardDescription>);
      const description = screen.getByTestId('description');
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('applies custom className', () => {
      render(<CardDescription className="custom-description" data-testid="description">Description</CardDescription>);
      const description = screen.getByTestId('description');
      expect(description).toHaveClass('custom-description');
    });

    it('renders children correctly', () => {
      render(<CardDescription>Description de test</CardDescription>);
      expect(screen.getByText('Description de test')).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('renders with default classes', () => {
      render(<CardContent data-testid="content">Contenu</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('p-6', 'pt-0');
    });

    it('applies custom className', () => {
      render(<CardContent className="custom-content" data-testid="content">Contenu</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('custom-content');
    });

    it('renders children correctly', () => {
      render(<CardContent>Contenu de test</CardContent>);
      expect(screen.getByText('Contenu de test')).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('renders with default classes', () => {
      render(<CardFooter data-testid="footer">Pied de page</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });

    it('applies custom className', () => {
      render(<CardFooter className="custom-footer" data-testid="footer">Pied de page</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('custom-footer');
    });

    it('renders children correctly', () => {
      render(<CardFooter>Pied de page de test</CardFooter>);
      expect(screen.getByText('Pied de page de test')).toBeInTheDocument();
    });
  });

  describe('Card Composition', () => {
    it('renders complete card structure', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Titre de la carte</CardTitle>
            <CardDescription>Description de la carte</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Contenu principal de la carte</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId('complete-card')).toBeInTheDocument();
      expect(screen.getByText('Titre de la carte')).toBeInTheDocument();
      expect(screen.getByText('Description de la carte')).toBeInTheDocument();
      expect(screen.getByText('Contenu principal de la carte')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('handles nested components correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>
              <span>Titre avec span</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>Contenu avec div</p>
            </div>
          </CardContent>
        </Card>
      );

      expect(screen.getByText('Titre avec span')).toBeInTheDocument();
      expect(screen.getByText('Contenu avec div')).toBeInTheDocument();
    });
  });
});

