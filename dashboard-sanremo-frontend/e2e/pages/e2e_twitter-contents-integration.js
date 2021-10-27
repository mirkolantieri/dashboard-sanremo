
const { PagesSharp } = require('@material-ui/icons');
let {Builder, By, Capabilities, until} = require('selenium-webdriver');
driver = new Builder().forBrowser('chrome').build();


/**
* The below code is refered to e2e testing for the "twitter contents integration" story.
* @function twitter
*/

(async function twitter(){

    const cdpConnection = await driver.createCDPConnection('page')
    await driver.logMutationEvents(cdpConnection, function (event) {
        assert.strictEqual(event['attribute_name'], 'style')
        assert.strictEqual(event['current_value'], '')
        assert.strictEqual(event['old_value'], 'display:none;')
    })

    await driver.get("http://10.0.2.15:3000/")
      
    let element = driver.findElement(By.xpath("(//div[@class='MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button'])[1]"))
    await element.click()
    setTimeout(pass, 5000);
    let ret = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret.click()
    let element2 = driver.findElement(By.className("MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"))
    await element2.click()
    let revealed = driver.findElement(By.linkText("2019"))
    await revealed.click()
    let twitter_button = driver.findElement(By.xpath("(//div[@class='MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button'])[1]"))
    await twitter_button.click()
    setTimeout(pass, 5000);
    let ret2 = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret2.click()
    
    setTimeout(driver.quit(), 5000);
})();

