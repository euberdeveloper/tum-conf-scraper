![Build](https://github.com/euberdeveloper/tum-conf-scraper/workflows/Build/badge.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/npm/l/tum-conf-scraper.svg)](https://github.com/euberdeveloper/tum-conf-scraper/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/tum-conf-scraper.svg)](https://github.com/euberdeveloper/tum-conf-scraper/issues)
[![GitHub stars](https://img.shields.io/github/stars/euberdeveloper/tum-conf-scraper.svg)](https://github.com/euberdeveloper/tum-conf-scraper/stargazers)
![npm](https://img.shields.io/npm/v/tum-conf-scraper.svg)

# tum-conf-scraper
This is a scraper written in Node.js and using Puppeteer that gets the videos served by [Tum Conf](https://tum-conf.zoom.us) services.

## Install

To install tum-conf-scraper, run:

```bash
$ npm install tum-conf-scraper
```

## Project purpose

This module is written because videos hosted on [Tum Conf](tum-conf.zoom.us) are difficult to download and watchable only in the browser. By using the module **[video-scraper-core](https://www.npmjs.com/package/video-scraper-core)**, I created this module, that allows those videos to be recorderd.

## Project usage

To scrape a video available at "https://tum-conf.zoom.us/rec/share/myvideo" and save it to "./saved.webm":

```javascript
const { TumConfVideoScraper } = require('tum-conf-scraper');

async function main() {
    // Create an instance of the scraper
    const scraper = new TumConfVideoScraper({
        debug: true
    });
    // Launch the Chrome browser
    await scraper.launch();
    // Scrape and save the video
    await scraper.scrape('mypasscode', 'https://tum-conf.zoom.us/rec/share/myvideo', './saved.webm');
    // Close the browser
    await scraper.close();
}
main();
```

To scrape and download more than one video:

```javascript
const { TumConfVideoScraper } = require('tum-conf-scraper');

async function main() {
    // Create an instance of the scraper
    const scraper = new TumConfVideoScraper({
        debug: true
    });
    // Launch the Chrome browser
    await scraper.launch();
    // Scrape and save the first video
    await scraper.scrape('mypasscode', 'https://tum-conf.zoom.us/rec/share/myvideo', './saved.webm');
    // Scrape and save the second video
    await scraper.scrape('mypasscode', 'https://tum-conf.zoom.us/rec/share/myvideo-bis', './saved_bis.webm');
    // Close the browser
    await scraper.close();
}
main();
```

To scrape and download in parallel more than one video:

```javascript
const { TumConfVideoScraper } = require('tum-conf-scraper');

async function scrape(dest, link) {
    // Create an instance of the scraper
    const scraper = new TumConfVideoScraper({
        debug: true
    });
    // Launch the Chrome browser
    await scraper.launch();
    // Scrape and save the video
    await scraper.scrape('mypasscode', link, dest);
    // Close the browser
    await scraper.close();
}

async function main() {
    const tasks = [
        ['./saved.webm', 'https://tum-conf.zoom.us/rec/share/myvideo'],
        ['./saved_bis.webm', 'https://tum-conf.zoom.us/rec/share/myvideo-bis']
    ].map(([dest, link]) => scrape(dest, link));
    await Promise.all(tasks);
}
main();
```

With custom options:

```javascript
const { TumConfVideoScraper } = require('tum-conf-scraper');

async function main() {
    // Browser options
    const scraper = new TumConfVideoScraper({
        debug: true,
        debugScope: 'This will be written as scope of the euberlog debug',
        windowSize: {
            width: 1000,
            height: 800
        },
        browserExecutablePath: '/usr/bin/firefox'
    });
    await scraper.launch();

    // Scraping options
    await scraper.scrape('mypasscode', 'https://tum-conf.zoom.us/rec/share/myvideo', './saved.webm', { duration: 1000 });
    await scraper.scrape('mypasscode', 'https://tum-conf.zoom.us/rec/share/myvideo-bis', './saved_bis.webm', { 
        audio: false,
        delayAfterVideoStarted: 3000,
        delayAfterVideoFinished: 2000 
    });

    await scraper.close();
}
main();
```

...all the options can be seen in the API section or with the Typescript definitions.

## API

The documentation site is: [tum-conf-scraper documentation](https://tum-conf-scraper.euber.dev)

The documentation for development site is: [tum-conf-scraper dev documentation](https://tum-conf-scraper-dev.euber.dev)

### TumConfVideoScraper

The TumConfVideoScraper class, that scrapes a video from a "BBB WebKonferenze" and saves it to a file.

**Syntax:**

`const scraper = new TumConfVideoScraper(passcode, options);`

**Parameters:**

* __passcode__:  A `string` that specifies the passcode to access the video page.
* __options__: Optional. A `BrowserOptions` object that specifies the options for this instance.

**Methods:**

* __setBrowserOptions(options: BrowserOptions): void__: Changes the browser options with the ones given by the `options` parameter.
* __launch(): Promise<void>__: Launches the browser window.
* __close(): Promise<void>__: Closes the browser window.
* __scrape(url: string, destPath: string, options: ScrapingOptions): Promise<void>__: Scrapes the video in `url` and saves it to `destPath`. Some ScrapingOptions can be passed.

### BrowserOptions

The options given to the TumConfVideoScraper constructor, see [video-scraper-core](https://github.com/euberdeveloper/video-scraper-core#browseroptions) for more information.

### ScrapingOptions

The options passing to a scrape method, see [video-scraper-core](https://github.com/euberdeveloper/video-scraper-core#scrapingoptions) for more information.

### Errors

There are also some error classes that can be thrown by this module, see [video-scraper-core](https://github.com/euberdeveloper/video-scraper-core#errors) for more information.

## Tests

The package is tested by using **[jest](https://jestjs.io/)** and **[ts-jest](https://www.npmjs.com/package/ts-jest)**. The tests try for real to download some videos and check if they are saved, therefore, are not run in the CI because they are not headless.

## Notes

* The default browser is **Google Chrome** on `/usr/bin/google-chrome`, because Chromium did not support the BBB videos. You can always change the browser executable path on the configurations.
* By default (if the **duration** option is `null`), the **duration of the recording will be automatically detected** by looking at the vjs player of the page and by adding a stopping delay of 15 seconds.
* This module can be uses only in **headful mode**.
