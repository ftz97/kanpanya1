import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('utils', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('handles empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles single class name', () => {
      const result = cn('single-class');
      expect(result).toBe('single-class');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      );
      
      expect(result).toBe('base-class active-class');
    });

    it('handles object syntax', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      });
      
      expect(result).toBe('class1 class3');
    });

    it('handles array syntax', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('handles mixed syntax', () => {
      const result = cn(
        'base-class',
        ['array-class1', 'array-class2'],
        {
          'object-class1': true,
          'object-class2': false,
        },
        'final-class'
      );
      
      expect(result).toBe('base-class array-class1 array-class2 object-class1 final-class');
    });

    it('handles undefined and null values', () => {
      const result = cn(
        'class1',
        undefined,
        'class2',
        null,
        'class3'
      );
      
      expect(result).toBe('class1 class2 class3');
    });

    it('handles empty strings', () => {
      const result = cn('class1', '', 'class2', '   ', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('merges Tailwind classes correctly', () => {
      const result = cn('px-2 px-4', 'py-1 py-3');
      expect(result).toBe('px-4 py-3');
    });

    it('handles conflicting Tailwind classes', () => {
      const result = cn('bg-red-500', 'bg-blue-500');
      expect(result).toBe('bg-blue-500');
    });

    it('handles responsive classes', () => {
      const result = cn('text-sm md:text-base', 'text-xs md:text-lg');
      expect(result).toBe('text-xs md:text-lg');
    });

    it('handles pseudo-classes', () => {
      const result = cn('hover:bg-red-500', 'hover:bg-blue-500');
      expect(result).toBe('hover:bg-blue-500');
    });

    it('handles complex Tailwind combinations', () => {
      const result = cn(
        'flex items-center justify-center',
        'flex items-start justify-start',
        'p-4 p-2',
        'rounded-lg rounded-md'
      );
      
      expect(result).toBe('flex items-start justify-start p-2 rounded-md');
    });

    it('preserves non-Tailwind classes', () => {
      const result = cn('custom-class', 'another-custom-class');
      expect(result).toBe('custom-class another-custom-class');
    });

    it('handles mixed Tailwind and custom classes', () => {
      const result = cn('bg-red-500 custom-class', 'bg-blue-500 another-custom');
      expect(result).toBe('custom-class bg-blue-500 another-custom');
    });

    it('handles deeply nested objects', () => {
      const result = cn({
        'class1': true,
        'class2': {
          'nested-class': true,
        },
      });
      
      expect(result).toBe('class1 class2');
    });

    it('handles function calls', () => {
      const getClass = () => 'dynamic-class';
      const result = cn('static-class', getClass());
      expect(result).toBe('static-class dynamic-class');
    });

    it('handles numeric values', () => {
      const result = cn('class1', 0, 'class2', 1, 'class3');
      expect(result).toBe('class1 class2 1 class3');
    });

    it('handles boolean values', () => {
      const result = cn('class1', true, 'class2', false, 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('handles complex conditional logic', () => {
      const isActive = true;
      const isVisible = false;
      const count = 5;
      
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isVisible && 'visible-class',
        count > 3 && 'count-class',
        count === 5 && 'exact-count-class'
      );
      
      expect(result).toBe('base-class active-class count-class exact-count-class');
    });

    it('handles multiple object conditions', () => {
      const result = cn(
        {
          'class1': true,
          'class2': false,
        },
        {
          'class3': true,
          'class4': true,
        }
      );
      
      expect(result).toBe('class1 class3 class4');
    });

    it('handles nested arrays', () => {
      const result = cn(
        ['class1', ['class2', 'class3']],
        'class4'
      );
      
      expect(result).toBe('class1 class2 class3 class4');
    });

    it('handles very long class lists', () => {
      const classes = Array.from({ length: 100 }, (_, i) => `class-${i}`);
      const result = cn(...classes);
      
      expect(result).toContain('class-0');
      expect(result).toContain('class-99');
      expect(result.split(' ')).toHaveLength(100);
    });

    it('handles special characters in class names', () => {
      const result = cn('class-with-dash', 'class_with_underscore', 'class.with.dots');
      expect(result).toBe('class-with-dash class_with_underscore class.with.dots');
    });

    it('handles whitespace in class names', () => {
      const result = cn('  class1  ', '  class2  ', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('handles duplicate classes', () => {
      const result = cn('class1', 'class2', 'class1', 'class3');
      expect(result).toBe('class1 class2 class1 class3');
    });

    it('handles Tailwind class variants', () => {
      const result = cn(
        'text-sm font-medium',
        'text-lg font-bold',
        'text-red-500 text-blue-500'
      );
      
      expect(result).toBe('text-lg font-bold text-blue-500');
    });

    it('handles focus and active states', () => {
      const result = cn(
        'focus:ring-2 focus:ring-blue-500',
        'focus:ring-4 focus:ring-red-500',
        'active:scale-95 active:scale-105'
      );
      
      expect(result).toBe('focus:ring-4 focus:ring-red-500 active:scale-105');
    });

    it('handles dark mode classes', () => {
      const result = cn(
        'bg-white dark:bg-gray-800',
        'bg-gray-100 dark:bg-gray-900'
      );
      
      expect(result).toBe('bg-gray-100 dark:bg-gray-900');
    });

    it('handles arbitrary values', () => {
      const result = cn(
        'w-[100px] h-[200px]',
        'w-[150px] h-[250px]'
      );
      
      expect(result).toBe('w-[150px] h-[250px]');
    });

    it('handles important modifier', () => {
      const result = cn(
        '!text-red-500',
        '!text-blue-500'
      );
      
      expect(result).toBe('!text-blue-500');
    });

    it('handles group and peer modifiers', () => {
      const result = cn(
        'group-hover:text-red-500',
        'group-hover:text-blue-500',
        'peer-focus:text-green-500'
      );
      
      expect(result).toBe('group-hover:text-blue-500 peer-focus:text-green-500');
    });

    it('handles complex responsive and state combinations', () => {
      const result = cn(
        'text-sm md:text-base lg:text-lg',
        'text-xs md:text-sm lg:text-xl',
        'hover:text-red-500 focus:text-blue-500',
        'hover:text-green-500 focus:text-purple-500'
      );
      
      expect(result).toBe('text-xs md:text-sm lg:text-xl hover:text-green-500 focus:text-purple-500');
    });

    it('handles empty objects and arrays', () => {
      const result = cn('class1', {}, [], 'class2');
      expect(result).toBe('class1 class2');
    });

    it('handles functions that return objects', () => {
      const getClasses = () => ({ 'dynamic-class': true, 'another-class': false });
      const result = cn('static-class', getClasses());
      expect(result).toBe('static-class dynamic-class');
    });

    it('handles functions that return arrays', () => {
      const getClasses = () => ['dynamic-class1', 'dynamic-class2'];
      const result = cn('static-class', getClasses());
      expect(result).toBe('static-class dynamic-class1 dynamic-class2');
    });

    it('handles functions that return strings', () => {
      const getClasses = () => 'dynamic-class';
      const result = cn('static-class', getClasses());
      expect(result).toBe('static-class dynamic-class');
    });

    it('handles functions that return falsy values', () => {
      const getClasses = () => false;
      const result = cn('static-class', getClasses());
      expect(result).toBe('static-class');
    });

    it('handles functions that return null or undefined', () => {
      const getClasses = () => null;
      const getClasses2 = () => undefined;
      const result = cn('static-class', getClasses(), getClasses2());
      expect(result).toBe('static-class');
    });
  });
});
