import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea Component', () => {
  it('renders textarea correctly', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('displays placeholder text', () => {
    render(<Textarea placeholder="Tapez votre message ici" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Tapez votre message ici');
  });

  it('displays default value', () => {
    render(<Textarea defaultValue="Valeur par défaut" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Valeur par défaut');
  });

  it('handles controlled value', () => {
    const { rerender } = render(<Textarea value="Valeur contrôlée" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Valeur contrôlée');

    rerender(<Textarea value="Nouvelle valeur" data-testid="textarea" />);
    expect(textarea).toHaveValue('Nouvelle valeur');
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} data-testid="textarea" />);
    
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'Nouveau texte' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'Nouveau texte' })
    }));
  });

  it('can be disabled', () => {
    render(<Textarea disabled data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-textarea" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('has correct base classes', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass(
      'flex',
      'min-h-[80px]',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2',
      'text-sm',
      'ring-offset-background'
    );
  });

  it('has focus styles', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-[#17BFA0]',
      'focus-visible:ring-offset-2'
    );
  });

  it('handles ref correctly', () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} data-testid="textarea" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} data-testid="textarea" />);
    
    const textarea = screen.getByTestId('textarea');
    
    fireEvent.focus(textarea);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(textarea);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', () => {
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();
    
    render(<Textarea onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} data-testid="textarea" />);
    
    const textarea = screen.getByTestId('textarea');
    
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    
    fireEvent.keyUp(textarea, { key: 'Enter' });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it('handles HTML attributes', () => {
    render(
      <Textarea 
        id="test-textarea"
        name="testName"
        rows={5}
        cols={30}
        maxLength={100}
        minLength={10}
        required
        readOnly
        data-testid="textarea"
      />
    );
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'testName');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '30');
    expect(textarea).toHaveAttribute('maxLength', '100');
    expect(textarea).toHaveAttribute('minLength', '10');
    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveAttribute('readOnly');
  });

  it('handles multiline text correctly', () => {
    const multilineText = 'Ligne 1\nLigne 2\nLigne 3';
    render(<Textarea defaultValue={multilineText} data-testid="textarea" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue(multilineText);
  });

  it('handles resize attribute', () => {
    const { rerender } = render(<Textarea resize="none" data-testid="textarea" />);
    let textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle({ resize: 'none' });

    rerender(<Textarea resize="both" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle({ resize: 'both' });

    rerender(<Textarea resize="vertical" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle({ resize: 'vertical' });

    rerender(<Textarea resize="horizontal" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle({ resize: 'horizontal' });
  });

  it('handles auto-resize behavior', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    
    // Vérifier que la hauteur minimale est définie
    expect(textarea).toHaveClass('min-h-[80px]');
  });

  it('handles placeholder styling', () => {
    render(<Textarea placeholder="Placeholder de test" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('placeholder:text-muted-foreground');
  });

  it('handles form integration', () => {
    render(
      <form>
        <Textarea name="message" data-testid="textarea" />
      </form>
    );
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('name', 'message');
  });

  it('handles validation attributes', () => {
    render(
      <Textarea 
        required
        minLength={5}
        maxLength={200}
        pattern="[A-Za-z ]+"
        data-testid="textarea"
      />
    );
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveAttribute('minLength', '5');
    expect(textarea).toHaveAttribute('maxLength', '200');
    expect(textarea).toHaveAttribute('pattern', '[A-Za-z ]+');
  });

  it('handles accessibility attributes', () => {
    render(
      <Textarea 
        aria-label="Zone de texte pour commentaires"
        aria-describedby="textarea-help"
        aria-invalid="false"
        data-testid="textarea"
      />
    );
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-label', 'Zone de texte pour commentaires');
    expect(textarea).toHaveAttribute('aria-describedby', 'textarea-help');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');
  });

  it('handles different content types', () => {
    // Test avec valeur contrôlée
    const { rerender } = render(<Textarea value="Texte simple" data-testid="textarea" />);
    let textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Texte simple');

    rerender(<Textarea value="Texte avec émojis 🎉 🚀" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Texte avec émojis 🎉 🚀');

    rerender(<Textarea value="Texte avec caractères spéciaux: àéèùç" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Texte avec caractères spéciaux: àéèùç');
  });
});

