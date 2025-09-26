import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ScratchTicketCard from '@/components/ScratchTicketCard';

describe('ScratchTicketCard Component', () => {
  it('affiche le titre et la description', () => {
    render(<ScratchTicketCard />);
    expect(screen.getByText('✨🎟 Gratte ton ticket ✨')).toBeInTheDocument();
    expect(screen.getByText('Gratte pour découvrir ta récompense 🎁')).toBeInTheDocument();
  });

  it('affiche le nombre initial de tickets', () => {
    render(<ScratchTicketCard initialTickets={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('affiche 0 tickets quand aucun ticket disponible', () => {
    render(<ScratchTicketCard initialTickets={0} />);
    expect(screen.getByText('🔒 0')).toBeInTheDocument();
  });

  it('appelle onTicketUsed quand un ticket est utilisé', () => {
    const onTicketUsed = vi.fn();
    render(<ScratchTicketCard initialTickets={3} onTicketUsed={onTicketUsed} />);
    
    const button = screen.getByText('Utiliser un ticket');
    fireEvent.click(button);
    
    expect(onTicketUsed).toHaveBeenCalledWith(2);
  });

  it('désactive le bouton quand plus de tickets', () => {
    render(<ScratchTicketCard initialTickets={0} />);
    const button = screen.getByText('Plus de tickets');
    expect(button).toBeDisabled();
  });

  it('met à jour le compteur de tickets après utilisation', () => {
    const { rerender } = render(<ScratchTicketCard initialTickets={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    
    const button = screen.getByText('Utiliser un ticket');
    fireEvent.click(button);
    
    // Le composant devrait maintenant afficher 2 tickets
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('applique les classes CSS personnalisées', () => {
    const { container } = render(<ScratchTicketCard className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('utilise les couleurs du design system', () => {
    render(<ScratchTicketCard initialTickets={1} />);
    const button = screen.getByText('Utiliser un ticket');
    expect(button).toHaveClass('bg-[#17BFA0]');
  });

  it('affiche le badge avec la bonne couleur quand tickets disponibles', () => {
    render(<ScratchTicketCard initialTickets={2} />);
    const badge = screen.getByText('2');
    expect(badge).toHaveClass('bg-[#17BFA0]');
  });

  it('affiche le badge gris quand aucun ticket', () => {
    render(<ScratchTicketCard initialTickets={0} />);
    const badge = screen.getByText('🔒 0');
    expect(badge).toHaveClass('bg-gray-400');
  });
});
