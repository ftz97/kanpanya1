import { test, expect } from "@playwright/test";

test.describe("Login ES i18n", () => {
  test("muestra errores 'required' en español cuando el formulario está vacío", async ({ page }) => {
    await page.goto("/es/login");

    // Le bouton doit être en ES
    await expect(page.getByRole("button", { name: /Iniciar sesión/i })).toBeVisible();

    // Soumission vide → erreurs i18n
    await page.getByRole("button", { name: /Iniciar sesión/i }).click();

    // Messages "required" (selon les clés que tu as dans auth.json)
    await expect(page.getByText(/El correo es obligatorio/i)).toBeVisible();
    await expect(page.getByText(/La contraseña es obligatoria/i)).toBeVisible();
  });

  test("muestra 'credenciales incorrectas' en español", async ({ page }) => {
    await page.goto("/es/login");

    // Remplir un email et mot de passe quelconques
    await page.getByLabel(/Correo electrónico/i).fill("noexiste@example.com");
    await page.getByLabel(/Contraseña/i).fill("wrong-password");

    // Submit
    await page.getByRole("button", { name: /Iniciar sesión/i }).click();

    // Dans l'implémentation fournie, on simule setError("password", { message: t("auth.login.errors.invalid") })
    // On vérifie donc le message d'erreur i18n "Credenciales incorrectas."
    await expect(page.getByText(/Credenciales incorrectas\./i)).toBeVisible();
  });
});


