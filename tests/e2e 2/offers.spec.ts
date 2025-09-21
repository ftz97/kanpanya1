import { test, expect } from "@playwright/test";

test.use({ storageState: "storageState.json" });

test("create flash offer via API and see it in list", async ({ request, page }) => {
  const now = new Date();
  const ends = new Date(now.getTime() + 60 * 60 * 1000).toISOString();

  const res = await request.post("/api/flash-offers", {
    data: { 
      title: "Test Offer", 
      description: "Test description",
      starts_at: new Date().toISOString(),
      ends_at: ends,
      price: 29.90,
      is_active: true
    }
  });
  
  console.log('STATUS', res.status());
  console.log('BODY', await res.text());
  
  expect(res.ok()).toBeTruthy();

  await page.goto("/dashboard/offers");
  await expect(page.getByText("Test Offer")).toBeVisible();
});
