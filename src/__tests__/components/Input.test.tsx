import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('affiche le placeholder correctement', () => {
    render(<Input placeholder="Tapez votre texte" />);
    expect(screen.getByPlaceholderText('Tapez votre texte')).toBeInTheDocument();
  });

  it('affiche la valeur par défaut', () => {
    render(<Input defaultValue="Valeur par défaut" />);
    expect(screen.getByDisplayValue('Valeur par défaut')).toBeInTheDocument();
  });

  it('appelle onChange quand la valeur change', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'nouvelle valeur' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'nouvelle valeur' })
    }));
  });

  it('est désactivé quand disabled=true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('affiche les classes CSS correctes', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border');
  });

  it('applique les classes personnalisées', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('gère les différents types d\'input', () => {
    const { rerender } = render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');

    rerender(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    // Les inputs de type password n'ont pas le rôle textbox
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
  });

  it('gère les attributs HTML standard', () => {
    render(
      <Input 
        id="test-input"
        name="testName"
        required
        maxLength={50}
        minLength={2}
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'testName');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('maxLength', '50');
    expect(input).toHaveAttribute('minLength', '2');
  });

  it('gère le focus et le blur', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('gère les événements clavier', () => {
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();
    
    render(<Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />);
    
    const input = screen.getByRole('textbox');
    
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    
    fireEvent.keyUp(input, { key: 'Enter' });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it('gère la valeur contrôlée', () => {
    const handleChange = vi.fn();
    render(<Input value="valeur contrôlée" onChange={handleChange} />);
    
    const input = screen.getByDisplayValue('valeur contrôlée');
    expect(input).toHaveValue('valeur contrôlée');
    
    fireEvent.change(input, { target: { value: 'nouvelle valeur' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('gère les refs correctement', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('affiche le focus ring correctement', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    expect(input).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-[#17BFA0]');
  });

  it('gère les fichiers avec type="file"', () => {
    render(<Input type="file" />);
    // Les inputs de type file n'ont pas de rôle spécifique
    const input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'file');
  });
});

