const puppeteer = require('puppeteer');
// Or import puppeteer from 'puppeteer-core';

async function qwerty() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

// Navigate the page to a URL.
    await page.goto('https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202');

// Set screen size.
    await page.setViewport({width: 1080, height: 1024});

// Type into search box.
    await page.locator('.devsite-search-field').fill('automate beyond recorder');

// Wait and click on first result.
    await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
    const textSelector = await page
        .locator('text/Customize and automate')
        .waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

// Print the full title.
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
}

qwerty().then(r => {})