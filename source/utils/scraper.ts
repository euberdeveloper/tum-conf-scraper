import { VideoScraperCore, ScrapingOptions, BrowserOptions } from 'video-scraper-core';
import { Page } from 'puppeteer';
import { Logger } from 'euberlog';

/**
 * The [[TumConfVideoScraper]] class, that scrapes a video from a "TumConf WebKonferenze" and saves it to a file.
 */
export class TumConfVideoScraper extends VideoScraperCore {
    private readonly passcode: string;

    /**
     * The constructor of the [[TumConfVideoScraper]] class.
     * @param passcode The passcode to access the video.
     * @param options The [[BrowserOptions]] to pass to the instance.
     */
    constructor(passcode: string, options: BrowserOptions = {}) {
        super(options);
        this.passcode = passcode;
    }

    protected getFullScreenSelector(): string {
        return '.vjs-fullscreen-toggle-control-button';
    }
    protected getPlayButtonSelector(): string {
        return '.vjs-big-play-button';
    }
    protected getVideoDurationSelector(): string {
        return '.vjs-remaining-time-display';
    }

    protected async afterPageLoaded(_options: ScrapingOptions, page: Page, logger: Logger): Promise<void> {
        logger.debug('Putting the passcode to access the video');
        await page.waitForSelector('input#password');
        await page.$eval(
            'input#password',
            (el: HTMLInputElement, passcode: string) => (el.value = passcode),
            this.passcode
        );

        logger.debug('Clicking the button to access the video');
        await page.waitForSelector('.btn-primary.submit');
        await page.$eval('.btn-primary.submit', (button: HTMLButtonElement) => button.click());
    }
}
