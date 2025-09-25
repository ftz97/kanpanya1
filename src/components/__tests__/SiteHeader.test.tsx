import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SiteHeader } from "../site-header";

// Mock de Next.js Link
vi.mock("next/link", () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("SiteHeader", () => {
  it("s'affiche avec le logo Kanpanya", () => {
    render(<SiteHeader />);
    
    expect(screen.getByText("Kanpanya")).toBeInTheDocument();
  });

  it("contient tous les liens de navigation", () => {
    render(<SiteHeader />);
    
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Commerçants")).toBeInTheDocument();
    expect(screen.getByText("Offres")).toBeInTheDocument();
    expect(screen.getByText("Plus")).toBeInTheDocument();
  });

  it("contient le bouton 'Ma carte'", () => {
    render(<SiteHeader />);
    
    expect(screen.getByText("Ma carte")).toBeInTheDocument();
  });

  it("a les bons liens href", () => {
    render(<SiteHeader />);
    
    expect(screen.getByText("Accueil").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Commerçants").closest("a")).toHaveAttribute("href", "/commercants");
    expect(screen.getByText("Offres").closest("a")).toHaveAttribute("href", "/offres");
    expect(screen.getByText("Ma carte").closest("a")).toHaveAttribute("href", "/carte");
  });
});

