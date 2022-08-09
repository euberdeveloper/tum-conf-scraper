import { TumConfVideoScraperError } from '.';

/** The error extending [[TumConfVideoScraperError]] that is thrown when actions on a non-launched browser are attempted to be executed */
export class TumConfVideoScraperBrowserNotLaunchedError extends TumConfVideoScraperError {
    /**
     * The constructor of the [[TumConfVideoScraperBrowserNotLaunchedError]] class.
     * @param message The message of the error.
     * @param context The context of the error.
     */
    constructor(
        message = 'You cannot scrape if a browser was not launched. Use "scraper.launch()" before calling this method',
        context = null
    ) {
        super(message, context);
        this.name = 'TumConfVideoScraperBrowserNotLaunchedError';
    }
}
