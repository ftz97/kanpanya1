"use client";

import { LayoutProps } from '../types';

export function PageLayout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-[#F2F2F2] ${className}`}>
      {children}
    </div>
  );
}

export function Container({ children, className = '' }: LayoutProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Card({ children, className = '' }: LayoutProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Section({ children, className = '' }: LayoutProps) {
  return (
    <section className={`py-8 ${className}`}>
      {children}
    </section>
  );
}
