const puppeteer = require('puppeteer');

const URL = process.argv[2];
const LOCATION = process.argv[3];

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(URL);

    await page.setViewport({width: 1080, height: 1024});
    await page.screenshot({path: 'screenshot.jpg'});

    if (await page.waitForSelector('.Region_region__6OUBn')) {
        await page.locator('.Region_region__6OUBn').click();
    }
    if (await page.waitForSelector('.UiRegionListBase_list__cH0fK')) {
        let li = await page.$eval('li["Санкт-Петербург и область"]', (el, LOCATION) =>
            el.textContent
        );
        console.log(li);
        // let li = await page.$eval('.UiRegionListBase_list__cH0fK', (el, LOCATION) => {
        //     let lis = el.querySelectorAll("li")
        //     for (const liKey in lis) {
        //         let li = lis[liKey]
        //         if (li.textContent?.includes(LOCATION)) {
        //             return li.waitHandle();
        //         }
        //     }
        // }, LOCATION);
        // console.log(li);
        // li.click();
    }

    if (await page.waitForSelector('.Region_region__6OUBn')) {
        let qwer = await page.$eval('.Region_region__6OUBn', (el) => el.textContent);
        console.log(qwer)
    }

    const textSelector = await page.locator('.Price_price__QzA8L').waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    console.log(fullTitle);

    await browser.close();
};

scrape().then(() => {
});