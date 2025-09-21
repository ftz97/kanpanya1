export type Role = 'admin' | 'merchant' | 'client'

/**
 * Les patterns sont des chaînes RegExp (ex: "^/admin(?:/.*)?$")
 * → on les compile en RegExp dans un helper.
 */
export const authRoutesConfig = {
  /** Toujours accessibles (pas de session requise) */
  whitelist: [
    '^/$',                 // landing
    '^/login$',
    '^/signup$',
    '^/terms$',
    '^/privacy$',
    '^/public(?:/.*)?$',   // tout sous /public
  ],

  /** Toujours bloquées (maintenance, bêta privée, etc.) */
  blacklist: [
    // '^/beta(?:/.*)?$',
  ],

  /** Pages réservées aux invités (rediriger si déjà connecté) */
  guestOnly: [
    '^/login$',
    '^/signup$',
  ],

  /**
   * Politiques d'accès par rôles
   * - allowed: 'unknown' → besoin d'être connecté, rôle libre
   * - allowed: ['admin', ...] → doit avoir au moins un rôle listé
   */
  policies: [
    { pattern: '^/dashboard(?:/.*)?$', allowed: 'unknown' },
    { pattern: '^/app(?:/.*)?$',       allowed: 'unknown' },
    { pattern: '^/admin(?:/.*)?$',     allowed: ['admin'] },
    { pattern: '^/merchant(?:/.*)?$',  allowed: ['merchant', 'admin'] },
    { pattern: '^/client(?:/.*)?$',    allowed: ['client', 'admin'] },
    // API d'admin (exemple)
    { pattern: '^/api/admin(?:/.*)?$', allowed: ['admin'] },
  ],
} as const




