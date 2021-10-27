
const { PagesSharp } = require('@material-ui/icons');
let {Builder, By, Capabilities, until} = require('selenium-webdriver');
driver = new Builder().forBrowser('chrome').build();


/**
* The below code is refered to e2e testing for the "spotify reference" story.
* @function E2ESpotifyReference
*/

(async function E2ESpotifyReference(){

    const cdpConnection = await driver.createCDPConnection('page')
    await driver.logMutationEvents(cdpConnection, function (event) {
        assert.strictEqual(event['attribute_name'], 'style')
        assert.strictEqual(event['current_value'], '')
        assert.strictEqual(event['old_value'], 'display:none;')
    })

    await driver.get("http://10.0.2.15:3000/")
      
    let element = driver.findElement(By.className("MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"))
    await element.click()
    let revealed = driver.findElement(By.linkText("1997"))
    await revealed.click()
    let ranking2 = driver.findElement(By.xpath("(//div[@class='MuiGridListTile-tile'])[8]"))
    await ranking2.click()
    let spotify= driver.findElement(By.className("MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"))
    if (spotify.isDisplayed()){
        console.log('Il reference viene visualizzato correttamente');
    }
    let ret = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret.click()
    setTimeout(driver.quit(), 5000);
})();

