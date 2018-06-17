class GitHubClient {
  constructor(browser) {
    this.browser = browser;
  }

  async fetch(path) {
    const page = await this.browser.newPage();
    await page.goto(`https://github.com/${path}`);

    const results = await page.evaluate(() => {
      return {
        author: document.querySelector(
          '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > h1 > span.author > a'
        ).innerText,
        product: document.querySelector(
          '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > h1 > strong > a'
        ).innerText,
        issues: document.querySelector(
          '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > nav > span:nth-child(2) > a > span.Counter'
        ).innerText,
        pullRequests: document.querySelector(
          '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > nav > span:nth-child(3) > a > span.Counter'
        ).innerText,
        watches: document.querySelector(
          '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > ul > li:nth-child(1) > a.social-count'
        ).innerText,
        stars: document.querySelector(
          '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > ul > li:nth-child(2) > a.social-count.js-social-count'
        ).innerText,
        forks: document.querySelector(
          '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > ul > li:nth-child(3) > a.social-count'
        ).innerText
      };
    });

    await page.close();
    return results;
  }
}

module.exports = GitHubClient;
