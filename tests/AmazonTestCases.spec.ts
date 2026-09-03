import { test, expect } from '@playwright/test';

test('ValidateEndToEndShoppingWorkflow_XboxSeriesX', async ({ page }) => {
  let itemName = "Xbox Series X 1TB";

  await page.goto('https://www.amazon.com/');

  console.log("Searching parameter: " + itemName);
  // TODO: implement all logic that I code in Selenium, Nunit and C# test project to valiadate E2E on Amazon web site
});

test('ValidateEndToEndShoppingWorkflow_PlayStation5', async ({ page }) => {
  let itemName = "PlayStation 5 Disc Edition Console";

  await page.goto('https://www.amazon.com/');

  console.log("Searching parameter: " + itemName);
  // TODO: implement all logic that I code in Selenium, Nunit and C# test project to valiadate E2E on Amazon web site
});
