Необходимо создать JS-скрипт для Node, который с помощью библиотеки puppeteer выбирает регион, делает полноразмерный скриншот страницы товара на сайте www.vprok.ru, а также получает из нее цену товара (если есть зачеркнутая, то две цены), рейтинг товара и количество отзывов на товар.
Скриншот надо сохранить на диск с именем screenshot.jpg.
Цены, рейтинг и количество отзывов надо сохранить на диск в файл product.txt.
Скрипт должен принимать два аргумента - адрес ссылки, которую надо обработать и регион.
Например, запускаем скрипт командой: 

node index.js https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202 "Санкт-Петербург и область"

На выходе получаем скриншот screenshot.jpg:

![2024-09-10_21-44-40](https://github.com/user-attachments/assets/bdc51987-ec3a-4118-b5eb-ed4d6559b1bf)

и файл с характеристиками товара product.txt с содержимым:
price=89.9
priceOld=134
rating=4.8
reviewCount=780

Примеры ссылок:
https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202
https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-2-5-950g--310778
https://www.vprok.ru/product/makfa-makfa-izd-mak-spirali-450g--306739
https://www.vprok.ru/product/greenfield-greenf-chay-gold-ceyl-bl-pak-100h2g--307403
https://www.vprok.ru/product/chaykofskiy-chaykofskiy-sahar-pesok-krist-900g--308737
https://www.vprok.ru/product/lavazza-kofe-lavazza-1kg-oro-zerno--450647 
https://www.vprok.ru/product/parmalat-parmal-moloko-pit-ulster-3-5-1l--306634 
https://www.vprok.ru/product/perekrestok-spmi-svinina-duhovaya-1kg--1131362
https://www.vprok.ru/product/vinograd-kish-mish-1-kg--314623 
https://www.vprok.ru/product/eko-kultura-tomaty-cherri-konfetto-250g--946756 
https://www.vprok.ru/product/bio-perets-ramiro-1kg--476548
https://www.vprok.ru/product/korkunov-kollektsiya-shokoladnyh-konfet-korkunov-iz-molochnogo-shokolada-s-fundukom-karamelizirovannym-gretskim-orehom-vafley-svetloy-orehovoy--1295690 
https://www.vprok.ru/product/picnic-picnic-batonchik-big-76g--311996 
https://www.vprok.ru/product/ritter-sport-rit-sport-shokol-tsel-les-oreh-mol-100g--305088 
https://www.vprok.ru/product/lays-chipsy-kartofelnye-lays-smetana-luk-140g--1197579 


Бонусом будет использование линтера и форматтера кода (это необязательно).

Результаты:

Код нужно залить в ваш репозиторий 
Скриншоты и текстовый файл с собранными данными добавить в архив (свой архив на каждый город) и залить туда же в репозиторий 
Ссылку на репозиторий с результатами пришлите пожалуйста в чат на hh 

Будем плюсом если в вашем репозиторие будут и другие ваши проекты, у которых мы тоже изучим код, чтобы обширнее и детальнее познакомиться с вашими навыками

Желаем удачи в выполнении и будем ждать результатов!
