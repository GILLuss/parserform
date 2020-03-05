require('chromedriver');

const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');
const creds = require('./Google_sheets_Node.json');
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

readXlsxFile('./users.xlsx').then((rows) => {
  getName(rows);
});

async function accessSpreadsheet()
{
  const doc = new GoogleSpreadsheet('1-UOoem0tCxBFonUk1kRwkTkvcvo15M8RKNbxcqkDO7w');
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  const roWs = await promisify(sheet.getRows)({
offset: 1
  });
  console.log(roWs);
  //const row = {
  //  userName: name,
  //  userEmail: email,
  //  UserPass: password
  }
 // await promisify(sheet.addRow)(row);
//}

accessSpreadsheet();
//функция заполнения полей.
function getName(rows) {

 /* async function exTest(){
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    worksheet.columns = [
      {header: 'Name', key: 'name1', width: 35},
      {header: 'Email', key: 'email1', width: 35}, 
      {header: 'Pass', key: 'password1', width: 35},
      {header: 'Reg Time', key: 'time', width: 20}
    ];*/



  let column = rows.shift();
var array =new Array();
let name = column[0];
let email = column[1];
let password = column[2];
var now = new Date();


//worksheet.addRow({name1: name, email1: email, password1: password, time: now});
// save under export.xlsx
//workbook.xlsx.writeFile('Results.xlsx');

  driver.get('https://portal.kgainfo.spb.ru/KGAMap/Auth/Register').then(() => {
    driver.wait(

      until.elementLocated(By.xpath('//*[@id="fio"]')), 3000
    ).sendKeys(name).then(() => {
      driver.wait(
        until.elementLocated(By.xpath('//*[@id="username"]')), 3000
      ).sendKeys(email).then(() => {
        driver.wait(
          until.elementLocated(By.xpath('//*[@id="password1"]')), 3000
        ).sendKeys(password).then(() => {
          driver.wait(
            until.elementLocated(By.xpath('//*[@id="password2"]')), 3000
          ).sendKeys(password).then(() => {
            driver.wait(
              until.elementLocated(By.xpath('//*[@id="regform"]/div[5]/div[1]/span/button')), 3000
            ).click().then(() => {
              driver.wait(
                until.elementLocated(By.xpath('//*[@id="regButton"]')), 3000
              ).sendKeys(webdriver.Key.ENTER).then(() => {

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

};

//exTest();
//}
