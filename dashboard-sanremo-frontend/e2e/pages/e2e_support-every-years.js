
const { PagesSharp } = require('@material-ui/icons');
let {Builder, By, Capabilities, until} = require('selenium-webdriver');
driver = new Builder().forBrowser('chrome').build();


/**
* The below code is refered to e2e testing for the "support for every year" story.
* @function support_year
*/

(async function support_year(){

    const cdpConnection = await driver.createCDPConnection('page')
    await driver.logMutationEvents(cdpConnection, function (event) {
        assert.strictEqual(event['attribute_name'], 'style')
        assert.strictEqual(event['current_value'], '')
        assert.strictEqual(event['old_value'], 'display:none;')
    })

    await driver.get("http://10.0.2.15:3000/")
      
    let element = driver.findElement(By.className("MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"))
    await element.click()
    let revealed = driver.findElement(By.linkText("2000"))
    await revealed.click()
    let rankButton = driver.findElement(By.xpath("(//button[@class='MuiButtonBase-root MuiIconButton-root'])[2]"))
    await rankButton.click()
    let ranking = driver.findElement(By.xpath("(//div[@class='MuiGridListTile-tile'])[7]"))
    await ranking.click()
    let ret = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret.click()
    let element2 = driver.findElement(By.className("MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"))
    await element2.click()
    let revealed2 = driver.findElement(By.linkText("1983"))
    await revealed2.click()
    let rankButton2 = driver.findElement(By.xpath("(//button[@class='MuiButtonBase-root MuiIconButton-root'])[2]"))
    await rankButton2.click()
    let rankButton3 = driver.findElement(By.xpath("(//button[@class='MuiButtonBase-root MuiIconButton-root'])[2]"))
    await rankButton3.click()
    let ranking2 = driver.findElement(By.xpath("(//div[@class='MuiGridListTile-tile'])[8]"))
    await ranking2.click()
    let ret2 = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret2.click()
    setTimeout(driver.quit(), 5000);
})();
