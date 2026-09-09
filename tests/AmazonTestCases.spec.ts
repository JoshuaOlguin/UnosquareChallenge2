import { test, expect } from '@playwright/test';
import { Home } from '../pages/Home';
import { SearchFor } from '../pages/SearchFor'; 

test('ValidateEndToEndShoppingWorkflow_XboxSeriesX', async ({ page }) => {
  let itemName = "Xbox Series X 1TB";

  await page.goto('https://www.amazon.com/');

  const homePage = new Home(page);
  await homePage.continueShopping();
  await homePage.searchForProduct(itemName);

  const searchForWebPage = new SearchFor(page);
  const selectedItem = await searchForWebPage.selectFirstAvailableItemOfSearchResult();

  if (!selectedItem) {
    console.log("No items with a price were found in the search results.");
    return;
  }
  
  const selectedProductPrice = await searchForWebPage.getPriceOfFirstItemOfSearchResult(selectedItem);
  await searchForWebPage.clickOnSelectedItem(selectedItem);

  //Testing YAML file
});

test('ValidateEndToEndShoppingWorkflow_PlayStation5', async ({ page }) => {
  let itemName = "PlayStation 5 Disc Edition Console";
  await page.goto('https://www.amazon.com/');

  let continueShoppingButton = await page.getByRole('button', { name: 'Continue shopping' }); 

  if( await continueShoppingButton.isVisible()) {
    await continueShoppingButton.click();
  } 

  console.log("Searching parameter: " + itemName);
  await page.getByRole('searchbox', { name: 'Search Amazon' }).fill(itemName);
  await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');

});

