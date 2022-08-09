module.exports = {
    entryPoints: [
        './source'
    ],
    name: 'tum-conf-video-scraper - DEV',
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    out: './docs/documentation/html-dev'
};