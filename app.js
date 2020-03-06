require('chromedriver');

//const GoogleSpreadsheet = require('google-spreadsheet');
//const {promisify} = require('util');

//const {google} = require('googleapis');
//const keys = require('./keys.json');

/*const client = new google.auth.JWT(
 keys.client_email, 
 null,
 keys.privat_Key,
 ['https://www.googleapis.com/auth/spreadsheets']
);
client.authorize(function(err,tokens){
  if(err){
    console.log(err);
    return;
  }
  else{
    console.log('connect');
  }
});*/

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

/*async function accessSpreadsheet()
{
  const doc = new GoogleSpreadsheet('1wQpZ8O8t6FhBX3WpMhy9wfBiGVsv803dqQ2wqCC5_VI');
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  console.log('Title: ${sheet.title}, Rows: ${sheet.rowCount}');
  
 // const roWs = await promisify(sheet.getRows)({

  }

 
 // console.log(roWs);
 /* const row = {
    userName: name,
    userEmail: email,
    UserPass: password
  }
  await promisify(sheet.addRow)(row);*/
//}

//accessSpreadsheet();
//функция заполнения полей.
function getName(rows) {

  let column = rows.shift();

let name = column[0];
let email = column[1];
let password = column[2];
var now = new Date();


  async function exTest(){
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    worksheet.columns = [
      {header: 'Name', key: 'name1', width: 35},
      {header: 'Email', key: 'email1', width: 35}, 
      {header: 'Pass', key: 'password1', width: 35},
      {header: 'Reg Time', key: 'time', width: 20}
    ];

      var data = [{name1: name, email1: email, password1: password, time: now}];
      for(i in data){
        worksheet.addRow(data[i]);
      }
    

//worksheet.addRow({name1: name, email1: email, password1: password, time: now}).commit();


await workbook.xlsx.writeFile('Results.xlsx');


};

exTest();
imeout_id = window.setTimeout()
setTimeout(elementLocated,10000);
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

    })


}
