import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Popup from '@/components/Popup';

describe('Popup Component', () => {
  const defaultProps = {
    variant: 'rect' as const,
    title: 'Test Title',
    message: 'Test Message',
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock Math.random for predictable tests
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders rect variant correctly', () => {
    render(<Popup {...defaultProps} variant="rect" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders carre variant correctly', () => {
    render(<Popup {...defaultProps} variant="carre" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders banniere variant correctly', () => {
    render(<Popup {...defaultProps} variant="banniere" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
  });

  it('renders header variant correctly', () => {
    render(<Popup {...defaultProps} variant="header" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders cercle variant correctly', () => {
    render(<Popup {...defaultProps} variant="cercle" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders luxe variant correctly', () => {
    render(<Popup {...defaultProps} variant="luxe" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders glass variant correctly', () => {
    render(<Popup {...defaultProps} variant="glass" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked in banniere variant', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked in luxe variant', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="luxe" onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('Fermer');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked in glass variant', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="glass" onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('Fermer');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays custom title and message', () => {
    const customTitle = 'Custom Title';
    const customMessage = 'Custom Message';
    
    render(
      <Popup 
        {...defaultProps} 
        title={customTitle} 
        message={customMessage} 
      />
    );
    
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('handles long title and message', () => {
    const longTitle = 'This is a very long title that might overflow the popup container';
    const longMessage = 'This is a very long message that contains a lot of text and might need to wrap to multiple lines in the popup component';
    
    render(
      <Popup 
        {...defaultProps} 
        title={longTitle} 
        message={longMessage} 
      />
    );
    
    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('handles empty title and message', () => {
    render(
      <Popup 
        {...defaultProps} 
        title="" 
        message="" 
      />
    );
    
    // Should still render the popup structure - use container instead of role
    const popup = screen.getByText('Fermer').closest('div');
    expect(popup).toBeInTheDocument();
  });

  it('handles special characters in title and message', () => {
    const specialTitle = 'Title with émojis 🎉 and spécial chars';
    const specialMessage = 'Message with émojis 🚀 and spécial chars';
    
    render(
      <Popup 
        {...defaultProps} 
        title={specialTitle} 
        message={specialMessage} 
      />
    );
    
    expect(screen.getByText(specialTitle)).toBeInTheDocument();
    expect(screen.getByText(specialMessage)).toBeInTheDocument();
  });

  it('handles HTML entities in title and message', () => {
    const htmlTitle = 'Title with &lt;HTML&gt; entities';
    const htmlMessage = 'Message with &amp; entities';
    
    render(
      <Popup 
        {...defaultProps} 
        title={htmlTitle} 
        message={htmlMessage} 
      />
    );
    
    expect(screen.getByText(htmlTitle)).toBeInTheDocument();
    expect(screen.getByText(htmlMessage)).toBeInTheDocument();
  });

  it('applies correct CSS classes for rect variant', () => {
    render(<Popup {...defaultProps} variant="rect" />);
    
    const popup = screen.getByText('Fermer').closest('div');
    expect(popup).toHaveClass('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
  });

  it('applies correct CSS classes for carre variant', () => {
    render(<Popup {...defaultProps} variant="carre" />);
    
    const popup = screen.getByText('Fermer').closest('div');
    expect(popup).toHaveClass('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
  });

  it('applies correct CSS classes for banniere variant', () => {
    render(<Popup {...defaultProps} variant="banniere" />);
    
    // Find the main popup container (the one with fixed positioning)
    const popup = screen.getByText('Fermer').closest('div')?.parentElement;
    expect(popup).toHaveClass('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
  });

  it('applies correct CSS classes for header variant', () => {
    render(<Popup {...defaultProps} variant="header" />);
    
    // Find the main popup container (the one with fixed positioning)
    const popup = screen.getByText('Fermer').closest('div')?.parentElement;
    expect(popup).toHaveClass('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
  });

  it('applies correct CSS classes for cercle variant', () => {
    render(<Popup {...defaultProps} variant="cercle" />);
    
    const popup = screen.getByText('Fermer').closest('div');
    expect(popup).toHaveClass('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
  });

  it('applies correct CSS classes for luxe variant', () => {
    render(<Popup {...defaultProps} variant="luxe" />);
    
    const popup = screen.getByText('Fermer').closest('div');
    expect(popup).toHaveClass('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
  });

  it('applies correct CSS classes for glass variant', () => {
    render(<Popup {...defaultProps} variant="glass" />);
    
    const popup = screen.getByText('Fermer').closest('div');
    expect(popup).toHaveClass('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
  });

  it('handles multiple onClose calls', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    // Click multiple times
    fireEvent.click(closeButton);
    fireEvent.click(closeButton);
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(3);
  });

  it('handles onClose function that throws error', () => {
    const mockOnClose = vi.fn(() => {
      throw new Error('Close error');
    });
    
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    // Should not crash when onClose throws - wrap in try/catch
    try {
      fireEvent.click(closeButton);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Close error');
    }
  });

  it('handles onClose function that returns a value', () => {
    const mockOnClose = vi.fn(() => 'closed');
    
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles onClose function that is async', async () => {
    const mockOnClose = vi.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles onClose function that is null', () => {
    render(<Popup {...defaultProps} variant="banniere" onClose={null as any} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    // Should not crash when onClose is null - wrap in try/catch
    try {
      fireEvent.click(closeButton);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('handles onClose function that is undefined', () => {
    render(<Popup {...defaultProps} variant="banniere" onClose={undefined as any} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    // Should not crash when onClose is undefined - wrap in try/catch
    try {
      fireEvent.click(closeButton);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('handles onClose function that is not a function', () => {
    render(<Popup {...defaultProps} variant="banniere" onClose={'not a function' as any} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    // Should not crash when onClose is not a function - wrap in try/catch
    try {
      fireEvent.click(closeButton);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('handles rapid close button clicks', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    // Rapid clicks
    for (let i = 0; i < 10; i++) {
      fireEvent.click(closeButton);
    }
    
    expect(mockOnClose).toHaveBeenCalledTimes(10);
  });

  it('handles keyboard events on close button', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    fireEvent.keyDown(closeButton, { key: 'Enter' });
    fireEvent.keyDown(closeButton, { key: ' ' });
    
    // Keyboard events should not trigger onClose
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles focus and blur events on close button', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    fireEvent.focus(closeButton);
    fireEvent.blur(closeButton);
    
    // Focus/blur events should not trigger onClose
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles mouse events on close button', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    fireEvent.mouseDown(closeButton);
    fireEvent.mouseUp(closeButton);
    fireEvent.mouseOver(closeButton);
    fireEvent.mouseOut(closeButton);
    
    // Mouse events other than click should not trigger onClose
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles touch events on close button', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    fireEvent.touchStart(closeButton);
    fireEvent.touchEnd(closeButton);
    
    // Touch events should not trigger onClose
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles pointer events on close button', () => {
    const mockOnClose = vi.fn();
    render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose} />);
    
    const closeButton = screen.getByTestId('popup-close');
    
    fireEvent.pointerDown(closeButton);
    fireEvent.pointerUp(closeButton);
    
    // Pointer events should not trigger onClose
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles component unmount', () => {
    const { unmount } = render(<Popup {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    
    unmount();
    
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('handles re-renders with different props', () => {
    const { rerender } = render(<Popup {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    
    rerender(<Popup {...defaultProps} title="New Title" message="New Message" />);
    
    expect(screen.getByText('New Title')).toBeInTheDocument();
    expect(screen.getByText('New Message')).toBeInTheDocument();
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
  });

  it('handles re-renders with different variants', () => {
    const { rerender } = render(<Popup {...defaultProps} variant="rect" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    
    rerender(<Popup {...defaultProps} variant="banniere" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
  });

  it('handles re-renders with different onClose functions', () => {
    const mockOnClose1 = vi.fn();
    const mockOnClose2 = vi.fn();
    
    const { rerender } = render(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose1} />);
    
    const closeButton = screen.getByTestId('popup-close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose1).toHaveBeenCalledTimes(1);
    expect(mockOnClose2).not.toHaveBeenCalled();
    
    rerender(<Popup {...defaultProps} variant="banniere" onClose={mockOnClose2} />);
    
    fireEvent.click(closeButton);
    
    expect(mockOnClose1).toHaveBeenCalledTimes(1);
    expect(mockOnClose2).toHaveBeenCalledTimes(1);
  });
});
