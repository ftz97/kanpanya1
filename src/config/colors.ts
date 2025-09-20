// Configuration des couleurs Kanpanya
// Utilisez ces couleurs dans toutes vos pages et composants

export const colors = {
  // Couleurs principales
  background: '#F2F2F2',
  card: '#FFFFFF',
  text: '#212E40',
  logo: '#17BFA0',
  
  // Couleurs d'accent
  primary: '#17BFA0',
  primaryHover: '#14a58d',
  cardAccent: '#0D8C75',
  teal: '#0D8C75',
  
  // Couleurs de texte
  textPrimary: '#212E40',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  
  // Gradients
  gradients: {
    partner: 'linear-gradient(90deg, #BCE8DF 0%, #C2F9DD 50%, #BCF7D2 100%)',
    flash: 'linear-gradient(90deg, #F2A0A0 0%, #F2C2C2 50%, #F2D5D5 100%)',
    community: 'linear-gradient(90deg, #E9FFF6 0%, #F2FDFB 100%)',
  },
  
  // Classes Tailwind personnalisées
  classes: {
    background: 'bg-[#F2F2F2]',
    card: 'bg-white',
    textPrimary: 'text-[#212E40]',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    primary: 'text-[#17BFA0]',
    primaryBg: 'bg-[#17BFA0]',
    primaryHover: 'hover:bg-[#14a58d]',
  }
} as const;

// Fonction utilitaire pour appliquer le style de page standard
export const getPageStyle = () => ({
  background: colors.background,
  minHeight: '100vh'
});

// Fonction utilitaire pour les boutons primaires
export const getPrimaryButtonStyle = () => ({
  background: colors.primary,
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '0.5rem',
  fontWeight: '600',
  transition: 'all 0.2s',
  border: 'none',
  cursor: 'pointer'
});

// Fonction utilitaire pour les cartes
export const getCardStyle = () => ({
  background: colors.card,
  borderRadius: '1rem',
  padding: '1.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  border: '1px solid #E5E7EB'
});
