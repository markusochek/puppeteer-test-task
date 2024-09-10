const puppeteer = require('puppeteer');
const {writeFile, appendFile, mkdir} = require("node:fs");

const CLASS_NAME_LOCATION_CHOICE = '.Region_region__6OUBn';
const CLASS_NAME_PRICE = '.PriceInfo_root__GX9Xp';
const CLASS_NAME_PRODUCT_RATING = '.ActionsRow_stars__EKt42';
const CLASS_NAME_PRODUCT_REVIEW_COUNT = '.ActionsRow_reviews__AfSj_';

const PRODUCT_FILE_NAME = "product";

const scrape = async (url, location) => {
    let product = {
        price: "",
        oldPrice: "",
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
        let [priceOld, price] = parsingString.split(' ').filter(item => !isNaN(parseFloat(item.replace(',', '.'))));
        product.price = price;
        product.priceOld = priceOld;
    });
    await scraping(page, CLASS_NAME_PRODUCT_RATING).then((rating) => {
        product.rating = rating;
    });
    await scraping(page, CLASS_NAME_PRODUCT_REVIEW_COUNT).then((reviewCountAndSymbol) => {
        product.reviewCount = reviewCountAndSymbol.split(' ')[0];
    });
    await page.screenshot({path: 'screenshot.jpg'});

    await browser.close();

    return product;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function clickByClassName(page, classNameLocationChoice) {
    let el = await page.waitForSelector(classNameLocationChoice);
    await el.click();
}

async function clickByText(page, text) {
    let el = await page.waitForSelector(`text/${text}`);
    await el.click();
}

async function scraping(page, className) {
    return await page.$eval(className, el => el.textContent);
}

module.exports = {scrape};