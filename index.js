const pp = require('puppeteer');
const GitHubClient = require('./src/GitHubClient.js');

(async () => {
  const browser = await pp.launch({ headless: true });

  const gc = new GitHubClient(browser);
  const results = {
    puppeteer: await gc.fetch('GoogleChrome/puppeteer'),
    nightmare: await gc.fetch('segmentio/nightmare')
  };

  console.table(results.puppeteer);
  console.table(results.nightmare);

  await browser.close();
})();
