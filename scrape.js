const puppeteer = require('puppeteer');

const CLASS_NAME_LOCATION_CHOICE = '.Region_region__6OUBn';
const CLASS_NAME_PRICE = '.PriceInfo_root__GX9Xp';
const CLASS_NAME_PRODUCT_RATING = '.ActionsRow_stars__EKt42';
const CLASS_NAME_PRODUCT_REVIEW_COUNT = '.ActionsRow_reviews__AfSj_';

const scrape = async (pathArchive, url, location) => {
    let product = {
        price: "",
        priceOld: "",
        rating: "",
        reviewCount: "",
    };

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920, 1080'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto(url, {waitUntil: "domcontentloaded"});

    // возможно костыль на задержку,
    // но почитав мануал и комментарии к проблеме с начальной многократной перезагрузкой страницы,
    // не нашел другого 100% способа получения данных
    await sleep(5000);
    await clickByClassName(page, CLASS_NAME_LOCATION_CHOICE);
    await clickByText(page, location);
    await sleep(2000);
    await scraping(page, CLASS_NAME_PRICE).then((parsingString) => {
        let prices = parsingString?.split(' ').filter(item => !isNaN(parseFloat(item.replace(',', '.'))));
        if (prices) {
            let [priceOld, price] = prices;

            if (price?.includes('\xa0')) {
                price = price.replace('\xa0', '');
            }
            if (priceOld?.includes('\xa0')) {
                priceOld = priceOld.replace('\xa0', '');
            }

            product.price = (price) ? price: null;
            product.priceOld = (priceOld) ? priceOld: null;
        } else {
            product.price = null;
            product.priceOld = null;
        }
    });
    await scraping(page, CLASS_NAME_PRODUCT_RATING).then((rating) => {
        product.rating = (rating) ? rating: null;
    });
    await scraping(page, CLASS_NAME_PRODUCT_REVIEW_COUNT).then((reviewCountAndSymbol) => {
        let reviewCount = reviewCountAndSymbol?.split(' ')[0];
        product.reviewCount = (reviewCount) ? reviewCount: null;
    });
    await page.screenshot({path: `${pathArchive}/screenshot.jpg`});

    await browser.close();

    return product;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function clickByClassName(page, classNameLocationChoice) {
    try {
    let el = await page.waitForSelector(classNameLocationChoice);
    await el.click();
    } catch (e) {
        console.log(e);
    }
}

async function clickByText(page, text) {
    try {
        let el = await page.waitForSelector(`text/${text}`);
        await el.click();
    } catch (e) {
        console.log(e);
    }
}

async function scraping(page, className) {
    try {
        let el = await page.waitForSelector(className, {timeout: 5000});
        return await el.evaluate(el => el.textContent);
    } catch (e) {
        console.log(`element by ${className} was not found on page`);
        return null;
    }
}

module.exports = {scrape};