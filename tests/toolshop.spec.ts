import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page, baseURL }) => {
    await page.goto("/");
    let homeLink = await page.getByRole('link', { name: "Home" });
    await expect(await page.url()).toContain(baseURL!);
    await expect(homeLink).toBeVisible();
})

test('TC-PROD-001 Products are displayed on the homepage', async ({ page }) => {
    /*
    Open homepage
    locate the product area
    verify products exist
    locator.count()
    expect(locator).tohavecount()
    */
    await page.goto('/',
        { waitUntil: 'domcontentloaded' }
    );
    await expect(await page.getByTestId('compare-btn').first()).toBeVisible();
    const productCount = await page.getByTestId('compare-btn').count();
    await expect(productCount).toBe(9);
    //
})

test('TC-SEARCH-001 User can search for a product', async ({ page }) => {
    /*
    Open homepage
    Find search input
    enter product term
    submit search
    verify matching result
    */
    await page.goto('/',
        { waitUntil: 'domcontentloaded' }
    );
    const productToSearch = "Square Ruler";
    const searchBarLocator = page.getByLabel('Search');
    const searchBarButton = page.getByRole('button', { name: "Search " });
    const targetCard = page.getByRole('link').filter({ hasText: productToSearch });

    await expect(searchBarLocator).toBeVisible();
    await searchBarLocator.fill(productToSearch);
    await searchBarButton.click();

    await expect(await targetCard).toBeVisible();
    await expect(await page.getByTestId("compare-btn")).toHaveCount(1);
})

/*
 * What is page?

Why is page provided to the test?

Why do I need async?

Why do Playwright methods use await?

What is a Locator?

What is expect()?

What exactly makes this test pass?

What exactly would make it fail?
 */