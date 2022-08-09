import { TumConfVideoScraperError } from '.';

/** The error extending [[TumConfVideoScraperError]] that is thrown when an error occurred when a browser is getting closed */
export class TumConfVideoScraperDuringBrowserCloseError extends TumConfVideoScraperError {
    /**
     * The constructor of the [[TumConfVideoScraperDuringBrowserCloseError]] class.
     * @param error The error that caused this error.
     * @param message The message of the error.
     * @param otherInfo Other information about this error.
     */
    constructor(error: Error, message = 'There was an error during the browser close.', otherInfo?: any) {
        super(message, {
            error,
            otherInfo
        });
        this.name = 'TumConfVideoScraperDuringBrowserCloseError';
    }
}
