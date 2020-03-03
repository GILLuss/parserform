require('chromedriver');

var Excel = require('exceljs');
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

                           
var driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options()
        // .addArguments('--headless')
        .addArguments('--no-sandbox')
        .addArguments('--disable-dev-shm-usage')
        .addArguments("--lang=ru")
        .windowSize({width: 1280, height: 720}))
    .build();
let NamePole ='Qwert';
let EmailPole ='QwerTyy12@mail.ru';
let PasswordPole = 'Qwer111';

/////////////////////////////////////////////////
var wb = new Excel.Workbook();
                           
var path = require('path');
var filePath = path.resolve(__dirname,'listik.xlsx');
wb.xlsx.readFile(filePath).then(function()
{
    var sh = wb.getWorksheet("Sheet1");

    //console.log(sh.rowCount);
    for(i=1;i<=rowCount;i++)
    {
        console.log(sh.getRow(i).getCell(1).value);
        console.log(sh.getRow(i).getCell(2).value);
    }
});
/////////////////////////////////////////////
getName(NamePole,EmailPole,PasswordPole);

//функция заполнения полей.
function getName(NamePole,EmailPole) {
    driver.get('https://portal.kgainfo.spb.ru/KGAMap/Auth/Register').then(() => {
        driver.wait(
            until.elementLocated(By.xpath('//*[@id="fio"]')), 5000
        ).sendKeys(NamePole).then(() => {
            driver.wait(
                until.elementLocated(By.xpath('//*[@id="username"]')), 7000
            ).sendKeys(EmailPole).then(() => {
                driver.wait(
                    until.elementLocated(By.xpath('//*[@id="password1"]')), 4000
                ).sendKeys(PasswordPole).then(() => {
                    driver.wait(
                        until.elementLocated(By.xpath('//*[@id="password2"]')), 3000
                    ).sendKeys(PasswordPole).then(() => {
                            driver.wait(
                            until.elementLocated(By.xpath('//*[@id="regform"]/div[5]/div[1]/span/button')), 3000
                        ).click().then(() => {
                            driver.wait(
                                until.elementLocated(By.xpath('//*[@id="regButton"]')), 3000
                            ).sendKeys(webdriver.Key.ENTER).then(() => {
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
