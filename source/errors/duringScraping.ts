import { TumConfVideoScraperError } from '.';

/** The error extending [[TumConfVideoScraperError]] that is thrown when an error occurs during a video scraping */
export class TumConfVideoScraperDuringScrapingError extends TumConfVideoScraperError {
    /**
     * The constructor of the [[TumConfVideoScraperDuringScrapingError]] class.
     * @param error The error that caused this error.
     * @param message The message of the error.
     * @param otherInfo Other information about this error.
     */
    constructor(error: Error, message = 'There was an error during the scraping.', otherInfo?: any) {
        super(message, {
            error,
            otherInfo
        });
        this.name = 'TumConfVideoScraperDuringScrapingError';
    }
}
