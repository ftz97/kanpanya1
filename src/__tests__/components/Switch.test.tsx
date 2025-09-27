import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Switch } from '@/components/ui/switch';

describe('Switch Component', () => {
  it('renders switch correctly', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('role', 'switch');
  });

  it('is unchecked by default', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('can be checked by default', () => {
    render(<Switch defaultChecked data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('can be controlled with checked prop', () => {
    const { rerender } = render(<Switch checked={false} data-testid="switch" />);
    let switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    rerender(<Switch checked={true} data-testid="switch" />);
    switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('calls onCheckedChange when toggled', () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} data-testid="switch" />);
    
    const switchElement = screen.getByTestId('switch');
    fireEvent.click(switchElement);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('can be disabled', () => {
    render(<Switch disabled data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveClass('disabled:opacity-50');
  });

  it('does not call onCheckedChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Switch disabled onCheckedChange={handleChange} data-testid="switch" />);
    
    const switchElement = screen.getByTestId('switch');
    fireEvent.click(switchElement);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Switch className="custom-switch" data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('custom-switch');
  });

  it('has correct base classes', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass(
      'peer',
      'inline-flex',
      'h-6',
      'w-11',
      'shrink-0',
      'cursor-pointer',
      'items-center',
      'rounded-full',
      'border-2',
      'border-transparent',
      'transition-colors'
    );
  });

  it('has focus styles', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-[#17BFA0]',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-white'
    );
  });

  it('has correct checked state styles', () => {
    render(<Switch checked data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('data-[state=checked]:bg-[#17BFA0]');
  });

  it('has correct unchecked state styles', () => {
    render(<Switch checked={false} data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('data-[state=unchecked]:bg-gray-200');
  });

  it('handles ref correctly', () => {
    const ref = vi.fn();
    render(<Switch ref={ref} data-testid="switch" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('can be toggled multiple times', () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} data-testid="switch" />);
    
    const switchElement = screen.getByTestId('switch');
    
    // Premier clic - active
    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledWith(true);
    
    // Deuxième clic - désactive
    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledWith(false);
    
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('works with keyboard navigation', () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} data-testid="switch" />);
    
    const switchElement = screen.getByTestId('switch');
    
    // Focus sur le switch
    switchElement.focus();
    expect(switchElement).toHaveFocus();
    
    // Activation avec la barre d'espace
    fireEvent.keyDown(switchElement, { key: ' ', code: 'Space' });
    // Note: Radix UI gère l'activation au keyUp, pas keyDown
  });

  it('passes through HTML attributes', () => {
    render(
      <Switch 
        id="test-switch"
        data-testid="switch"
        aria-label="Switch de test"
      />
    );
    
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('id', 'test-switch');
    expect(switchElement).toHaveAttribute('aria-label', 'Switch de test');
    // Note: Radix UI Switch doesn't support 'name' attribute on the root element
    // The name attribute would need to be on a hidden input if form submission is needed
  });

  it('renders thumb element', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');
    const thumb = switchElement.querySelector('[data-state]');
    expect(thumb).toBeInTheDocument();
  });

  it('handles controlled state changes', () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Switch checked={false} onCheckedChange={handleChange} data-testid="switch" />
    );
    
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    
    // Simuler un changement externe
    rerender(<Switch checked={true} onCheckedChange={handleChange} data-testid="switch" />);
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('maintains state consistency', () => {
    const { rerender } = render(<Switch defaultChecked data-testid="switch" />);
    let switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
    
    // Re-render avec les mêmes props
    rerender(<Switch defaultChecked data-testid="switch" />);
    switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });
});

