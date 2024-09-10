const {scrape} = require("./scrape");
const {
    appendFileSync,
    writeFileSync,
    existsSync,
    mkdirSync,
} = require("node:fs");

const PRODUCT_FILE_NAME = "product.txt";

const urls = [
    // "https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202",
    // "https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-2-5-950g--310778",
    // "https://www.vprok.ru/product/makfa-makfa-izd-mak-spirali-450g--306739",
    // "https://www.vprok.ru/product/greenfield-greenf-chay-gold-ceyl-bl-pak-100h2g--307403",
    // "https://www.vprok.ru/product/chaykofskiy-chaykofskiy-sahar-pesok-krist-900g--308737",
    // "https://www.vprok.ru/product/lavazza-kofe-lavazza-1kg-oro-zerno--450647",
    // "https://www.vprok.ru/product/parmalat-parmal-moloko-pit-ulster-3-5-1l--306634",
    // "https://www.vprok.ru/product/perekrestok-spmi-svinina-duhovaya-1kg--1131362",
    // "https://www.vprok.ru/product/vinograd-kish-mish-1-kg--314623",
    // "https://www.vprok.ru/product/eko-kultura-tomaty-cherri-konfetto-250g--946756",
    // "https://www.vprok.ru/product/bio-perets-ramiro-1kg--476548",
    // "https://www.vprok.ru/product/korkunov-kollektsiya-shokoladnyh-konfet-korkunov-iz-molochnogo-shokolada-s-fundukom-karamelizirovannym-gretskim-orehom-vafley-svetloy-orehovoy--1295690",
    "https://www.vprok.ru/product/picnic-picnic-batonchik-big-76g--311996",
    "https://www.vprok.ru/product/ritter-sport-rit-sport-shokol-tsel-les-oreh-mol-100g--305088",
    // "https://www.vprok.ru/product/lays-chipsy-kartofelnye-lays-smetana-luk-140g--1197579"
]

const locations = [
    "Москва и область",
    "Санкт-Петербург и область",
    "Владимирская обл",
    "Калужская обл",
    "Рязанская обл",
    "Тверская обл",
    "Тульская обл",
]

async function scrapeAll() {
    async function createDir(url, isRecursive) {
        if (!existsSync(url)) {
            mkdirSync(url, {recursive: isRecursive});
        }
    }

    for (const url of urls) {
        let productUrl = url.split("/").slice(-1)[0];
        await createDir(productUrl, false);

        for (const location of locations) {
            let pathArchive = productUrl + "/" + location;
            await createDir(pathArchive, true);
            await writeFileSync(pathArchive + "/" + PRODUCT_FILE_NAME, "", (err) => {
                throw err;
            })
            await scrape(pathArchive, url, location).then((product) => {
                let output =
                    "price=" + product.price + "\n" +
                    "priceOld=" + product.priceOld + "\n" +
                    "rating=" + product.rating + "\n" +
                    "reviewCount=" + product.reviewCount
                appendTextFile(pathArchive + "/" + PRODUCT_FILE_NAME, output);
            });
        }
    }
}

function appendTextFile(fileName, output) {
    appendFileSync(fileName, output, (err) => {
        if (err) {
            if (err) throw err;
        }
    });
}

scrapeAll().then(() => {
});