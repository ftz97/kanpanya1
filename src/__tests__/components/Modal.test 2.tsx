import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/layers/ui/components/Modal';

describe('Modal Component', () => {
  it('affiche le modal quand isOpen=true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <p>Contenu du modal</p>
      </Modal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Contenu du modal')).toBeInTheDocument();
  });

  it('ne s\'affiche pas quand isOpen=false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        <p>Contenu du modal</p>
      </Modal>
    );
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('appelle onClose quand on clique sur le bouton fermer', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Contenu du modal</p>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applique les tailles correctement', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test" size="sm">
        <p>Small modal</p>
      </Modal>
    );
    
    expect(screen.getByText('Small modal')).toBeInTheDocument();
    
    rerender(
      <Modal isOpen={true} onClose={jest.fn()} title="Test" size="lg">
        <p>Large modal</p>
      </Modal>
    );
    
    expect(screen.getByText('Large modal')).toBeInTheDocument();
  });
});
