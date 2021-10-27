
const { PagesSharp } = require('@material-ui/icons');
let {Builder, By, Capabilities, until} = require('selenium-webdriver');
driver = new Builder().forBrowser('chrome').build();


/**
* The below code is refered to e2e testing for the "youtube contents integration" story.
* @function youtube
*/

(async function youtube(){

    const cdpConnection = await driver.createCDPConnection('page')
    await driver.logMutationEvents(cdpConnection, function (event) {
        assert.strictEqual(event['attribute_name'], 'style')
        assert.strictEqual(event['current_value'], '')
        assert.strictEqual(event['old_value'], 'display:none;')
    })

    await driver.get("http://10.0.2.15:3000/")
      
    let element = driver.findElement(By.xpath("(//div[@class='MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button'])[2]"))
    await element.click()
    setTimeout(pass, 5000);
    let player = driver.findElement(By.xpath("(//button[@class='ytp-large-play-button ytp-button'])[1]"))
    await player.click()
    let ret = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret.click()
    let element2 = driver.findElement(By.className("MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"))
    await element2.click()
    let revealed = driver.findElement(By.linkText("2015"))
    await revealed.click()
    let yt_button = driver.findElement(By.xpath("(//div[@class='MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button'])[2]"))
    await yt_button.click()
    setTimeout(pass, 5000);
    let player2 = driver.findElement(By.xpath("(//button[@class='ytp-large-play-button ytp-button'])[1]"))
    await player2.click()
    let ret2 = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret2.click()
    
    setTimeout(driver.quit(), 5000);
})();

