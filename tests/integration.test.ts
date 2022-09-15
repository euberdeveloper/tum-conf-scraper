import { TumConfVideoScraper, ScrapingOptions } from '../source';

import * as fs from 'fs';
import * as path from 'path';

const assetsPath = path.join(__dirname, 'assets');
const scraperOptions: ScrapingOptions = {
    duration: 2000,
    delayAfterVideoStarted: 0,
    delayAfterVideoFinished: 0
};
const url =
    'https://tum-conf.zoom.us/rec/share/f5l-Ci_eFf8XXrfQ-o6uaidWQgBB6FoNG5hwrfIy_CNXbUwTM42ZxTq8jmlALs9E.QX_fNAGARSSbtTcv';
const passcode = 'X0Zu99f#';

describe('Integration tests', () => {
    beforeAll(async () => {
        if (!fs.existsSync(assetsPath)) {
            await fs.promises.mkdir(assetsPath);
        }
    });

    it(`Test simple video download`, async () => {
        const destination = path.join(assetsPath, 'simple-video.webm');

        const scraper = new TumConfVideoScraper(passcode, {
            debug: true
        });
        await scraper.launch();
        await scraper.scrape(url, destination, scraperOptions);
        await scraper.close();

        expect(fs.existsSync(destination)).toBe(true);
    });

    it(`Test multiple subsequent video download`, async () => {
        const destination1 = path.join(assetsPath, 'multiple-subsequent-video-1.webm');
        const destination2 = path.join(assetsPath, 'multiple-subsequent-video-2.webm');

        const scraper = new TumConfVideoScraper(passcode, {
            debug: true
        });
        await scraper.launch();
        await scraper.scrape(url, destination1, scraperOptions);
        await scraper.scrape(url, destination2, scraperOptions);
        await scraper.close();

        expect(fs.existsSync(destination1)).toBe(true);
        expect(fs.existsSync(destination2)).toBe(true);
    });

    it(`Test multiple parallel video download`, async () => {
        const destination1 = path.join(assetsPath, 'multiple-parallel-video-1.webm');
        const destination2 = path.join(assetsPath, 'multiple-parallel-video-2.webm');

        const scraper = new TumConfVideoScraper(passcode, {
            debug: true
        });
        await scraper.launch();

        async function scrape(dest: string, link: string) {
            await scraper.scrape(link, dest, scraperOptions);
        }

        const tasks = [
            [destination1, url],
            [destination2, url]
        ].map(async ([dest, link]) => scrape(dest, link));
        await Promise.all(tasks);

        await scraper.close();

        expect(fs.existsSync(destination1)).toBe(true);
        expect(fs.existsSync(destination2)).toBe(true);
    });

    afterAll(async () => {
        if (fs.existsSync(assetsPath)) {
            await fs.promises.rm(assetsPath, { recursive: true, force: true });
        }
    });
});
