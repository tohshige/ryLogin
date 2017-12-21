/*
'#rlogin-username-ja'
'#rlogin-password-ja'
'body > div.rf-form-login.rf-red > main > div > section.rf-form-login--step-1 > form > p:nth-child(7) > button'

$ 
npm i --save puppeteer
*/
'use strict';

const puppeteer = require('puppeteer');
const fs        = require('fs');
const devices   = require('./DeviceDescriptors');

//const debug = require('debug')('puppeteer');

let CREDS1 = require('./cred2');// load IPASS
// let CREDS = CREDS1.test; // アカウント切り替え
// let CREDS = CREDS1.kuroko; // アカウント切り替え
// let CREDS = CREDS1.kuroko; // アカウント切り替え
let headlessOn = false;//  false is GUI mode ON
// let headlessOn = true;// true is GUI mode OFF

const slowMotion = 50;// GUI時に早すぎる動きを遅くする、大きいほど遅く
let chArgs = ['--no-sandbox', '--disable-setuid-sandbox','--disable-popup-blocking'];
let dlPath = './Download';
// let chPref = {'download.default_directory': dlPath ,'download.prompt_for_download': false,'download.directory_upgrade': true } ;


/*/////////////////////////////*/

async function run(CREDS) {
  // dom element selectors
  const USERNAME_SELECTOR = '#username';
  const BUTTON_NEXTSELECTOR   = '#btnNext';

  const PASSWORD_SELECTOR = '#passwd';
  const BUTTON_SELECTOR   = 
  '#YstrMdMenuList > div > div > div.elMain > div.elButton > ul:nth-child(4) > li:nth-child(1) > a > span';
  const BUTTON_SELECTOR2   = 
  '#YstrMdSubWindow3 > div > div > div.btn > input[type="image"]:nth-child(1)';

  const USERNAME_SELECTOR2 = '#rlogin-username-2-ja';
  const PASSWORD_SELECTOR2 = '#rlogin-password-2-ja';

  const BUTTON_SELECTOR3   =  '#message-ja > section > div > div > div > div > button';
  // 'body > div.rf-form-login.rf-red > main > div > section.rf-form-login--step-1 > form > p:nth-child(7) > button';
  // 'body > div.rf-form-login.rf-navy > main > div > section.rf-form-login--step-1 > form > p:nth-child(6) > button'
  const LOGIN_URL         = 'https://login.yahoo.co.jp/config/login' ;
  const LOGIN_URL2        = 'https://test.pro.store.yahoo.co.jp/pro.'+ CREDS.storeAccount ;
  const LOGIN_URL3        = 'https://test.editor.store.yahoo.co.jp/RT/'+ CREDS.storeAccount+'/ItemMgr/' ;

  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    headless: headlessOn,
    slowMo: slowMotion, // slow down by 250ms
    args :chArgs
    // ,pref :chPref
  });
  const page = await browser.newPage();
  await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: dlPath});
  await page.setViewport({ width: 400, height: 800 }); // view portの指定
  // await page.emulate(devices['iPhone 6']);
  
  await page.goto(LOGIN_URL, {waitUntil: 'networkidle2'});
  await page.waitFor(1000);
  await page.screenshot({ path: 'screenshots/login_'+CREDS.username+'.png' });
  // 1st
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);
  await page.click(BUTTON_NEXTSELECTOR);
  // await page.click('type="submit"');
  await page.waitFor(1000);
  
  // 1st-2
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.click('#btnSubmit');
  // await page.click('type="submit"');
  // await page.click(BUTTON_SELECTOR);
  await page.screenshot({ path: 'screenshots/login1_'+CREDS.username+'.png' });
  await page.goto(LOGIN_URL2, {waitUntil: 'networkidle2'});
  await page.waitFor(1000);
  await page.goto(LOGIN_URL3, {waitUntil: 'networkidle2'});
  await page.waitFor(1000);


  await page.click(BUTTON_SELECTOR);//click download 
  await page.waitFor(1000);

  await page.click(BUTTON_SELECTOR2, { clickCount: 1, delay: 500 });//click 2nd download 
  await page.waitFor(1000);
  // await page.screenshot({ path: 'screenshots/loginfinish_'+CREDS.username+'.png' });
  await page.keyboard.press('Enter');
  await page.waitFor(1000);
  await page.keyboard.press('Enter');
  await page.waitFor(1000);
  await page.keyboard.press('Enter');

  // await page.waitForNavigation();

  // await waitDownloadComplete(dlPath)
  //   .catch((err) => console.error(err));

  console.log('finished');

  // const reportLink = await page.$('a#test');
  // await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './'});
  // await BUTTON_SELECTOR2.click({ clickCount: 1, delay: 100 });

  // await page.keyboard.press('Enter');
  // await waitDownloadComplete(dlPath)
  //       .catch((err) => console.error(err));

  // await page.waitForNavigation();

  await page.waitFor(2000);
  
    
  // await page.waitForNavigation();
  await browser.close();
  
}

async function runAll(){
  await run(CREDS1.sj);
  await run(CREDS1.kuroko);
  await run(CREDS1.test);
}


const {CronJob} = require('cron');

// 秒: 0-59
// 分: 0-59
// 時: 0-23
// 日: 1-31
// 月: 0-11
// 週: 0-6
// 週は0が日曜日。
// なので月〜金曜日毎日11時30分00秒に実行したければ
// new CronJob('00 30 11 * * 1-5')

// new CronJob('00 58 17 * * 1-5', () => {
//   console.log('Hello');
//   runAll();
  
// }, null, true);

// test single account
run(CREDS1.testY);



//////////////////////////
const waitDownloadComplete = async (path, waitTimeSpanMs = 1000, timeoutMs = 60 * 1000) => {
  return new Promise((resolve, reject) => {

    const wait = (waitTimeSpanMs, totalWaitTimeMs) => setTimeout(
      () => isDownloadComplete(path).then(
        (completed) => {
          if (completed) { 
            resolve();
          } else {

            const nextTotalTime = totalWaitTimeMs + waitTimeSpanMs;
            if (nextTotalTime >= timeoutMs) {
              reject('timeout');
            }

            const nextSpan = Math.min(
              waitTimeSpanMs,
              timeoutMs - nextTotalTime
            );
            wait(nextSpan, nextTotalTime);
          }           
        }
      ).catch(
        (err) => { reject(err); }
      ),
      waitTimeSpanMs
    );
    
    wait(waitTimeSpanMs, 0);
  }); 
}

const isDownloadComplete = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        if (files.length === 0) {
          resolve(false);
          return;
        }
        for(let file of files){

          // .crdownloadがあればダウンロード中のものがある
          if (/.*\.crdownload$/.test(file)) { 
            resolve(false);
            return;
          }
        }
        resolve(true);
      }
    });
  });
}