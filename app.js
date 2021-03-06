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
  {header: 'Name', key: 'name1', width: 35},
  {header: 'Email', key: 'email1', width: 35},
  {header: 'Pass', key: 'password1', width: 35},
  {header: 'Reg Time', key: 'time', width: 20}
];

readXlsxFile('./users.xlsx').then((rows) => {
  getName(rows);
});

//функция заполнения полей.
function getName(rows) {
  if (rows.length === 0) {
    workbook.xlsx.writeFile('users.xlsx');
    driver.quit();
  }

  var sl =  Math.floor(Math.random()*1000);
  

  let column = rows.shift();
  let name = column[0];
  let email = column[1];
  let password = column[2];
  var now = new Date();
  

  driver.get('https://portal.kgainfo.spb.ru/KGAMap/Auth/Register').then(() => {
    driver.wait(
      until.elementLocated(By.xpath('//*[@id="fio"]')), 100000
    ).sendKeys(name).then(() => {
      driver.wait(
        until.elementLocated(By.xpath('//*[@id="username"]')), 100000
      ).sendKeys(email).then(() => {
        driver.wait(
          until.elementLocated(By.xpath('//*[@id="password1"]')), 100000
        ).sendKeys(password).then(() => {
          driver.wait(
            until.elementLocated(By.xpath('//*[@id="password2"]')), 100000
          ).sendKeys(password).then(() => {
            driver.wait(
              until.elementLocated(By.xpath('//*[@id="regform"]/div[5]/div[1]/span/button')), 100000
            ).click().then(() => {
              driver.wait(
              until.elementLocated(By.xpath('//*[@id="regButton"]')), 100000
              ).sendKeys(webdriver.Key.ENTER).then(() => {
                worksheet.addRow({name1: name, email1: email, password1: password, time: now});
                getName(rows);
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
    })
  });
}

