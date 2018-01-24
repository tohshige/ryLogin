/*
'#rlogin-username-ja'
'#rlogin-password-ja'
'body > div.rf-form-login.rf-red > main > div > section.rf-form-login--step-1 > form > p:nth-child(7) > button'

$ 
npm i --save puppeteer
*/
'use strict';
let CREDS1 = require('../cred2');// load IPASS
let rl = require('./rl');// load IPASS

if(process.argv[2]){
  var argv2 = process.argv[2];
  if(process.argv[3]){
    var argv3 = process.argv[3]
  }
}

/*/////////////////////////////*/

exports.run = async function run(CREDS, debugFlg) {
  const puppeteer = require('puppeteer');
  const devices = require('./DeviceDescriptors');
  const moment = require('moment');// datetime libs
  const jst = +9;
  const now = moment().utcOffset(jst).format("YYYY-MMDD-HHmm");
  const fileName = CREDS.username + '_' + now;
  console.log(fileName);
  console.log(CREDS.password);

  //const debug = require('debug')('puppeteer');
  
  const CREDS1 = require('../cred2');// load IPASS
  // let CREDS1 = require('cred2');// load IPASS
  // let CREDS = CREDS1.test; // アカウント切り替え
  // let CREDS = CREDS1.kuroko; // アカウント切り替え
  // let CREDS = CREDS1.kuroko; // アカウント切り替え

  const chromeGuiFlg = (debugFlg)?false:true;
    // const chromeGuiFlg = false;// GUI:ON
  // const chromeGuiFlg = true;// GUI:OFF

  // let chromeGuiFlg = (argv2) ? false : true ;// NoGUI:true GUI:false
  const slowMotion = 70;// GUI時に早すぎる動きを遅くする、大きいほど遅く
  let chArgs = ['--no-sandbox', '--disable-setuid-sandbox'];


  // dom element selectors
  const USERNAME_SELECTOR = '#rlogin-username-ja';
  const PASSWORD_SELECTOR = '#rlogin-password-ja';
  const BUTTON_SELECTOR   = 
  'body > div.rf-form-login.rf-navy > main > div > section.rf-form-login--step-1 > form > p:nth-child(6) > button';

  const USERNAME_SELECTOR2 = '#rlogin-username-2-ja';
  const PASSWORD_SELECTOR2 = '#rlogin-password-2-ja';
  const BUTTON_SELECTOR2   = 
  'body > div > main > div > section.rf-form-login--step-2 > form > p:nth-child(8) > button';

  const BUTTON_SELECTOR3   =  '#message-ja > section > div > div > div > div > button';
  // 'body > div.rf-form-login.rf-red > main > div > section.rf-form-login--step-1 > form > p:nth-child(7) > button';
  // 'body > div.rf-form-login.rf-navy > main > div > section.rf-form-login--step-1 > form > p:nth-child(6) > button'
  const LOGIN_URL         = 'https://glogin.rms.rakuten.co.jp/' ;
  const LOGIN_URL2        = 'https://mainmenu.rms.rakuten.co.jp/' ;

  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    headless: chromeGuiFlg,
    slowMo: slowMotion, // slow down by 250ms
    args:chArgs
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 800 }); // view portの指定
  // await page.emulate(devices['iPhone 6']);
  console.log('start!');
  await page.goto(LOGIN_URL);
  await page.screenshot({ path: 'screenshots/0_'+fileName+'.png' });
  // 1st
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.keyboard.down('Shift');
  for (let i = 0; i < ' World'.length; i++)
    await page.keyboard.press('ArrowLeft');
  await page.keyboard.up('Shift');
  await page.keyboard.down('Tab');
  
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.click(BUTTON_SELECTOR);
  await page.screenshot({ path: 'screenshots/1_'+fileName+'.png' });
  
  // await page.waitForNavigation();
  await page.screenshot({ path: 'screenshots/2_'+fileName+'.png' });
  // 2nd
  await page.click(USERNAME_SELECTOR2);
  await page.keyboard.type(CREDS.username2);

  await page.click(PASSWORD_SELECTOR2);
  await page.keyboard.type(CREDS.password2);
  await page.click(BUTTON_SELECTOR2);
  await page.screenshot({ path: 'screenshots/3_'+fileName+'.png' });

  await page.waitFor(1000);
  
  await setTimeout(() => {
    // await page.click(BUTTON_SELECTOR3);
    page.click(BUTTON_SELECTOR3);
  }, 1000);
  // body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a
  // await page.goto(LOGIN_URL2);
  // body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a
  // await page.click('a[href="https://mainmenu.rms.rakuten.co.jp/?act=login&sp_id=1"]');
  // await page.click('body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a');
  await setTimeout(() => {
    // page.click('body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a');
  }, 1000);
  // const xpathUrl = '/html/body/main/div/div[3]/dl[2]/dd/a';
  // await page.click(xpath(page, '/html/body/main/div/div[3]/dl[2]/dd/a'));
  
  /* <a class="rf-medium" href="https://mainmenu.rms.rakuten.co.jp/?act=login&amp;sp_id=1">ＲＭＳ<span class="rf-icon rf-icon-chevron-right"></span></a> */
  await page.waitFor(3000);

  for (let i = 0; i < 8; i++){
    await page.waitFor(500);
    await page.keyboard.press('Tab');
  }

  await page.waitFor(1000);
  await page.keyboard.press('Enter');
  // await page.keyboard.press('Space');

  const SUBMIT= 'body > form > table:nth-child(4) > tbody > tr > td > input[type="submit"]';
  await page.waitFor(1000);
  for (let i = 0; i < 5; i++){
    await page.waitFor(500);
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Space');
  
  // await page.click(SUBMIT);
  
  await page.waitFor(2500);
  const ITEM_UPDATE = 'https://mainmenu.rms.rakuten.co.jp/?left_navi=11';
  await page.goto(ITEM_UPDATE, {waitUntil: 'networkidle2'});


  await page.waitFor(1000);
  // const ITEM_UPDATE1 = 'https://item.rms.rakuten.co.jp/rms/mall/rsf/item/vc?__event=RI00_001_002&shop_bid=320124';
  const ITEM_UPDATE1 = 'https://item.rms.rakuten.co.jp/rms/mall/rsf/item/vc?__event=RI00_001_002&shop_bid=' + CREDS.shop_bid ;
  await page.goto(ITEM_UPDATE1, {waitUntil: 'networkidle2'});

  // await page.waitForNavigation();/////////// WAIT FOR DEBUG /////////

  // csv 申請ボタンページ
  // await page.waitForNavigation();
  await page.waitFor(2000);
  // const ITEM_UPDATE2 = '#r_08';
  const ITEM_UPDATE2 = '#r_07';//全商品 詳細
  // const ITEM_UPDATE2 = '#mm_sub0101_12';
  // const ITEM_UPDATE2 = 'body > form > table > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(17) > td:nth-child(2) > font > b > label';
  await page.click(ITEM_UPDATE2);
  // press [csv download] btm  
  for (let i = 0; i < 3; i++){
    await page.waitFor(500);
    await page.keyboard.press('Tab');
  }
  (debugFlg)?
    await page.waitForNavigation() :
    await page.keyboard.press('Space');



  // const ITEM_UPDATE = '#subNav > li:nth-child(1) > ul > li.first > a';
  // await page.click(ITEM_UPDATE);
  await page.waitFor(2000);
  
  await page.screenshot({ path: 'screenshots/4_finish_'+fileName+'.png' });
  // const [handle1, handle2] = await xpath(page, '/html/body/main/div/div[3]/dl[2]/dd/a');
  // console.log(await page.click(e => e.textContent, handle1));
  // console.log(await page.evaluate(e => e.textContent, handle1));
  // console.log(await page.evaluate(e => e.textContent, handle2));
    
  // await page.waitForNavigation();
  (debugFlg)?
    await page.waitForNavigation() :
    await browser.close() ;

  return fileName;
  
}

exports.runAll = async function runAll(){
  await run(CREDS1.sj);
  await run(CREDS1.kuroko);
  await run(CREDS1.test);
}

// 秒: 0-59
// 分: 0-59
// 時: 0-23
// 日: 1-31
// 月: 0-11
// 週: 0-6
// 週は0が日曜日。
// なので月〜金曜日毎日11時30分00秒に実行したければ
// new CronJob('00 30 11 * * 1-5')

//new CronJob('00 30 23 * * 1-5', () => {
//             秒 分 時 日月週

if (!argv2){
  const {CronJob} = require('cron');
//   new CronJob('00 30 23 * * 1-5', () => {
//           秒 分 時 日 月 週
new CronJob('00 00 01 * * 1-5', () => {
    console.log('Hello');
//     runAll();
    rl.run(CREDS1.sj);
  }, null, true);
}

// node rl sj
if (argv2){
  console.log(argv2);
  console.log(argv3);
  // test single account
  rl.run(CREDS1[argv2], argv3);
}

