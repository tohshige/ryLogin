/*
'#rlogin-username-ja'
'#rlogin-password-ja'
'body > div.rf-form-login.rf-red > main > div > section.rf-form-login--step-1 > form > p:nth-child(7) > button'

$ 
npm i --save puppeteer
*/
const puppeteer = require('puppeteer');

/* //////////////////////////////////

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/login');
  await page.screenshot({ path: 'screenshots/github.png' });
  browser.close();
}

run();
/*////////////////////////////// .  */

/*/////////////////////////////*/
async function run() {
  const CREDS = require('./cred');
  // dom element selectors
  const USERNAME_SELECTOR = '#login_field';
  const PASSWORD_SELECTOR = '#password';
  const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://github.com/login');



  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.screenshot({ path: 'screenshots/githublogin.png' });
  
  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();
  await page.screenshot({ path: 'screenshots/githubsearch.png' });

}
run();

/*/////////////////////////////////////*/