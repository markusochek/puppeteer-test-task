const puppeteer = require('puppeteer');

const URL = process.argv[2];
const LOCATION = process.argv[3];

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(URL);

    await page.setViewport({width: 1080, height: 1024});
    await page.screenshot({path: 'screenshot.jpg'});

    await page.locator('.Region_region__6OUBn').click();
    let text = await page.locator('.UiRegionListBase_list__cH0fK').waitHandle();
    console.log(LOCATION)
    // .UiRegionListBase_list__cH0fK'
    let qwerty = await text?.evaluate(el => el.querySelector("li[title=" + LOCATION + "]"));
    console.log(qwerty);
    console.log(qwe)
    // await (await page.$(`[title="${LOCATION}"]`)).click();
    const textSelector = await page.locator('.Price_price__QzA8L').waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    console.log(fullTitle);

    await browser.close();
};

scrape().then(() => {
});