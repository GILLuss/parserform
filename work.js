require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const Excel = require('exceljs');
const readXlsxFile = require('read-excel-file/node');

var driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options()
    .addArguments('--no-sandbox')
    .addArguments('--disable-dev-shm-usage')
    .addArguments("--lang=ru")
    .windowSize({width: 1280, height: 720}))
  .build();

const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet("My Sheet");
worksheet.columns = [
  {header: 'key', key: 'key1', width: 35},
 
];

readXlsxFile('./Nomer.xlsx').then((rows) => {
  getName(rows);
});

//функция заполнения полей.
function getName(rows) {
  if (rows.length === 0) {
    workbook.xlsx.writeFile('out.xlsx');
    driver.quit();
  }

  var sl =  Math.floor(Math.random()*1000);
  

  let column = rows.shift();
  let key = column[1];
//  let email = column[1];
// let password = column[2];
 // var now = new Date();
  

  driver.get('https://rosreestr.ru/wps/portal/p/cc_present/EGRN_6').then(() => {
    driver.wait(
      until.elementLocated(By.xpath('//*[@id="v-Z7_01HA1A42KGCRB0AB2K9HQJ20C3"]/div/div[2]/div/div[1]/div/div/div/div[1]/div/div/div/div[2]/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div[4]/div/div/div/div[1]/div/div/div/div/div[2]/div/div/div/div[2]/div/div/div/div[1]/div/input')), 3000
    ).sendKeys(key).then(() => {
      driver.wait(
        until.elementLocated(By.xpath('//*[@id="v-Z7_01HA1A42KGCRB0AB2K9HQJ20C3"]/div/div[2]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[2]/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div[4]/div/div/div/div[1]/div/div/div/div/div[3]/div/div/div/div[2]/div/div/div/div[1]/div/textarea')), 3000
      ).sendKeys(key).then(() => {
        driver.wait(
          /*until.elementLocated(By.xpath('//*[@id="v-Z7_01HA1A42KGCRB0AB2K9HQJ20C3"]/div/div[2]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[5]/div/div/div/div[2]/div/div/div/div[1]/div/div/span/span')), 100000
        ).click().then(() => {
          driver.wait(
            until.elementLocated(By.xpath('//*[@id="password2"]')), 100000
          ).sendKeys(password).then(() => {
            driver.wait(
              until.elementLocated(By.xpath('//*[@id="regform"]/div[5]/div[1]/span/button')), 100000
            ).click().then(() => {
              driver.wait(
              until.elementLocated(By.xpath('//*[@id="regButton"]')), 100000
              ).sendKeys(webdriver.Key.ENTER).then(() => {
                //worksheet.addRow({name1: name, email1: email, password1: password, time: now});
                getName(rows);
              }).catch(() => {
              });
            }).catch(() => {
            });
         })*/.catch(() => {
          });
        }).catch(() => {
        });
      }).catch(() => {
      });
    })
  });
}

