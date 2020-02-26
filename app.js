require('chromedriver');
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
        .windowSize({width: 600, height: 400}))
    .build();

getWeather('погода спб');

function getWeather(str) {
    driver.get('https://www.google.com').then(() => {
        driver.wait(
            until.elementLocated(By.xpath('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input')), 3000
        ).sendKeys(str).then(() => {
            driver.wait(
                until.elementLocated(By.xpath('//*[@id="tsf"]/div[2]/div[1]/div[3]/center/input[1]')), 3000
            ).sendKeys(webdriver.Key.ENTER).then(() => {
                driver.wait(
                    until.elementLocated(By.xpath('//*[@id="wob_dc"]')), 3000
                ).getAttribute('innerText').then((t1) => {
                    driver.wait(
                        until.elementLocated(By.xpath('//*[@id="wob_tm"]')), 3000
                    ).getAttribute('innerText').then((t2) => {
                        driver.wait(
                            until.elementLocated(By.xpath('//*[@id="wob_d"]/div/div[2]/div[1]')), 3000
                        ).getAttribute('innerText').then((t3) => {
                            driver.wait(
                                until.elementLocated(By.xpath('//*[@id="wob_d"]/div/div[2]/div[2]')), 3000
                            ).getAttribute('innerText').then((t4) => {
                                driver.wait(
                                    until.elementLocated(By.xpath('//*[@id="wob_d"]/div/div[2]/div[3]')), 3000
                                ).getAttribute('innerText').then((t5) => {
                                    console.log((str.charAt(0).toUpperCase() + str.slice(1)) + ': ' + t1 + '. Температура: ' + t2 + '(С). ' + t3 + '. ' + t4 + '. ' + t5);
                                    driver.quit();
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
            }).catch(() => {
            });
        });
    });
}
