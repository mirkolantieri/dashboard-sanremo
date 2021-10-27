
const { PagesSharp } = require('@material-ui/icons');
let {Builder, By, Capabilities, until} = require('selenium-webdriver');
driver = new Builder().forBrowser('chrome').build();


/**
* The below code is refered to e2e testing for the sprint1 stories 
* and the UI_refactoring story in order to satisfy the technical debt.
* @function tech_debt
*/

(async function tech_debt(){

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
    let ranking = driver.findElement(By.className("MuiGridListTile-tile"))
    await ranking.click()
    let ret = driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root"))
    await ret.click()
    setTimeout(driver.quit(), 5000);
})();