const puppeteer = require('puppeteer'),
      fs        = require('fs');

const headless     = true,
      downloadPath = './Download';

(async () => {
  const browser = await puppeteer.launch({headless: headless});
  
  const page = await browser.newPage();
  await page._client.send(
    'Page.setDownloadBehavior',
    {behavior : 'allow', downloadPath: downloadPath}
  );

  await page.goto('https://www.google.co.jp/chrome/browser/desktop/index.html', {waitUntil: 'networkidle2'});
  await page.click('a.download-button');  /* Chromeをダウンロード         */
  await page.click('button#eula-accept'); /* 利用規約に同意してインストール */

  await waitDownloadComplete(downloadPath)
        .catch((err) => console.error(err));
 
  console.log('finished');
  browser.close();  
})();


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

