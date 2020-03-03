require('chromedriver');

const chrome = require('selenium-webdriver/chrome');
const {Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const readXlsxFile = require('read-excel-file/node');

var driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options()
    // .addArguments('--headless')
    .addArguments('--no-sandbox')
    .addArguments('--disable-dev-shm-usage')
    .addArguments("--lang=ru")
    .windowSize({width: 1280, height: 720}))
  .build();

readXlsxFile('./users.xlsx').then((rows) => {
  getName(rows);
});


//функция заполнения полей.
function getName(rows) {
  let column = rows.shift();
  driver.get('https://portal.kgainfo.spb.ru/KGAMap/Auth/Register').then(() => {
    driver.wait(
      until.elementLocated(By.xpath('//*[@id="fio"]')), 3000
    ).sendKeys(column[0]).then(() => {
      driver.wait(
        until.elementLocated(By.xpath('//*[@id="username"]')), 3000
      ).sendKeys(column[1]).then(() => {
        driver.wait(
          until.elementLocated(By.xpath('//*[@id="password1"]')), 3000
        ).sendKeys(column[2]).then(() => {
          driver.wait(
            until.elementLocated(By.xpath('//*[@id="password2"]')), 3000
          ).sendKeys(column[2]).then(() => {
            driver.wait(
              until.elementLocated(By.xpath('//*[@id="regform"]/div[5]/div[1]/span/button')), 3000
            ).click().then(() => {
              driver.wait(
                until.elementLocated(By.xpath('//*[@id="regButton"]')), 3000
              ).sendKeys(webdriver.Key.ENTER).then(() => {
                getName(rows);
                /*driver.wait(
                    until.elementLocated(By.xpath('//*[@id="wob_d"]/div/div[2]/div[3]')), 3000
                ).getAttribute('innerText').then((t5) => {
                    console.log((str.charAt(0).toUpperCase() + str.slice(1)) + ': ' + t1 + '. Температура: ' + t2 + '(С). ' + t3 + '. ' + t4 + '. ' + t5);
                    driver.quit();
                }).catch(() => {
                });*/
              }).catch(() => {
              });
            }).catch(() => {
            });
          }).catch(() => {
          });
        }).catch(() => {
        });
      }).catch(() => {
      });
    });
  });
}