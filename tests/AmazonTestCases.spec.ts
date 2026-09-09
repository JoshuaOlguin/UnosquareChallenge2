import { test, expect } from '@playwright/test';
import { Home } from '../pages/Home';
import { SearchFor } from '../pages/SearchFor'; 
import { DetailProduct } from '../pages/DetailPage';
import { Cart } from '../pages/Cart';

test('ValidateEndToEndShoppingWorkflow_XboxSeriesX', async ({ page }) => {
  let itemName = "Xbox Series X 1TB";

  await page.goto('https://www.amazon.com/');

  const homePage = new Home(page);
  await homePage.continueShopping();
  await homePage.searchForProduct(itemName);

  const searchForWebPage = new SearchFor(page);
  const selectedItem = await searchForWebPage.selectFirstAvailableItemOfSearchResult();

  if (!selectedItem) {
    throw new Error("No items with a price were found in the search results.");
  }
  
  const selectedProductPrice = await searchForWebPage.getPriceOfFirstItemOfSearchResult(selectedItem);
  await searchForWebPage.clickOnSelectedItem(selectedItem);

  const detailPage = new DetailProduct(page); 
  const detailProductPrice = await detailPage.getPriceOfProductValue();
  expect(detailProductPrice, 'Prices do not match between search result and detail page.').toBe(selectedProductPrice);  

  await detailPage.addToCartSelectedItem()
  await detailPage.refuseCoverageForAccidentalDamageProduct();
  await detailPage.clickOnGoToCartButton();
  expect(await detailPage.verifyCartCounter(),"Cart counter was not incremented.").toBeTruthy();

  const cartWebPage = new Cart(page);
  const cartSubtotal = await cartWebPage.getCartSubtotal();
  expect(cartSubtotal, 'Cart subtotal does not match the product price.').toBe(detailProductPrice);

  await cartWebPage.clickOnDeleteItemLink();
  expect(await cartWebPage.verifyEmptyCartOperation(), 'Cart is not empty after deleting the item.').toBeTruthy();
});

test('ValidateEndToEndShoppingWorkflow_PlayStation5', async ({ page }) => {
  let itemName = "PlayStation 5 Disc Edition Console";
  
  await page.goto('https://www.amazon.com/');

  const homePage = new Home(page);
  await homePage.continueShopping();
  await homePage.searchForProduct(itemName);

  const searchForWebPage = new SearchFor(page);
  const selectedItem = await searchForWebPage.selectFirstAvailableItemOfSearchResult();

  if (!selectedItem) {
    throw new Error("No items with a price were found in the search results.");
  }
  
  const selectedProductPrice = await searchForWebPage.getPriceOfFirstItemOfSearchResult(selectedItem);
  await searchForWebPage.clickOnSelectedItem(selectedItem);

  const detailPage = new DetailProduct(page); 
  const detailProductPrice = await detailPage.getPriceOfProductValue();
  expect(detailProductPrice, 'Prices do not match between search result and detail page.').toBe(selectedProductPrice);  

  await detailPage.addToCartSelectedItem()
  await detailPage.refuseCoverageForAccidentalDamageProduct();
  await detailPage.clickOnGoToCartButton();
  expect(await detailPage.verifyCartCounter(),"Cart counter was not incremented.").toBeTruthy();

  const cartWebPage = new Cart(page);
  const cartSubtotal = await cartWebPage.getCartSubtotal();
  expect(cartSubtotal, 'Cart subtotal does not match the product price.').toBe(detailProductPrice);

  await cartWebPage.clickOnDeleteItemLink();
  expect(await cartWebPage.verifyEmptyCartOperation(), 'Cart is not empty after deleting the item.').toBeTruthy();
});

